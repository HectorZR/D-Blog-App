pragma solidity >=0.4.0 <0.7.0;

library PostMapping {
    struct Post {
        mapping(uint => IndexValue) data;
        KeyFlag[] keys;
        uint size;
    }

    struct IndexValue {
        uint keyIndex;
        string name;
        string description;
        string url;
        address payable owner;
    }

    struct KeyFlag { uint key; bool deleted; }

    function insert(
        Post storage self,
        string memory name,
        string memory description,
        string memory url,
        address payable owner
    ) internal returns (bool) {
        if (self.size == 0) self.keys.length++;

        self.size++;
        self.data[self.size].name = name;
        self.data[self.size].description = description;
        self.data[self.size].url = url;
        self.data[self.size].owner = owner;

        self.keys.length++;
        self.data[self.size].keyIndex = self.size;
        self.keys[self.size].key = self.size;

        return true;
    }

    function iterate_get(
        Post storage self,
        uint keyIndex
    ) internal view returns (
        uint key,
        string memory name,
        string memory description,
        string memory url,
        address payable owner
    ) {
        key = self.keys[keyIndex].key;
        name = self.data[key].name;
        description = self.data[key].description;
        url = self.data[key].description;
        owner = self.data[key].owner;
    }

    function remove(Post storage self, uint key) internal {
        self.keys[self.data[key].keyIndex].deleted = true;
        delete self.data[key];
    }

    function contains(Post storage self, uint key) internal view returns (bool) {
        return self.data[key].keyIndex > 0;
    }

    function iterate_start(Post storage self) internal view returns (uint keyIndex) {
        return iterate_next(self, uint(0));
    }

    function iterate_valid(Post storage self, uint keyIndex) internal view returns (bool) {
        return keyIndex < self.keys.length;
    }

    function iterate_next(Post storage self, uint keyIndex) internal view returns (uint) {
        uint r_keyIndex = keyIndex + 1;
        while (r_keyIndex < self.keys.length && self.keys[r_keyIndex].deleted)
            r_keyIndex++;
        return r_keyIndex;
    }
}