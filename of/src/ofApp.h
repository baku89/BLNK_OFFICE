#pragma once

#include "ofMain.h"
#include "ofxDatGui.h"
#include "ofxSyphon.h"
#include "ofxJSON.h"
#include "ofxLibwebsockets.h"

#include "Monitor.h"

#define SYPHON_NAME "Main Output"
#define SYPHON_APP "VDMX5"
#define GUI_WIDTH 280
#define WIDTH 320
#define HEIGHT 80
#define SCALE 3

class ofApp : public ofBaseApp{

public:
	void setup();
	void update();
	void draw();
    
    void loadMonitor();

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
    
    void onMessage(ofxLibwebsockets::Event& args);
    void onConnect( ofxLibwebsockets::Event& args );
    void onOpen( ofxLibwebsockets::Event& args );
    void onClose( ofxLibwebsockets::Event& args );
    void onIdle( ofxLibwebsockets::Event& args );
    void onBroadcast( ofxLibwebsockets::Event& args );

	ofxDatGui *gui;
    ofxDatGuiToggle *guiServing;
	
	ofxSyphonClient syphonClient;
	ofxSyphonServerDirectory syphonDir;
    
    map<string, Monitor*> monitorList;
    
    ofFbo fbo;
    ofPixels pixels;
    
    
    int port = 8989;
    ofxLibwebsockets::Server wsServer;
    
    stringstream ss;
    
    ofxJSONElement json;
		
};
