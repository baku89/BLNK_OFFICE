//
//  Monitor.h
//  OfficeBlink
//
//  Created by Baku Hashimoto on 3/22/16.
//
//

#pragma once

#include "ofMain.h"
#include "ofxLibwebsockets.h"

class Monitor {
public:
//    Monitor(float _x, float _y) {
//        x = _x;
//        y = _y;
//    };
    
    string name = "";
    float x = 0, y = 0;
    ofxLibwebsockets::Connection *conn = NULL;
    ofColor color;
    
};