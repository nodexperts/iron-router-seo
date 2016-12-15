import Lib from './lib.js';
import './config.js';

let Setter = {};

Setter.init = function(options, clearBefore) {
  if(typeof options === 'undefined') {
    return;
  }
  let {title: title, rel_author: rel_author, meta: meta, og: og, link: link, twitter: twitter} =
                    (Object.keys(options).length === 0 && options.constructor === Object)
                    ? IronRouterSEO
                    : options;

  if (clearBefore == null) {
    clearBefore = true;
  }
  if (clearBefore) {
    this.clearAll();
  }
  let currentRouter = Router.current();
  if (currentRouter) {
    url = Router.url(currentRouter.route.getName(), currentRouter.params);
  }
  if (title) {
    this.setTitle(title);
  }
  if (rel_author) {
    this.setLink('author', rel_author);
  }
  if (options.url) {
    this.setUrl(options.url);
  } else if (url) {
    this.setUrl(url);
  }
  if (meta && _.isArray(meta)) {
    for (let i = 0; i < meta.length; i++) {
      this.setMeta(`name='${meta[i].key}'`, meta[i].value);
    }
  } else if (meta && _.isObject(meta)) {
    for (index in meta) {
      this.setMeta(`name='${index}'`, meta[index]);
    }
  }
  if (og && _.isArray(og)) {
    for (let j = 0; j < og.length; j++) {
      this.setMeta(`property='og:${og[j].key}'`, og[j].value);
    }
  } else if (og && _.isObject(og)) {
    for (index in og) {
      this.setMeta(`property='og:${index}'`, og[index]);
    }
  }
  if (link && _.isArray(link)) {
    for (let k = 0; k < link.length; k++) {
      this.setLink(link[k].rel, link[k].href);
    }
  } else if (link && _.isObject(link)) {
    for (index in link) {
      this.setLink(index, link[index]);
    }
  }
  if (twitter && _.isArray(twitter)) {
    for (let l = 0; l < twitter.length; p++) {
      this.setMeta(`property='twitter:${twitter[p].key}'`, twitter[p].value);
    }
  } else if (twitter && _.isObject(twitter)) {
    for (index in twitter) {
      this.setMeta(`property='twitter:${index}'`, twitter[index]);
    }
  }
}

Setter.clearAll = function() {
  let metaDom = $("meta");
  for (let i = 0; i < metaDom.length; i++) {
    let metaTagExists = $(metaDom[i]).attr('name') || $(metaDom[i]).attr('property');
    if (metaTagExists) {
      $(metaDom[i]).remove();
    }
  }

  let linkDom = $("link");
  for (let i = 0; i < linkDom.length; i++) {
    let linkTagExists = $(linkDom[i]).attr('rel');
    if (linkTagExists) {
      $(linkDom[i]).remove();
    }
  }
  return this.setTitle(IronRouterSEO.title);
}

Setter.setTitle = function(title){
  document.title = title;
  if (_.indexOf(IronRouterSEO.auto.set, 'title') !== -1) {
    if (IronRouterSEO.auto.twitter) {
      this.setMeta('property="twitter:title"', title);
    }
    if (IronRouterSEO.auto.og) {
      return this.setMeta('property="og:title"', title);
    }
  }
}

Setter.setUrl = function(url) {
  if (_.indexOf(IronRouterSEO.auto.set, 'url') !== -1) {
    if (IronRouterSEO.auto.twitter) {
      this.setMeta('property="twitter:url"', url);
    }
    if (IronRouterSEO.auto.og) {
      return this.setMeta('property="og:url"', url);
    }
  }
}

Setter.setLink = function(rel, href, unique) {
  unique = (typeof unique === 'undefined') ? true : unique ;
  if (unique) {
    this.removeLink(href);
  }
  if (_.isArray(href)) {
    for (let i = 0; i < href.length; i++) {
      this.setLink(rel, href[i], false);
    }
    return;
  }
  $('head').append("<link rel='" + rel + "' href='" + href + "'>");
}

Setter.removeLink = function(href) {
  return $(`link[rel='${href}']`).remove();
}

Setter.setMeta = function(attr, content, unique) {
  unique = (typeof unique === 'undefined') ? true : unique ;
  if (unique) {
    this.removeMeta(attr);
  }
  if (_.isArray(content)) {
    for (let i = 0; i < content.length; i++) {
      this.setMeta(attr, content[i], false);
    }
    return;
  }
  if (!content) {
    return;
  }
  content = Lib.removeSpecialCharacters(content);
  $('head').append(`<meta ${attr} content = '${content}'>`);
  let name = attr.replace(/"|'/g, '').split('=')[1];
  if (_.indexOf(IronRouterSEO.auto.set, name) !== -1) {
    if (IronRouterSEO.auto.twitter) {
      this.setMeta("property='twitter:" + name + "'", content);
    }
    if (IronRouterSEO.auto.og) {
      return this.setMeta("property='og:" + name + "'", content);
    }
  }
}

Setter.removeMeta = function(attr) {
  return $(`meta[${attr}]`).remove();
}

export default Setter;
