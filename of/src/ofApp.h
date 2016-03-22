#pragma once

#include "ofMain.h"
#include "ofxDatGui.h"
#include "ofxSyphon.h"
#include "ofxLibwebsockets.h"

#include "Monitor.h"

#define SYPHON_NAME ""
#define SYPHON_APP "Simple Server"
#define GUI_WIDTH 280
#define WIDTH 640
#define HEIGHT 160

class ofApp : public ofBaseApp{

public:
	void setup();
	void update();
	void draw();

	void keyPressed(int key);
	void keyReleased(int key);
	void mouseMoved(int x, int y );
	void mouseDragged(int x, int y, int button);
	void mousePressed(int x, int y, int button);
	void mouseReleased(int x, int y, int button);
	void mouseEntered(int x, int y);
	void mouseExited(int x, int y);
	void windowResized(int w, int h);
	void dragEvent(ofDragInfo dragInfo);
	void gotMessage(ofMessage msg);

	ofxDatGui *gui;
    ofxDatGuiToggle *guiServing;
	
	ofxSyphonClient syphonClient;
	ofxSyphonServerDirectory syphonDir;
    
    vector<Monitor> monitorList;
    
    ofFbo fbo;
    ofPixels pixels;
		
};
