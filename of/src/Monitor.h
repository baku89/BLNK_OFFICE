//
//  Monitor.h
//  OfficeBlink
//
//  Created by Baku Hashimoto on 3/22/16.
//
//

#pragma once

#include "ofMain.h"

class Monitor {
public:
    
    Monitor(string _name, float _x, float _y) {
        name = _name;
        x = _x;
        y = _y;
    };
    
    string name;
    float x, y;
    ofColor color;
    bool enabled = false;
    
};