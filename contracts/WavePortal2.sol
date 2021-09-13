// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal2
{
    //uint totalWaves;// Keep it here to avoid getting ALL waves with ALL the info just to get this number.

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

    constructor()
    {
        console.log("Welcome to the w1ldrabb1t Wave  2!");
    }

    function wave(string memory _message) public
    {
        WaveLog memory newWaveLog = WaveLog(msg.sender, block.timestamp, _message);

        userWavesLog[msg.sender].push(newWaveLog);

        wavesLog.push(newWaveLog);

        emit NewWave(msg.sender, block.timestamp, _message);

        uint userWavesTotal = userWavesLog[msg.sender].length;
        uint totalWaves = wavesLog.length;

        if((block.timestamp - userWavesTotal - totalWaves) % 10 == 0)
        {
            userPointsTotal[msg.sender]+=1;
            emit NewPoints(msg.sender, 1, userPointsTotal[msg.sender]);

            console.log("Congrats!!! Now you have %d points and you waved %d times!",
                userPointsTotal[msg.sender],
                userWavesTotal);
        }
        else
        {
            console.log("You waved %d times!", userWavesTotal);
        }

    }

    function getAllWaves() view public returns (WaveLog[] memory)
    {
        return wavesLog;
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
