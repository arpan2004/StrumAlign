# Introduction

Many beginner guitar players struggle with proper technique and current guitar apps only rely on audio signals to provide training while YouTube videos don't provide real-time feedback which is why we wanted to create an app that uses computer vision to provide real-time video-based feedback for users.

## Available Scripts

The application uses computer vision to map out the user's fingers on a guitar's fretboard and performs curvature analysis on their fingers and determine if their fingers are curved enough and that their wrist is properly straight.

### How we Built it?

We used openCV and MediaPipe for hand tracking and then utilized vector math to calculate the angle of each finger based on 3 joints located within the finger. Finally, we utilized React to create a frontend to integrate our computer vision finger tracking.

### Challenges

Some challenges we ran into were integrating the frontend with the computer vision models and displaying them on a website with a nice user interface

### Accomplishments that we're proud of

We're proud of the fact that we were able to get a working project with so many complicated features to integrate properly into a nice fleshed-out product.

### Next Steps

We wish to make this more widely available by scaling up to cloud platforms and adding more functionalities such as chord detection and musical tempo training as well.
