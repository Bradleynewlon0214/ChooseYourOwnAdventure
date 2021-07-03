import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
let chai = require('chai');
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
//For frontend/src/components
const baseDir = '../src/components/';

describe("Signup Test Container", async function(){


    const signup = await require(baseDir + 'Signup.js')



    it(" Test", function() {
        expect(signup.submitForm.testPass).to.be.true;
    })



})