import os
import cherrypy

class Cherry(object):
    @cherrypy.expose
    def index(self):
        return file('index.html')

    @cherrypy.expose
    def legal(self):
        return file('legal.html')

    @cherrypy.expose
    def nanomood(self):
        return file('nanohmood/index.html')

    @cherrypy.expose
    def xbr(self):
    	return file('xbr/index.html')

	tools.staticdir.debug = True
	log.screen = True
    
config = {
	'/static':{
	'tools.staticdir.on': True,
	'tools.staticdir.dir': os.path.abspath(os.path.join(os.path.dirname(__file__), 'static'))
	}
}

if __name__ == '__main__':
	cherrypy.tree.mount(Cherry(), '/', config = config)
	cherrypy.engine.start()
	cherrypy.engine.block()