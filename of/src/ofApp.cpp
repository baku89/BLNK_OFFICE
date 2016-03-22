#include "ofApp.h"


//--------------------------------------------------------------
void ofApp::setup(){
	
    // scene
	ofSetWindowTitle("OfficeBlink");
	ofSetWindowShape(WIDTH * SCALE + GUI_WIDTH, HEIGHT * SCALE);
	ofSetFrameRate(30);
	
    // syphon and texture
	syphonClient.setup();
	syphonClient.set(SYPHON_NAME, SYPHON_APP);
    pixels.allocate(WIDTH, HEIGHT, OF_IMAGE_COLOR_ALPHA);
    
    fbo.allocate(WIDTH, HEIGHT);
	
	// gui
	gui = new ofxDatGui(ofxDatGuiAnchor::TOP_LEFT);
	gui->setTheme(new ofxDatGuiThemeCharcoal());
	gui->setWidth(GUI_WIDTH);
    gui->addFRM();
    guiServing = gui->addToggle("serving");
    
    // setup websocket server
    ofxLibwebsockets::ServerOptions options = ofxLibwebsockets::defaultServerOptions();
    options.port = port;
    options.bUseSSL = false;
    wsServer.setup(options);
        
    wsServer.addListener(this);
    
    // setup monitor list
    string monitorListFile = "monitor-list.json";
    
    loadMonitor();
    
//    monitorList["5ive-imac"]    = new Monitor(0.5, 0.8);
//    monitorList["3no"]          = new Monitor(0.5, 0.4);
//    monitorList["d-imac"]       = new Monitor(0.5, 0.8);
//    
//    monitorList["d-mba"]        = new Monitor(0.5, 0.8);
//    monitorList["baku-mbp"]     = new Monitor(0.5, 0.4);
//    monitorList["baku-pro1"]    = new Monitor(0.5, 0.5);
//    monitorList["baku-pro2"]    = new Monitor(0.5, 0.6);
//    monitorList["baku-va"]      = new Monitor(0.5, 0.6);
//    monitorList["baku-imac"]    = new Monitor(0.5, 0.8);
//    monitorList["dell"]         = new Monitor(0.5, 0.7);
//    
//    monitorList["yu"]           = new Monitor(0.5, 0.7);
//    
//    monitorList["koki1"]        = new Monitor(0.5, 0.7);
//    monitorList["koki2"]        = new Monitor(0.5, 0.7);
    
}

//--------------------------------------------------------------
void ofApp::loadMonitor() {
    
    monitorList.clear();
    
    bool bParse = json.open("monitor-list.json");
    
    if (bParse) {
        
        for (Json::ValueIterator itr = json.begin(); itr != json.end(); itr++) {
            string key = itr.key().asString();
            float x = json[key][0].asFloat();
            float y = json[key][1].asFloat();
            
            monitorList[key] = new Monitor(x, y);
        }
        
    } else {
        
        ofLog(OF_LOG_ERROR, "Cannot parse monitor-list.json");
        
    }
}

//--------------------------------------------------------------
void ofApp::update(){
    
}

//--------------------------------------------------------------
void ofApp::draw(){
    
    bool serving = guiServing->getEnabled();
	
	ofClear(0);
	
	ofPushMatrix();
	ofTranslate(GUI_WIDTH, 0);
	
    fbo.begin();
    {
        ofClear(0);
        ofSetColor(255);
        syphonClient.draw(0, 0, WIDTH, HEIGHT);
    }
    fbo.end();
    
    ofSetColor(255);
    fbo.draw(0, 0, WIDTH * SCALE, HEIGHT * SCALE);
    fbo.readToPixels(pixels);
    
    int x, y;
    
    for (auto elm : monitorList) {

        auto name = elm.first;
        auto monitor = elm.second;
        
        // get color
        x = monitor->x * WIDTH;
        y = monitor->y * HEIGHT;
        ofColor c = pixels.getColor(x, y);
        
        // draw marker
        ofSetColor(c);
        ofDrawCircle(x * SCALE, y * SCALE, 10);
        
        ofSetColor(255);
        ofDrawCircle(x * SCALE, y * SCALE, 2);
        
        if (monitor->getEnabled()) {
            ofSetColor(255);
        } else {
            ofSetColor(255, 0, 0);
        }
        ofDrawBitmapString(name, x * SCALE + 7, y * SCALE + 3);
        
        // send
        if (serving && monitor->getEnabled()) {
            
            if (c != monitor->color) {
                ss.str("");
                ss << "#" << hex << setw(6) << setfill('0') << c.getHex();
                monitor->conn->send(ss.str());
            }
            
            // update
            monitor->color = c;
        }
    }
	
	ofPopMatrix();
}

//--------------------------------------------------------------
void ofApp::keyPressed(int key){

}

//--------------------------------------------------------------
void ofApp::keyReleased(int key){

}

//--------------------------------------------------------------
void ofApp::mouseMoved(int x, int y ){

}

//--------------------------------------------------------------
void ofApp::mouseDragged(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mousePressed(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseReleased(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseEntered(int x, int y){

}

//--------------------------------------------------------------
void ofApp::mouseExited(int x, int y){

}

//--------------------------------------------------------------
void ofApp::windowResized(int w, int h){

}

//--------------------------------------------------------------
void ofApp::gotMessage(ofMessage msg){

}

//--------------------------------------------------------------
void ofApp::dragEvent(ofDragInfo dragInfo){ 

}
