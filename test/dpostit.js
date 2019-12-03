const DPostit = artifacts.require("./DPostit.sol");
const truffleAssert = require('truffle-assertions');

contract("DPostit", accounts => {
    const firstAccount = accounts[0];
    const secondAccount = accounts[1];
    const thirdAccount = accounts[2];
    let dpostitIntance;
    const name = "Testing Post";
    const description = "This is a testing post";
    const url = "file associated to this post";

    beforeEach(async () => dpostitIntance = await DPostit.new({from: firstAccount}))

    it("saves a new post and return size", async () => {
        await dpostitIntance.savePost(name, description, url, { from: firstAccount });
    });

    it("should returns an error if savePost name input fails", async () => {
        await truffleAssert.reverts(dpostitIntance.savePost('', description, url, { from: firstAccount }), "Name field is required");
    });

    it("should returns an error if savePost description input fails", async () => {
        await truffleAssert.reverts(dpostitIntance.savePost(name, '', url, { from: firstAccount }), "Description field is required");
    });

    it("should returns an error if savePost url input fails", async () => {
        await truffleAssert.reverts(dpostitIntance.savePost(name, description, '', { from: firstAccount }), "Url field is required");
    });

    it("returns an error if post does not exist", async () => {
        await truffleAssert.reverts(dpostitIntance.getPost.call(1, { from: firstAccount }), "Post does not exist");
    });

    it("returns a post that already exists", async () => {
        await dpostitIntance.savePost(name, description, url, { from: firstAccount });
        await dpostitIntance.getPost.call(1, { from: firstAccount });
    });

    it("returns a full posts list", async () => {
        for (let index = 0; index < 5; index++) {
            await dpostitIntance.savePost(name, description, url, { from: firstAccount });
        }
        await dpostitIntance.listPosts.call({from: firstAccount});
    });

    it("lets contract owner deleting posts", async () => {
        await dpostitIntance.savePost(name, description, url, { from: secondAccount });
        await dpostitIntance.deletePost(1, {from: firstAccount});
    });

    it("only allows deleting post if post not exists", async () => {
        await truffleAssert.reverts(dpostitIntance.deletePost(1, {from: firstAccount}), "Post does not exist");
    });

    it("only allows deleting post if address is contract owner", async () => {
        await dpostitIntance.savePost(name, description, url, { from: secondAccount });
        await truffleAssert.reverts(dpostitIntance.deletePost(1, {from: thirdAccount}), "You are not able to delete post");
    });

    it("does not send coins if sender is equal to post's creator", async () => {
        await dpostitIntance.savePost(name, description, url, { from: secondAccount });
        await truffleAssert.reverts(dpostitIntance.payForAccess(1, {from: secondAccount, value: 1000000000}), "You can not donate to yourself!");
    });

    it("does not send coins if post not exists", async () => {
        await truffleAssert.reverts(dpostitIntance.payForAccess(1, {from: secondAccount, value: 1000000000}), "Post does not exist");
    });

    it("does not send coins if minimum goal is not reached", async () => {
        await dpostitIntance.savePost(name, description, url, { from: secondAccount });
        await truffleAssert.reverts(dpostitIntance.payForAccess(1, {from: thirdAccount, value: 1}), "Minimun goal is not reached, minimun goal is 1000 wei");
    });

    it("sends coins to post owner", async () => {
        await dpostitIntance.savePost(name, description, url, { from: secondAccount });
        await dpostitIntance.payForAccess(1, {from: thirdAccount, value: 10000000});
    });
});