var link = function() {
	_this = this;
	this.val = '';
	this.url = '';
	this.locadata = '';
	this.t = true;
	this.ls = window.localStorage;
}
link.prototype.makeurl = function (Url,value) {
	this.url = Url + '#/' + this.val;
	this.ls.setItem('GoLinkData', value);
	if (!this.t) {
		window.location.href = Url;
	}else{
		window.location.href = _this.url;	
	}
}
link.prototype.go = function(Url, value, Element,toggle) {
	this.t = toggle;
	if ('rel' == value) {
		Element.find('a').bind('click', function() {
				value = _this.val = $(this).attr('rel');
				_this.makeurl(Url,value);
			})
	} else {
		if ('[object Array]' == Object.prototype.toString.call(value)) {
			for (var i = 0; i < value.length; i++) {
				0 == i ? this.val = value[0] : this.val += '&' + value[i];
			}
		} else {
			this.val = value;
		}
		if (Element) {
			Element.find('a').bind('click', function() {
				_this.makeurl(Url,value);
			})
		}
	}
}
link.prototype.link = function() {
	var hash = window.location.hash;
	if ('' != hash) {
		this.data = hash.split('#/')[1].split('&');
		1 == this.data.length ? this.data = this.data.toString() : '';
		return this.data;
	}
}
link.prototype.data = function() {
	this.locadata = this.ls.GoLinkData.split(',');
	1 == this.locadata.length ? this.locadata = this.locadata.toString() : '';
	return this.locadata;
}