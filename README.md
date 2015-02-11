# EME

## MVP Technology Considerations ## 
1. Build a License Server that will authorize requests to play encrypted media
  - Produce Clear Keys that will decrypt the media client-side
  - Build a RESTful API to handle requests 
2. Build a packaging service
  - creates an embed code that contains both a script to communicate with the license server and encrypted media
3. Module for media storage using AWS or something similar
4. Payment authorization using Bitcoin or another alternative


