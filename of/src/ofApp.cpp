#include "ofApp.h"


//--------------------------------------------------------------
void ofApp::setup(){
	
    // scene
	ofSetWindowTitle("OfficeBlink");
	ofSetWindowShape(WIDTH + GUI_WIDTH, HEIGHT);
	ofSetFrameRate(60);
	
    // syphon and texture
	syphonClient.setup();
	syphonClient.set(SYPHON_NAME, SYPHON_APP);
    pixels.allocate(718, 360, OF_IMAGE_COLOR_ALPHA);
    
    fbo.allocate(WIDTH, HEIGHT);
	
	// gui
	gui = new ofxDatGui(ofxDatGuiAnchor::TOP_LEFT);
	gui->setTheme(new ofxDatGuiThemeCharcoal());
	gui->setWidth(GUI_WIDTH);
    gui->addFRM();
	gui->addTextInput("port")->setText("8989");
    guiServing = gui->addToggle("serving");
    
    // setup monitor list
    monitorList.push_back(Monitor("baku-mbp", 0.5, 0.5));
    monitorList.push_back(Monitor("baku-pro_1", 0.2, 0.2));
    monitorList.push_back(Monitor("baku-pro_2", 0.8, 0.2));
    
}

//--------------------------------------------------------------
void ofApp::update(){
    
    bool serving = guiServing->getEnabled();


}

//--------------------------------------------------------------
void ofApp::draw(){
	
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
    fbo.draw(0, 0);
    fbo.readToPixels(pixels);
    
    int x, y;
    
    for (auto monitor : monitorList) {
        
        // get color
        x = monitor.x * WIDTH;
        y = monitor.y * HEIGHT;
        ofColor c = pixels.getColor(x, y);
        
        // draw marker
        ofSetColor(c);
        
        ofDrawCircle(x, y, 10);
        
        ofSetColor(255);
        ofDrawCircle(x, y, 2);
        
        if (monitor.enabled) {
            ofSetColor(255);
        } else {
            ofSetColor(255, 0, 0);
        }
        ofDrawBitmapString(monitor.name, x + 7, y + 3);
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
