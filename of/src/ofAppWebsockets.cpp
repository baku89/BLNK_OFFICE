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
    Json::Value json = args.json;
    
    if (type == "update-user") {
        
        Monitor *monitor = NULL;
        
        for (auto m : monitorList) {
            if (m->conn == &args.conn) {
                cout << "mikkatta" << endl;
                monitor = m;
                break;
            }
        }
        if (monitor == NULL) {
            monitor = new Monitor();
            monitor->conn = &args.conn;
            monitorList.push_back(monitor);
        }
        
        monitor->name = json["name"].asString();
        monitor->x = json["x"].asFloat();
        monitor->y = json["y"].asFloat();
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
    for (int i = 0; i < monitorList.size(); i++) {
        if (monitorList[i]->conn == &args.conn) {
            monitorList.erase(monitorList.begin() + i);
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