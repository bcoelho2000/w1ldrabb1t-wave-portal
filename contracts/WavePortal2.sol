// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal2
{
    //uint totalWaves;// Keep it here to avoid getting ALL waves with ALL the info just to get this number.
    uint private seed;

    struct WaveLog{
        address userAddress;
        uint timestamp;
        string message;
    }
    WaveLog[] wavesLog;

    mapping(address => uint) userPointsTotal;
    mapping(address => WaveLog[]) userWavesLog;

    event NewWave(address indexed _from, uint _timestamp, string _message);
    event NewPoints(address indexed _user, uint _pointsEarned, uint _pointsTotal);

    constructor () payable
    {
        console.log("Welcome to the w1ldrabb1t Wave  2!");
    }

    function wave(string memory _message) public
    {
        console.log("%s waved message %s", msg.sender, _message);
        WaveLog memory newWaveLog = WaveLog(msg.sender, block.timestamp, _message);

        userWavesLog[msg.sender].push(newWaveLog);

        wavesLog.push(newWaveLog);

        emit NewWave(msg.sender, block.timestamp, _message);

        uint userWavesTotal = userWavesLog[msg.sender].length;
        uint totalWaves = wavesLog.length;

        // Generate a PSEUDO random number between 0-10000000000000000
        uint luckyNumber = (block.difficulty + block.timestamp + seed) % 100;
        console.log("Lucky number: %s", luckyNumber);
        seed = luckyNumber;

        if(luckyNumber < 50)
        {
            console.log("%s won!", msg.sender);
            userPointsTotal[msg.sender]+=1;
            console.log("New Points: ", userPointsTotal[msg.sender]);

            emit NewPoints(msg.sender, 1, userPointsTotal[msg.sender]);

            // Prize!
            uint prizeAmount = 0.0001 ether;
            prizeAmount = prizeAmount * userPointsTotal[msg.sender];
            console.log("prizeAmount: ", prizeAmount);

            // How to send the error to the caller?
            require(prizeAmount <= address(this).balance, "Not enough money to payout the prize");

            (bool success,) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to payout the prize");

            console.log("Congrats!!! Now you have %d points and you waved %d times!",
                userPointsTotal[msg.sender],
                userWavesTotal);
        }
        else
        {
            // Unlucky... this will cost you points.
            console.log("Unlucky... this will cost you...");
            if(userPointsTotal[msg.sender] > 0)
            {
              userPointsTotal[msg.sender]-=1;
              console.log("New Points: %s", userPointsTotal[msg.sender]);
            }
        }

    }

    function getAllWaves() view public returns (WaveLog[] memory)
    {
        return wavesLog;
    }

    function getWavesSlice(uint start, uint count) view public returns (WaveLog[] memory)
    {
        if((start+count) > wavesLog.length)
          revert('getWavesSlice: start and count invalid');

        WaveLog[] memory res = new WaveLog[](count);
        uint resIdx = 0;
        for(;start < count;++start)
        {
          res[resIdx++]=wavesLog[start];
        }
        return res;
    }

    function getTotalWaves() view public returns (uint)
    {
        console.log("We have %d total waves", wavesLog.length);
        return wavesLog.length;
    }

    function getWavesForAddress(address addr) view public returns (WaveLog[] memory)
    {
        return userWavesLog[addr];
    }

    function getPointsForAddress(address addr) view public returns (uint)
    {
        console.log("Address %s has %d points!", addr, userPointsTotal[addr]);
        return userPointsTotal[addr];
    }

}
