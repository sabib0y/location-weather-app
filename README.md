# Location-weather-app

Weather web application that describes the current weather based on your location

# Challenges faced when building the app

Being that I wanted the background to change based on the given weather, it took a while to figure out the most efficient way to import the right image files without making unnecessary requests.

By feeding the weather description as a class name, I could then map different images to different weather conditions. This means I need to factor in all the possible weather conditions and I think I have them all nailed down for now.

It's just a fun way of altering the visuals of the website based on the user's real time input by loading the web app.

# To improve

There's currently an issue with the phrasing, being that parts of the sentence describing the weather are dynamically populated, in some instances, the grammatical structure of the sentence breaks.

Thinking of incorporating some ISS (International Space Station) tracking data relative to the user's location and if/when they can see it zoom past around them.
