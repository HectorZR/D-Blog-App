pragma solidity ^0.5.8;

import './PostMapping.sol';
import './Utils.sol';


contract DPostit {
    constructor() public {
        contractOwner = msg.sender;
    }

    address private contractOwner;
    uint private minGoal = 1000 wei;
    mapping(address => uint[]) ownerPosts;

    PostMapping.Post post;
    modifier isContractOwner() {
        require(msg.sender == contractOwner, "You are not able to delete post.");
        _;
    }

    modifier required(
            string memory name,
            string memory description,
            string memory url
        ) {
            require(bytes(name).length > 0, "Name field is required");
            require(bytes(description).length > 0, "Description field is required");
            require(bytes(url).length > 0, "Url field is required");
            _;
        }

    modifier exists(
        uint postIndex
    ) {
        require(PostMapping.contains(post, postIndex) == true, "Post does not exist");
        _;
    }

    modifier reachMinimumGoal() {
        require(msg.value >= minGoal, "Minimun goal is not reached, minimun goal is 1000 wei");
        _;
    }

    function listPosts() public view returns(string memory data) {
        data = '[';
        for(uint i = PostMapping.iterate_start(post);
        PostMapping.iterate_valid(post, i);
        i = PostMapping.iterate_next(post, i)) {
            (
                uint key,
                string memory name,
                string memory description,
                ,
            ) = PostMapping.iterate_get(post, i);

            data = string(
                abi.encodePacked(
                    data,
                    Utils.getPostObject(key, name, description),
                    (i == post.size) ? '' : ', '
                )
            );
        }
        data = string(abi.encodePacked(data, ']'));
    }

    function savePost(
        string memory name,
        string memory description,
        string memory url
    ) public required(
        name,
        description,
        url
    ) returns (uint) {

        PostMapping.insert(post, name, description, url, msg.sender);
        return post.size;
    }

    function getPost(
        uint postIndex
    ) public view exists(
        postIndex
    ) returns (string memory){
        (
            uint key,
            string memory name,
            string memory description,
            ,
        ) = PostMapping.iterate_get(post, postIndex);

        return string(abi.encodePacked('"', Utils.getPostObject(key, name, description), "'"));
    }

    function payForAccess(uint postIndex) public payable reachMinimumGoal() exists(postIndex) returns (string memory) {
        (
            ,
            ,
            ,
            string memory url,
            address payable owner
        ) = PostMapping.iterate_get(post, postIndex);

        require(owner != msg.sender, "You can not donate to yourself!");
        owner.transfer(msg.value);
        return string(abi.encodePacked('{"url":', '"', url, '"', '"}'));
    }

    function deletePost(uint postIndex) public isContractOwner() exists(postIndex) returns(bool){
        PostMapping.remove(post, postIndex);
        return true;
    }
}