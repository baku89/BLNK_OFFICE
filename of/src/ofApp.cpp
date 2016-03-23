#include "ofApp.h"


//--------------------------------------------------------------
void ofApp::setup(){
	
    // scene
	ofSetWindowTitle("◆ B L N K _ O F F I C E ◆");
	ofSetWindowShape(WIDTH * SCALE + GUI_WIDTH, HEIGHT * SCALE);
	ofSetFrameRate(30);
	
    // syphon and texture
	syphonClient.setup();
	syphonClient.set(SYPHON_NAME, SYPHON_APP);
    pixels.allocate(WIDTH, HEIGHT, OF_IMAGE_COLOR_ALPHA);
    
    fbo.allocate(WIDTH, HEIGHT);
	
	// gui
	gui = new ofxDatGui(ofxDatGuiAnchor::TOP_LEFT);
	gui->setTheme(new ofxDatGuiThemeWireframe());
	gui->setWidth(GUI_WIDTH);
    gui->addLabel(":::: BLNK_OFFICE ::::");
    gui->addFRM();
    guiDesktop = gui->addToggle("desktop");
    guiDesktop->setEnabled(false);
    guiServing = gui->addToggle("serving");
    guiServing->setEnabled(true);
    
    // setup websocket server
    ofxLibwebsockets::ServerOptions options = ofxLibwebsockets::defaultServerOptions();
    options.port = port;
    options.bUseSSL = false;
    wsServer.setup(options);
        
    wsServer.addListener(this);
    
    // osc
    osc.setup(OSC_PORT);
}

//--------------------------------------------------------------
void ofApp::update(){
    
    while (osc.hasWaitingMessages()) {
        ofxOscMessage m;
        osc.getNextMessage(&m);
        string address = m.getAddress();
        
        if (address == "/desktop") {
            int result = m.getArgAsInt(0);
            isDesktop = result == 1;
            guiDesktop->setEnabled(isDesktop);
            cout << "cdeskto" << result;
            ss.str("");
            ss << "desktop:" << result;
            wsServer.send(ss.str());
        }
    }
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
    
    for (auto monitor : monitorList) {
        
        // get color
        x = monitor->x * WIDTH;
        y = monitor->y * HEIGHT;
        ofColor c = pixels.getColor(x, y);
        
        // draw marker
        ofSetColor(c);
        ofDrawCircle(x * SCALE, y * SCALE, 10);
        
        ofSetColor(255);
        ofDrawCircle(x * SCALE, y * SCALE, 2);
        
        ofSetColor(255);
        ofDrawBitmapString(monitor->name, x * SCALE + 7, y * SCALE + 3);
        
        // send
        if (serving) {
            
            if (c != monitor->color) {
                
                ss.str("");
                if (isDesktop) {
                    ss << "opacity:" << (float)c.getBrightness() / 255.0f;
//                    cout << c.getBrightness() / 255.0 << endl;
                } else {
                    ss << "color:#" << hex << setw(6) << setfill('0') << c.getHex();
                }
                monitor->conn->send(ss.str());
            }
            
            // update
            monitor->color = c;
        }
    }
	
	ofPopMatrix();
    
    ofSetHexColor(0xfcfafd);
    ofDrawRectangle(0, 0, GUI_WIDTH, ofGetHeight());
    ofSetColor(255);
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
