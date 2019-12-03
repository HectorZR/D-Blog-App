pragma solidity >=0.4.0 <0.7.0;

library Utils {
    function getPostObject(
        uint key,
        string memory name,
        string memory description
    ) internal pure returns(string memory content) {
        content = string(abi.encodePacked(
            '{"key": ', '"', toString(key), '"',
            ', "name": ', '"', name, '"',
            ', "description": ', '"', description, '"',
            '}')
        );
    }
    function toString(uint _i) internal pure returns (string memory _uintAsString) {
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len - 1;
        j = _i;

        while (j != 0) {
            bstr[k--] = byte(uint8(48 + j % 10));
            j /= 10;
        }
        return string(bstr);
    }
}