<<<<<<< HEAD
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;
=======

pragma solidity >=0.4.22 <0.9.0;
>>>>>>> 378f1a33f6211942b485fdca018c87e456581f23

contract Migrations {
  address public owner = msg.sender;
  uint public last_completed_migration;

  modifier restricted() {
    require(
      msg.sender == owner,
      "This function is restricted to the contract's owner"
    );
    _;
  }

  function setCompleted(uint completed) public restricted {
    last_completed_migration = completed;
  }
}
