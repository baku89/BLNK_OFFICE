//
//  ofAppWebsockets.cpp
//  OfficeBlink
//
//  Created by Baku Hashimoto on 3/22/16.
//
//

#include "ofApp.h"

//--------------------------------------------------------------
void ofApp::onMessage(ofxLibwebsockets::Event& args) {

    string type = args.json["type"].asString();
    
    if (type == "add-user") {
        string name = args.json["name"].asString();
        
        if (monitorList.count(name) != 0) {
            auto monitor = monitorList[name];
            monitor->conn = &args.conn;
        }
    }
}

//--------------------------------------------------------------
void ofApp::onConnect( ofxLibwebsockets::Event& args) {
    
}

//--------------------------------------------------------------
void ofApp::onOpen( ofxLibwebsockets::Event& args) {
//    cout << "connect" << endl;
}

//--------------------------------------------------------------
void ofApp::onClose( ofxLibwebsockets::Event& args) {
    
    for (auto elm : monitorList) {
        auto monitor = elm.second;
        if (monitor->conn == &args.conn) {
            monitor->conn = NULL;
        }
    }
}

//--------------------------------------------------------------
void ofApp::onIdle( ofxLibwebsockets::Event& args) {
    
}

//--------------------------------------------------------------
void ofApp::onBroadcast( ofxLibwebsockets::Event& args) {
    
}

//--------------------------------------------------------------