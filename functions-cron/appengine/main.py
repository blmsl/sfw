import webapp2
import time
import json
import pubsub_utils
import logging

class PushToPubSub(webapp2.RequestHandler):
    def get(self, topic):
        pubsub_utils.publish_to_topic(topic, str(time.time()))

        logging.warning(topic)

        self.response.headers['Content-Type'] = 'application/json'
        self.response.write(json.dumps({"status": "200"}))

app = webapp2.WSGIApplication([
    webapp2.Route(r'/python/<topic>', handler=PushToPubSub)
], debug=True)
