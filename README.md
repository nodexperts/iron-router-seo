# iron-router-seo


This package allows a user to add meta tags to his Meteor app. It is developed using Jquery, Underscore, and up-and-coming ES2015.

> : construction: **Warning** It is developed primarily for [Iron Router](https://atmospherejs.com/iron/router), so it won't work with other routers.

## Installation

This package is on [atmosphere](https://atmospherejs.com/nodexpert/iron-router-seo) so you can install it using the following command.

```bash
meteor add nodexpert:iron-router-seo
```

### Prerequisites

- [Iron Router](https://atmospherejs.com/iron/router)

As mentioned this package is for meteor apps using Iron Router so you'll gonna need iron router to use this package.

```bash
meteor add iron-router
```

- [Spiderable](https://atmospherejs.com/meteor/spiderable)

Spiderable is a package from MDG which allows web crawler to see your HTML (meta tags). It gives better chance to your site for getting higher index on search engines. However its not a necessity but its suggested to install it in your app.

```bash
meteor add spiderable
```

## Docs

This package is quite easy to use. Once installed in your app you'll have access to `IronRouterSEO` object.
`IronRouterSEO` has 3 functions which you can use to set your meta-tags.

- setting
- setSEO
- updateSEO

#### setting

- Description - Saves the newly passed setting

- parameter - Object - SEO Object (meta tags)

#### setSEO

- Description - Saves the SEO Object (meta tags) in collection for every path.

- parameter - Object of Dictionary with `path` as key and `SEO object` as field

#### updateSEO

- Description - Updates the SEO Object in collection for passed path.

- parameters - String - Path name

- parameters - Object - SEO Object

All 3 above mentioned functions run on client, so make sure you call them in a file under client directory or code is under the isClient block.

## Usage

Iron-router-seo has default setting using which your meta-tags are passed to web crawlers but you can update these setting using `setting` function.

#### Default Setting

```bash
Config = {
    title: '',
    rel_author: '',
    meta: {},
    link: [],
    og: {},
    twitter: {},
    auto: {
      twitter: true,
      og: true,
      set: ['description', 'url', 'title']
    }
}
```

#### Updating the Setting

```bash
if (Meteor.isClient) {
  IronRouterSEO.setting({
        title: 'Home',
        rel_author: 'author_name',
        meta: {

        },
        link: [

        ],
        og: {

        },
        twitter: {

        },
        auto: {
          twitter: true,
          og: false,
          set: ['description', 'url', 'title', 'image']
        }
  });
}
```
Auto block tells IronRouterSEO to add tags inside set array for og (open-graph) and twitter too.


## Demo

Let's create an dummy Meteor site "www.passwordcheck.com" which uses iron-router and let's implement iron-router-seo in it.

For simplicty we have 4 paths in passwordcheck: login, home, generate, and profile.
In following example we will add deafult seo settings, seo setting for each path and then seo for dynamic path depending on route's parameters.

#### Default SEO tags

Their are some tags for any site which'll be same for every page like title, author, etc so there is no need of adding these tags each time for every path. So we'll add these tags in deafult SEO config using previously mentioned `setting` function.

```bash
IronRouterSEO.setting({
      title: 'PasswordCheck - Home',
      rel_author: 'Nodexperts',
      meta: {
        'description': 'Check strength of your password.',
        'robots': 'follow, index'
      },
      link: [
        {
          rel: "canonical",
          href: "https://meteorhacks.com/"
        },

        {
          rel: "canonical",
          href: "https://meteor.com/"
        }
      ],
      og: {
        'type': 'website'
      },
      twitter: {},
      auto: {
        twitter: true,
        og: true,
        set: ['description', 'url', 'title', 'image']
      }
});
```
If we don't add seo for some path then these will be meta tags for that page and these will also get added to other paths unless user override them in path's `setSEO` function.

#### Saving the Meta-tags for paths

Here you have to call setSEO function which will take an Object of Dictionary where,

- key = path

- field = Meta tags Object

```bash
IronRouterSEO.setSEO(
  {
    'home': {
        route_name: 'home',
        meta: {
          'url': 'http://passwordcheck.com',
        },
        og: {
          'type': 'website'
        },
        twitter: {
          'card': 'summary'
        },
        link: [
          {
            rel: "canonical",
            href: "https://www.ithow.com"
          }
        ]
    },

    'generate': {
      route_name: 'generate',
      meta: {
        'description': 'Generate new password.',
        'url': 'http://passwordcheck.com/generate',
      }
    },

    'login': {
      route_name: 'login',
      title: 'PasswordCheck - Register',
      meta: {
          'description': 'Login to your PasswordCheck account.',
          'url': 'http://passwordcheck.com/login'
      }
    }
  }
);
```
Notice, we have 4 paths but we passed only 3 in setSEO function. The paths we don't pass in here will use SEO tags from deafault config.

#### Updating the Meta-tags for paths

The `updateSEO` function must be called from 'onAfterAction' block of the route.
Let's add parameters in 'generate' path we used in our SEO-friendly 'PasswordCheck' site.

```bash
Router.route('/generate/:password', {
    name: 'generate',

    onAfterAction: function() {
      IronRouterSEO.updateSEO('generate', {
        title: "PasswordCheck - Your Password : " + this.params.password,
        og: {
          type: 'blog'
        },
        twitter: {
          card: 'password'
        }
      });
    }
});
```
