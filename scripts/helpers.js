/* @global hexo */
var _ = require('lodash');
var util = require('hexo-util');
var helper = hexo.extend.helper;

helper.register('now', function() {
    return Date.now();
});

helper.register('is_active', function(slug) {
    var url = helper.get('url_for').call(this, slug);
    var path = this.path;

    return (url == '/' + path.replace('/index.html', ''))
        || (url == '/.' && helper.get('is_home').call(this));
})

helper.register('bodyClasses', function() {
    var page = this.page;

    return _({
            home: helper.get('is_home').call(this),
            archive: helper.get('is_archive').call(this),
            "index--tag": helper.get('is_tag').call(this),
            "index--category": helper.get('is_category').call(this),
        })
        .map((value, key) => value ? key : false)
        .union([
            page.layout ? `layout--${page.layout}` : '',
            page.layout && page.slug ? `${page.layout}--${page.slug}` : '',
            page.layout && ! page.slug ? `${page.layout}--${util.slugize(page.path.replace('index.html',''))}` : '',
        ])
        .filter()
        .join(' ')
});
