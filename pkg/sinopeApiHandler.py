import os
import sys
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), "lib"))
from gateway_addon import APIHandler, APIResponse, Database

import json

_TIMEOUT = 3
_CONFIG_PATH = [
    os.path.join(os.path.expanduser('~'), '.webthings', 'config'),
]

if 'WEBTHINGS_HOME' in os.environ:
    _CONFIG_PATH.insert(0, os.path.join(os.environ['WEBTHINGS_HOME'], 'config'))

class SinopeAPIHandler(APIHandler):
    def __init__(self, package_name, verbose=False):
        self.addon_name = 'sinope-out-temp'
        self.running = True
        self.ready = False

        self.api_server = 'http://127.0.0.1:8080'
        self.DEBUG = False #TODO: use config debug_mode

        try:
            manifest_fname = os.path.join(
                os.path.dirname(__file__),
                '..',
                'manifest.json'
            )

            with open(manifest_fname, 'rt') as f:
                manifest = json.load(f)
            
            super().__init__(manifest['id'])
            self.manager_proxy.add_api_handler(self)
        except Exception as e:
            print("Failed to init ux extension API handler: " + str(e))