# WEB103 Prework - *✨ Creatorverse*

Submitted by: **developer-az**

About this web app: **A beautiful, modern web application for discovering and managing your favorite content creators. Users can add, view, edit, and delete content creators like YouTubers, streamers, and podcasters. Features a stunning glassmorphism UI with gradient backgrounds, search functionality, and responsive design.**

Time spent: **10** hours

## Required Features

The following **required** functionality is completed:

- [x] **A logical component structure in React is used to create the frontend of the app**
- [x] **At least five content creators are displayed on the homepage of the app**
- [x] **Each content creator item includes their name, a link to their channel/page, and a short description of their content**
- [x] **API calls use the async/await design pattern via Axios or fetch()**
- [x] **Clicking on a content creator item takes the user to their details page, which includes their name, url, and description**
- [x] **Each content creator has their own unique URL**
- [x] **The user can edit a content creator to change their name, url, or description**
- [x] **The user can delete a content creator**
- [x] **The user can add a new content creator by entering a name, url, or description and then it is displayed on the homepage**

The following **optional** features are implemented:

- [x] Picocss is used to style HTML elements
- [x] The content creator items are displayed in a creative format, like cards instead of a list
- [x] An image of each content creator is shown on their content creator card

The following **additional** features are implemented:

* [x] **Real-time search functionality** - Users can search creators by name or description
* [x] **Grid/List view toggle** - Switch between grid and list layouts for better viewing options
* [x] **Statistics dashboard** - Shows total creators, creators with photos, and described creators
* [x] **Gradient backgrounds** - purple-to-blue gradient design
* [x] **Responsive design** - Works perfectly on desktop, tablet, and mobile devices
* [x] **Smooth animations** - Hover effects, transitions, and micro-interactions
* [x] **Environment variables** - Secure configuration using Vite environment variables
* [x] **Loading states** - Beautiful loading animations with personality
* [x] **Empty states** - Helpful messaging when no creators exist or no search results
* [x] **Form validation** - Required field validation and proper input types
* [x] **Modern React practices** - Hooks, functional components, and proper state management

## Video Walkthrough

Here's a walkthrough of implemented required features:

👉🏿 [https://www.loom.com/share/677828c23c634dbc90a6a18c5a83fa27?sid=aa3ea5bb-a58d-4d77-a9bb-cd64b590697f](https://www.loom.com/share/d6de47728ed349e5bef08701dc616400?sid=2620b250-9793-42ae-b5e3-a3927318a209)
<img src='https://i.imgur.com/KG0aPhv.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />


GIF created with ... 👉🏿 LICEcap

## Notes

### Challenges Encountered:
- **Supabase Setup**: Initially had issues with database table configuration, particularly with UUID primary key auto-generation
- **Styling Conflicts**: Had to resolve conflicts between index.css and App.css for proper theming
- **Git Security**: Encountered GitGuardian security warnings for API keys, resolved by implementing environment variables
- **Responsive Design**: Ensuring the glassmorphism effects worked properly across different screen sizes

### Technical Decisions:
- **CSS over component libraries**: Built custom CSS for unique glassmorphism design rather than using pre-built components
- **Environment variables**: Implemented proper security practices even though anon keys are safe to expose

### Additional Context:
This project showcases modern web development practices including:
- **Full-stack development** with React frontend and Supabase backend
- **Modern UI/UX design** following current design trends
- **Security best practices** with environment variable configuration
- **Accessibility considerations** with proper contrast and semantic markup
- **Performance optimization** with efficient database queries and image handling

The app demonstrates proficiency in React development, database management, modern CSS techniques, and overall full-stack web application architecture.

## License

Copyright [2025] [Anthony Zhou]

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
