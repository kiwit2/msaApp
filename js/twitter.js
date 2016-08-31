window.twttr = (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);

  t._e = [];
  t.ready = function(f) {
    t._e.push(f);
  };

  return t;
}(document, "script", "twitter-wjs"));


function twitterSearch() {
  destroyAllWidgets();
  var screenName = document.getElementById("twitterSN").value;
  var slug = document.getElementById("twitterSlug").value;
  twttr.widgets.createTimeline({
    sourceType: "list",
    ownerScreenName: screenName,
    slug: slug
  },
    document.getElementById("twitterEmbed"),
    {
      height: 400
    }
  );
}

function destroyAllWidgets() {
    var twitter = document.getElementById('twitter-wjs');
    if (twitter != null)
        twitter.remove();
};
