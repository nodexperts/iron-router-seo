# iron-router-seo


This package allows user to add meta tags to his Meteor app. It is developed using Jquery, Underscore and up-and-coming ES2015.

> :construction: **Warning** It is developed primarily for [Iron Router](https://atmospherejs.com/iron/router), so it won't work with other routers.

## Installation

This package is on [atmosphere](https://link-to-this-package.com) so you can install it using following command.

```bash
meteor add mykej:iron-router-seo
```

### Prerequisites

- [Iron Router](https://atmospherejs.com/iron/router)

As mentioned this package is for meteor apps using Iron Router so its obvious you need iron router to use this package.

```bash
meteor add iron-router
```

- [Spiderable](https://atmospherejs.com/meteor/spiderable)

Spiderable is package from MDG which allows web crawler to see your HTML (meta tags). It gives better chance to your site for getting higher index on search engines. However its not a necessity but its suggested to install it in your app.

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

- Description - Saves the new passed setting

- parameter - Object - SEO Object (meta tags)

#### setSEO

- Description - Saves the SEO Object (meta tags) in collection for every path.

- parameter - Object of Dictionary with `path` as key and `SEO object` as field

#### updateSEO

- Description - Updates the SEO Object in collection for passed path.

- parameters - String - Path name

- parameters - Object - SEO Object


## Usage

All 3 above mentioned functions run on client, so make sure you call them in file under client directory or code is under the isClient block.

Iron-router-seo has deafault setting using which your meta-tags are passed to web crawlers but you can update these setting using `setting` function.

#### Default Setting

```bash
Config = {
    title: '',
    rel_author: '',
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
        title: 'Site Title',
        rel_author: 'Site Author',
        auto: {
          twitter: true,
          og: true,
          set: ['description', 'url', 'title', 'image']
        }
  });
}
```

Above settings will set site's title as "Site Title" and site's author as "Site Author". Auto block tells IronRouterSEO to add tags inside set array for og and twitter too.

#### Saving the Meta-tags for paths

Here you have to call setSEO function which will take a Object of Dictionary where,

- key = path

- field = Meta tags Object

You should pass all paths in here if you want search engine to see meta-tags for those paths.
Here's a simple example for site name 'PasswordCheck' which has 3 paths: login, home and profile.

```bash
if (Meteor.isClient) {
  IronRouterSEO.setSEO(
    {
      'home': {
          route_name: 'home',
          title: 'PasswordCheck - Home',
          meta: {
              'url': 'http://passwordcheck.com/',
              'description': 'Check strength of your password.',
              'robots': 'follow, index',
              'image': 'https://d14xs1qewsqjcd.cloudfront.net/assets/og-image-logo.png',
          },
          og: {
              'type': 'website'
          },
          twitter: {
              'card': 'Summary'
          }
      },
      'profile': {
        route_name: 'profile',
        title: 'PasswordCheck - Generate New Password',
        meta: {
            'url': 'http://passwordcheck.com/profile',
            'description': 'Generate a new strong password.'
        },
        twitter: {
            'card': 'Summary'
        }
      },
      'login': {
        route_name: 'login',
        title: 'PasswordCheck - Register',
        meta: {
            'url': 'http://passwordcheck.com',
            'description': 'Register for PasswordCheck and test or generate your password.',
            'robots': 'follow, index',
        }
      }
    }
  );

}
```

#### Updating the Meta-tags for paths

Let's say you have a blogging page in your site whose title will be meta content-title for that page. So in that case we can use `updateSEO` function which takes SEO object and adds it in already saved SEO object for that path.

This function must be called from 'onAfterAction' block of route.
Lets add parameters in 'profile' path we used in our SEO-friendly 'PasswordCheck' site.

```bash
if (Meteor.isClient) {
  Router.route('/profile/:title', {
      name: 'profile',

      action: function() {
        this.render('template');
      },

      onAfterAction: function() {

        IronRouterSEO.updateSEO('profile', {
          title: this.params.title,
          og: {
            type: 'blog'
          }
        });
      }
  });
}
```

If you look at previous example, you'll notice 'profile' path doesn't have any independent meta-tags for og (remember, from 'auto' block of settings, tags inside set array will be automatically added for both og and twitter) but here for same path we'll add og tags and title using parameters of route.
