#include "ofApp.h"

#define GUI_WIDTH 200

//--------------------------------------------------------------
void ofApp::setup(){
	
	ofSetWindowTitle("OfficeBlink");
	ofSetWindowShape(640 + GUI_WIDTH, 160);
	ofSetFrameRate(60);
	
	syphonClient.setup();
	syphonClient.set(SYPHON_NAME, SYPHON_APP);
	
	
	gui = new ofxDatGui(ofxDatGuiAnchor::TOP_LEFT);
//	gui->setTheme(new ofxDatGuiThemeSmoke());
	gui->setWidth(GUI_WIDTH);
	gui->addHeader();
	gui->addTextInput("port")->setText("8989");
	gui->addToggle("start serving");

}

//--------------------------------------------------------------
void ofApp::update(){

}

//--------------------------------------------------------------
void ofApp::draw(){
	
	int width = ofGetWidth() - GUI_WIDTH;
	int height = ofGetHeight();
	
	ofClear(0);
	
	ofPushMatrix();
	ofTranslate(GUI_WIDTH, 0);
	
	syphonClient.draw(0, 0);
	
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
