/* Copyright (c) 2006-2023 Livesport s.r.o.
 * You are not allowed to copy or redistribute this file.
 */

function create_ofcontent(element_id)
{
	var dof = clientStorage.get('fs_of');
	if (typeof of_list[dof] !== 'undefined')
	{
		of_current = dof;
	}
	else
	{
		set_of(of_current, element_id);
		return;
	}

	document.getElementById('ofactual').innerHTML = of_list[of_current]['name_title'];
	
	var html = new Array();
	
	html.push('<ul id="ofcontent">');

	var i = 0;
	for (var of_index in of_list)
	{
		if (of_index == of_current)
		{
			continue;
		}

		html.push('<li', ( i % 2 ? ' class="even"' : '' ),'><a href="#" onclick="set_of(\'' + of_index.substring(0,2).toLowerCase() + '\', \'' + element_id + '\')">', of_list[of_index]['name_title'], '</a></li>');
		i++;
	}
	
	html.push('</ul>');

	document.getElementById(element_id).innerHTML = html.join('');
};

function set_of(format, element_id)
{
	if (of_list[format] !== 'undefined')
	{
		switch_odd_format(format);
	}
	create_ofcontent(element_id);
};
	function refresh_alert_check_on()
	{

		if (!inside)
		{
			inside = !!clientStorage.get('LS_refresh_inside');
			//inside = !!clientStorage.getSession('LS_refresh_inside');
		}
		if (clientStorage.getSession('LS_refresh_web') == window.location && inside)
		{
			window.count = parseInt(clientStorage.getSession('LS_refresh_count')) + 1;
			clientStorage.storeSession('LS_refresh_count', window.count, 60);
		}
		else
		{
			clientStorage.storeSession('LS_refresh_count', 0, 60);
		}

		clientStorage.storeSession('LS_refresh_web', window.location, 30);
	};


	document.disable_refresh_check_once = function()
	{
		dont_check_me = true;
	};


	document.refresh_alert = function(warning)
	{
		if (checked)
		{
			return;
		}

		checked = true;

		if (typeof window.count == 'undefined')
		{
			window.count = 0;
		}
		if (window.count > 1)
		{
			alert("The scores refresh automatically without delay.\nYou don\'t need to refresh the page.");
		}
		window.count = 0;
	};


	window.onunload = function(e)
	{
		if (!dont_check_me)
		{
			clientStorage.store('LS_refresh_inside', 1, 3);
			//clientStorage.storeSession('LS_refresh_inside', 1, 3);
		}
		else
		{
			clientStorage.drop('LS_refresh_inside');
			//clientStorage.storeSession('LS_refresh_inside', 1, 0);
		}
	};

	var inside = false;
	var check_count = 0;
	var checked = false;
	var dont_check_me = false;

/**
 * Get existing league ID
 *
 * @param object
 * @param id
 * @returns Data_Item|null
 */
function getExistingLeagueId(object, id)
{
	var leagueItem;
	try
	{
		leagueItem = object.getItem(id);
	}
	catch(err) {
		leagueItem = null;
	}

	return leagueItem;
}

/** Set league display
*/
function expand_collapse_league_load()
{
	if (country == null)
	{
		var cookie_name = 'fsdc_expand_collapse_league';
		var tmp_cookie = clientStorage.get(cookie_name);

		// there are leagues in cookie
		if (tmp_cookie != null && tmp_cookie.length > 0)
		{
			// set custom flag for games
			cjs.dic.get('dataLeagueHolderProxy').getHandler().each(function(index, id)
			{
				if (tmp_cookie.match(id) == null)
				{
					return;
				}
				var leagueItem = getExistingLeagueId(this, id);
				if (!leagueItem)
				{
					return;
				}
				if (leagueItem.getValue('ZD') == 'c')
				{
					leagueItem.setValue('display', true);
				}
				else
				{
					leagueItem.setValue('display', false);
				}
			});
		}
	}
};
	/** Window prototype: Open help window
	* @url		string	url		url of window
	*/
	window.open_help = function(url)
	{
		var id = Math.floor(Math.random() * 1000);
		return this.open( url, id, 'hotkeys=no, resizable=no, toolbar=no, status=no, dependent=yes, scrollbars=1, width=520, height=500' );
	};

	/** Display/Hide element
	*/
	function display_hide_element(id)
	{
		var element = document.getElementById(id);

		if (element)
		{
			if (element.style.display == 'block')
			{
				element.style.display = 'none';
			}
			else
			{
				element.style.display = 'block';
			}
		}
	};

	function display_element(id)
	{
		var element = document.getElementById(id);
		if (element)
		{
			element.style.display = 'block';
		}
	};

	function hide_element(id)
	{
		var element = document.getElementById(id);
		if (element)
		{
			element.style.display = 'none';
		}
	};

	function show_media(url, width, height)
	{
		var resizable = false;
		if (!width && !height)
		{
			width = 400;
			height = 400;
			var resizable = true;
		}
		else
		{
			width = !width ? 300 : width + 10;
			height = !height ? 300 : height + 10;

			if (width < 100)
			{
				width = 100;
			}

		}

		if (document.all)
		{
			var x = Math.round(window.screen.availWidth / 2 - width / 2);
			var y = Math.round(window.screen.availHeight / 2 - height / 2);
			if (x < 0)
			{
				x = 10;
			}
			if (y < 0)
			{
				y = 10;
			}
		}
		else
		{
			var x = 200,y = 200;
		}


		var features = 'height='+height+', left='+x+', location=no, menubar=no, resizable='+(resizable ? 'yes' : 'no')+', '
			+'scrollbars=no, status=no, titlebar=no, toolbar=no, top='+y+', width='+width;

		window.open(url, '_blank', features);
	};
function tooltip(div_input_id, ident, disable) {
	this.max_width = 400;
	this.is_init = false;
	this.div = null;
	this.div_content = null;
	this.isDisabled = disable || false;

	this.div_id = typeof div_input_id == "undefined" ? null : div_input_id;
	this.ident = typeof ident == "undefined" ? 1 : ident;
	this.container_id = "tooltip-" + this.ident;
	this.defaultZIndex = "var(--zIndex-tooltip)";
	this.currentZIndex = this.defaultZIndex;
	this.timeoutId = null;

	this.init = function() {
		if (this.is_init || this.isDisabled) {
			return;
		}

		// create new or use existing tooltip element
		if (this.createTooltipElement()) {
			this.is_init = true;
		}
	};

	this.show = function(elm, elm_event, opposite_direction, border_elm) {
		clearTimeout(this.timeoutId);

		if (!this.is_init || this.isDisabled) {
			return;
		}

		var title = elm.title;
		if (!title) {
			title = elm.getAttribute("title"); // workaround svg title
		}
		if (!title) {
			return;
		}
		var title_length = title.length;

		// formating
		title = title.replace(/\[bl\]([^]+)/gi, function(match, p1, offset, str) {
			var closest = elm.closest("[data-bookmaker-id]");
			if (!closest) {
				return "";
			}
			var bookmakerId = closest.getAttribute("data-bookmaker-id");
			if (bookmakerId) {
				p1 = p1.replace(/\[br\]/, "\n");
				var rowData = p1.split("\n");
				var odds = rowData[0];

				var secondLineText = "";
				if (rowData[1]) {
					secondLineText = '<span class="tooltip-second-row">' + rowData[1] + "</span>";
				}

				var showText = 0;
				var bookmakerLogo = null;
				var bookmakerName = "";
				if (typeof cjs !== "undefined") {
					cjs.Api.loader.get("bookmakerSettings").call(function(module) {
						bookmakerLogo = module.getLogo(bookmakerId);
						bookmakerName = module.getBookmakerNameByGeoIpAndId(
							cjs.geoIP,
							cjs.geoIPIsoSubdivisionCode0,
							bookmakerId,
						);
						showText = module.showBookmakerLogoMatchSummary(cjs.geoIP, cjs.geoIPIsoSubdivisionCode0) === 1;
					});
				}

				var bookmaker = "";
				if (bookmakerLogo) {
					bookmaker =
						'<span class="tooltip-logo"><a><span class="tooltip-first-row"><span style="background: transparent url(' +
						bookmakerLogo.getUrl() +
						') no-repeat" class="detail-blogos"></span><span class="tooltip-first-row__text">' +
						odds +
						"</span></span>" +
						secondLineText +
						"</a></span>";
					if (showText) {
						bookmaker =
							'<span class="tooltip-logo"><a><span class="tooltip-first-row"><span class="tooltip-first-row__text">' +
							bookmakerName +
							" " +
							odds +
							"</span></span>" +
							secondLineText +
							"</a></span>";
					}
				}

				return bookmaker;
			}

			return "";
		});
		title = title.replace(/\[b\]/gi, "<strong>");
		title = title.replace(/\[\/b\]/gi, "</strong>");
		title = title.replace(/\[br\]/gi, "<br />");
		title = title.replace(/\[u\]/i, " &raquo; ");
		title = title.replace(/\[d\]/i, " &raquo; ");
		title = title.replace(/\n/g, "<br />");
		title = title.replace(/\\'/g, "'");

		if (title_length > 0) {
			var x = parseInt(elm_event.clientX);

			this.div_content.innerHTML = title;
			elm.title = "";

			this.div.style.display = "block";
			if ((this.div.style.width = "auto")) {
				this.div.style.width = this.div.offsetWidth + "px";
			}

			var div_width = this.div.offsetWidth;
			if (div_width > this.max_width) {
				div_width = this.max_width;
				this.div.style.width = this.max_width + "px";
				this.div_content.style.whiteSpace = "normal";
			}

			if (
				typeof opposite_direction != "undefined" &&
				opposite_direction == null &&
				typeof border_elm != "undefined" &&
				border_elm != null
			) {
				var fence = document.getElementById(border_elm);
				opposite_direction = true;
				var fenceWidth = parseFloat(getComputedStyle(fence, null).width.replace("px", ""));
				if (x + div_width > fenceWidth) {
					opposite_direction = false;
				}
			} else {
				var windowWidth = parseFloat(getComputedStyle(window.document.body, null).width.replace("px", ""));
				opposite_direction = windowWidth / 2 - x > 0;
			}

			if (opposite_direction == true) {
				this.div.classList.add("revert");
			}

			this.div.style.zIndex = this.getZIndex();

			// indent
			var tooltip_indent_r = 11;
			var tooltip_indent_l = 11;
			var tooltip_indent_t = 10; // top

			var rect = elm.getBoundingClientRect();
			var win = elm.ownerDocument.defaultView;
			var elm_coords = {
				top: rect.top + win.pageYOffset,
				left: rect.left + win.pageXOffset,
			};
			var elm_width = parseFloat(getComputedStyle(elm, null).width.replace("px", ""));
			var elm_height = parseFloat(getComputedStyle(elm, null).height.replace("px", ""));
			if (isNaN(elm_width)) {
				elm_width = 10;
			}
			if (isNaN(elm_height)) {
				elm_height = 10;
			}

			var pos_top = elm_coords.top + tooltip_indent_t + elm_height;
			var elm_midpoint = elm_coords.left ? Math.floor(elm_width / 2) : Math.ceil(elm_width / 2);
			var pos_left1 = elm_coords.left + elm_midpoint - tooltip_indent_r;
			var pos_left2 = elm_coords.left - div_width + Math.ceil(elm_width / 2) + tooltip_indent_l;
			var pos_left;
			if (!opposite_direction && pos_left2 > 0) {
				pos_left = pos_left2;
			} else if (!opposite_direction && pos_left2 <= 0) {
				pos_left = 0;
				this.div.style.width = this.div.offsetWidth + pos_left2 - 10 + "px";
				this.div.classList.add("tooltip-wide");
			} else {
				pos_left = pos_left1;
				this.div.classList.add("revert-wide");
			}
			this.div.title = "";
			this.div.style.top = pos_top + "px";
			this.div.style.left = pos_left + "px";
		}
	};

	this.hide = function(elm) {
		if (!this.is_init || this.isDisabled) {
			return;
		}

		var title = this.div_content.innerHTML.replace(/<br( \/){0,1}>/gi, "\n");
		title = title.replace(/\<strong\>/gi, "[b]");
		title = title.replace(/\<\/strong\>/gi, "[/b]");

		if (title.length > 0) {
			if (typeof elm !== "undefined" && elm.title === "") {
				elm.title = title;
			}

			this.div.style.display = "none";
			this.div.style.width = "auto";
			this.div_content.innerHTML = "";
			this.div.classList.remove("revert");
			this.div.classList.remove("revert-wide");
			this.div.classList.remove("tooltip-wide");
		}
	};

	this.hide_all = function() {
		if (!this.is_init || this.isDisabled) {
			return;
		}

		this.div.style.display = "none";
		this.div.style.width = "auto";
		this.div.classList.remove("revert");
		this.div.classList.remove("revert-wide");
		this.div.classList.remove("tooltip-wide");
	};

	this.set_max_width = function(width) {
		this.max_width = width - 0;
	};

	/**
	 * Returns element as tooltip wrapper.
	 * @return {Object}
	 */
	this.getTooltipWrapper = function() {
		return this.div_id ? document.getElementById(this.div_id) : document.getElementsByTagName("body")[0];
	};

	/**
	 * Creates tooltip element. If wrapper element could not be created
	 * returns false otherwise true.
	 * @return {Boolean}
	 */
	this.createTooltipElement = function() {
		this.div = document.getElementById(this.container_id);

		// use existing tooltip element in DOM
		if (this.div !== null) {
			this.div_content = this.div.getElementsByTagName("span")[0];
			return true;
		}

		// tooltip wrapper
		var wrapper = this.getTooltipWrapper();
		if (!wrapper) {
			return false;
		}

		// create new tooltip element
		this.div = document.createElement("div");
		this.div.id = this.container_id;
		this.div.className = "tooltip";

		this.div_content = document.createElement("span");
		this.div.appendChild(this.div_content);

		var div_lt = document.createElement("div");
		div_lt.id = this.container_id + "-lt";
		div_lt.className = "tooltip-lt";
		this.div.appendChild(div_lt);

		var div_rt = document.createElement("div");
		div_rt.id = this.container_id + "-rt";
		div_rt.className = "tooltip-rt";
		this.div.appendChild(div_rt);

		var div_lb = document.createElement("div");
		div_lb.id = this.container_id + "-lb";
		div_lb.className = "tooltip-lb";
		this.div.appendChild(div_lb);

		var div_cb = document.createElement("div");
		div_cb.id = this.container_id + "-cb";
		div_cb.className = "tooltip-cb";

		this.div.appendChild(div_cb);

		var div_rb = document.createElement("div");
		div_rb.id = this.container_id + "-rb";
		div_rb.className = "tooltip-rb";
		this.div.appendChild(div_rb);

		var div_ct = document.createElement("div");
		div_ct.id = this.container_id + "-ct";
		div_ct.className = "tooltip-ct";

		this.div.appendChild(div_ct);

		wrapper.appendChild(this.div);
		return true;
	};

	this.setZIndex = function(value) {
		this.currentZIndex = value;
	};

	this.getZIndex = function() {
		return this.currentZIndex;
	};

	this.getDefaultZIndex = function() {
		return this.defaultZIndex;
	};

	this.revertZIndex = function() {
		this.setZIndex(this.getDefaultZIndex());
	};

	this.setTimeoutId = function(timeoutId) {
		this.timeoutId = timeoutId;
	};

	this.init();
}


window.Criteo = window.Criteo || {}; window.Criteo.events = window.Criteo.events || [];
function callAdblock(zoneId, passbackHTML, addCallback)
{
    var containerId = 'crt-' + zoneId;
    if (document.getElementById(containerId) && typeof addCallback == 'function') {
        addCallback(
            ((containerId) => {
                return function () {
                    var crtElement = document.getElementById(containerId);
                    crtElement.style.display = 'block';
                    if (crtElement.parentElement) {
                        var projectId =
                            typeof cjs != 'undefined'
                                ? cjs.Api.config.get('app', 'project', 'id')
                                : (
                                    typeof environment != 'undefined'
                                        ? environment['project_id']
                                        : 0
                                );
                        crtElement.parentElement.style.display = projectId == 8 ? 'flex' : 'block';
                    }

                    Criteo.events.push(function () {
                        Criteo.DisplayAcceptableAdIfAdblocked({
                            'zoneid': zoneId,
                            'containerid': containerId,
                            'overrideZoneFloor': false,
                            'callIfNotAdblocked': function () {
                                if (document.getElementById(containerId).parentElement) {
                                    document.getElementById(containerId).parentElement.style.display = 'none';
                                }
                            }
                        });
                    });

                    window.addEventListener("message", function (e) {
                        if (e.data && e.data == zoneId) {
                            if (passbackHTML) {
                                document.getElementById(containerId).innerHTML = passbackHTML;
                            } else {
                                document.getElementById(containerId).style.display = 'none';
                                if (document.getElementById(containerId).parentElement) {
                                    document.getElementById(containerId).parentElement.style.display = 'none';
                                }
                            }
                        }
                    }, false);
                }
            })(containerId)
        );
    }
}
window.callAdblock = window.callAdblock || callAdblock;

// global variables {{{
    // config variables
var cjs = {
        ...cjs,
        'classes':{},
        'constants':
        {
            'sportOddsTypeList': {"1":"1x2","2":"12","3":"12","4":"1x2","5":"12","6":"12","7":"1x2","8":"1x2","9":"1x2","10":"1x2","11":"1x2","12":"12","18":"12","19":"1x2","13":"12","14":"12","15":"12","16":"1x2","17":"12","21":"12","22":"1x2","24":"1x2","25":"12","26":"1x2","28":"12","29":"12","30":"1x2","23":"12","31":"12","32":"12","33":"12","34":"12","35":"12","36":"12","37":"12","38":"12","39":"12","40":"12","41":"12","42":"1x2"}        },
        'noDuelSports': [23,31,32,33,34,35,37,38,39,40,41],
        'parentSports': {"32":31,"33":31,"38":37,"39":37,"40":37,"41":37},
        'childSportsCount': 38,
        'categorySports': [2,16,17,21,25,28,23,31,32,33,34,36,37,38,39,40,41],
        eventId: null,
        fromGlobalScope: {},
        'portable': {},
        initialsFeeds: [],
    };

    cjs.Api.constantsManager.init({
        sport: {"TRANS_MENU_KEY":"trans_menu","DETAIL_TYPE":"detail","DETAIL_TYPE_OLD":"detail-old","DETAIL_TYPE_VERTICAL":"vertical","DETAIL_TYPE_HORIZONTAL":"horizontal","HAS_SPECIAL_INCIDENTS":"has-special-incidents","CATEGORY_SPORT":"category-sport","IRREPRESSIBLE_CATEGORY":"irrepressible-category","COUNTRY_WITHIN_PLAYER_NAME":"country-within-player-name","H2H_HOME_AWAY_SPORT":"is_home_away_sport","SOUNDS":"sounds","SOUND_FINISHED":"finished","SOUND_CORRECTION":"correction","SOUND_SCORE_INCREMENTED":"score-incremented","SOUND_TENNIS_GAME":"tennis-game","NO_DUEL":"no_duel","PARENT":"parent","SORT_PRIORITY":"sort_priority","SHOW_BREADCRUMB_NAVIGATION_LINK":"show-breadcrumb-navigation-link","PAGE":"page","PAGE_CATEGORY":"page_category","MYFS":-2,"MIXED":-1,"SOCCER":1,"TENNIS":2,"BASKETBALL":3,"HOCKEY":4,"AMERICAN_FOOTBALL":5,"BASEBALL":6,"HANDBALL":7,"RUGBY_UNION":8,"FLOORBALL":9,"BANDY":10,"FUTSAL":11,"VOLLEYBALL":12,"CRICKET":13,"DARTS":14,"SNOOKER":15,"BOXING":16,"BEACH_VOLLEYBALL":17,"AUSSIE_RULES":18,"RUGBY_LEAGUE":19,"BADMINTON":21,"WATER_POLO":22,"GOLF":23,"FIELD_HOCKEY":24,"TABLE_TENNIS":25,"BEACH_SOCCER":26,"MMA":28,"NETBALL":29,"PESAPALLO":30,"MOTORSPORT":31,"MOTORSPORT_AUTO_RACING":32,"MOTORSPORT_MOTO_RACING":33,"CYCLING":34,"HORSE_RACING":35,"ESPORTS":36,"WINTER_SPORTS":37,"WINTER_SPORTS_SKI_JUMPING":38,"WINTER_SPORTS_ALPINE_SKIING":39,"WINTER_SPORTS_CROSS_COUNTRY":40,"WINTER_SPORTS_BIATHLON":41,"KABADDI":42,"ALL_SPORTS":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,21,22,23,24,25,26,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42]},
        soundSportConfig: {"soccer":{"finished":"commonEndOfGame","correction":"commonCorrection","score-incremented":"commonCheers"},"tennis":{"finished":"tennisGameSetMatch","correction":"commonCorrection","score-incremented":"tennisGameSet","tennis-game":"tennisGame"},"basketball":{"finished":"commonEndOfGame","correction":"commonCorrection"},"hockey":{"finished":"commonEndOfGame","correction":"commonCorrection","score-incremented":"commonCheers"},"american-football":{"finished":"commonEndOfGame","correction":"commonCorrection","score-incremented":"commonCheers"},"baseball":{"finished":"commonEndOfGame","correction":"commonCorrection"},"handball":{"finished":"commonEndOfGame","correction":"commonCorrection"},"rugby-union":{"finished":"commonEndOfGame","correction":"commonCorrection","score-incremented":"commonCheers"},"floorball":{"finished":"commonEndOfGame","correction":"commonCorrection","score-incremented":"commonCheers"},"bandy":{"finished":"commonEndOfGame","correction":"commonCorrection","score-incremented":"commonCheers"},"futsal":{"finished":"commonEndOfGame","correction":"commonCorrection","score-incremented":"commonCheers"},"volleyball":{"correction":"commonCorrection","score-incremented":"commonCheers"},"aussie-rules":{"finished":"commonEndOfGame","correction":"commonCorrection"},"rugby-league":{"finished":"commonEndOfGame","correction":"commonCorrection","score-incremented":"commonCheers"},"cricket":{"finished":"commonEndOfGame","correction":"commonCorrection"},"darts":{"finished":"commonEndOfGame","correction":"commonCorrection"},"snooker":{"finished":"commonEndOfGame","correction":"commonCorrection"},"boxing":{"finished":"commonEndOfGame","correction":"commonCorrection"},"beach-volleyball":{"finished":"commonEndOfGame","correction":"commonCorrection"},"badminton":{"correction":"commonCorrection"},"water-polo":{"finished":"commonEndOfGame","correction":"commonCorrection"},"field-hockey":{"finished":"commonEndOfGame","correction":"commonCorrection"},"table-tennis":{"correction":"commonCorrection"},"beach-soccer":{"finished":"commonEndOfGame","correction":"commonCorrection"},"mma":{"finished":"commonEndOfGame","correction":"commonCorrection"},"netball":{"finished":"commonEndOfGame","correction":"commonCorrection"},"pesapallo":{"finished":"commonEndOfGame","correction":"commonCorrection"},"golf":{"finished":"commonEndOfGame"},"motorsport":[],"motorsport-auto-racing":[],"motorsport-moto-racing":[],"cycling":[],"horse-racing":[],"esports":{"finished":"commonEndOfGame","correction":"commonCorrection"},"winter-sports":[],"winter-sports-ski-jumping":[],"winter-sports-alpine-skiing":[],"winter-sports-cross-country":[],"winter-sports-biathlon":[],"kabaddi":{"finished":"commonEndOfGame","correction":"commonCorrection"}},
        sportOddsTypeList: {"1":"1x2","2":"12","3":"12","4":"1x2","5":"12","6":"12","7":"1x2","8":"1x2","9":"1x2","10":"1x2","11":"1x2","12":"12","18":"12","19":"1x2","13":"12","14":"12","15":"12","16":"1x2","17":"12","21":"12","22":"1x2","24":"1x2","25":"12","26":"1x2","28":"12","29":"12","30":"1x2","23":"12","31":"12","32":"12","33":"12","34":"12","35":"12","36":"12","37":"12","38":"12","39":"12","40":"12","41":"12","42":"1x2"},
    });

                    cjs.search = {
            'sortedSports': {"1":0,"2":1,"3":2,"4":3,"23":4,"6":5,"15":6,"5":7,"18":8,"21":9,"10":10,"26":11,"17":12,"16":13,"13":14,"34":15,"14":16,"36":17,"24":18,"9":19,"11":20,"7":21,"35":22,"42":23,"28":24,"31":25,"29":26,"30":27,"19":28,"8":29,"25":30,"12":31,"22":32,"37":33}        };

        cjs.superTemplateDefinition = {"5724":{"flag":"3473162","sport_id":"2","category_id":9011},"5725":{"flag":"3473164","sport_id":"2","category_id":9012},"5726":{"flag":"3473163","sport_id":"2","category_id":9021},"5727":{"flag":"3473165","sport_id":"2","category_id":9022},"5728":{"flag":"3473167","sport_id":"2","category_id":9030},"5729":{"flag":"3473162","sport_id":"2","category_id":9001},"5730":{"flag":"3473164","sport_id":"2","category_id":9010},"5731":{"flag":"3473163","sport_id":"2","category_id":9003},"5732":{"flag":"3473165","sport_id":"2","category_id":9013},"5733":{"flag":"3473162","sport_id":"2","category_id":9002},"5734":{"flag":"3473164","sport_id":"2","category_id":9006},"5735":{"flag":"3473163","sport_id":"2","category_id":9004},"5736":{"flag":"3473165","sport_id":"2","category_id":9007},"5737":{"flag":"3473162","sport_id":"2","category_id":9008},"5738":{"flag":"3473164","sport_id":"2","category_id":9009},"5739":{"flag":"3473163","sport_id":"2","category_id":9014},"5740":{"flag":"3473165","sport_id":"2","category_id":9015},"5741":{"flag":"3473163","sport_id":"2","category_id":9992},"5743":{"flag":"3473167","sport_id":"2","category_id":9994},"6393":{"flag":"3473165","sport_id":"2","category_id":9993},"7897":{"flag":"3473162","sport_id":"2","category_id":9016},"7898":{"flag":"3473163","sport_id":"2","category_id":9018},"7899":{"flag":"3473164","sport_id":"2","category_id":9017},"7900":{"flag":"3473165","sport_id":"2","category_id":9019},"8430":{"flag":"3473166","sport_id":"2","category_id":null},"10883":{"flag":"3473167","sport_id":"2","category_id":null},"5744":{"flag":"3473162","sport_id":"16","category_id":9050},"5745":{"flag":"3473164","sport_id":"16","category_id":null},"5746":{"flag":"3473162","sport_id":"16","category_id":9052},"5747":{"flag":"3473164","sport_id":"16","category_id":null},"5748":{"flag":"3473162","sport_id":"16","category_id":9054},"5749":{"flag":"3473164","sport_id":"16","category_id":9055},"5750":{"flag":"3473162","sport_id":"16","category_id":9056},"5751":{"flag":"3473164","sport_id":"16","category_id":9057},"5752":{"flag":"3473162","sport_id":"16","category_id":9058},"5753":{"flag":"3473164","sport_id":"16","category_id":9059},"5754":{"flag":"3473162","sport_id":"16","category_id":9060},"5755":{"flag":"3473164","sport_id":"16","category_id":9061},"5756":{"flag":"3473162","sport_id":"16","category_id":9062},"5757":{"flag":"3473164","sport_id":"16","category_id":9063},"5758":{"flag":"3473162","sport_id":"16","category_id":9064},"5759":{"flag":"3473164","sport_id":"16","category_id":9065},"5760":{"flag":"3473162","sport_id":"16","category_id":9066},"5761":{"flag":"3473164","sport_id":"16","category_id":9067},"5762":{"flag":"3473162","sport_id":"16","category_id":9068},"5763":{"flag":"3473164","sport_id":"16","category_id":9069},"5764":{"flag":"3473162","sport_id":"16","category_id":9070},"5765":{"flag":"3473164","sport_id":"16","category_id":9071},"5766":{"flag":"3473162","sport_id":"16","category_id":9072},"5767":{"flag":"3473164","sport_id":"16","category_id":9073},"5768":{"flag":"3473162","sport_id":"16","category_id":9074},"5769":{"flag":"3473164","sport_id":"16","category_id":9075},"5770":{"flag":"3473162","sport_id":"16","category_id":9076},"5771":{"flag":"3473164","sport_id":"16","category_id":9077},"5772":{"flag":"3473162","sport_id":"16","category_id":9078},"5773":{"flag":"3473164","sport_id":"16","category_id":9079},"5774":{"flag":"3473162","sport_id":"16","category_id":9080},"5775":{"flag":"3473164","sport_id":"16","category_id":9081},"5776":{"flag":"3473162","sport_id":"16","category_id":9082},"5777":{"flag":"3473164","sport_id":"16","category_id":9083},"5778":{"flag":"3473162","sport_id":"16","category_id":9084},"5779":{"flag":"3473164","sport_id":"16","category_id":9085},"5780":{"flag":"3473162","sport_id":"16","category_id":9086},"5781":{"flag":"3473164","sport_id":"16","category_id":9089},"5782":{"flag":"3473162","sport_id":"16","category_id":9088},"5783":{"flag":"3473164","sport_id":"16","category_id":9087},"5784":{"flag":"3473162","sport_id":"16","category_id":9090},"5785":{"flag":"3473164","sport_id":"16","category_id":9091},"14529":{"flag":"3473162","sport_id":"16","category_id":null},"5788":{"flag":"3473163","sport_id":"17","category_id":8050},"5789":{"flag":"3473165","sport_id":"17","category_id":8051},"5790":{"flag":"3473163","sport_id":"17","category_id":8052},"5791":{"flag":"3473165","sport_id":"17","category_id":8053},"5792":{"flag":"3473163","sport_id":"17","category_id":8054},"5793":{"flag":"3473165","sport_id":"17","category_id":8055},"5794":{"flag":"3473163","sport_id":"17","category_id":8056},"5795":{"flag":"3473165","sport_id":"17","category_id":8057},"5796":{"flag":"3473163","sport_id":"17","category_id":8058},"5797":{"flag":"3473165","sport_id":"17","category_id":8059},"5798":{"flag":"3473163","sport_id":"17","category_id":8060},"5799":{"flag":"3473165","sport_id":"17","category_id":8061},"5800":{"flag":"3473163","sport_id":"17","category_id":8062},"5801":{"flag":"3473165","sport_id":"17","category_id":8063},"5802":{"flag":"3473163","sport_id":"17","category_id":8066},"5803":{"flag":"3473165","sport_id":"17","category_id":8067},"5804":{"flag":"3473163","sport_id":"17","category_id":8064},"5805":{"flag":"3473165","sport_id":"17","category_id":8065},"7103":{"flag":"3473163","sport_id":"17","category_id":8068},"7104":{"flag":"3473165","sport_id":"17","category_id":8069},"8991":{"flag":"3473163","sport_id":"17","category_id":null},"8992":{"flag":"3473163","sport_id":"17","category_id":null},"8993":{"flag":"3473163","sport_id":"17","category_id":null},"8994":{"flag":"3473163","sport_id":"17","category_id":null},"8996":{"flag":"3473163","sport_id":"17","category_id":null},"8997":{"flag":"3473165","sport_id":"17","category_id":null},"8998":{"flag":"3473165","sport_id":"17","category_id":null},"8999":{"flag":"3473165","sport_id":"17","category_id":null},"9000":{"flag":"3473165","sport_id":"17","category_id":null},"9001":{"flag":"3473165","sport_id":"17","category_id":null},"9358":{"flag":"3473163","sport_id":"17","category_id":null},"9359":{"flag":"3473165","sport_id":"17","category_id":null},"16823":{"flag":"3473163","sport_id":"17","category_id":null},"16824":{"flag":"3473163","sport_id":"17","category_id":null},"16825":{"flag":"3473165","sport_id":"17","category_id":null},"16826":{"flag":"3473163","sport_id":"17","category_id":null},"16827":{"flag":"3473165","sport_id":"17","category_id":null},"16828":{"flag":"3473165","sport_id":"17","category_id":null},"5806":{"flag":"3473162","sport_id":"21","category_id":8001},"5807":{"flag":"3473164","sport_id":"21","category_id":8002},"5808":{"flag":"3473163","sport_id":"21","category_id":8003},"5809":{"flag":"3473165","sport_id":"21","category_id":8004},"5810":{"flag":"3473167","sport_id":"21","category_id":8005},"5811":{"flag":"3473162","sport_id":"21","category_id":8006},"5812":{"flag":"3473164","sport_id":"21","category_id":8007},"5813":{"flag":"3473163","sport_id":"21","category_id":8008},"5814":{"flag":"3473165","sport_id":"21","category_id":8009},"5815":{"flag":"3473167","sport_id":"21","category_id":8010},"5816":{"flag":"3473162","sport_id":"21","category_id":8011},"5817":{"flag":"3473164","sport_id":"21","category_id":8012},"5818":{"flag":"3473163","sport_id":"21","category_id":8013},"5819":{"flag":"3473165","sport_id":"21","category_id":8014},"5820":{"flag":"3473167","sport_id":"21","category_id":8015},"5821":{"flag":"3473163","sport_id":"21","category_id":9992},"5823":{"flag":"3473167","sport_id":"21","category_id":9994},"5824":{"flag":"3473162","sport_id":"21","category_id":9995},"5826":{"flag":"3473163","sport_id":"21","category_id":9997},"5828":{"flag":"3473167","sport_id":"21","category_id":9999},"5951":{"flag":"3473165","sport_id":"21","category_id":9993},"5954":{"flag":"3473164","sport_id":"21","category_id":9996},"5956":{"flag":"3473165","sport_id":"21","category_id":9998},"9960":{"flag":"3473162","sport_id":"21","category_id":null},"9961":{"flag":"3473164","sport_id":"21","category_id":null},"9962":{"flag":"3473163","sport_id":"21","category_id":null},"9963":{"flag":"3473165","sport_id":"21","category_id":null},"9964":{"flag":"3473167","sport_id":"21","category_id":null},"5829":{"flag":"3473162","sport_id":"25","category_id":8100},"5830":{"flag":"3473164","sport_id":"25","category_id":8101},"5831":{"flag":"3473163","sport_id":"25","category_id":8102},"5832":{"flag":"3473165","sport_id":"25","category_id":8103},"5833":{"flag":"3473167","sport_id":"25","category_id":8104},"5834":{"flag":"3473163","sport_id":"25","category_id":9992},"5836":{"flag":"3473167","sport_id":"25","category_id":9994},"5837":{"flag":"3473162","sport_id":"25","category_id":9995},"5839":{"flag":"3473163","sport_id":"25","category_id":9997},"5841":{"flag":"3473167","sport_id":"25","category_id":9999},"6376":{"flag":"3473165","sport_id":"25","category_id":9993},"6379":{"flag":"3473164","sport_id":"25","category_id":9996},"6381":{"flag":"3473165","sport_id":"25","category_id":9998},"5842":{"flag":"3473162","sport_id":"28","category_id":9054},"5843":{"flag":"3473162","sport_id":"28","category_id":9058},"5844":{"flag":"3473162","sport_id":"28","category_id":9062},"5845":{"flag":"3473162","sport_id":"28","category_id":9066},"5846":{"flag":"3473162","sport_id":"28","category_id":9072},"5847":{"flag":"3473162","sport_id":"28","category_id":9078},"5848":{"flag":"3473162","sport_id":"28","category_id":9090},"5849":{"flag":"3473162","sport_id":"28","category_id":9084},"5850":{"flag":"3473162","sport_id":"28","category_id":9086},"8011":{"flag":"3473164","sport_id":"28","category_id":9059},"8012":{"flag":"3473164","sport_id":"28","category_id":9092},"8108":{"flag":"3473164","sport_id":"28","category_id":null},"8110":{"flag":"3473164","sport_id":"28","category_id":null},"8122":{"flag":"3473164","sport_id":"28","category_id":null},"9525":{"flag":"3473162","sport_id":"28","category_id":null},"9526":{"flag":"3473164","sport_id":"28","category_id":null},"13710":{"flag":"3473164","sport_id":"28","category_id":null},"17958":{"flag":"3473164","sport_id":"28","category_id":null},"5852":{"flag":"3473162","sport_id":"23","category_id":8150},"5853":{"flag":"3473162","sport_id":"23","category_id":8151},"5854":{"flag":"3473164","sport_id":"23","category_id":8161},"5855":{"flag":"3473162","sport_id":"23","category_id":8153},"5856":{"flag":"3473162","sport_id":"23","category_id":8154},"5857":{"flag":"3473162","sport_id":"23","category_id":8156},"5858":{"flag":"3473162","sport_id":"23","category_id":8157},"5859":{"flag":"3473162","sport_id":"23","category_id":8158},"6157":{"flag":"3473162","sport_id":"23","category_id":null},"7059":{"flag":"3473162","sport_id":"23","category_id":null},"7326":{"flag":"3473162","sport_id":"23","category_id":8159},"7693":{"flag":"3473164","sport_id":"23","category_id":8152},"8424":{"flag":"3473166","sport_id":"23","category_id":null},"12497":{"flag":"3473164","sport_id":"23","category_id":null},"16919":{"flag":"3473162","sport_id":"23","category_id":null},"17844":{"flag":"3473162","sport_id":"23","category_id":null},"5860":{"flag":null,"sport_id":"32","category_id":7100},"6575":{"flag":null,"sport_id":"32","category_id":7102},"6576":{"flag":null,"sport_id":"32","category_id":7204},"6577":{"flag":null,"sport_id":"32","category_id":7101},"6653":{"flag":null,"sport_id":"32","category_id":7103},"6654":{"flag":null,"sport_id":"32","category_id":7104},"7771":{"flag":null,"sport_id":"32","category_id":7207},"7977":{"flag":null,"sport_id":"32","category_id":7209},"7978":{"flag":null,"sport_id":"32","category_id":7210},"7979":{"flag":null,"sport_id":"32","category_id":7211},"7980":{"flag":null,"sport_id":"32","category_id":7212},"7981":{"flag":null,"sport_id":"32","category_id":7213},"8390":{"flag":null,"sport_id":"32","category_id":null},"9047":{"flag":null,"sport_id":"32","category_id":null},"12207":{"flag":null,"sport_id":"32","category_id":null},"12917":{"flag":null,"sport_id":"32","category_id":null},"5861":{"flag":null,"sport_id":"33","category_id":7200},"6495":{"flag":null,"sport_id":"33","category_id":7201},"6496":{"flag":null,"sport_id":"33","category_id":7202},"6578":{"flag":null,"sport_id":"33","category_id":7203},"7862":{"flag":null,"sport_id":"33","category_id":7208},"9574":{"flag":null,"sport_id":"33","category_id":null},"10998":{"flag":null,"sport_id":"33","category_id":null},"7205":{"flag":null,"sport_id":"34","category_id":7300},"7206":{"flag":null,"sport_id":"34","category_id":7301},"7310":{"flag":7400,"sport_id":"36","category_id":7400},"7311":{"flag":7401,"sport_id":"36","category_id":7401},"7360":{"flag":7402,"sport_id":"36","category_id":7402},"7361":{"flag":7403,"sport_id":"36","category_id":7403},"7362":{"flag":7404,"sport_id":"36","category_id":7404},"9027":{"flag":"7613333","sport_id":"36","category_id":null},"9028":{"flag":"7613334","sport_id":"36","category_id":null},"12390":{"flag":"15836321","sport_id":"36","category_id":null},"12438":{"flag":"15836322","sport_id":"36","category_id":null},"12534":{"flag":"15836323","sport_id":"36","category_id":null},"12535":{"flag":"15836324","sport_id":"36","category_id":null},"12608":{"flag":"15932604","sport_id":"36","category_id":null},"12649":{"flag":"16296163","sport_id":"36","category_id":null},"8401":{"flag":"3473162","sport_id":"39","category_id":null},"8402":{"flag":"3473164","sport_id":"39","category_id":null},"8403":{"flag":"3473162","sport_id":"39","category_id":null},"8404":{"flag":"3473164","sport_id":"39","category_id":null},"8405":{"flag":"3473162","sport_id":"39","category_id":null},"8406":{"flag":"3473164","sport_id":"39","category_id":null},"8407":{"flag":"3473162","sport_id":"39","category_id":null},"8408":{"flag":"3473164","sport_id":"39","category_id":null},"8409":{"flag":"3473162","sport_id":"39","category_id":null},"8410":{"flag":"3473164","sport_id":"39","category_id":null},"8645":{"flag":"3473162","sport_id":"39","category_id":null},"8653":{"flag":"3473164","sport_id":"39","category_id":null},"8962":{"flag":"3473162","sport_id":"39","category_id":null},"9060":{"flag":"3473164","sport_id":"39","category_id":null},"9083":{"flag":"3473167","sport_id":"39","category_id":null},"8416":{"flag":"3473162","sport_id":"38","category_id":null},"8417":{"flag":"3473164","sport_id":"38","category_id":null},"8418":{"flag":"3473162","sport_id":"38","category_id":null},"8419":{"flag":"3473164","sport_id":"38","category_id":null},"8420":{"flag":"3473162","sport_id":"38","category_id":null},"8491":{"flag":"3473163","sport_id":"38","category_id":null},"8544":{"flag":"3473163","sport_id":"38","category_id":null},"8646":{"flag":"3473162","sport_id":"38","category_id":null},"8648":{"flag":"3473164","sport_id":"38","category_id":null},"13911":{"flag":"3473167","sport_id":"38","category_id":null},"14157":{"flag":"3473162","sport_id":"38","category_id":null},"19685":{"flag":"3473163","sport_id":"38","category_id":null},"8446":{"flag":"3473162","sport_id":"41","category_id":null},"8447":{"flag":"3473164","sport_id":"41","category_id":null},"8448":{"flag":"3473162","sport_id":"41","category_id":null},"8449":{"flag":"3473164","sport_id":"41","category_id":null},"8450":{"flag":"3473162","sport_id":"41","category_id":null},"8451":{"flag":"3473164","sport_id":"41","category_id":null},"8452":{"flag":"3473162","sport_id":"41","category_id":null},"8453":{"flag":"3473164","sport_id":"41","category_id":null},"8454":{"flag":"3473163","sport_id":"41","category_id":null},"8455":{"flag":"3473165","sport_id":"41","category_id":null},"8456":{"flag":"3473167","sport_id":"41","category_id":null},"8457":{"flag":"3473166","sport_id":"41","category_id":null},"8641":{"flag":"3473162","sport_id":"41","category_id":null},"8642":{"flag":"3473164","sport_id":"41","category_id":null},"8460":{"flag":"3473162","sport_id":"40","category_id":null},"8461":{"flag":"3473164","sport_id":"40","category_id":null},"8462":{"flag":"3473162","sport_id":"40","category_id":null},"8463":{"flag":"3473164","sport_id":"40","category_id":null},"8464":{"flag":"3473162","sport_id":"40","category_id":null},"8465":{"flag":"3473164","sport_id":"40","category_id":null},"8466":{"flag":"3473162","sport_id":"40","category_id":null},"8467":{"flag":"3473164","sport_id":"40","category_id":null},"8468":{"flag":"3473162","sport_id":"40","category_id":null},"8469":{"flag":"3473164","sport_id":"40","category_id":null},"8472":{"flag":"3473163","sport_id":"40","category_id":null},"8473":{"flag":"3473165","sport_id":"40","category_id":null},"8474":{"flag":"3473163","sport_id":"40","category_id":null},"8475":{"flag":"3473165","sport_id":"40","category_id":null},"8527":{"flag":"3473162","sport_id":"40","category_id":null},"8528":{"flag":"3473164","sport_id":"40","category_id":null},"8529":{"flag":"3473162","sport_id":"40","category_id":null},"8530":{"flag":"3473164","sport_id":"40","category_id":null},"8531":{"flag":"3473162","sport_id":"40","category_id":null},"8532":{"flag":"3473164","sport_id":"40","category_id":null},"8535":{"flag":"3473162","sport_id":"40","category_id":null},"8536":{"flag":"3473164","sport_id":"40","category_id":null},"8537":{"flag":"3473163","sport_id":"40","category_id":null},"8538":{"flag":"3473165","sport_id":"40","category_id":null},"8643":{"flag":"3473162","sport_id":"40","category_id":null},"8652":{"flag":"3473164","sport_id":"40","category_id":null},"11627":{"flag":"3473167","sport_id":"40","category_id":null},"17024":{"flag":"3473167","sport_id":"40","category_id":null},"8827":{"flag":"3473162","sport_id":"15","category_id":null},"8841":{"flag":null,"sport_id":"14","category_id":null}};
    document.lsadvert_display = document.lsadvert_display || function() {};
    document.displayTrustedAdvert = document.displayTrustedAdvert || function() {};
    cjs.full_loaded = false;
    cjs.repair_loaded = false;
    cjs.hourFormat = 'H:i';
    cjs.dateTimeFormat = 'd.m. H:i';
    cjs.fullDateTimeFormat = 'd.m.Y H:i';
    cjs.fullDateFormat = 'd.m.Y';
    cjs.fullDateShortFormat = 'd.m.Y';
    cjs.dateFormat = 'd.m.';
    cjs.geoIP = null;
    cjs.geoIPCityName = null;
    cjs.geoIPSubdivisionName0 = null;
    cjs.geoIPSubdivisionCode0 = null;
    cjs.geoIPIsoSubdivisionCode0 = null;
    cjs.geoIPSubdivisionName1 = null;
    cjs.prepareGeoIP = function()
    {
        if (this.geoIP)
        {
            return;
        }
        cjs.Api.loader.get("geoIpResolver").call();
    };
    var feed_sign = 'SW9D1eZo';
    // data containers
    var fs_counter;
    var fsEventsUpdatedStartTime = {};
cjs._config = {"css_serial":"1665000000","js_serial":"2143000000","js":{"time_keep_match_live":180},"app":{"lang":{"charset":"en_US","web":"en","dc":1,"meta_content":"en"},"lang_combo":{"js_redirect":false,"project_list":{"--":2,"pl":800,"hu":801,"ru":802,"de":803,"el":804,"tr":805,"fr":806}},"layout":"standard","noduel_events":{"mygames":10,"main":{"default":40,"golf":30,"motorsport-auto-racing":40,"motorsport-moto-racing":40,"cycling":10,"winter-sports-ski-jumping":10,"winter-sports-alpine-skiing":10,"winter-sports-cross-country":10,"winter-sports-biathlon":10},"tournament_page":{"winter-sports-ski-jumping":1000,"winter-sports-alpine-skiing":1000,"winter-sports-cross-country":1000,"winter-sports-biathlon":1000},"participant_page":{"meetings":{"winter-sports-ski-jumping":5,"winter-sports-alpine-skiing":5,"winter-sports-cross-country":5,"winter-sports-biathlon":5},"events":{"motorsport-auto-racing":10,"motorsport-moto-racing":10,"cycling":10}},"categories":{"6576":10,"7771":10}},"mygames":{"enable":true,"position":"left","groups":{"enable":false},"past_days":1,"future_days":7,"maximum_count":500},"calendar_range":7,"google_analytics":{"enable":true},"video_highlights_live_icon":{"enable":true},"US_time_format":false,"US_style_win_loss_mark":false,"project_type":{"id":1,"name":"_fs","us_web":false},"popup":false,"js_redirect":false,"myteams":{"enable":true,"maximum_count":100},"has_category_page":[2,21,23,31,32,33,36],"banner":{"zone_list":{"background":{"id":1050,"width_max":3000,"height_max":2000,"dynamic_background":true,"element_notice_selector":".footer__advertBackground"},"background_tennis":{"id":1620,"width_max":3000,"height_max":2000,"dynamic_background":true,"element_notice_selector":".footer__advertBackground","condition":{"height":1,"zones":["background"]}},"left_menu_1":{"id":72,"width_max":140,"height_max":400},"left_menu_1_soccer":{"id":2965,"width_max":140,"height_max":400,"condition":{"height":1,"zones":["left_menu_1"]}},"left_menu_1_basketball":{"id":453,"width_max":140,"height_max":400,"condition":{"height":1,"zones":["left_menu_1"]}},"left_menu_1_handball":{"id":455,"width_max":140,"height_max":400,"condition":{"height":1,"zones":["left_menu_1"]}},"left_menu_1_hockey":{"id":454,"width_max":140,"height_max":400,"condition":{"height":1,"zones":["left_menu_1"]}},"left_menu_1_tennis":{"id":452,"width_max":140,"height_max":400,"condition":{"height":1,"zones":["left_menu_1"]}},"left_menu_1_horse-racing":{"id":2467,"width_max":140,"height_max":400,"condition":{"height":1,"zones":["left_menu_1"]}},"left_menu_2":{"id":73,"width_max":140,"height_max":400},"left_menu_3":{"id":74,"width_max":140,"height_max":400},"right_top":{"id":213,"width_max":160,"height_max":141},"right_zone_1":{"id":70,"width_max":200,"height_max":1000},"right_zone_2":{"id":396,"width_max":200,"height_max":1000},"right_zone_2_tennis":{"id":773,"width_max":200,"height_max":1000,"condition":{"height":1,"zones":["right_zone_2"]}},"right_zone_2_hockey":{"id":774,"width_max":200,"height_max":1000,"condition":{"height":1,"zones":["right_zone_2"]}},"right_zone_2_basketball":{"id":775,"width_max":200,"height_max":1000,"condition":{"height":1,"zones":["right_zone_2"]}},"right_zone_2_horse-racing":{"id":2468,"width_max":200,"height_max":1000,"condition":{"height":1,"zones":["right_zone_2"]}},"right_zone_3":{"id":397,"width_max":200,"height_max":1000},"right_criteo":{"id":3132,"width_max":200,"height_max":1000},"top":{"id":68,"width_max":1000,"height_max":300,"vertical":true},"top_basketball":{"id":663,"width_max":1000,"height_max":300,"vertical":true,"condition":{"height":1,"zones":["top"]}},"top_handball":{"id":664,"width_max":1000,"height_max":300,"vertical":true,"condition":{"height":1,"zones":["top"]}},"top_hockey":{"id":662,"width_max":1000,"height_max":300,"vertical":true,"condition":{"height":1,"zones":["top"]}},"top_tennis":{"id":661,"width_max":1000,"height_max":300,"vertical":true,"condition":{"height":1,"zones":["top"]}},"top_volleyball":{"id":665,"width_max":1000,"height_max":300,"vertical":true,"condition":{"height":1,"zones":["top"]}},"top_horse-racing":{"id":2469,"width_max":1000,"height_max":300,"vertical":true,"condition":{"height":1,"zones":["top"]}},"content_top":{"id":2568,"width_max":970,"height_max":150,"vertical":true},"content_bottom":{"id":256,"width_max":660,"height_max":400,"condition":{"breakpoint":[1,9999]}},"content_bottom_tennis":{"id":456,"width_max":660,"height_max":400,"condition":{"breakpoint":[1,9999],"height":1,"zones":["content_bottom"]}},"content_bottom_basketball":{"id":457,"width_max":660,"height_max":400,"condition":{"breakpoint":[1,9999],"height":1,"zones":["content_bottom"]}},"content_bottom_hockey":{"id":458,"width_max":660,"height_max":400,"condition":{"breakpoint":[1,9999],"height":1,"zones":["content_bottom"]}},"content_bottom_handball":{"id":459,"width_max":660,"height_max":400,"condition":{"breakpoint":[1,9999],"height":1,"zones":["content_bottom"]}},"content_bottom_horse-racing":{"id":2470,"width_max":660,"height_max":400,"condition":{"breakpoint":[1,9999],"height":1,"zones":["content_bottom"]}},"content_bottom_criteo":{"id":3134,"width_max":660,"height_max":400,"condition":{"breakpoint":[1,9999]}},"detail":{"id":69,"width_max":550,"height_max":500,"condition":{"breakpoint":[1,9999],"client_type_only":["PC","mobile","tablet"]}},"detail_leaderboard":{"id":4970,"width_max":640,"height_max":100,"vertical":true,"condition":{"breakpoint":[640,9999],"client_type_only":["PC"]}},"detail_leaderboard_mobile":{"id":4968,"width_max":320,"height_max":50,"body_class":"mobile_ad","refresh":45,"condition":{"breakpoint":[320,639]}},"detail_leaderboard_tablet":{"id":4969,"width_max":640,"height_max":100,"vertical":true,"body_class":"tablet_ad","refresh":45,"condition":{"breakpoint":[640,9999],"client_type_only":["mobile","tablet"]}},"detail_tennis":{"id":1270,"width_max":550,"height_max":500,"condition":{"height":1,"zones":["detail"]}},"detail_basketball":{"id":1271,"width_max":550,"height_max":500,"condition":{"height":1,"zones":["detail"]}},"detail_hockey":{"id":1272,"width_max":550,"height_max":500,"condition":{"height":1,"zones":["detail"]}},"detail_criteo":{"id":3133,"width_max":550,"height_max":500,"condition":{"breakpoint":[1,9999],"client_type_only":["PC"]}},"standings_top":{"id":549,"width_max":500,"height_max":60},"responsive_standings_fixed_bottom_mobile":{"id":3478,"refresh":45,"width_max":320,"height_max":50,"body_class":"mobile_ad","condition":{"breakpoint":[320,727],"client_type_only":["mobile","tablet"]}},"responsive_standings_fixed_bottom_tablet":{"id":3479,"refresh":45,"width_max":728,"height_max":90,"body_class":"tablet_ad","condition":{"breakpoint":[728,999],"client_type_only":["mobile","tablet"]}},"responsive_fixed_bottom_mobile":{"id":3476,"refresh":45,"width_max":320,"height_max":50,"body_class":"mobile_ad","condition":{"breakpoint":[320,727]}},"responsive_detail_fixed_bottom_mobile":{"id":3478,"refresh":45,"width_max":320,"height_max":50,"body_class":"mobile_ad","condition":{"breakpoint":[320,727],"client_type_only":["mobile","tablet"]}},"responsive_fixed_bottom_tablet":{"id":3477,"refresh":45,"width_max":728,"height_max":90,"body_class":"tablet_ad","condition":{"breakpoint":[728,999]}},"responsive_detail_fixed_bottom_tablet":{"id":3479,"refresh":45,"width_max":728,"height_max":90,"body_class":"tablet_ad","condition":{"breakpoint":[728,999],"client_type_only":["mobile","tablet"]}},"premium_square_mobile":{"id":6109,"width_max":480,"height_max":480,"body_class":"mobile_ad","client_type_only":["mobile","tablet"],"condition":{"breakpoint":[300,639]}},"fsnews_right_zone_1":{"id":5633,"width_max":300,"height_max":600},"fsnews_right_zone_2":{"id":5634,"width_max":300,"height_max":600},"fsnews_right_zone_3":{"id":5635,"width_max":300,"height_max":600},"fsnews_content_bottom":{"id":5632,"width_max":970,"height_max":500,"condition":{"breakpoint":[1,9999]}},"fsnews_top":{"id":5636,"width_max":970,"height_max":250,"vertical":true},"fsnews_responsive_fixed_bottom_mobile":{"id":5639,"refresh":45,"width_max":320,"height_max":50,"body_class":"mobile_ad","condition":{"breakpoint":[320,727],"client_type_only":["mobile","tablet"]}},"fsnews_responsive_fixed_bottom_tablet":{"id":5641,"refresh":45,"width_max":728,"height_max":90,"body_class":"tablet_ad","condition":{"breakpoint":[728,999],"client_type_only":["mobile","tablet"]}},"fsnews_background":{"id":5637,"width_max":3000,"height_max":2000,"dynamic_background":true,"element_notice_selector":".footer__advertBackground"},"fsnews_content_bottom_detail":{"id":5627,"width_max":970,"height_max":500,"condition":{"breakpoint":[1,9999]}},"fsnews_responsive_fixed_bottom_mobile_detail":{"id":5638,"refresh":45,"width_max":320,"height_max":50,"body_class":"mobile_ad","condition":{"breakpoint":[320,727],"client_type_only":["mobile","tablet"]}},"fsnews_responsive_fixed_bottom_tablet_detail":{"id":5640,"refresh":45,"width_max":728,"height_max":90,"body_class":"tablet_ad","condition":{"breakpoint":[728,999],"client_type_only":["mobile","tablet"]}},"fsnews_top_detail":{"id":5631,"width_max":970,"height_max":250,"vertical":true},"fsnews_right_zone_1_detail":{"id":5628,"width_max":300,"height_max":600},"fsnews_right_zone_2_detail":{"id":5629,"width_max":300,"height_max":600},"fsnews_right_zone_3_detail":{"id":5630,"width_max":300,"height_max":600},"fsnews_article":{"id":6174,"width_max":720,"height_max":1280,"body_class":"mobile_ad","condition":{"breakpoint":[320,639],"client_type_only":["mobile","tablet"]}}},"show_advertisement_label":false},"project":{"id":2,"name":"Flashscore.com","default_geo_ip_country_code":"US","default_geo_ip_subdivision_code":false},"odds":{"layout":"default","format":"eu","format_list":["eu","uk","us","hk","ma","in"],"ah_override":false,"us_handicap":false,"enable":true,"iframe":true,"my_fs":false,"sport_page":false,"hide_tab":false,"odds_disabled_countries":["IT"],"betslip":false,"betslip_detail_window":false,"betslip_window_size":[],"bookmakers_sp_allowed":[16],"betting_light_version":false,"light_live_bet_icon":false,"hide_live_bet_icon":false,"odds_comparison_show_copyright":true,"probability_to_win":false},"redirector":{"types":{"event":1,"tournament_template":2,"participant":3,"player":4,"detail_page":5}},"fs_stats":{"enable":true,"url":{"mygames":"remote-stats.flashscore.com\/mg","adblocked":"","search_stats":"remote-stats.flashscore.com\/ss"}},"empty_logo_small_path":{"logo_team":"image\/empty-logo-team-small.png"},"game_notification_push":{"enable":true},"user_functions":{"server_domain":"lsid.eu","serverAPI":"http:\/\/lsid.edrive.intra:82\/","enable":true,"use_only_local":true,"namespace":"flashscore","facebook_app_id":"555890894461938","google_client_id":"33270257411-p5mm2q46djddp4dhiucmmmaeuv2k4u2i.apps.googleusercontent.com","apple_client_id":"com.flashscore.siwa","apple_redirect_uri":"https:\/\/www.lsid.eu:8443\/apple-proxy\/","server":"https:\/\/lsid.eu\/","facebook_client_access_token":"46e7e59532a6442d80ef6aff3708eca5"},"user_function":{"use_only_local":false},"registration":{"version":1,"no_remote":false,"sign_out_in_drop_down":true,"captcha_sitekey":"6LdnlAoTAAAAAIzaLLR8ezPKKnLeM2LozP6OQKj_","project_has_initial_tou":true},"european_union_states":{"codes":["BE","BG","CZ","DK","EE","FI","FR","HR","IE","IT","CY","LT","LV","LU","HU","MT","DE","NL","PL","PT","AT","RO","GR","SK","SI","GB","ES","SE"]},"url_prefix":"","project_moved":[],"sports_without_detail":[35],"tournament_pages":{"enable":true,"disabled_sports":[],"block_summary_match_limit":10,"data_part_match_limit":100},"new_mobile_page":{"enable":true},"box-over-content":{"scrolling-enable":true},"box_over_content":{"split":{"columns":3}},"detail_live_betting_strip":{"rotation_time":30000},"sports_with_participant_no_duel_page":[38,39,40,41,32,33,34],"match_comments":{"enable":true,"sports":[5,18,21,10,6,3,26,17,16,13,14,36,24,9,11,7,4,42,28,29,30,19,8,15,1,25,2,12,22]},"new_live_betting_icon":{"enable":true,"version":1},"live_streaming":{"disabled_bookmakers_by_geoip":[],"bookmakers_with_disabled_link":[]},"facelift":{"main_class":"flat"},"timezone":{"default":2},"icon_list":{"info":true,"shirt":true,"tv":true},"react":{"enabled":false,"sports":false},"responsive":{"breakpoint":800,"breakpoint_mobile":640},"tv_program":{"enable":true},"mixed_feed":{"link_to_more_games":false,"homepage_enabled":false},"team_transfers":{"sports":[1,4]},"team_news":{"enabled":true},"native_notifications":{"enabled":true,"lsnp":"https:\/\/lsnp.flashscore.com\/web-","firebase":{"apiKey":"AIzaSyAW9FbqeajkSTftCCbFlcbojPETqu1IThs","authDomain":"flashscore-web-notifications.firebaseapp.com","databaseURL":"https:\/\/flashscore-web-notifications.firebaseio.com","projectId":"flashscore-web-notifications","storageBucket":"flashscore-web-notifications.appspot.com","messagingSenderId":"258573697417","appId":"1:258573697417:web:d00c8d0c079ac7a2986158"}},"feed_sign":"SW9D1eZo","detail":{"window_size":{"width":688,"height":900}},"audio_comments":{"enabled":true,"authRequired":true,"tabEnabled":false},"tv":false,"apple_sign_in":{"enable":true},"recombee":{"enabled":false,"database_id":"livesport-eu-prod","public_token":"FEi4XEiLW3jsljzduaSyR10SOCxIMtgcBY06ssPMenRjEMFut9SeGnOmR7WtICKC","scenario":"1"},"advanced_tennis":{"enable":true,"point_by_point":true},"reversed_time":{"enable":false,"sports":{"3":{"stages":[22,23,24,25],"extra_time_stages":[6],"stage_time":10,"extra_time":5},"4":{"stages":[14,15,16],"extra_time_stages":[6],"stage_time":20,"extra_time":5},"5":{"stages":[22,23,24,25],"extra_time_stages":[6],"stage_time":15,"extra_time":15}}},"sports_with_player_profile":[1,4,3],"empty_logo_path":{"face_man":"image\/empty-face-man-share.gif","face_woman":"image\/empty-face-woman-share.gif","logo_team":"image\/empty-logo-team-share.gif"},"team_logo":{"enable":true,"detail":true,"standings":false,"h2h":true,"iframe":true},"lang_box":{"enabled":true,"redirects":{"US":{"title":"Follow our live scores in English!","description":"Go to <a href=\"https:\/\/www.flashscore.com\/\">Flashscore.com<\/a>"},"AU":{"title":"Follow our live scores on our Aussie website!","description":"Go to <a href=\"https:\/\/www.flashscore.com.au\/\">Flashscore.com.au<\/a>"},"UK":{"title":"Follow our live scores on our UK website!","description":"Go to <a href=\"https:\/\/www.flashscore.co.uk\/\">Flashscore.co.uk<\/a>"},"CA":{"title":"Follow our live scores on our Canadian website!","description":"Go to <a href=\"https:\/\/www.flashscore.ca\/\">Flashscore.ca<\/a>"},"DK":{"title":"Følg vores live resultater på dansk.","description":"Gå til <a href=\"https:\/\/www.flashscore.dk\/\">Flashscore.dk<\/a>"},"BG":{"title":"Следвай нашите резултати на български!","description":"Отиди на <a href=\"https:\/\/www.flashscore.bg\/\">Flashscore.bg<\/a>"},"BR":{"title":"Acompanhe nossos resultados ao vivo em português!","description":"Siga para <a href=\"https:\/\/www.flashscore.com.br\/\">Flashscore.com.br<\/a>","lang_combo":{"--":401},"lang_dialog_translations":{"title":"Temos um website local feito sob medida para você","country":"Brasil","redirect":"Clique no botão para confirmar que você deseja acessá-lo.","button":"Ir para o website local","showMore":"Mostrar mais"}},"DE":{"title":"Verfolge unsere Livescores auf deutsch!","description":"Hier geht es zu <a href=\"https:\/\/www.flashscore.de\/\">Flashscore.de<\/a>"},"AT":{"title":"Folge unseren Live-Ergebnissen auf Deutsch!","description":"Gehe auf <a href=\"https:\/\/www.flashscore.at\/\">Flashscore.at<\/a>"},"CH":{"parent":"DE"},"GR":{"title":"Παρακολουθήστε τα ζωντανά μας αποτελέσματα στα ελληνικά!","description":"Μεταβείτε στο <a href=\"https:\/\/www.flashscore.gr\/\">Flashscore.gr<\/a>"},"ES-CT":{"flag":"cat","title":"Segueix tots els marcadors en català!","description":"Visita <a href=\"https:\/\/www.flashscore.cat\/\">Flashscore.cat<\/a>"},"ES":{"title":"¡Sigue nuestros marcadores en directo en español!","description":"Accede a <a href=\"https:\/\/www.flashscore.es\/\">Flashscore.es<\/a>"},"BO":{"parent":"ES"},"GF":{"parent":"ES"},"GY":{"parent":"ES"},"PY":{"parent":"ES"},"SR":{"title":"Pratite naše rezultate uživo na srpskom!","description":"Idite na <a href=\"https:\/\/www.livescore.in\/rs\">LiveScore.in\/rs<\/a>"},"UY":{"parent":"ES"},"PA":{"parent":"ES"},"JM":{"parent":"ES"},"GT":{"parent":"ES"},"NI":{"parent":"ES"},"CU":{"parent":"ES"},"PH":{"title":"Sundan ng live ang mga iskor sa Tagalog!","description":"Pumunta sa <a href=\"https:\/\/www.flashscore.ph\/\">Flashscore.ph<\/a>"},"CL":{"title":"¡Sigue nuestros marcadores en vivo en español!","description":"Ingresa a <a href=\"https:\/\/www.flashscore.cl\/\">Flashscore.cl<\/a>"},"CO":{"title":"¡Sigue nuestros marcadores en vivo y en Español!","description":"Ingresa a <a href=\"https:\/\/www.flashscore.co\/\">Flashscore.co<\/a>"},"AR":{"title":"¡Seguí nuestros resultados en vivo en español!","description":"Visitá <a href=\"https:\/\/www.flashscore.com.ar\/\">Flashscore.com.ar<\/a>"},"MX":{"title":"¡Sigue los resultados en vivo en Español!","description":"Ve a <a href=\"https:\/\/www.flashscore.com.mx\/\">Flashscore.com.mx<\/a>"},"VE":{"title":"¡Sigue nuestros marcadores en vivo en Español!","description":"Ve a <a href=\"https:\/\/www.flashscore.com.ve\/\">Flashscore.com.ve<\/a>"},"PE":{"title":"¡Sigue nuestros resultados en vivo en español!","description":"Ve a <a href=\"https:\/\/www.flashscore.pe\/\">Flashscore.pe<\/a>"},"FI":{"title":"Seuraa tuloksiamme livenä suomeksi!","description":"Siirry <a href=\"https:\/\/www.flashscore.fi\/\">Flashscore.fi<\/a>-sivuille!"},"FR":{"title":"Suivez nos scores en direct en français!","description":"Rendez-vous sur <a href=\"https:\/\/www.flashscore.fr\/\">Flashscore.fr<\/a>","lang_combo":{"--":16},"lang_dialog_translations":{"title":"Nous avons un site web local sur mesure pour vous","country":"France","redirect":"Cliquez sur le bouton suivant pour confirmer que vous souhaitez accéder au site local.","button":"Passer au site web local","showMore":"Voir plus"}},"GE":{"title":"ცოცხალი ანგარიშები ქართულად!","description":"<a href=\"https:\/\/www.flashscore.ge\/\">Flashscore.ge<\/a>"},"MY":{"title":"Ikuti skor langsung kami dalam Bahasa Melayu!","description":"Pergi ke <a href=\"https:\/\/www.flashscore.com.my\/\">Flashscore.com.my<\/a>"},"HR":{"title":"Pratite naše rezultate uživo na hrvatskom!","description":"Idite na <a href=\"https:\/\/www.rezultati.com\/\">Rezultati.com<\/a>"},"LT":{"title":"Sekite rezultatus lietuviškai!","description":"Eikite į <a href=\"https:\/\/www.flashscore.in\/\">Flashscore.in<\/a>"},"HU":{"title":"Kövesd az élő eredményeket magyar nyelven!","description":"Az <a href=\"https:\/\/www.eredmenyek.com\/\">Eredmenyek.com<\/a> megnyitása"},"KO":{"title":"한국어로 실시간 스코어를 확인하세요!","description":"<a href=\"https:\/\/www.flashscore.co.kr\/\">Flashscore.co.kr<\/a>로 이동"},"IN":{"title":"Follow our live scores on our Indian website!","description":"Go to <a href=\"https:\/\/www.flashscore.in\/\">Flashscore.in<\/a>"},"IT":{"title":"Segui i nostri risultati in italiano!","description":"Vai su <a href=\"https:\/\/www.flashscore.it\/\">Flashscore.it<\/a>"},"ID":{"title":"Ikutilah Skor langsung kami dalam Bahasa Indonesia!","description":"Kunjungilah <a href=\"https:\/\/www.flashscore.co.id\/\">Flashscore.co.id<\/a>"},"JP":{"title":"ぜひ、私どもの日本版ライブスコアをフォローください！","description":"<a href=\"https:\/\/www.flashscore.co.jp\/\">Flashscore.co.jp<\/a> はこちら"},"KZ":{"title":"Live нәтижелерді Қазақ тілінде бақылаңыз!","description":"<a href=\"https:\/\/www.flashscorekz.com\/\">FlashscoreKZ.com<\/a> желісіне өту"},"NL":{"title":"Volg onze live uitslagen in het Nederlands!","description":"Ga naar <a href=\"https:\/\/www.flashscore.nl\/\">Flashscore.nl<\/a>"},"PL":{"title":"Śledź nasze wyniki na żywo po polsku!","description":"Przejdź na <a href=\"https:\/\/www.flashscore.pl\/\">Flashscore.pl<\/a>","lang_combo":{"--":3},"lang_dialog_translations":{"title":"Mamy dopasowaną do Ciebie lokalną stronę www.","country":"Polska","redirect":"Kliknij poniższy przycisk, aby potwierdzić, że chcesz uzyskać dostęp do lokalnej witryny.","button":"Włącz lokalną stronę","showMore":"Więcej"}},"PT":{"title":"Segue os resultados ao vivo em Português!","description":"Visita <a href=\"https:\/\/www.flashscore.pt\/\">Flashscore.pt<\/a>"},"PT-BR":{"title":"Acompanhe nossos resultados ao vivo em português!","description":"Siga para <a href=\"https:\/\/www.flashscore.com.br\/\">Flashscore.com.br<\/a>"},"RO":{"title":"Urmărește scoruri live în Română!","description":"Du-te pe <a href=\"https:\/\/www.flashscore.ro\/\">Flashscore.ro<\/a>"},"SK":{"title":"Sledujte naše live výsledky v slovenčine!","description":"Prejsť na <a href=\"https:\/\/www.flashscore.sk\/\">Flashscore.sk<\/a>"},"SI":{"title":"Spremljajte rezultate v živo v Slovenščini!","description":"Obiščite <a href=\"https:\/\/www.flashscore.si\/\">Flashscore.si<\/a>"},"SE":{"title":"Följ vår livescore på svenska!","description":"Gå till <a href=\"https:\/\/www.flashscore.se\/\">Flashscore.se<\/a>"},"VN":{"title":"Theo dõi tỷ số trực tiếp bằng Tiếng Việt!","description":"Hãy đến <a href=\"https:\/\/www.flashscore.vn\/\">Flashscore.vn<\/a>"},"UA":{"title":"Стежте за нашими live результатами українською!","description":"Перейти на <a href=\"https:\/\/www.flashscore.ua\/\">Flashscore.ua<\/a>"},"VI":{"title":"Để xem trực tiếp tỉ số bằng tiếng Việt!","description":"Hãy dùng <a href=\"https:\/\/www.flashscore.vn\/\">Flashscore.vn<\/a>"},"TR":{"title":"Canlı skorları Türkçe takip edin!","description":"<a href=\"https:\/\/www.flashscore.com.tr\/\">Flashscore.com.tr<\/a>'ye gidin"},"CZ":{"title":"Sledujte naše live výsledky v češtině!","description":"Přejít na <a href=\"https:\/\/www.livesport.cz\/\">Livesport.cz<\/a>"},"JA":{"title":"私どもの日本版ライブスコアをフォローください！","description":"<a href=\"https:\/\/www.flashscore.co.jp\/\">Flashscore.co.jp<\/a> はこちら。"},"KR":{"title":"한국어로 실시간 스코어를 확인하세요!","description":"<a href=\"https:\/\/www.flashscore.co.kr\/\">Flashscore.co.kr<\/a> 바로가기"}},"show_after_visits":3},"confirmation_box":{"enabled":false},"myfs":{"enabled":true,"newsfeed":{"past_days":14,"count":15,"allowed_counts":[3,15,30]},"refresh_tolerance":4,"improvements":false},"swap_participants_order":{"baseball":false},"legal_age_confirmation":{"enabled":true,"geoip":["NL"]},"one_line_duel_sports":[],"last_matches_stats_order":{"3":[595,169,713,541,696,697],"1":[595,596,541,599,600]},"recommended_sites_disabled":{"geoip":["TR","GR"]},"disabled_betting_in_live":{"geoip":["NL"]},"dark_mode":{"enabled":true,"theme_switcher":true,"dark_is_default":false},"sports_with_flag":[2,14,16,28,25,15,17,21],"onetrust":{"show_privacy_shield":true,"enable":true},"pop_ups":{"russians_redirect":{"enabled":false,"domains":[]}},"pinned":{"enabled":false},"wizard":{"enabled":false},"myleagues":{"position_of_banner":10},"match_previews_require_login":{"enabled":false},"team_page":{"duel":[8,9,10,15,16,17,19,21,22,24,25,26,28,29,36,42]},"fsds":{"client_url":"https:\/\/2.ds.lsapp.eu\/pq_graphql"},"fs_news":{"enabled":true,"widgets":{"live_table":{"enabled":false},"detail":{"enabled":true,"blacklisted_sport_id":[]},"tournament_page_summary_tab":{"enabled":true},"h2h_page":{"enabled":true}},"video_api":{"host":"https:\/\/media.lsmedialib.com"}},"line_up":{"used_substitutes":{"enabled":true,"sports":[1]},"sports_with_participant_images":[1],"player_ratings":[1]},"promo_bar":{"multi_language_bar":{"enabled":false,"new_languages":[],"hide_for_geo_ip":[]}},"frontend_logging":{"enable":false,"server":"https:\/\/logging-service.livesport.services\/","token":"Y3uhIv5Ges46mMdAZm53akso95sYOogk"},"static_fs_cdn":{"enabled":true,"enable_for_webpack_assets":true,"url":"https:\/\/static.flashscore.com"},"feed_resolver":{"enabled":true,"urls":{"global":"https:\/\/global.flashscore.ninja","local":"https:\/\/local-global.flashscore.ninja"},"countries":["AL","AD","AM","AT","AZ","BY","BE","BA","BG","HR","CY","CZ","DK","EE","FO","FI","FR","GI","GR","HU","IS","IE","IL","IT","KZ","XK","LV","LI","LT","LU","MK","MD","MC","ME","NL","NO","PL","PT","RO","RU","SM","RS","SK","SI","ES","SE","CH","TR","UA","GB"]},"sport_list":{"soccer":1,"tennis":2,"basketball":3,"hockey":4,"american-football":5,"baseball":6,"handball":7,"rugby-union":8,"floorball":9,"bandy":10,"futsal":11,"volleyball":12,"cricket":13,"darts":14,"snooker":15,"boxing":16,"beach-volleyball":17,"aussie-rules":18,"rugby-league":19,"badminton":21,"water-polo":22,"golf":23,"field-hockey":24,"table-tennis":25,"beach-soccer":26,"mma":28,"netball":29,"pesapallo":30,"motorsport":31,"motorsport-auto-racing":32,"motorsport-moto-racing":33,"cycling":34,"horse-racing":35,"esports":36,"winter-sports":37,"winter-sports-ski-jumping":38,"winter-sports-alpine-skiing":39,"winter-sports-cross-country":40,"winter-sports-biathlon":41,"kabaddi":42},"lang_box_dialog":{"enabled":true},"odds_api":{"new_odds_comparison":false},"sphinxsearch":{"server_domain":"s.livesport.services","search_path":"\/api\/v2\/search\/","top_search_path":"\/api\/v2\/top-search\/","enable":true,"client_server":"s.livesport.services\/api\/v2\/search\/","top_search_client_server":"s.livesport.services\/api\/v2\/top-search\/"}},"portable_apps":{"android":{"enable":true,"app-id":"eu.livesport.FlashScore_com","app-name":"Flashscore","url":"\/mobile\/#android","header-url":"\/mobile\/#android","footer-url":"\/mobile\/#android","apk-url":"https:\/\/t.flashscore.com\/android\/flashscore-com.apk","store-url":"https:\/\/play.google.com\/store\/apps\/details?id=eu.livesport.FlashScore_com","context-box-url":"\/mobile\/#android"},"info":{"name":"Flashscore","developer":"Flashscore"}},"ajax":{"sync_time":{"default":10,"update":5,"game":5,"live_tables":10},"goal_duration_time":60,"correction_duration_time":15,"penalty_duration_time":60,"counter_duration_time":60,"scores_changed_duration_time":60,"prematch_odds_sync_time":60,"prematch_odds_cache_time":180,"sql_cache_time":30},"timezone":{"list":{"-11":"Apia, Midway","-10":"Honolulu, Papeete, Avarua","-9":"Juneau","-8":"Los Angeles","-7":"Denver","-6":"Chicago","-5":"New York","-4.5":"Caracas","-4":"St. John's, Caracas, Santiago","-3.5":"St. John's","-3":"Brasilia, Buenos Aires, Nuuk","-2":"Mid Atlantic","-1":"Ponta Delgada, Praia","+0":"London, Dublin, Lisbon","+1":"Berlin, Prague, Vienna","+2":"Ankara, Athens, Helsinki","+3":"Moscow, Riyadh","+3.5":"Tehran, Iran Time Zone","+4":"Muscat","+5":"Islamabad","+5.5":"Chennai, Calcutta, Mumbai, New Delhi","+5.75":"Kathmandu","+6":"New Delhi","+6.5":"Yangon (Rangoon)","+7":"Jakarta","+8":"Beijing, Manila, Kuala Lumpur, Perth","+9":"Tokio","+9.5":"Australia","+10":"Melbourne","+10.5":"Lord Howe Island","+11":"Honiara, Palikir","+12":"Majuro, Suva","+13":"DST"},"dst_list":{"-2.5":"St. John's","+4.5":"Tehran, Iran Time Zone","+10.5":"Australia","+11.5":"Lord Howe Island"},"name_list":false},"cache":{"feed_x":"x"},"core_debugger":{"internal":false},"mobi":{"geoip_restriction":["GR"]}};cjs.Api.config.initConfig({"css_serial":"1665000000","js_serial":"2143000000","js":{"time_keep_match_live":180},"app":{"lang":{"charset":"en_US","web":"en","dc":1,"meta_content":"en"},"lang_combo":{"js_redirect":false,"project_list":{"--":2,"pl":800,"hu":801,"ru":802,"de":803,"el":804,"tr":805,"fr":806}},"layout":"standard","noduel_events":{"mygames":10,"main":{"default":40,"golf":30,"motorsport-auto-racing":40,"motorsport-moto-racing":40,"cycling":10,"winter-sports-ski-jumping":10,"winter-sports-alpine-skiing":10,"winter-sports-cross-country":10,"winter-sports-biathlon":10},"tournament_page":{"winter-sports-ski-jumping":1000,"winter-sports-alpine-skiing":1000,"winter-sports-cross-country":1000,"winter-sports-biathlon":1000},"participant_page":{"meetings":{"winter-sports-ski-jumping":5,"winter-sports-alpine-skiing":5,"winter-sports-cross-country":5,"winter-sports-biathlon":5},"events":{"motorsport-auto-racing":10,"motorsport-moto-racing":10,"cycling":10}},"categories":{"6576":10,"7771":10}},"mygames":{"enable":true,"position":"left","groups":{"enable":false},"past_days":1,"future_days":7,"maximum_count":500},"calendar_range":7,"google_analytics":{"enable":true},"video_highlights_live_icon":{"enable":true},"US_time_format":false,"US_style_win_loss_mark":false,"project_type":{"id":1,"name":"_fs","us_web":false},"popup":false,"js_redirect":false,"myteams":{"enable":true,"maximum_count":100},"has_category_page":[2,21,23,31,32,33,36],"banner":{"zone_list":{"background":{"id":1050,"width_max":3000,"height_max":2000,"dynamic_background":true,"element_notice_selector":".footer__advertBackground"},"background_tennis":{"id":1620,"width_max":3000,"height_max":2000,"dynamic_background":true,"element_notice_selector":".footer__advertBackground","condition":{"height":1,"zones":["background"]}},"left_menu_1":{"id":72,"width_max":140,"height_max":400},"left_menu_1_soccer":{"id":2965,"width_max":140,"height_max":400,"condition":{"height":1,"zones":["left_menu_1"]}},"left_menu_1_basketball":{"id":453,"width_max":140,"height_max":400,"condition":{"height":1,"zones":["left_menu_1"]}},"left_menu_1_handball":{"id":455,"width_max":140,"height_max":400,"condition":{"height":1,"zones":["left_menu_1"]}},"left_menu_1_hockey":{"id":454,"width_max":140,"height_max":400,"condition":{"height":1,"zones":["left_menu_1"]}},"left_menu_1_tennis":{"id":452,"width_max":140,"height_max":400,"condition":{"height":1,"zones":["left_menu_1"]}},"left_menu_1_horse-racing":{"id":2467,"width_max":140,"height_max":400,"condition":{"height":1,"zones":["left_menu_1"]}},"left_menu_2":{"id":73,"width_max":140,"height_max":400},"left_menu_3":{"id":74,"width_max":140,"height_max":400},"right_top":{"id":213,"width_max":160,"height_max":141},"right_zone_1":{"id":70,"width_max":200,"height_max":1000},"right_zone_2":{"id":396,"width_max":200,"height_max":1000},"right_zone_2_tennis":{"id":773,"width_max":200,"height_max":1000,"condition":{"height":1,"zones":["right_zone_2"]}},"right_zone_2_hockey":{"id":774,"width_max":200,"height_max":1000,"condition":{"height":1,"zones":["right_zone_2"]}},"right_zone_2_basketball":{"id":775,"width_max":200,"height_max":1000,"condition":{"height":1,"zones":["right_zone_2"]}},"right_zone_2_horse-racing":{"id":2468,"width_max":200,"height_max":1000,"condition":{"height":1,"zones":["right_zone_2"]}},"right_zone_3":{"id":397,"width_max":200,"height_max":1000},"right_criteo":{"id":3132,"width_max":200,"height_max":1000},"top":{"id":68,"width_max":1000,"height_max":300,"vertical":true},"top_basketball":{"id":663,"width_max":1000,"height_max":300,"vertical":true,"condition":{"height":1,"zones":["top"]}},"top_handball":{"id":664,"width_max":1000,"height_max":300,"vertical":true,"condition":{"height":1,"zones":["top"]}},"top_hockey":{"id":662,"width_max":1000,"height_max":300,"vertical":true,"condition":{"height":1,"zones":["top"]}},"top_tennis":{"id":661,"width_max":1000,"height_max":300,"vertical":true,"condition":{"height":1,"zones":["top"]}},"top_volleyball":{"id":665,"width_max":1000,"height_max":300,"vertical":true,"condition":{"height":1,"zones":["top"]}},"top_horse-racing":{"id":2469,"width_max":1000,"height_max":300,"vertical":true,"condition":{"height":1,"zones":["top"]}},"content_top":{"id":2568,"width_max":970,"height_max":150,"vertical":true},"content_bottom":{"id":256,"width_max":660,"height_max":400,"condition":{"breakpoint":[1,9999]}},"content_bottom_tennis":{"id":456,"width_max":660,"height_max":400,"condition":{"breakpoint":[1,9999],"height":1,"zones":["content_bottom"]}},"content_bottom_basketball":{"id":457,"width_max":660,"height_max":400,"condition":{"breakpoint":[1,9999],"height":1,"zones":["content_bottom"]}},"content_bottom_hockey":{"id":458,"width_max":660,"height_max":400,"condition":{"breakpoint":[1,9999],"height":1,"zones":["content_bottom"]}},"content_bottom_handball":{"id":459,"width_max":660,"height_max":400,"condition":{"breakpoint":[1,9999],"height":1,"zones":["content_bottom"]}},"content_bottom_horse-racing":{"id":2470,"width_max":660,"height_max":400,"condition":{"breakpoint":[1,9999],"height":1,"zones":["content_bottom"]}},"content_bottom_criteo":{"id":3134,"width_max":660,"height_max":400,"condition":{"breakpoint":[1,9999]}},"detail":{"id":69,"width_max":550,"height_max":500,"condition":{"breakpoint":[1,9999],"client_type_only":["PC","mobile","tablet"]}},"detail_leaderboard":{"id":4970,"width_max":640,"height_max":100,"vertical":true,"condition":{"breakpoint":[640,9999],"client_type_only":["PC"]}},"detail_leaderboard_mobile":{"id":4968,"width_max":320,"height_max":50,"body_class":"mobile_ad","refresh":45,"condition":{"breakpoint":[320,639]}},"detail_leaderboard_tablet":{"id":4969,"width_max":640,"height_max":100,"vertical":true,"body_class":"tablet_ad","refresh":45,"condition":{"breakpoint":[640,9999],"client_type_only":["mobile","tablet"]}},"detail_tennis":{"id":1270,"width_max":550,"height_max":500,"condition":{"height":1,"zones":["detail"]}},"detail_basketball":{"id":1271,"width_max":550,"height_max":500,"condition":{"height":1,"zones":["detail"]}},"detail_hockey":{"id":1272,"width_max":550,"height_max":500,"condition":{"height":1,"zones":["detail"]}},"detail_criteo":{"id":3133,"width_max":550,"height_max":500,"condition":{"breakpoint":[1,9999],"client_type_only":["PC"]}},"standings_top":{"id":549,"width_max":500,"height_max":60},"responsive_standings_fixed_bottom_mobile":{"id":3478,"refresh":45,"width_max":320,"height_max":50,"body_class":"mobile_ad","condition":{"breakpoint":[320,727],"client_type_only":["mobile","tablet"]}},"responsive_standings_fixed_bottom_tablet":{"id":3479,"refresh":45,"width_max":728,"height_max":90,"body_class":"tablet_ad","condition":{"breakpoint":[728,999],"client_type_only":["mobile","tablet"]}},"responsive_fixed_bottom_mobile":{"id":3476,"refresh":45,"width_max":320,"height_max":50,"body_class":"mobile_ad","condition":{"breakpoint":[320,727]}},"responsive_detail_fixed_bottom_mobile":{"id":3478,"refresh":45,"width_max":320,"height_max":50,"body_class":"mobile_ad","condition":{"breakpoint":[320,727],"client_type_only":["mobile","tablet"]}},"responsive_fixed_bottom_tablet":{"id":3477,"refresh":45,"width_max":728,"height_max":90,"body_class":"tablet_ad","condition":{"breakpoint":[728,999]}},"responsive_detail_fixed_bottom_tablet":{"id":3479,"refresh":45,"width_max":728,"height_max":90,"body_class":"tablet_ad","condition":{"breakpoint":[728,999],"client_type_only":["mobile","tablet"]}},"premium_square_mobile":{"id":6109,"width_max":480,"height_max":480,"body_class":"mobile_ad","client_type_only":["mobile","tablet"],"condition":{"breakpoint":[300,639]}},"fsnews_right_zone_1":{"id":5633,"width_max":300,"height_max":600},"fsnews_right_zone_2":{"id":5634,"width_max":300,"height_max":600},"fsnews_right_zone_3":{"id":5635,"width_max":300,"height_max":600},"fsnews_content_bottom":{"id":5632,"width_max":970,"height_max":500,"condition":{"breakpoint":[1,9999]}},"fsnews_top":{"id":5636,"width_max":970,"height_max":250,"vertical":true},"fsnews_responsive_fixed_bottom_mobile":{"id":5639,"refresh":45,"width_max":320,"height_max":50,"body_class":"mobile_ad","condition":{"breakpoint":[320,727],"client_type_only":["mobile","tablet"]}},"fsnews_responsive_fixed_bottom_tablet":{"id":5641,"refresh":45,"width_max":728,"height_max":90,"body_class":"tablet_ad","condition":{"breakpoint":[728,999],"client_type_only":["mobile","tablet"]}},"fsnews_background":{"id":5637,"width_max":3000,"height_max":2000,"dynamic_background":true,"element_notice_selector":".footer__advertBackground"},"fsnews_content_bottom_detail":{"id":5627,"width_max":970,"height_max":500,"condition":{"breakpoint":[1,9999]}},"fsnews_responsive_fixed_bottom_mobile_detail":{"id":5638,"refresh":45,"width_max":320,"height_max":50,"body_class":"mobile_ad","condition":{"breakpoint":[320,727],"client_type_only":["mobile","tablet"]}},"fsnews_responsive_fixed_bottom_tablet_detail":{"id":5640,"refresh":45,"width_max":728,"height_max":90,"body_class":"tablet_ad","condition":{"breakpoint":[728,999],"client_type_only":["mobile","tablet"]}},"fsnews_top_detail":{"id":5631,"width_max":970,"height_max":250,"vertical":true},"fsnews_right_zone_1_detail":{"id":5628,"width_max":300,"height_max":600},"fsnews_right_zone_2_detail":{"id":5629,"width_max":300,"height_max":600},"fsnews_right_zone_3_detail":{"id":5630,"width_max":300,"height_max":600},"fsnews_article":{"id":6174,"width_max":720,"height_max":1280,"body_class":"mobile_ad","condition":{"breakpoint":[320,639],"client_type_only":["mobile","tablet"]}}},"show_advertisement_label":false},"project":{"id":2,"name":"Flashscore.com","default_geo_ip_country_code":"US","default_geo_ip_subdivision_code":false},"odds":{"layout":"default","format":"eu","format_list":["eu","uk","us","hk","ma","in"],"ah_override":false,"us_handicap":false,"enable":true,"iframe":true,"my_fs":false,"sport_page":false,"hide_tab":false,"odds_disabled_countries":["IT"],"betslip":false,"betslip_detail_window":false,"betslip_window_size":[],"bookmakers_sp_allowed":[16],"betting_light_version":false,"light_live_bet_icon":false,"hide_live_bet_icon":false,"odds_comparison_show_copyright":true,"probability_to_win":false},"redirector":{"types":{"event":1,"tournament_template":2,"participant":3,"player":4,"detail_page":5}},"fs_stats":{"enable":true,"url":{"mygames":"remote-stats.flashscore.com\/mg","adblocked":"","search_stats":"remote-stats.flashscore.com\/ss"}},"empty_logo_small_path":{"logo_team":"image\/empty-logo-team-small.png"},"game_notification_push":{"enable":true},"user_functions":{"server_domain":"lsid.eu","serverAPI":"http:\/\/lsid.edrive.intra:82\/","enable":true,"use_only_local":true,"namespace":"flashscore","facebook_app_id":"555890894461938","google_client_id":"33270257411-p5mm2q46djddp4dhiucmmmaeuv2k4u2i.apps.googleusercontent.com","apple_client_id":"com.flashscore.siwa","apple_redirect_uri":"https:\/\/www.lsid.eu:8443\/apple-proxy\/","server":"https:\/\/lsid.eu\/","facebook_client_access_token":"46e7e59532a6442d80ef6aff3708eca5"},"user_function":{"use_only_local":false},"registration":{"version":1,"no_remote":false,"sign_out_in_drop_down":true,"captcha_sitekey":"6LdnlAoTAAAAAIzaLLR8ezPKKnLeM2LozP6OQKj_","project_has_initial_tou":true},"european_union_states":{"codes":["BE","BG","CZ","DK","EE","FI","FR","HR","IE","IT","CY","LT","LV","LU","HU","MT","DE","NL","PL","PT","AT","RO","GR","SK","SI","GB","ES","SE"]},"url_prefix":"","project_moved":[],"sports_without_detail":[35],"tournament_pages":{"enable":true,"disabled_sports":[],"block_summary_match_limit":10,"data_part_match_limit":100},"new_mobile_page":{"enable":true},"box-over-content":{"scrolling-enable":true},"box_over_content":{"split":{"columns":3}},"detail_live_betting_strip":{"rotation_time":30000},"sports_with_participant_no_duel_page":[38,39,40,41,32,33,34],"match_comments":{"enable":true,"sports":[5,18,21,10,6,3,26,17,16,13,14,36,24,9,11,7,4,42,28,29,30,19,8,15,1,25,2,12,22]},"new_live_betting_icon":{"enable":true,"version":1},"live_streaming":{"disabled_bookmakers_by_geoip":[],"bookmakers_with_disabled_link":[]},"facelift":{"main_class":"flat"},"timezone":{"default":2},"icon_list":{"info":true,"shirt":true,"tv":true},"react":{"enabled":false,"sports":false},"responsive":{"breakpoint":800,"breakpoint_mobile":640},"tv_program":{"enable":true},"mixed_feed":{"link_to_more_games":false,"homepage_enabled":false},"team_transfers":{"sports":[1,4]},"team_news":{"enabled":true},"native_notifications":{"enabled":true,"lsnp":"https:\/\/lsnp.flashscore.com\/web-","firebase":{"apiKey":"AIzaSyAW9FbqeajkSTftCCbFlcbojPETqu1IThs","authDomain":"flashscore-web-notifications.firebaseapp.com","databaseURL":"https:\/\/flashscore-web-notifications.firebaseio.com","projectId":"flashscore-web-notifications","storageBucket":"flashscore-web-notifications.appspot.com","messagingSenderId":"258573697417","appId":"1:258573697417:web:d00c8d0c079ac7a2986158"}},"feed_sign":"SW9D1eZo","detail":{"window_size":{"width":688,"height":900}},"audio_comments":{"enabled":true,"authRequired":true,"tabEnabled":false},"tv":false,"apple_sign_in":{"enable":true},"recombee":{"enabled":false,"database_id":"livesport-eu-prod","public_token":"FEi4XEiLW3jsljzduaSyR10SOCxIMtgcBY06ssPMenRjEMFut9SeGnOmR7WtICKC","scenario":"1"},"advanced_tennis":{"enable":true,"point_by_point":true},"reversed_time":{"enable":false,"sports":{"3":{"stages":[22,23,24,25],"extra_time_stages":[6],"stage_time":10,"extra_time":5},"4":{"stages":[14,15,16],"extra_time_stages":[6],"stage_time":20,"extra_time":5},"5":{"stages":[22,23,24,25],"extra_time_stages":[6],"stage_time":15,"extra_time":15}}},"sports_with_player_profile":[1,4,3],"empty_logo_path":{"face_man":"image\/empty-face-man-share.gif","face_woman":"image\/empty-face-woman-share.gif","logo_team":"image\/empty-logo-team-share.gif"},"team_logo":{"enable":true,"detail":true,"standings":false,"h2h":true,"iframe":true},"lang_box":{"enabled":true,"redirects":{"US":{"title":"Follow our live scores in English!","description":"Go to <a href=\"https:\/\/www.flashscore.com\/\">Flashscore.com<\/a>"},"AU":{"title":"Follow our live scores on our Aussie website!","description":"Go to <a href=\"https:\/\/www.flashscore.com.au\/\">Flashscore.com.au<\/a>"},"UK":{"title":"Follow our live scores on our UK website!","description":"Go to <a href=\"https:\/\/www.flashscore.co.uk\/\">Flashscore.co.uk<\/a>"},"CA":{"title":"Follow our live scores on our Canadian website!","description":"Go to <a href=\"https:\/\/www.flashscore.ca\/\">Flashscore.ca<\/a>"},"DK":{"title":"Følg vores live resultater på dansk.","description":"Gå til <a href=\"https:\/\/www.flashscore.dk\/\">Flashscore.dk<\/a>"},"BG":{"title":"Следвай нашите резултати на български!","description":"Отиди на <a href=\"https:\/\/www.flashscore.bg\/\">Flashscore.bg<\/a>"},"BR":{"title":"Acompanhe nossos resultados ao vivo em português!","description":"Siga para <a href=\"https:\/\/www.flashscore.com.br\/\">Flashscore.com.br<\/a>","lang_combo":{"--":401},"lang_dialog_translations":{"title":"Temos um website local feito sob medida para você","country":"Brasil","redirect":"Clique no botão para confirmar que você deseja acessá-lo.","button":"Ir para o website local","showMore":"Mostrar mais"}},"DE":{"title":"Verfolge unsere Livescores auf deutsch!","description":"Hier geht es zu <a href=\"https:\/\/www.flashscore.de\/\">Flashscore.de<\/a>"},"AT":{"title":"Folge unseren Live-Ergebnissen auf Deutsch!","description":"Gehe auf <a href=\"https:\/\/www.flashscore.at\/\">Flashscore.at<\/a>"},"CH":{"parent":"DE"},"GR":{"title":"Παρακολουθήστε τα ζωντανά μας αποτελέσματα στα ελληνικά!","description":"Μεταβείτε στο <a href=\"https:\/\/www.flashscore.gr\/\">Flashscore.gr<\/a>"},"ES-CT":{"flag":"cat","title":"Segueix tots els marcadors en català!","description":"Visita <a href=\"https:\/\/www.flashscore.cat\/\">Flashscore.cat<\/a>"},"ES":{"title":"¡Sigue nuestros marcadores en directo en español!","description":"Accede a <a href=\"https:\/\/www.flashscore.es\/\">Flashscore.es<\/a>"},"BO":{"parent":"ES"},"GF":{"parent":"ES"},"GY":{"parent":"ES"},"PY":{"parent":"ES"},"SR":{"title":"Pratite naše rezultate uživo na srpskom!","description":"Idite na <a href=\"https:\/\/www.livescore.in\/rs\">LiveScore.in\/rs<\/a>"},"UY":{"parent":"ES"},"PA":{"parent":"ES"},"JM":{"parent":"ES"},"GT":{"parent":"ES"},"NI":{"parent":"ES"},"CU":{"parent":"ES"},"PH":{"title":"Sundan ng live ang mga iskor sa Tagalog!","description":"Pumunta sa <a href=\"https:\/\/www.flashscore.ph\/\">Flashscore.ph<\/a>"},"CL":{"title":"¡Sigue nuestros marcadores en vivo en español!","description":"Ingresa a <a href=\"https:\/\/www.flashscore.cl\/\">Flashscore.cl<\/a>"},"CO":{"title":"¡Sigue nuestros marcadores en vivo y en Español!","description":"Ingresa a <a href=\"https:\/\/www.flashscore.co\/\">Flashscore.co<\/a>"},"AR":{"title":"¡Seguí nuestros resultados en vivo en español!","description":"Visitá <a href=\"https:\/\/www.flashscore.com.ar\/\">Flashscore.com.ar<\/a>"},"MX":{"title":"¡Sigue los resultados en vivo en Español!","description":"Ve a <a href=\"https:\/\/www.flashscore.com.mx\/\">Flashscore.com.mx<\/a>"},"VE":{"title":"¡Sigue nuestros marcadores en vivo en Español!","description":"Ve a <a href=\"https:\/\/www.flashscore.com.ve\/\">Flashscore.com.ve<\/a>"},"PE":{"title":"¡Sigue nuestros resultados en vivo en español!","description":"Ve a <a href=\"https:\/\/www.flashscore.pe\/\">Flashscore.pe<\/a>"},"FI":{"title":"Seuraa tuloksiamme livenä suomeksi!","description":"Siirry <a href=\"https:\/\/www.flashscore.fi\/\">Flashscore.fi<\/a>-sivuille!"},"FR":{"title":"Suivez nos scores en direct en français!","description":"Rendez-vous sur <a href=\"https:\/\/www.flashscore.fr\/\">Flashscore.fr<\/a>","lang_combo":{"--":16},"lang_dialog_translations":{"title":"Nous avons un site web local sur mesure pour vous","country":"France","redirect":"Cliquez sur le bouton suivant pour confirmer que vous souhaitez accéder au site local.","button":"Passer au site web local","showMore":"Voir plus"}},"GE":{"title":"ცოცხალი ანგარიშები ქართულად!","description":"<a href=\"https:\/\/www.flashscore.ge\/\">Flashscore.ge<\/a>"},"MY":{"title":"Ikuti skor langsung kami dalam Bahasa Melayu!","description":"Pergi ke <a href=\"https:\/\/www.flashscore.com.my\/\">Flashscore.com.my<\/a>"},"HR":{"title":"Pratite naše rezultate uživo na hrvatskom!","description":"Idite na <a href=\"https:\/\/www.rezultati.com\/\">Rezultati.com<\/a>"},"LT":{"title":"Sekite rezultatus lietuviškai!","description":"Eikite į <a href=\"https:\/\/www.flashscore.in\/\">Flashscore.in<\/a>"},"HU":{"title":"Kövesd az élő eredményeket magyar nyelven!","description":"Az <a href=\"https:\/\/www.eredmenyek.com\/\">Eredmenyek.com<\/a> megnyitása"},"KO":{"title":"한국어로 실시간 스코어를 확인하세요!","description":"<a href=\"https:\/\/www.flashscore.co.kr\/\">Flashscore.co.kr<\/a>로 이동"},"IN":{"title":"Follow our live scores on our Indian website!","description":"Go to <a href=\"https:\/\/www.flashscore.in\/\">Flashscore.in<\/a>"},"IT":{"title":"Segui i nostri risultati in italiano!","description":"Vai su <a href=\"https:\/\/www.flashscore.it\/\">Flashscore.it<\/a>"},"ID":{"title":"Ikutilah Skor langsung kami dalam Bahasa Indonesia!","description":"Kunjungilah <a href=\"https:\/\/www.flashscore.co.id\/\">Flashscore.co.id<\/a>"},"JP":{"title":"ぜひ、私どもの日本版ライブスコアをフォローください！","description":"<a href=\"https:\/\/www.flashscore.co.jp\/\">Flashscore.co.jp<\/a> はこちら"},"KZ":{"title":"Live нәтижелерді Қазақ тілінде бақылаңыз!","description":"<a href=\"https:\/\/www.flashscorekz.com\/\">FlashscoreKZ.com<\/a> желісіне өту"},"NL":{"title":"Volg onze live uitslagen in het Nederlands!","description":"Ga naar <a href=\"https:\/\/www.flashscore.nl\/\">Flashscore.nl<\/a>"},"PL":{"title":"Śledź nasze wyniki na żywo po polsku!","description":"Przejdź na <a href=\"https:\/\/www.flashscore.pl\/\">Flashscore.pl<\/a>","lang_combo":{"--":3},"lang_dialog_translations":{"title":"Mamy dopasowaną do Ciebie lokalną stronę www.","country":"Polska","redirect":"Kliknij poniższy przycisk, aby potwierdzić, że chcesz uzyskać dostęp do lokalnej witryny.","button":"Włącz lokalną stronę","showMore":"Więcej"}},"PT":{"title":"Segue os resultados ao vivo em Português!","description":"Visita <a href=\"https:\/\/www.flashscore.pt\/\">Flashscore.pt<\/a>"},"PT-BR":{"title":"Acompanhe nossos resultados ao vivo em português!","description":"Siga para <a href=\"https:\/\/www.flashscore.com.br\/\">Flashscore.com.br<\/a>"},"RO":{"title":"Urmărește scoruri live în Română!","description":"Du-te pe <a href=\"https:\/\/www.flashscore.ro\/\">Flashscore.ro<\/a>"},"SK":{"title":"Sledujte naše live výsledky v slovenčine!","description":"Prejsť na <a href=\"https:\/\/www.flashscore.sk\/\">Flashscore.sk<\/a>"},"SI":{"title":"Spremljajte rezultate v živo v Slovenščini!","description":"Obiščite <a href=\"https:\/\/www.flashscore.si\/\">Flashscore.si<\/a>"},"SE":{"title":"Följ vår livescore på svenska!","description":"Gå till <a href=\"https:\/\/www.flashscore.se\/\">Flashscore.se<\/a>"},"VN":{"title":"Theo dõi tỷ số trực tiếp bằng Tiếng Việt!","description":"Hãy đến <a href=\"https:\/\/www.flashscore.vn\/\">Flashscore.vn<\/a>"},"UA":{"title":"Стежте за нашими live результатами українською!","description":"Перейти на <a href=\"https:\/\/www.flashscore.ua\/\">Flashscore.ua<\/a>"},"VI":{"title":"Để xem trực tiếp tỉ số bằng tiếng Việt!","description":"Hãy dùng <a href=\"https:\/\/www.flashscore.vn\/\">Flashscore.vn<\/a>"},"TR":{"title":"Canlı skorları Türkçe takip edin!","description":"<a href=\"https:\/\/www.flashscore.com.tr\/\">Flashscore.com.tr<\/a>'ye gidin"},"CZ":{"title":"Sledujte naše live výsledky v češtině!","description":"Přejít na <a href=\"https:\/\/www.livesport.cz\/\">Livesport.cz<\/a>"},"JA":{"title":"私どもの日本版ライブスコアをフォローください！","description":"<a href=\"https:\/\/www.flashscore.co.jp\/\">Flashscore.co.jp<\/a> はこちら。"},"KR":{"title":"한국어로 실시간 스코어를 확인하세요!","description":"<a href=\"https:\/\/www.flashscore.co.kr\/\">Flashscore.co.kr<\/a> 바로가기"}},"show_after_visits":3},"confirmation_box":{"enabled":false},"myfs":{"enabled":true,"newsfeed":{"past_days":14,"count":15,"allowed_counts":[3,15,30]},"refresh_tolerance":4,"improvements":false},"swap_participants_order":{"baseball":false},"legal_age_confirmation":{"enabled":true,"geoip":["NL"]},"one_line_duel_sports":[],"last_matches_stats_order":{"3":[595,169,713,541,696,697],"1":[595,596,541,599,600]},"recommended_sites_disabled":{"geoip":["TR","GR"]},"disabled_betting_in_live":{"geoip":["NL"]},"dark_mode":{"enabled":true,"theme_switcher":true,"dark_is_default":false},"sports_with_flag":[2,14,16,28,25,15,17,21],"onetrust":{"show_privacy_shield":true,"enable":true},"pop_ups":{"russians_redirect":{"enabled":false,"domains":[]}},"pinned":{"enabled":false},"wizard":{"enabled":false},"myleagues":{"position_of_banner":10},"match_previews_require_login":{"enabled":false},"team_page":{"duel":[8,9,10,15,16,17,19,21,22,24,25,26,28,29,36,42]},"fsds":{"client_url":"https:\/\/2.ds.lsapp.eu\/pq_graphql"},"fs_news":{"enabled":true,"widgets":{"live_table":{"enabled":false},"detail":{"enabled":true,"blacklisted_sport_id":[]},"tournament_page_summary_tab":{"enabled":true},"h2h_page":{"enabled":true}},"video_api":{"host":"https:\/\/media.lsmedialib.com"}},"line_up":{"used_substitutes":{"enabled":true,"sports":[1]},"sports_with_participant_images":[1],"player_ratings":[1]},"promo_bar":{"multi_language_bar":{"enabled":false,"new_languages":[],"hide_for_geo_ip":[]}},"frontend_logging":{"enable":false,"server":"https:\/\/logging-service.livesport.services\/","token":"Y3uhIv5Ges46mMdAZm53akso95sYOogk"},"static_fs_cdn":{"enabled":true,"enable_for_webpack_assets":true,"url":"https:\/\/static.flashscore.com"},"feed_resolver":{"enabled":true,"urls":{"global":"https:\/\/global.flashscore.ninja","local":"https:\/\/local-global.flashscore.ninja"},"countries":["AL","AD","AM","AT","AZ","BY","BE","BA","BG","HR","CY","CZ","DK","EE","FO","FI","FR","GI","GR","HU","IS","IE","IL","IT","KZ","XK","LV","LI","LT","LU","MK","MD","MC","ME","NL","NO","PL","PT","RO","RU","SM","RS","SK","SI","ES","SE","CH","TR","UA","GB"]},"sport_list":{"soccer":1,"tennis":2,"basketball":3,"hockey":4,"american-football":5,"baseball":6,"handball":7,"rugby-union":8,"floorball":9,"bandy":10,"futsal":11,"volleyball":12,"cricket":13,"darts":14,"snooker":15,"boxing":16,"beach-volleyball":17,"aussie-rules":18,"rugby-league":19,"badminton":21,"water-polo":22,"golf":23,"field-hockey":24,"table-tennis":25,"beach-soccer":26,"mma":28,"netball":29,"pesapallo":30,"motorsport":31,"motorsport-auto-racing":32,"motorsport-moto-racing":33,"cycling":34,"horse-racing":35,"esports":36,"winter-sports":37,"winter-sports-ski-jumping":38,"winter-sports-alpine-skiing":39,"winter-sports-cross-country":40,"winter-sports-biathlon":41,"kabaddi":42},"lang_box_dialog":{"enabled":true},"odds_api":{"new_odds_comparison":false},"sphinxsearch":{"server_domain":"s.livesport.services","search_path":"\/api\/v2\/search\/","top_search_path":"\/api\/v2\/top-search\/","enable":true,"client_server":"s.livesport.services\/api\/v2\/search\/","top_search_client_server":"s.livesport.services\/api\/v2\/top-search\/"}},"portable_apps":{"android":{"enable":true,"app-id":"eu.livesport.FlashScore_com","app-name":"Flashscore","url":"\/mobile\/#android","header-url":"\/mobile\/#android","footer-url":"\/mobile\/#android","apk-url":"https:\/\/t.flashscore.com\/android\/flashscore-com.apk","store-url":"https:\/\/play.google.com\/store\/apps\/details?id=eu.livesport.FlashScore_com","context-box-url":"\/mobile\/#android"},"info":{"name":"Flashscore","developer":"Flashscore"}},"ajax":{"sync_time":{"default":10,"update":5,"game":5,"live_tables":10},"goal_duration_time":60,"correction_duration_time":15,"penalty_duration_time":60,"counter_duration_time":60,"scores_changed_duration_time":60,"prematch_odds_sync_time":60,"prematch_odds_cache_time":180,"sql_cache_time":30},"timezone":{"list":{"-11":"Apia, Midway","-10":"Honolulu, Papeete, Avarua","-9":"Juneau","-8":"Los Angeles","-7":"Denver","-6":"Chicago","-5":"New York","-4.5":"Caracas","-4":"St. John's, Caracas, Santiago","-3.5":"St. John's","-3":"Brasilia, Buenos Aires, Nuuk","-2":"Mid Atlantic","-1":"Ponta Delgada, Praia","+0":"London, Dublin, Lisbon","+1":"Berlin, Prague, Vienna","+2":"Ankara, Athens, Helsinki","+3":"Moscow, Riyadh","+3.5":"Tehran, Iran Time Zone","+4":"Muscat","+5":"Islamabad","+5.5":"Chennai, Calcutta, Mumbai, New Delhi","+5.75":"Kathmandu","+6":"New Delhi","+6.5":"Yangon (Rangoon)","+7":"Jakarta","+8":"Beijing, Manila, Kuala Lumpur, Perth","+9":"Tokio","+9.5":"Australia","+10":"Melbourne","+10.5":"Lord Howe Island","+11":"Honiara, Palikir","+12":"Majuro, Suva","+13":"DST"},"dst_list":{"-2.5":"St. John's","+4.5":"Tehran, Iran Time Zone","+10.5":"Australia","+11.5":"Lord Howe Island"},"name_list":false},"cache":{"feed_x":"x"},"core_debugger":{"internal":false},"mobi":{"geoip_restriction":["GR"]}});(()=>{var __webpack_modules__={543:function(__unused_webpack_module,exports,__webpack_require__){"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(o,m,k,k2){void 0===k2&&(k2=k);var desc=Object.getOwnPropertyDescriptor(m,k);desc&&!("get"in desc?!m.__esModule:desc.writable||desc.configurable)||(desc={enumerable:!0,get:function(){return m[k]}}),Object.defineProperty(o,k2,desc)}:function(o,m,k,k2){void 0===k2&&(k2=k),o[k2]=m[k]}),__exportStar=this&&this.__exportStar||function(m,exports){for(var p in m)"default"===p||Object.prototype.hasOwnProperty.call(exports,p)||__createBinding(exports,m,p)},__importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.LsidVerificationTypes=exports.LsidAccountStatus=exports.LsidLoginSocialProviders=exports.LsidEmails=exports.LsidApiClient=exports.default=void 0;var lsidClient_1=__webpack_require__(285);Object.defineProperty(exports,"default",{enumerable:!0,get:function(){return __importDefault(lsidClient_1).default}});var lsidApiClient_1=__webpack_require__(1280);Object.defineProperty(exports,"LsidApiClient",{enumerable:!0,get:function(){return __importDefault(lsidApiClient_1).default}}),__exportStar(__webpack_require__(285),exports),__exportStar(__webpack_require__(1280),exports),__exportStar(__webpack_require__(1555),exports),__exportStar(__webpack_require__(3722),exports),__exportStar(__webpack_require__(3375),exports);var lsid_shared_library_1=__webpack_require__(5661);Object.defineProperty(exports,"LsidEmails",{enumerable:!0,get:function(){return lsid_shared_library_1.LsidEmails}}),Object.defineProperty(exports,"LsidLoginSocialProviders",{enumerable:!0,get:function(){return lsid_shared_library_1.LsidLoginSocialProviders}}),Object.defineProperty(exports,"LsidAccountStatus",{enumerable:!0,get:function(){return lsid_shared_library_1.LsidAccountStatus}}),Object.defineProperty(exports,"LsidVerificationTypes",{enumerable:!0,get:function(){return lsid_shared_library_1.LsidVerificationTypes}})},664:(__unused_webpack_module,exports)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.AbortSignalTimeout=void 0;exports.AbortSignalTimeout=class{constructor(timeout){this.timeout=timeout}create(){const abortController=new AbortController;return setTimeout((()=>abortController.abort()),this.timeout),abortController.signal}}},804:function(__unused_webpack_module,exports,__webpack_require__){"use strict";var __awaiter=this&&this.__awaiter||function(thisArg,_arguments,P,generator){return new(P||(P=Promise))((function(resolve,reject){function fulfilled(value){try{step(generator.next(value))}catch(e){reject(e)}}function rejected(value){try{step(generator.throw(value))}catch(e){reject(e)}}function step(result){var value;result.done?resolve(result.value):(value=result.value,value instanceof P?value:new P((function(resolve){resolve(value)}))).then(fulfilled,rejected)}step((generator=generator.apply(thisArg,_arguments||[])).next())}))},__importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0});const get_1=__importDefault(__webpack_require__(63)),isString_1=__importDefault(__webpack_require__(7124)),baseNamedClass_1=__importDefault(__webpack_require__(8995)),apiCallError_1=__importDefault(__webpack_require__(2453)),missingResponseError_1=__importDefault(__webpack_require__(8523)),requestError_1=__importDefault(__webpack_require__(1090)),baseApiClientTypes_1=__webpack_require__(1555),abortSignalTimeout_1=__webpack_require__(664),baseApiClientUtils_1=__webpack_require__(6601);class BaseApiClient extends baseNamedClass_1.default{constructor(fetch,config,name){super(name),this.fetch=fetch,this.validateBaseConfig(config),this._config=config,this.baseUrl=this.isSandbox()?this.config.sandboxUrl:this.config.productionUrl}get config(){return this._config}initCheckValue(config){return(propName,validator)=>{if(!validator(config[propName]))throw new Error(`config.${propName} is required.`)}}isSandbox(){return this.config.mode===baseApiClientTypes_1.ApiClientMode.Sandbox}sendRequest(options){return __awaiter(this,void 0,void 0,(function*(){const{method,headers,data,params,url}=options,{href}=new URL(url,this.baseUrl),requestUrl=(0,baseApiClientUtils_1.getRequestUrl)(href,params);return this.fetch(requestUrl,{method,headers,signal:new abortSignalTimeout_1.AbortSignalTimeout(this._config.timeout).create(),body:JSON.stringify(data)}).then((response=>__awaiter(this,void 0,void 0,(function*(){if(!response.ok)throw new apiCallError_1.default((0,get_1.default)(response,"data.message","Unexpected server error"),(0,get_1.default)(response,"status",500),(0,get_1.default)(response,"data.code"));return{headers:response.headers,status:response.status,data:yield response.json()}})))).catch((e=>{let error;if(e.response){const errRes=e.response;error=new apiCallError_1.default((0,get_1.default)(errRes,"data.message",e.message),(0,get_1.default)(errRes,"status",500),(0,get_1.default)(errRes,"data.code"))}else error=e.request?new missingResponseError_1.default(e.message):new requestError_1.default(e.message);throw error})).then((response=>{var _a,_b;return null===(_a=options.handleErrorInOkStatus)||void 0===_a||_a.call(options,response),null===(_b=options.handleV5ErrorResponse)||void 0===_b||_b.call(options,response),response}))}))}validateBaseConfig(config){const checkValue=this.initCheckValue(config);checkValue("mode",isString_1.default),checkValue("productionUrl",isString_1.default),config.mode===baseApiClientTypes_1.ApiClientMode.Sandbox&&checkValue("sandboxUrl",isString_1.default)}}exports.default=BaseApiClient},1555:(__unused_webpack_module,exports)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.HttpMethod=exports.ApiClientMode=void 0,function(ApiClientMode){ApiClientMode.Production="Production",ApiClientMode.Sandbox="Sandbox"}(exports.ApiClientMode||(exports.ApiClientMode={})),function(HttpMethod){HttpMethod.DELETE="DELETE",HttpMethod.GET="GET",HttpMethod.HEAD="HEAD",HttpMethod.OPTIONS="OPTIONS",HttpMethod.PATCH="PATCH",HttpMethod.POST="POST",HttpMethod.PUT="PUT"}(exports.HttpMethod||(exports.HttpMethod={}))},6601:(__unused_webpack_module,exports)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.getRequestUrl=void 0;exports.getRequestUrl=(href,params)=>params?`${href}?${new URLSearchParams(params)}`:href},1280:function(__unused_webpack_module,exports,__webpack_require__){"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(o,m,k,k2){void 0===k2&&(k2=k);var desc=Object.getOwnPropertyDescriptor(m,k);desc&&!("get"in desc?!m.__esModule:desc.writable||desc.configurable)||(desc={enumerable:!0,get:function(){return m[k]}}),Object.defineProperty(o,k2,desc)}:function(o,m,k,k2){void 0===k2&&(k2=k),o[k2]=m[k]}),__exportStar=this&&this.__exportStar||function(m,exports){for(var p in m)"default"===p||Object.prototype.hasOwnProperty.call(exports,p)||__createBinding(exports,m,p)},__importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var lsidApiClient_1=__webpack_require__(6137);Object.defineProperty(exports,"default",{enumerable:!0,get:function(){return __importDefault(lsidApiClient_1).default}}),__exportStar(__webpack_require__(7195),exports),__exportStar(__webpack_require__(6985),exports)},6137:function(__unused_webpack_module,exports,__webpack_require__){"use strict";var __awaiter=this&&this.__awaiter||function(thisArg,_arguments,P,generator){return new(P||(P=Promise))((function(resolve,reject){function fulfilled(value){try{step(generator.next(value))}catch(e){reject(e)}}function rejected(value){try{step(generator.throw(value))}catch(e){reject(e)}}function step(result){var value;result.done?resolve(result.value):(value=result.value,value instanceof P?value:new P((function(resolve){resolve(value)}))).then(fulfilled,rejected)}step((generator=generator.apply(thisArg,_arguments||[])).next())}))},__importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0});const get_1=__importDefault(__webpack_require__(63)),lsid_shared_library_1=__webpack_require__(5661),isString_1=__importDefault(__webpack_require__(7124)),isNumber_1=__importDefault(__webpack_require__(905)),baseApiClient_1=__importDefault(__webpack_require__(804)),baseApiClientTypes_1=__webpack_require__(1555),lsidApiClientErrors_1=__webpack_require__(7195),lsidApiClientTypes_1=__webpack_require__(6985),lsidApiClientUtils_1=__webpack_require__(2826);class LsidApiClient extends baseApiClient_1.default{constructor(fetch,config,errorMessages={},name="LsidApiClient"){super(fetch,config,name),this.errorMessages=errorMessages,this.handleErrorInOkStatus=response=>{const{data:{err,err2}}=response;if(err&&!err2)switch(err){case lsid_shared_library_1.LsidResponseErrorCodes.loginMissmatch:throw lsidApiClientErrors_1.lsidErrors.loginMissmatch(this.errorMessages.loginMissmatch);case lsid_shared_library_1.LsidResponseErrorCodes.internalError:throw lsidApiClientErrors_1.lsidErrors.technicalError((0,get_1.default)(this.errorMessages,"technicalError","Internal error on LSID."));case lsid_shared_library_1.LsidResponseErrorCodes.registrationNotConfirmed:throw lsidApiClientErrors_1.lsidErrors.registrationNotConfirmed(this.errorMessages.registrationNotConfirmed);case lsid_shared_library_1.LsidResponseErrorCodes.validationError:throw lsidApiClientErrors_1.lsidErrors.invalidRequestData(this.errorMessages.invalidRequestData);case lsid_shared_library_1.LsidResponseErrorCodes.verificationFail:throw lsidApiClientErrors_1.lsidErrors.verificationFailed(this.errorMessages.verificationFailed);case lsid_shared_library_1.LsidResponseErrorCodes.captchaMissmatch:throw lsidApiClientErrors_1.lsidErrors.invalidCaptcha(this.errorMessages.invalidCaptcha);case lsid_shared_library_1.LsidResponseErrorCodes.registrationDuplicate:throw lsidApiClientErrors_1.lsidErrors.registrationAlreadyExists(this.errorMessages.registrationAlreadyExists);default:throw lsidApiClientErrors_1.lsidErrors.technicalError((0,get_1.default)(this.errorMessages,"technicalError",`Error '${err} is not handled.'`))}},this.handleV5ErrorResponse=response=>{const{data:{code,name,message}}=response;if(code)switch(code){case 100:case 101:throw lsidApiClientErrors_1.lsidErrors.invalidRequestData(message);case 120:throw lsidApiClientErrors_1.lsidErrors.invalidCaptcha(message);case 150:throw lsidApiClientErrors_1.lsidErrors.verificationFailed(message);default:throw lsidApiClientErrors_1.lsidErrors.technicalError((0,get_1.default)(this.errorMessages,"technicalError",`Error '${name} with code ${name} is not handled.'`))}},this.validateConfig(config)}lsidApiEndpoints(){return{registration:this.registration.bind(this),login:this.login.bind(this),loginUsingProvider:this.loginUsingProvider.bind(this),termsAgree:this.termsAgree.bind(this),verifyAccount:this.verifyAccount.bind(this),deleteAccount:this.deleteAccount.bind(this),changePassword:this.changePassword.bind(this),forgottenPassword:this.forgottenPassword.bind(this),logout:this.logout.bind(this),getData:this.getData.bind(this),storeMergeData:this.storeMergeData.bind(this),updateUser:this.updateUser.bind(this),getTouDocuments:this.getTouDocuments.bind(this),getTouDocumentByVersion:this.getTouDocumentByVersion.bind(this),marketingApproval:this.marketingApproval.bind(this),myTerms:this.myTerms.bind(this),termsAgreements:this.termsAgreements.bind(this),captchaForgottenPassword:this.captchaForgottenPassword.bind(this)}}validateConfig(config){const checkValue=this.initCheckValue(config);checkValue("namespace",isString_1.default),checkValue("projectId",isNumber_1.default)}registration(registrationData){return __awaiter(this,void 0,void 0,(function*(){const{namespace,projectId}=this.config,{data}=yield this.sendRequest({method:baseApiClientTypes_1.HttpMethod.POST,url:lsidApiClientTypes_1.LsidEndpoints.registration,handleErrorInOkStatus:this.handleErrorInOkStatus,data:Object.assign(Object.assign({},registrationData),{termsofservice:!0,touApproval:!0,ppApproval:!0,namespace,project:projectId})});(0,lsidApiClientUtils_1.checkDoneResData)(data,this.errorMessages)}))}login(loginData){return __awaiter(this,void 0,void 0,(function*(){const{namespace,projectId}=this.config,{data}=yield this.sendRequest({method:baseApiClientTypes_1.HttpMethod.POST,url:lsidApiClientTypes_1.LsidEndpoints.login,handleErrorInOkStatus:this.handleErrorInOkStatus,data:Object.assign(Object.assign({},loginData),{namespace,project:projectId})});return(0,lsidApiClientUtils_1.getLoginUserData)(data,this.errorMessages)}))}loginUsingProvider(loginData){return __awaiter(this,void 0,void 0,(function*(){const{namespace,projectId}=this.config,{data}=yield this.sendRequest({method:baseApiClientTypes_1.HttpMethod.POST,url:lsidApiClientTypes_1.LsidEndpoints.loginUsingProvider,handleErrorInOkStatus:this.handleErrorInOkStatus,data:Object.assign(Object.assign({},loginData),{touApproval:!0,ppApproval:!0,namespace,project:projectId})});return(0,lsidApiClientUtils_1.getProviderLoginUserData)(data,this.errorMessages)}))}termsAgree(loggedUserData){return __awaiter(this,void 0,void 0,(function*(){const{data}=yield this.sendRequest({method:baseApiClientTypes_1.HttpMethod.POST,url:lsidApiClientTypes_1.LsidEndpoints.termsAgree,handleErrorInOkStatus:this.handleErrorInOkStatus,data:{loggedIn:loggedUserData}});(0,lsidApiClientUtils_1.checkDoneResData)(data,this.errorMessages)}))}verifyAccount(id,code,type){return __awaiter(this,void 0,void 0,(function*(){const{namespace}=this.config,{data}=yield this.sendRequest({method:baseApiClientTypes_1.HttpMethod.POST,url:lsidApiClientTypes_1.LsidEndpoints.verification,handleErrorInOkStatus:this.handleErrorInOkStatus,data:{t:type,c:code,i:id,namespace}});return(0,lsidApiClientUtils_1.checkDoneResData)(data,this.errorMessages),data.t||lsid_shared_library_1.LsidVerificationTypes.verifyAccount}))}deleteAccount(loggedUserData){return __awaiter(this,void 0,void 0,(function*(){const{data}=yield this.sendRequest({method:baseApiClientTypes_1.HttpMethod.POST,url:lsidApiClientTypes_1.LsidEndpoints.deleteAccount,handleErrorInOkStatus:this.handleErrorInOkStatus,data:{loggedIn:loggedUserData}});(0,lsidApiClientUtils_1.checkDoneResData)(data,this.errorMessages)}))}changePassword(id,newPassword,verificationType){return __awaiter(this,void 0,void 0,(function*(){const{data}=yield this.sendRequest({method:baseApiClientTypes_1.HttpMethod.POST,url:lsidApiClientTypes_1.LsidEndpoints.passwordChange,handleErrorInOkStatus:this.handleErrorInOkStatus,data:{id,code:verificationType.code,password:verificationType.password,newpassword:newPassword}});(0,lsidApiClientUtils_1.checkDoneResData)(data,this.errorMessages)}))}forgottenPassword(email){return __awaiter(this,void 0,void 0,(function*(){const{namespace,projectId}=this.config,{data}=yield this.sendRequest({method:baseApiClientTypes_1.HttpMethod.POST,url:lsidApiClientTypes_1.LsidEndpoints.passwordForgotten,handleErrorInOkStatus:this.handleErrorInOkStatus,data:{email,namespace,p:projectId}});(0,lsidApiClientUtils_1.checkDoneResData)(data,this.errorMessages)}))}logout(loggedUserData){return __awaiter(this,void 0,void 0,(function*(){const{data}=yield this.sendRequest({method:baseApiClientTypes_1.HttpMethod.POST,url:lsidApiClientTypes_1.LsidEndpoints.logout,handleErrorInOkStatus:this.handleErrorInOkStatus,data:{loggedIn:loggedUserData}});(0,lsidApiClientUtils_1.checkDoneResData)(data,this.errorMessages)}))}getData(loggedUserData){return __awaiter(this,void 0,void 0,(function*(){const{projectId}=this.config,{data:resData}=yield this.sendRequest({method:baseApiClientTypes_1.HttpMethod.POST,url:lsidApiClientTypes_1.LsidEndpoints.getData,handleErrorInOkStatus:this.handleErrorInOkStatus,data:{loggedIn:loggedUserData,project:projectId}}),{data,privateData,profile}=resData;return{data,privateData,profile,termsAgreements:(0,lsidApiClientUtils_1.getTermsAgreementsInfo)(resData)}}))}storeMergeData(loggedIn,key,dataDiff){return __awaiter(this,void 0,void 0,(function*(){const{projectId}=this.config,{data}=yield this.sendRequest({method:baseApiClientTypes_1.HttpMethod.POST,url:lsidApiClientTypes_1.LsidEndpoints.storemergedata,handleErrorInOkStatus:this.handleErrorInOkStatus,data:{loggedIn,key,dataDiff,project:projectId}});return{termsAgreements:(0,lsidApiClientUtils_1.getTermsAgreementsInfo)(data)}}))}updateUser(loggedIn,updateUser){return __awaiter(this,void 0,void 0,(function*(){const{projectId}=this.config,{data}=yield this.sendRequest({method:baseApiClientTypes_1.HttpMethod.POST,url:lsidApiClientTypes_1.LsidEndpoints.updateUser,handleErrorInOkStatus:this.handleErrorInOkStatus,data:Object.assign(Object.assign({},updateUser),{loggedIn,project:projectId})});(0,lsidApiClientUtils_1.checkDoneResData)(data,this.errorMessages)}))}captchaForgottenPassword(forgottenPasswordData){return __awaiter(this,void 0,void 0,(function*(){const{namespace,projectId}=this.config;yield this.sendRequest({method:baseApiClientTypes_1.HttpMethod.POST,url:lsidApiClientTypes_1.LsidEndpoints.captchaForgottenPassword,handleV5ErrorResponse:this.handleV5ErrorResponse,data:Object.assign(Object.assign({},forgottenPasswordData),{projectId,namespace})})}))}getTouDocuments(archived){return __awaiter(this,void 0,void 0,(function*(){const{projectId}=this.config,{data}=yield this.sendRequest({method:baseApiClientTypes_1.HttpMethod.GET,url:lsidApiClientTypes_1.LsidEndpoints.touDocuments,params:{archived,projectIds:[projectId]}});return data}))}getTouDocumentByVersion(version){return __awaiter(this,void 0,void 0,(function*(){const{projectId}=this.config,{data}=yield this.sendRequest({method:baseApiClientTypes_1.HttpMethod.GET,url:(0,lsidApiClientUtils_1.getTouDocumentUrl)(projectId,version)});return data}))}marketingApproval(loggedUserData,reqData){return __awaiter(this,void 0,void 0,(function*(){yield this.sendRequest({method:baseApiClientTypes_1.HttpMethod.POST,url:lsidApiClientTypes_1.LsidEndpoints.myTerms,headers:(0,lsidApiClientUtils_1.getAuthorizationHeaders)(loggedUserData),data:(0,lsidApiClientUtils_1.getParsedMarketingApprovalData)(reqData)})}))}myTerms(loggedUserData){return __awaiter(this,void 0,void 0,(function*(){const{projectId}=this.config,{data}=yield this.sendRequest({method:baseApiClientTypes_1.HttpMethod.GET,url:lsidApiClientTypes_1.LsidEndpoints.myTerms,headers:(0,lsidApiClientUtils_1.getAuthorizationHeaders)(loggedUserData),params:{projectIds:[projectId]}});return data}))}termsAgreements(loggedUserData,errors){return __awaiter(this,void 0,void 0,(function*(){const{projectId}=this.config,errorDetails=(0,lsidApiClientUtils_1.getTermsAgreementsErrors)(errors).map((({detail})=>detail));errorDetails.length>0&&(yield this.sendRequest({method:baseApiClientTypes_1.HttpMethod.POST,url:lsidApiClientTypes_1.LsidEndpoints.termsAgreements,headers:(0,lsidApiClientUtils_1.getAuthorizationHeaders)(loggedUserData),data:{projectId,terms:errorDetails}}))}))}}exports.default=LsidApiClient},6095:(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.TERMS_AGREEMENTS_ERROR_TYPES=void 0;const lsidApiClientTypes_1=__webpack_require__(6985);exports.TERMS_AGREEMENTS_ERROR_TYPES=Object.values(lsidApiClientTypes_1.LsidTermsOfUseErrorTypes)},7195:(__unused_webpack_module,exports)=>{"use strict";var LsidErrorTypes;Object.defineProperty(exports,"__esModule",{value:!0}),exports.lsidErrors=exports.TechnicalError=exports.RegistrationAlreadyExists=exports.InvalidCaptcha=exports.VerificationFailed=exports.InvalidRequestData=exports.RegistrationNotConfirmed=exports.LoginMissmatch=exports.LsidError=void 0,function(LsidErrorTypes){LsidErrorTypes[LsidErrorTypes.InternalError=1e3]="InternalError",LsidErrorTypes[LsidErrorTypes.LoginMissmatch=1001]="LoginMissmatch",LsidErrorTypes[LsidErrorTypes.RegistrationNotConfirmed=1002]="RegistrationNotConfirmed",LsidErrorTypes[LsidErrorTypes.InvalidRequestData=1003]="InvalidRequestData",LsidErrorTypes[LsidErrorTypes.VerificationFailed=1004]="VerificationFailed",LsidErrorTypes[LsidErrorTypes.InvalidCaptcha=1005]="InvalidCaptcha",LsidErrorTypes[LsidErrorTypes.RegistrationAlreadyExists=1006]="RegistrationAlreadyExists",LsidErrorTypes[LsidErrorTypes.TechnicalError=1007]="TechnicalError"}(LsidErrorTypes||(LsidErrorTypes={}));class LsidError extends Error{constructor(lsidErrorCode,msg){super(msg),this.code=lsidErrorCode}}exports.LsidError=LsidError;class LoginMissmatch extends LsidError{constructor(msg="Wrong email or password!"){super(LsidErrorTypes.LoginMissmatch,msg)}}exports.LoginMissmatch=LoginMissmatch;class RegistrationNotConfirmed extends LsidError{constructor(msg="Registration not confirmed!"){super(LsidErrorTypes.RegistrationNotConfirmed,msg)}}exports.RegistrationNotConfirmed=RegistrationNotConfirmed;class InvalidRequestData extends LsidError{constructor(msg="Data sent to LSID are invalid!"){super(LsidErrorTypes.InvalidRequestData,msg)}}exports.InvalidRequestData=InvalidRequestData;class VerificationFailed extends LsidError{constructor(msg="Verification failed!"){super(LsidErrorTypes.VerificationFailed,msg)}}exports.VerificationFailed=VerificationFailed;class InvalidCaptcha extends LsidError{constructor(msg="Invalid captcha!"){super(LsidErrorTypes.InvalidCaptcha,msg)}}exports.InvalidCaptcha=InvalidCaptcha;class RegistrationAlreadyExists extends LsidError{constructor(msg="User already exists!"){super(LsidErrorTypes.RegistrationAlreadyExists,msg)}}exports.RegistrationAlreadyExists=RegistrationAlreadyExists;class TechnicalError extends LsidError{constructor(msg="Does not found success response."){super(LsidErrorTypes.TechnicalError,msg)}}exports.TechnicalError=TechnicalError,exports.lsidErrors={loginMissmatch:msg=>new LoginMissmatch(msg),registrationNotConfirmed:msg=>new RegistrationNotConfirmed(msg),invalidRequestData:msg=>new InvalidRequestData(msg),verificationFailed:msg=>new VerificationFailed(msg),invalidCaptcha:msg=>new InvalidCaptcha(msg),registrationAlreadyExists:msg=>new RegistrationAlreadyExists(msg),technicalError:msg=>new TechnicalError(msg)}},6985:(__unused_webpack_module,exports)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.LsidEndpoints=exports.LsidTermsOfUseErrorTypes=void 0,function(LsidTermsOfUseErrorTypes){LsidTermsOfUseErrorTypes.termsOfUse="tou",LsidTermsOfUseErrorTypes.privacyPolicy="pp"}(exports.LsidTermsOfUseErrorTypes||(exports.LsidTermsOfUseErrorTypes={})),function(LsidEndpoints){LsidEndpoints.login="/v3/login",LsidEndpoints.termsAgree="/v3/termsagree",LsidEndpoints.verification="/v3/verification",LsidEndpoints.loginUsingProvider="/v3/loginusingprovider",LsidEndpoints.registration="/v3/registration",LsidEndpoints.logout="/v3/logout",LsidEndpoints.deleteAccount="/v3/deleteaccount",LsidEndpoints.storemergedata="/v3/storemergeddata",LsidEndpoints.getData="/v3/getdata",LsidEndpoints.passwordChange="/v3/passwordchange",LsidEndpoints.passwordForgotten="/v3/forgottenpassword",LsidEndpoints.updateUser="/v3/update-user",LsidEndpoints.marketingApproval="/v5/users/me/marketing-approval",LsidEndpoints.myTerms="/v5/users/me/terms",LsidEndpoints.termsAgreements="/v5/users/me/terms-agreements",LsidEndpoints.touDocuments="/v5/terms/tou/documents",LsidEndpoints.captchaForgottenPassword="/v5/accounts/forgotten-password"}(exports.LsidEndpoints||(exports.LsidEndpoints={}))},2826:function(__unused_webpack_module,exports,__webpack_require__){"use strict";var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.getParsedMarketingApprovalData=exports.getTouDocumentUrl=exports.getAuthorizationHeaders=exports.getProviderLoginUserData=exports.getLoginUserData=exports.getTermsAgreementsInfo=exports.getTermsAgreementsErrors=exports.checkDoneResData=exports.checkResData=void 0;const get_1=__importDefault(__webpack_require__(63)),lsid_shared_library_1=__webpack_require__(5661),lsidApiClientErrors_1=__webpack_require__(7195),lsidApiClientTypes_1=__webpack_require__(6985),lsidApiClientConsts_1=__webpack_require__(6095);exports.checkResData=(data,checkKeys,errMessages)=>{const missingKeys=checkKeys.filter((key=>!data[key]));if(missingKeys.length>0){const defaultErrMsg=`Does not found ${missingKeys.join(", ")} in response!`;throw lsidApiClientErrors_1.lsidErrors.technicalError((0,get_1.default)(errMessages,"technicalError",defaultErrMsg))}};exports.checkDoneResData=(data,errMessages)=>(0,exports.checkResData)(data,["r"],errMessages);exports.getTermsAgreementsErrors=errors=>errors.filter((({detail})=>lsidApiClientConsts_1.TERMS_AGREEMENTS_ERROR_TYPES.some((errorType=>detail[errorType]))));exports.getTermsAgreementsInfo=({err2,errors})=>{const defaultRes=Object.assign(Object.assign({},{ppConfirmed:!0,touConfirmed:!0}),{errors:[]});return errors?(err2===lsid_shared_library_1.LsidResponseErrorCodes.termsConfrimationNeeded&&errors.forEach((({detail})=>{lsidApiClientConsts_1.TERMS_AGREEMENTS_ERROR_TYPES.forEach((errorType=>{detail[errorType]&&(defaultRes[`${errorType}Confirmed`]=!1)}))})),Object.assign(Object.assign({},defaultRes),{errors})):defaultRes};exports.getLoginUserData=(loginResBody,errMessages)=>{const{id,hash}=loginResBody;return(0,exports.checkResData)(loginResBody,["id","hash"],errMessages),{id,hash,termsAgreements:(0,exports.getTermsAgreementsInfo)(loginResBody)}};exports.getProviderLoginUserData=(data,errMessages)=>{const{isRegistration}=data;return Object.assign(Object.assign({},(0,exports.getLoginUserData)(data,errMessages)),{isRegistration:Boolean(isRegistration)})};exports.getAuthorizationHeaders=({id,hash})=>({Authorization:`Basic ${btoa(`${id}:${hash}`)}`});exports.getTouDocumentUrl=(projectId,version)=>{const urlPostfix=version||`latest?projectId=${projectId}`;return`${lsidApiClientTypes_1.LsidEndpoints.touDocuments}/${urlPostfix}`};exports.getParsedMarketingApprovalData=({direct,indirect}={})=>{const parsedDirect=Boolean(direct);return{direct:parsedDirect,indirect:!!parsedDirect&&Boolean(indirect)}}},8995:(__unused_webpack_module,exports)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0});exports.default=class{constructor(name){this.name=name}get _name(){return this.name}}},2453:function(__unused_webpack_module,exports,__webpack_require__){"use strict";var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0});const baseError_1=__importDefault(__webpack_require__(9305));class ApiCallError extends baseError_1.default{constructor(message,statusCode,code,data){super(message),this.code=code,this.data=data,this.statusCode=statusCode}}exports.default=ApiCallError},9305:(__unused_webpack_module,exports)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0});class BaseError extends Error{constructor(message){super(message),Error.captureStackTrace(this,this.constructor)}}exports.default=BaseError},8523:function(__unused_webpack_module,exports,__webpack_require__){"use strict";var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0});const baseError_1=__importDefault(__webpack_require__(9305));class MissingResponseError extends baseError_1.default{constructor(message){super(message)}}exports.default=MissingResponseError},1090:function(__unused_webpack_module,exports,__webpack_require__){"use strict";var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0});const baseError_1=__importDefault(__webpack_require__(9305));class RequestError extends baseError_1.default{constructor(message){super(message)}}exports.default=RequestError},1200:(__unused_webpack_module,exports)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.objectsDiff=void 0;exports.objectsDiff=(newObject,oldObject,prefixKey="")=>{let added=[],removed=[],updated=[];for(const key of Object.keys(newObject)){const prefixedKey=`${prefixKey}${key}`;if(void 0!==oldObject[key])if(typeof newObject[key]==typeof oldObject[key])if(newObject[key])switch(typeof newObject[key]){case"object":{const objDiffs=(0,exports.objectsDiff)(newObject[key],oldObject[key],`${prefixKey}${key}.`);added=[...added,...objDiffs.added],removed=[...removed,...objDiffs.removed],updated=[...updated,...objDiffs.updated];break}case"function":newObject[key].toString()!==oldObject[key].toString()&&updated.push(prefixedKey);break;default:newObject[key]!==oldObject[key]&&updated.push(prefixedKey)}else oldObject[key]&&updated.push(prefixedKey);else updated.push(prefixedKey);else added.push(prefixedKey)}for(const key of Object.keys(oldObject)){const prefixedKey=`${prefixKey}${key}`;void 0===newObject[key]&&removed.push(prefixedKey)}return{added,removed,updated}}},285:function(__unused_webpack_module,exports,__webpack_require__){"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(o,m,k,k2){void 0===k2&&(k2=k);var desc=Object.getOwnPropertyDescriptor(m,k);desc&&!("get"in desc?!m.__esModule:desc.writable||desc.configurable)||(desc={enumerable:!0,get:function(){return m[k]}}),Object.defineProperty(o,k2,desc)}:function(o,m,k,k2){void 0===k2&&(k2=k),o[k2]=m[k]}),__exportStar=this&&this.__exportStar||function(m,exports){for(var p in m)"default"===p||Object.prototype.hasOwnProperty.call(exports,p)||__createBinding(exports,m,p)},__importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var lsidClient_1=__webpack_require__(61);Object.defineProperty(exports,"default",{enumerable:!0,get:function(){return __importDefault(lsidClient_1).default}}),__exportStar(__webpack_require__(3898),exports),__exportStar(__webpack_require__(4557),exports),__exportStar(__webpack_require__(1909),exports)},61:function(__unused_webpack_module,exports,__webpack_require__){"use strict";var __awaiter=this&&this.__awaiter||function(thisArg,_arguments,P,generator){return new(P||(P=Promise))((function(resolve,reject){function fulfilled(value){try{step(generator.next(value))}catch(e){reject(e)}}function rejected(value){try{step(generator.throw(value))}catch(e){reject(e)}}function step(result){var value;result.done?resolve(result.value):(value=result.value,value instanceof P?value:new P((function(resolve){resolve(value)}))).then(fulfilled,rejected)}step((generator=generator.apply(thisArg,_arguments||[])).next())}))},__importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0});const baseNamedClass_1=__importDefault(__webpack_require__(8995)),isEmpty_1=__importDefault(__webpack_require__(4001)),lsidApiClientErrors_1=__webpack_require__(7195),userObject_1=__importDefault(__webpack_require__(3375)),utils_1=__webpack_require__(1200),lsidClientConts_1=__webpack_require__(3898);class LsidClient extends baseNamedClass_1.default{constructor(config,storage,lsidApiClient,name="LsidClient"){var _a;super(name),this.storage=storage,this.lsidApiClient=lsidApiClient,this.config=Object.assign(Object.assign({},config),{storage:{storeKeys:Object.assign(Object.assign({},lsidClientConts_1.DEFAULT_STORAGE_KEYS),null===(_a=config.storage)||void 0===_a?void 0:_a.storeKeys)}}),this.profile=new userObject_1.default(this.config.storage.storeKeys,storage)}registration(registrationData){return __awaiter(this,void 0,void 0,(function*(){try{yield this.lsidApiClient.lsidApiEndpoints().registration(registrationData)}catch(err){this.handleLsidErrors(err)}}))}login(loginData){return __awaiter(this,void 0,void 0,(function*(){try{const loggedUser=yield this.lsidApiClient.lsidApiEndpoints().login(loginData);return yield this.saveLoggedUser(loggedUser),yield this.storeLocalDataAfterLogin(),loggedUser}catch(err){this.handleLsidErrors(err)}}))}loginUsingProvider(loginData){return __awaiter(this,void 0,void 0,(function*(){try{const loggedUser=yield this.lsidApiClient.lsidApiEndpoints().loginUsingProvider(loginData);return yield this.saveLoggedUser(loggedUser),yield this.storeLocalDataAfterLogin(),loggedUser}catch(err){this.handleLsidErrors(err)}}))}termsAgree(){return __awaiter(this,void 0,void 0,(function*(){const loggedUserData=yield this.profile.getLoggedUserData();if(loggedUserData)try{yield this.lsidApiClient.lsidApiEndpoints().termsAgree(loggedUserData)}catch(err){this.handleLsidErrors(err)}}))}termsAgreements(){return __awaiter(this,void 0,void 0,(function*(){const loggedUserData=yield this.profile.getLoggedUserData();if(!loggedUserData)return;const backendErrors=yield this.profile.getBackendErrors();try{yield this.lsidApiClient.lsidApiEndpoints().termsAgreements(loggedUserData,backendErrors)}catch(err){this.handleLsidErrors(err)}}))}myTerms(){return __awaiter(this,void 0,void 0,(function*(){const loggedUserData=yield this.profile.getLoggedUserData();if(loggedUserData)return this.lsidApiClient.lsidApiEndpoints().myTerms(loggedUserData)}))}verifyAccount(id,code,type){return __awaiter(this,void 0,void 0,(function*(){try{return yield this.lsidApiClient.lsidApiEndpoints().verifyAccount(id,code,type)}catch(err){this.handleLsidErrors(err)}}))}deleteAccount(){return __awaiter(this,void 0,void 0,(function*(){const loggedUserData=yield this.profile.getLoggedUserData();if(loggedUserData)try{yield this.lsidApiClient.lsidApiEndpoints().deleteAccount(loggedUserData)}catch(err){this.handleLsidErrors(err)}finally{yield this.dropDataWithLogout()}}))}changePassword(id,newPassword,verificationType){return __awaiter(this,void 0,void 0,(function*(){try{yield this.lsidApiClient.lsidApiEndpoints().changePassword(id,newPassword,verificationType)}catch(err){this.handleLsidErrors(err)}}))}forgottenPassword(email){return __awaiter(this,void 0,void 0,(function*(){try{yield this.lsidApiClient.lsidApiEndpoints().forgottenPassword(email)}catch(err){this.handleLsidErrors(err)}}))}captchaForgottenPassword(forgottenPasswordData){return __awaiter(this,void 0,void 0,(function*(){try{yield this.lsidApiClient.lsidApiEndpoints().captchaForgottenPassword(forgottenPasswordData)}catch(err){this.handleLsidErrors(err)}}))}logout(){return __awaiter(this,void 0,void 0,(function*(){const loggedUserData=yield this.profile.getLoggedUserData();if(loggedUserData)try{yield this.lsidApiClient.lsidApiEndpoints().logout(loggedUserData),yield this.dropDataWithLogout()}catch(err){this.handleLsidErrors(err)}}))}getData(){return __awaiter(this,void 0,void 0,(function*(){const loggedUserData=yield this.profile.getLoggedUserData();if(loggedUserData)try{const data=yield this.lsidApiClient.lsidApiEndpoints().getData(loggedUserData);yield this.saveGetData(data)}catch(err){this.handleLsidErrors(err)}}))}storeMergeData({key,newData}){return __awaiter(this,void 0,void 0,(function*(){const oldData=yield this.profile.getData(key),dataDiffObj=(0,utils_1.objectsDiff)(newData,oldData||{});yield this.profile.setData(key,newData);const loggedUserData=yield this.profile.getLoggedUserData();if(!loggedUserData)return;const merge={},unmerge=dataDiffObj.removed;for(const keyDiff of[...dataDiffObj.added,...dataDiffObj.updated])merge[keyDiff]=yield this.profile.getData(""===key?keyDiff:`${key}.${keyDiff}`);try{const{termsAgreements}=yield this.lsidApiClient.lsidApiEndpoints().storeMergeData(loggedUserData,key,{merge,unmerge});yield this.saveTermsAgreements(termsAgreements)}catch(err){this.handleLsidErrors(err)}}))}updateUser(updateUser){return __awaiter(this,void 0,void 0,(function*(){if(0===Object.keys(updateUser).length)return;const loggedUserData=yield this.profile.getLoggedUserData();if(!loggedUserData)return;try{yield this.lsidApiClient.lsidApiEndpoints().updateUser(loggedUserData,updateUser)}catch(err){this.handleLsidErrors(err)}const updateStorage=[];Object.entries(updateUser).forEach((([key,value])=>{if("email"===key)updateStorage.push(this.profile.setEmail(value))})),yield Promise.all(updateStorage)}))}getTouDocuments(archived){return __awaiter(this,void 0,void 0,(function*(){return this.lsidApiClient.lsidApiEndpoints().getTouDocuments(archived)}))}getTouDocumentByVersion(version){return __awaiter(this,void 0,void 0,(function*(){return this.lsidApiClient.lsidApiEndpoints().getTouDocumentByVersion(version)}))}marketingApproval(marketingApprovalData){return __awaiter(this,void 0,void 0,(function*(){const loggedUserData=yield this.profile.getLoggedUserData();loggedUserData&&(yield this.lsidApiClient.lsidApiEndpoints().marketingApproval(loggedUserData,marketingApprovalData))}))}handleLsidErrors(err){if(err instanceof lsidApiClientErrors_1.LsidError)throw err;const{message}=err;throw new lsidApiClientErrors_1.TechnicalError(message)}storeLocalDataAfterLogin(){return __awaiter(this,void 0,void 0,(function*(){const dataFromStorage=yield this.profile.getData("");yield this.getData();const dataFromDb=yield this.profile.getData("");(0,isEmpty_1.default)(dataFromDb)&&!(0,isEmpty_1.default)(dataFromStorage)&&(yield this.storeMergeData({key:"",newData:dataFromStorage}),yield this.profile.setData("",dataFromStorage))}))}saveLoggedUser({id,hash,termsAgreements}){return __awaiter(this,void 0,void 0,(function*(){yield Promise.all([this.profile.setId(id),this.profile.setHash(hash),this.saveTermsAgreements(termsAgreements)])}))}saveGetData({profile,data,privateData,termsAgreements}){return __awaiter(this,void 0,void 0,(function*(){yield Promise.all([this.saveProfile(profile),this.profile.setData("",data),this.profile.setPrivateData("",privateData),this.saveTermsAgreements(termsAgreements)])}))}saveProfile(profile){return __awaiter(this,void 0,void 0,(function*(){if(!profile)return;const{id,name,email,emailIsVerified}=profile;yield Promise.all([this.profile.setId(id),this.profile.setName(name),this.profile.setEmail(email),this.profile.setEmailIsVerified(emailIsVerified)])}))}saveTermsAgreements({ppConfirmed,touConfirmed,errors}){return __awaiter(this,void 0,void 0,(function*(){yield Promise.all([this.profile.setPpConfirmed(ppConfirmed),this.profile.setTouConfirmed(touConfirmed),this.profile.setBackendErrors(errors)])}))}dropDataWithLogout(){return __awaiter(this,void 0,void 0,(function*(){yield this.profile.clearUser()}))}}exports.default=LsidClient},3898:(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.DEFAULT_STORAGE_KEYS=void 0;const lsidClientStorageParsers_1=__webpack_require__(1909);exports.DEFAULT_STORAGE_KEYS={id:{storageKey:"lsid_id",parser:lsidClientStorageParsers_1.stringStorageParser},hash:{storageKey:"lsid_hash",parser:lsidClientStorageParsers_1.stringStorageParser},name:{storageKey:"lsid_name",parser:lsidClientStorageParsers_1.stringStorageParser},email:{storageKey:"lsid_email",parser:lsidClientStorageParsers_1.stringStorageParser},emailIsVerified:{storageKey:"lsid_emailIsVerified",parser:lsidClientStorageParsers_1.booleanStorageParser},ppConfirmed:{storageKey:"lsid_ppConfirmed",parser:lsidClientStorageParsers_1.booleanStorageParser},touConfirmed:{storageKey:"lsid_touConfirmed",parser:lsidClientStorageParsers_1.booleanStorageParser},data:{storageKey:"lsid_data",parser:lsidClientStorageParsers_1.objectStorageParser},privateData:{storageKey:"lsid_privateData",parser:lsidClientStorageParsers_1.objectStorageParser},backendErrors:{storageKey:"lsid_backendErrors",parser:lsidClientStorageParsers_1.objectStorageParser}}},1909:(__unused_webpack_module,exports)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.objectStorageParser=exports.stringStorageParser=exports.booleanStorageParser=void 0,exports.booleanStorageParser={in:inData=>inData.toString(),out:outData=>"true"===outData},exports.stringStorageParser={in:inData=>inData,out:outData=>outData},exports.objectStorageParser={in:inData=>JSON.stringify(inData),out:outData=>outData?JSON.parse(outData):{}}},4557:(__unused_webpack_module,exports)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0})},8278:function(__unused_webpack_module,exports,__webpack_require__){"use strict";var __awaiter=this&&this.__awaiter||function(thisArg,_arguments,P,generator){return new(P||(P=Promise))((function(resolve,reject){function fulfilled(value){try{step(generator.next(value))}catch(e){reject(e)}}function rejected(value){try{step(generator.throw(value))}catch(e){reject(e)}}function step(result){var value;result.done?resolve(result.value):(value=result.value,value instanceof P?value:new P((function(resolve){resolve(value)}))).then(fulfilled,rejected)}step((generator=generator.apply(thisArg,_arguments||[])).next())}))},__importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0});const idb_1=__webpack_require__(3029),baseNamedClass_1=__importDefault(__webpack_require__(8995));class IDBStorageClient extends baseNamedClass_1.default{constructor(config,name="IDBStorageClient"){super(name),this._config=config,this.database=(0,idb_1.openDB)(this.config.storageName,1,{upgrade(db){db.createObjectStore(config.objectStoreName)}})}get config(){return this._config}get(key){return __awaiter(this,void 0,void 0,(function*(){return(yield this.database).get(this.config.objectStoreName,key)}))}put(key,val){return __awaiter(this,void 0,void 0,(function*(){const tx=(yield this.database).transaction(this.config.objectStoreName,"readwrite");return yield tx.store.put(val,key),tx.done}))}delete(key){return __awaiter(this,void 0,void 0,(function*(){return(yield this.database).delete(this.config.objectStoreName,key)}))}}exports.default=IDBStorageClient},3722:function(__unused_webpack_module,exports,__webpack_require__){"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(o,m,k,k2){void 0===k2&&(k2=k);var desc=Object.getOwnPropertyDescriptor(m,k);desc&&!("get"in desc?!m.__esModule:desc.writable||desc.configurable)||(desc={enumerable:!0,get:function(){return m[k]}}),Object.defineProperty(o,k2,desc)}:function(o,m,k,k2){void 0===k2&&(k2=k),o[k2]=m[k]}),__exportStar=this&&this.__exportStar||function(m,exports){for(var p in m)"default"===p||Object.prototype.hasOwnProperty.call(exports,p)||__createBinding(exports,m,p)},__importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.LocalStorageClient=exports.IDBStorageClient=void 0;var iDBStorageClient_1=__webpack_require__(8278);Object.defineProperty(exports,"IDBStorageClient",{enumerable:!0,get:function(){return __importDefault(iDBStorageClient_1).default}});var localStorageClient_1=__webpack_require__(1618);Object.defineProperty(exports,"LocalStorageClient",{enumerable:!0,get:function(){return __importDefault(localStorageClient_1).default}}),__exportStar(__webpack_require__(4005),exports)},1618:function(__unused_webpack_module,exports,__webpack_require__){"use strict";var __awaiter=this&&this.__awaiter||function(thisArg,_arguments,P,generator){return new(P||(P=Promise))((function(resolve,reject){function fulfilled(value){try{step(generator.next(value))}catch(e){reject(e)}}function rejected(value){try{step(generator.throw(value))}catch(e){reject(e)}}function step(result){var value;result.done?resolve(result.value):(value=result.value,value instanceof P?value:new P((function(resolve){resolve(value)}))).then(fulfilled,rejected)}step((generator=generator.apply(thisArg,_arguments||[])).next())}))},__importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0});const baseNamedClass_1=__importDefault(__webpack_require__(8995));class LocalStorageClient extends baseNamedClass_1.default{constructor(name="LocalStorageClient"){super(name)}get(key){return __awaiter(this,void 0,void 0,(function*(){return localStorage.getItem(key)}))}put(key,val){return __awaiter(this,void 0,void 0,(function*(){return localStorage.setItem(key,val)}))}delete(key){return __awaiter(this,void 0,void 0,(function*(){return localStorage.removeItem(key)}))}}exports.default=LocalStorageClient},4005:(__unused_webpack_module,exports)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0})},3375:function(__unused_webpack_module,exports,__webpack_require__){"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(o,m,k,k2){void 0===k2&&(k2=k);var desc=Object.getOwnPropertyDescriptor(m,k);desc&&!("get"in desc?!m.__esModule:desc.writable||desc.configurable)||(desc={enumerable:!0,get:function(){return m[k]}}),Object.defineProperty(o,k2,desc)}:function(o,m,k,k2){void 0===k2&&(k2=k),o[k2]=m[k]}),__exportStar=this&&this.__exportStar||function(m,exports){for(var p in m)"default"===p||Object.prototype.hasOwnProperty.call(exports,p)||__createBinding(exports,m,p)},__importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var userObject_1=__webpack_require__(7651);Object.defineProperty(exports,"default",{enumerable:!0,get:function(){return __importDefault(userObject_1).default}}),__exportStar(__webpack_require__(9791),exports)},7651:function(__unused_webpack_module,exports,__webpack_require__){"use strict";var __awaiter=this&&this.__awaiter||function(thisArg,_arguments,P,generator){return new(P||(P=Promise))((function(resolve,reject){function fulfilled(value){try{step(generator.next(value))}catch(e){reject(e)}}function rejected(value){try{step(generator.throw(value))}catch(e){reject(e)}}function step(result){var value;result.done?resolve(result.value):(value=result.value,value instanceof P?value:new P((function(resolve){resolve(value)}))).then(fulfilled,rejected)}step((generator=generator.apply(thisArg,_arguments||[])).next())}))},__importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0});const get_1=__importDefault(__webpack_require__(63)),setWith_1=__importDefault(__webpack_require__(7466)),isNil_1=__importDefault(__webpack_require__(7601)),baseNamedClass_1=__importDefault(__webpack_require__(8995));class UserObject extends baseNamedClass_1.default{constructor(storageKeys,storage,name="UserObject"){super(name),this.storageKeys=storageKeys,this.storage=storage}clearUser(){return __awaiter(this,void 0,void 0,(function*(){yield Promise.all(Object.keys(this.storageKeys).map((storageKey=>this.deleteFromStorage(storageKey))))}))}getLoggedUserData(){return __awaiter(this,void 0,void 0,(function*(){const{id,hash}=yield this.getProfile();if(id&&hash)return{id,hash}}))}getBackendErrors(){return __awaiter(this,void 0,void 0,(function*(){const{backendErrors}=yield this.getProfile();return backendErrors||[]}))}getProfile(){return __awaiter(this,void 0,void 0,(function*(){return{id:yield this.getDataFromStorage("id"),hash:yield this.getDataFromStorage("hash"),name:yield this.getDataFromStorage("name"),email:yield this.getDataFromStorage("email"),emailIsVerified:yield this.getDataFromStorage("emailIsVerified"),ppConfirmed:yield this.getDataFromStorage("ppConfirmed"),touConfirmed:yield this.getDataFromStorage("touConfirmed"),backendErrors:yield this.getDataFromStorage("backendErrors")}}))}setId(id){return __awaiter(this,void 0,void 0,(function*(){yield this.setDataToStorage("id",id)}))}setHash(hash){return __awaiter(this,void 0,void 0,(function*(){yield this.setDataToStorage("hash",hash)}))}setName(name){return __awaiter(this,void 0,void 0,(function*(){yield this.setDataToStorage("name",name)}))}setEmail(email){return __awaiter(this,void 0,void 0,(function*(){yield this.setDataToStorage("email",email)}))}setEmailIsVerified(emailIsVerified){return __awaiter(this,void 0,void 0,(function*(){yield this.setDataToStorage("emailIsVerified",emailIsVerified)}))}setPpConfirmed(ppConfirmed){return __awaiter(this,void 0,void 0,(function*(){yield this.setDataToStorage("ppConfirmed",ppConfirmed)}))}setTouConfirmed(touConfirmed){return __awaiter(this,void 0,void 0,(function*(){yield this.setDataToStorage("touConfirmed",touConfirmed)}))}setBackendErrors(backendErrors){return __awaiter(this,void 0,void 0,(function*(){yield this.setDataToStorage("backendErrors",backendErrors)}))}getData(key){return __awaiter(this,void 0,void 0,(function*(){const data=yield this.getDataFromStorage("data");return key?(0,get_1.default)(data,key):data}))}setData(key,data){return __awaiter(this,void 0,void 0,(function*(){const dataToStore=key?(0,setWith_1.default)(yield this.getData(""),key,data,Object):data;yield this.setDataToStorage("data",dataToStore)}))}getPrivateData(key){return __awaiter(this,void 0,void 0,(function*(){const privateDate=yield this.getDataFromStorage("privateData");return key?(0,get_1.default)(privateDate,key):privateDate}))}setPrivateData(key,data){return __awaiter(this,void 0,void 0,(function*(){const dataToStore=key?(0,setWith_1.default)(yield this.getPrivateData(""),key,data,Object):data;yield this.setDataToStorage("privateData",dataToStore)}))}getDataFromStorage(key){return __awaiter(this,void 0,void 0,(function*(){const{storageKey,parser}=this.storageKeys[key],data=yield this.storage.get(storageKey);return parser.out(data)}))}setDataToStorage(key,value){return __awaiter(this,void 0,void 0,(function*(){if((0,isNil_1.default)(value))return;const{storageKey,parser}=this.storageKeys[key],parsedValue=parser.in(value);yield this.storage.put(storageKey,parsedValue)}))}deleteFromStorage(key){return __awaiter(this,void 0,void 0,(function*(){const{storageKey}=this.storageKeys[key];yield this.storage.delete(storageKey)}))}}exports.default=UserObject},9791:(__unused_webpack_module,exports)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0})},4001:(__unused_webpack_module,exports)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=function(obj){return!obj||0===Object.entries(obj).length}},905:(__unused_webpack_module,exports)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0});exports.default=value=>"number"==typeof value},7124:(__unused_webpack_module,exports)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0});exports.default=value=>"string"==typeof value},5661:(__unused_webpack_module,exports)=>{"use strict";var LsidResponseErrorCodes,LsidResponseSuccessCodes;Object.defineProperty(exports,"__esModule",{value:!0}),exports.LsidAccountStatus=exports.LsidVerificationTypes=exports.LsidEmails=exports.LsidPlatforms=exports.LsidLoginSocialProviders=exports.LsidResponseSuccessCodes=exports.LsidResponseErrorCodes=void 0,function(LsidResponseErrorCodes){LsidResponseErrorCodes.internalError="XE0",LsidResponseErrorCodes.loginMissmatch="XE1",LsidResponseErrorCodes.captchaMissmatch="XE2",LsidResponseErrorCodes.registrationDuplicate="XE3",LsidResponseErrorCodes.registrationNotConfirmed="XE4",LsidResponseErrorCodes.verificationFail="XE5",LsidResponseErrorCodes.loginProviderNotImplemented="XE6",LsidResponseErrorCodes.loginProviderNeedsEmail="XE7",LsidResponseErrorCodes.termsConfrimationNeeded="XE8",LsidResponseErrorCodes.appleRegistrationFail="XE9",LsidResponseErrorCodes.connectionAlreadyUsed="XE10",LsidResponseErrorCodes.validationError="XE11"}(LsidResponseErrorCodes=exports.LsidResponseErrorCodes||(exports.LsidResponseErrorCodes={})),function(LsidResponseSuccessCodes){LsidResponseSuccessCodes.done="XY1"}(LsidResponseSuccessCodes=exports.LsidResponseSuccessCodes||(exports.LsidResponseSuccessCodes={})),function(LsidLoginSocialProviders){LsidLoginSocialProviders.facebook="facebook",LsidLoginSocialProviders.google="google",LsidLoginSocialProviders.gso="gso",LsidLoginSocialProviders.apple="apple"}(exports.LsidLoginSocialProviders||(exports.LsidLoginSocialProviders={})),function(LsidPlatforms){LsidPlatforms.iOS="iOS",LsidPlatforms.Android="Android"}(exports.LsidPlatforms||(exports.LsidPlatforms={})),function(LsidEmails){LsidEmails.social="social",LsidEmails.forgottenPassword="forgottenPassword",LsidEmails.verify="verify",LsidEmails.deleteAccount="deleteAccount",LsidEmails.verifyEmail="verifyEmail"}(exports.LsidEmails||(exports.LsidEmails={})),function(LsidVerificationTypes){LsidVerificationTypes.verifyEmail="verifyEmail",LsidVerificationTypes.verifyAccount="verifyAccount"}(exports.LsidVerificationTypes||(exports.LsidVerificationTypes={})),function(LsidAccountStatus){LsidAccountStatus[LsidAccountStatus.verified=1]="verified",LsidAccountStatus[LsidAccountStatus.registrationNotConfirmed=2]="registrationNotConfirmed"}(exports.LsidAccountStatus||(exports.LsidAccountStatus={})),exports.default={responseCodes:{respCodes:{done:LsidResponseSuccessCodes.done},errorCodes:{internalError:LsidResponseErrorCodes.internalError,loginMissmatch:LsidResponseErrorCodes.loginMissmatch,captchaMissmatch:LsidResponseErrorCodes.captchaMissmatch,registrationDuplicate:LsidResponseErrorCodes.registrationDuplicate,registrationNotConfirmed:LsidResponseErrorCodes.registrationNotConfirmed,verificationFail:LsidResponseErrorCodes.verificationFail,loginProviderNotImplemented:LsidResponseErrorCodes.loginProviderNotImplemented,loginProviderNeedsEmail:LsidResponseErrorCodes.loginProviderNeedsEmail,termsConfrimationNeeded:LsidResponseErrorCodes.termsConfrimationNeeded,appleRegistrationFail:LsidResponseErrorCodes.appleRegistrationFail,connectionAlreadyUsed:LsidResponseErrorCodes.connectionAlreadyUsed,validationError:LsidResponseErrorCodes.validationError}},regexp:{mailRegexp:/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,mailInputPattern:"[A-Za-z0-9_\\-\\.]+@[A-Za-z0-9_\\-\\.]+\\.[A-Za-z]{2,4}",passwordRegexp:/^.{5,}$/,passwordInputPattern:".{5,}",nicknameRegexp:/^([A-Za-z0-9_\-\.]){5,}$/,nicknameInputPattern:"([A-Za-z0-9_\\-\\.]){5,}",nonemptyRegexp:/^.*([^\s]+).*$/,nonemptyInputPattern:".*([^\\s]+).*",verificationCodeRegexp:/^[a-f0-9]{40}$/,verificationCodeInputPattern:"[a-f0-9]{40}"},userValues:{emptyNickname:"_____"}}},3321:function(__unused_webpack_module,exports,__webpack_require__){"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(o,m,k,k2){void 0===k2&&(k2=k),Object.defineProperty(o,k2,{enumerable:!0,get:function(){return m[k]}})}:function(o,m,k,k2){void 0===k2&&(k2=k),o[k2]=m[k]}),__exportStar=this&&this.__exportStar||function(m,exports){for(var p in m)"default"===p||exports.hasOwnProperty(p)||__createBinding(exports,m,p)};Object.defineProperty(exports,"__esModule",{value:!0}),__exportStar(__webpack_require__(1020),exports)},9393:function(__unused_webpack_module,exports,__webpack_require__){"use strict";var __assign=this&&this.__assign||function(){return __assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t},__assign.apply(this,arguments)},__importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.BannerHandler=exports.CLIENT_TYPE=exports.ZoneState=void 0;var ZoneState,mobile_detect_1=__importDefault(__webpack_require__(2437)),bannerHandlerRegistry_1=__webpack_require__(5601);!function(ZoneState){ZoneState[ZoneState.HIDDEN=0]="HIDDEN",ZoneState[ZoneState.DISPLAYED=1]="DISPLAYED"}(ZoneState=exports.ZoneState||(exports.ZoneState={})),exports.CLIENT_TYPE={mobile:"mobile",tablet:"tablet",PC:"PC"};var ONETRUST_PROGRAMMATIC_OPTANON_GROUPS=["IABV2_1","IABV2_2","IABV2_3","IABV2_4","IABV2_5","IABV2_6","IABV2_7","IABV2_8","IABV2_9","IABV2_10"],BannerHandler=function(){function BannerHandler(zoneIds,elementsBackgrounds,adsServers,adsAdminUrl,noticeTextSelectors,noticeText,storage,zoneIdsCond,requestOnInit,topZoneIds,refreshRates,zoneList){void 0===noticeTextSelectors&&(noticeTextSelectors={}),void 0===noticeText&&(noticeText=""),void 0===storage&&(storage=null),void 0===zoneIdsCond&&(zoneIdsCond=null),void 0===requestOnInit&&(requestOnInit=!0),void 0===topZoneIds&&(topZoneIds=[]),void 0===refreshRates&&(refreshRates={}),void 0===zoneList&&(zoneList={}),this.zoneList=zoneList,this.allZoneIds=[],this.zoneIds=[],this.backupedDroppedZoneIds=[],this.refreshRateTimers={},this.adsServers=[],this.adsAdminUrl="",this.noticeText="",this.storage=null,this.requests=0,this.idPrefix="lsadvert-zid-",this.requested=!1,this.responseHandled=!1,this.displayed=!1,this.displayCalled=!1,this.adBlockedCallback=null,this.displayedCallback=null,this.zones={},this.capping={},this.cappingKey="",this.setBackgroundCallbacks=[],this.backgroundZonesWithOffset={},this.afterAdBackgroundElementCreatedCallbacks=[],this.bannersLoadedCallbacks=[],this.zoneStateCallbacks=[],this.adBlocked=null,this.betting=null,this.programmatic=null,this.clientTypes=exports.CLIENT_TYPE,this.backupPrepaired=!1,this.attachedEvents=!1,this.setIframeContentCounter=0,this.setIframeContentTimeout=20,this.backgroundSetTimeout=100,this.replaceZones=[],this.xHeaders={},this.testAdBlockElement=function(element){var _a=document.body.getBoundingClientRect(),width=_a.width,height=_a.height;return"none"===element.style.display||"none"===element.style.visibility||0===width||0===height},bannerHandlerRegistry_1.BannerHandlerRegistry.register(this);var windowWithBrowser=window;if(windowWithBrowser.browser=windowWithBrowser.browser||{},this.zoneIdsCond=zoneIdsCond,this.allZoneIdsCond=zoneIdsCond||{},zoneIds&&Array.isArray(zoneIds)&&(this.allZoneIds=zoneIds,this.zoneIds=this.filterZoneIdsByBreakpoints(zoneIds)),this.topZoneIds=topZoneIds,this.noticeTextSelectors=noticeTextSelectors,this.elementsBackgrounds=elementsBackgrounds,this.refreshRates=refreshRates,adsServers&&Array.isArray(zoneIds)&&(this.adsServers=adsServers),this.adsAdminUrl=adsAdminUrl,this.validateBackgroundZones(),this.noticeText=noticeText,this.storage=storage,this.maxRequests=Math.min(3,this.adsServers.length),this.requestTTL=1===this.maxRequests?15:2,this.urlTemplate="{URL}/delivery?zones=",this.storage){var date=new Date;this.cappingKey="advertCapping_"+date.getFullYear()+"_"+date.getMonth()+"_"+date.getDate();var capping=this.storage.get(this.cappingKey);this.capping=capping?JSON.parse(capping):{}}this.tryFillXHeadersFromGlobalAppParam(),requestOnInit&&this.request()}return BannerHandler.prototype.setBetting=function(betting){return this.betting=betting,this},BannerHandler.prototype.getBettingPart=function(){return null!==this.betting?"&betting="+this.betting:""},BannerHandler.prototype.isProgrammaticAllowed=function(){var _a,_b,onetrustActiveGroups=window.OnetrustActiveGroups,oneTrustGroups=null===(_b=null===(_a=window.OneTrust)||void 0===_a?void 0:_a.GetDomainData())||void 0===_b?void 0:_b.Groups;if(void 0===onetrustActiveGroups||void 0===oneTrustGroups)return!1;var ret=!0,activeGroups=onetrustActiveGroups.split(","),parentGroups=new Set;return oneTrustGroups.forEach((function(item){ONETRUST_PROGRAMMATIC_OPTANON_GROUPS.includes(item.OptanonGroupId)&&parentGroups.add(item.Parent)})),Array.from(parentGroups).filter((function(item){return""!==item})).every((function(item){return!!activeGroups.includes(item)||(ret=!1,!1)})),ret},BannerHandler.prototype.setProgrammatic=function(programmatic){return this.programmatic=programmatic,this},BannerHandler.prototype.getProgrammaticPart=function(){return null===this.programmatic&&(this.programmatic=this.isProgrammaticAllowed()),this.programmatic?"":"&programmatic=false"},BannerHandler.prototype.disableZone=function(zoneId){var indexOfZone=this.zoneIds.indexOf(zoneId);return-1!==indexOfZone&&(this.backupedDroppedZoneIds.push(zoneId),this.zoneIds.splice(indexOfZone,1),!0)},BannerHandler.prototype.enableZone=function(zoneId){var indexOfDroppedZone=this.backupedDroppedZoneIds.indexOf(zoneId);return-1!==indexOfDroppedZone&&(this.zoneIds.push(zoneId),this.backupedDroppedZoneIds.splice(indexOfDroppedZone,1),this.resetState(),!0)},BannerHandler.prototype.replaceZone=function(originalId,newId){var _this=this;return!!this.zones[originalId]&&(this.replaceZones.push({originalId,newId}),window.clearTimeout(this.replaceZonesTimeout),this.replaceZonesTimeout=window.setTimeout((function(){_this.resetState(),_this.requestReplaceZones()}),75),!0)},BannerHandler.prototype.resetState=function(){return this.displayed=!1,this.responseHandled=!1,this.requested=!1,this.requests=0,this},BannerHandler.prototype.validateBackgroundZones=function(){if(this.getClientType()===this.clientTypes.mobile){var newZoneIds=[];for(var zoneIndex in this.zoneIds)void 0===this.elementsBackgrounds[this.zoneIds[zoneIndex]]&&newZoneIds.push(this.zoneIds[zoneIndex]);this.zoneIds=newZoneIds,this.elementsBackgrounds={}}},BannerHandler.prototype.setAdBlockedCallback=function(callback){return this.adBlockedCallback=callback,this},BannerHandler.prototype.setDisplayedCallback=function(callback){return this.displayedCallback=callback,this},BannerHandler.prototype.addSetBackgroundCallback=function(callback){return this.setBackgroundCallbacks.push(callback),this},BannerHandler.prototype.addAfterAdBackgroundElementCreatedCallbacks=function(callback){return this.afterAdBackgroundElementCreatedCallbacks.push(callback),this},BannerHandler.prototype.addBannersLoadedCallback=function(callback){return this.bannersLoadedCallbacks.push(callback),this},BannerHandler.prototype.addZoneStateCallback=function(callback){return this.zoneStateCallbacks.push(callback),this},BannerHandler.prototype.hasFlashSupport=function(){try{var swfobject=window.swfobject;return!!(void 0!==swfobject&&swfobject.hasFlashPlayerVersion("1")||"application/x-shockwave-flash"in navigator.mimeTypes||window.ActiveXObject&&new ActiveXObject("ShockwaveFlash.ShockwaveFlash"))}catch(e){}return!1},BannerHandler.prototype.getClientType=function(){return mobile_detect_1.default._impl.isMobileFallback(navigator.userAgent||navigator.vendor||window.opera)?this.clientTypes.mobile:/android|ipad|playbook|silk/i.test(navigator.userAgent||navigator.vendor||window.opera)?this.clientTypes.tablet:this.clientTypes.PC},BannerHandler.prototype.getUrl=function(){var randUrlPos=Math.floor(Math.random()*this.adsServers.length),randUrl=this.urlTemplate.replace("{URL}",this.adsServers[randUrlPos]);return this.adsServers.length>1&&this.adsServers.splice(randUrlPos,1),randUrl},BannerHandler.prototype.getUrlCappingPart=function(){for(var retCap={},hasCap=!1,i=0;i<this.zoneIds.length;i++)if(void 0!==this.capping[this.zoneIds[i]])for(var j in hasCap=!0,this.capping[this.zoneIds[i]])retCap[j]=this.capping[this.zoneIds[i]][j];return hasCap?"&cap="+encodeURI(JSON.stringify(retCap)):""},BannerHandler.prototype.getUrlFlashPart=function(){return this.hasFlashSupport()?"":"&no_flash=1"},BannerHandler.prototype.getUrlClientTypePart=function(){return"&clientType="+this.getClientType()},BannerHandler.prototype.getZoneIdsWithMissingData=function(){if(0===Object.keys(this.zones).length)return this.zoneIds;var zonesToRequest=[];for(var key in this.zoneIds)this.zones[this.zoneIds[key]]||zonesToRequest.push(this.zoneIds[key]);return zonesToRequest},BannerHandler.prototype.viewportChanged=function(){var oldZoneIds=this.zoneIds,zoneIds=this.filterZoneIdsByBreakpoints(this.allZoneIds);for(var index in oldZoneIds){var zoneId=oldZoneIds[index];-1===zoneIds.indexOf(zoneId)&&this.hideZone(zoneId)}this.zoneIds=zoneIds;var zonesToRequest=this.getZoneIdsWithMissingData();for(var index in zoneIds){zoneId=zoneIds[index];-1===zonesToRequest.indexOf(zoneId)&&this.showZone(zoneId)}this.resetState(),this.request()},BannerHandler.prototype.xhrRequest=function(url,onSuccess,_a){var _b,_c,_d,_this=this,_e=void 0===_a?{}:_a,method=_e.method,timeout=_e.timeout,json=_e.json,jsonp=_e.jsonp,onError=_e.onError,xhr=new XMLHttpRequest;xhr.open(method||"GET",url),timeout&&(xhr.timeout=1e3*timeout),(null===(_b=this.xHeaders)||void 0===_b?void 0:_b.platform)&&xhr.setRequestHeader("x-platform",this.xHeaders.platform),(null===(_c=this.xHeaders)||void 0===_c?void 0:_c.version)&&xhr.setRequestHeader("x-version",this.xHeaders.version),(null===(_d=this.xHeaders)||void 0===_d?void 0:_d.package)&&xhr.setRequestHeader("x-package",this.xHeaders.package),xhr.onload=function(){200===xhr.status?onSuccess(json?JSON.parse(_this.parseJsonp(xhr.response,jsonp)):xhr.response):onError&&onError(xhr)},xhr.onerror=function(){return onError&&onError(xhr)};try{xhr.send()}catch(e){onError&&onError(xhr)}return xhr},BannerHandler.prototype.parseJsonp=function(data,jsonp){return jsonp?data.substring(data.indexOf("(")+1,data.lastIndexOf(")")):data},BannerHandler.prototype.request=function(){var zonesToRequest=this.getZoneIdsWithMissingData();this._request(zonesToRequest)},BannerHandler.prototype.requestReplaceZones=function(){var zonesToRequest=this.replaceZones.map((function(zone){return zone.newId}));this._request(zonesToRequest,!0)},BannerHandler.prototype._request=function(zonesToRequest,isBackup){var _this=this;if(void 0===isBackup&&(isBackup=!1),zonesToRequest.length>0){this.requests++;var url=this.getUrl()+zonesToRequest.join(",")+this.getUrlClientTypePart()+this.getUrlCappingPart()+this.getUrlFlashPart()+this.getBettingPart()+this.getProgrammaticPart()+(isBackup?"&backup=true":"");this.xhrRequest(url,(function(data){return _this.replaceGDPRMacrosInZoneData(data,zonesToRequest)}),{jsonp:!0,json:!0,onError:function(xhr){return _this.responseError(xhr)}})}this.requested=!0},BannerHandler.prototype.replaceGDPRMacrosInZoneData=function(data,requestedZones){var _this=this;"function"==typeof window.__tcfapi?window.__tcfapi("getTCData",2,(function(tcdata,success){var _a,gdprApplies="1",consent="";for(var zoneId in success&&(gdprApplies=tcdata.gdprApplies?"1":"0",consent=null!==(_a=tcdata.tcString)&&void 0!==_a?_a:""),data)data[zoneId].content.includes("flashtalking")&&(data[zoneId].content=data[zoneId].content.replace(/\${GDPR}/gi,gdprApplies),data[zoneId].content=data[zoneId].content.replace(/\${GDPR_CONSENT_\d+}/gi,consent));_this.setData(data,requestedZones)})):this.setData(data,requestedZones)},BannerHandler.prototype.setData=function(data,requestedZones){var _loop_1=function(zoneIdString){var zoneId=parseInt(zoneIdString),replaceZone=this_1.replaceZones.find((function(replaceZone){return replaceZone.newId===zoneId})),originalId=replaceZone?replaceZone.originalId:zoneId;this_1.zones[originalId]=data[zoneId],this_1.prepareZone(originalId),this_1.callBannersLoadedCallback(originalId),this_1.zoneIdsCond&&this_1.zoneIdsCond[originalId]&&this_1.zoneIdsCond[originalId].offset&&(this_1.backgroundZonesWithOffset[originalId]=this_1.zoneIdsCond[originalId].offset)},this_1=this;for(var zoneIdString in data)_loop_1(zoneIdString);if(this.replaceZones=[],this.responseHandled=!0,this.displayCalled)this.display();else for(var index=0;index<this.zoneIds.length;index++){var zoneId=this.zoneIds[index];this.zones[zoneId]&&this.zones[zoneId].content||this.hideZone(zoneId)}var storeCapping=!1,zonesCond=[];requestedZones||(requestedZones=this.zoneIds);for(var _i=0,requestedZones_1=requestedZones;_i<requestedZones_1.length;_i++){zoneId=requestedZones_1[_i];if(null!==this.zoneIdsCond&&void 0!==this.zoneIdsCond[zoneId]){var noZoneOrSecondRequest=void 0===this.zones[zoneId]||this.zoneIdsCond[zoneId].second_request,noZoneOrNoHeight=void 0===this.zones[zoneId]||void 0===this.zones[zoneId].h||this.zones[zoneId].h<=this.zoneIdsCond[zoneId].height;if(noZoneOrSecondRequest&&noZoneOrNoHeight)for(var i in this.zoneIdsCond[zoneId].zones)zonesCond.push(this.zoneIdsCond[zoneId].zones[i]);else for(var i in this.zoneIdsCond[zoneId].zones){if(zone=document.getElementById(this.idPrefix+this.zoneIdsCond[zoneId].zones[i])){zone.style.display="none";var wrapper=zone.closest?zone.closest("div.adsbackground-wrapper"):null;wrapper&&(wrapper.style.display="none")}}}}for(var zone in this.zones)void 0!==this.zones[zone].cap&&(void 0===this.capping[zone]&&(this.capping[zone]={}),void 0===this.capping[zone][this.zones[zone].cap]?this.capping[zone][this.zones[zone].cap]=1:this.capping[zone][this.zones[zone].cap]++,storeCapping=!0);if(storeCapping&&this.storage&&this.storage.store(this.cappingKey,JSON.stringify(this.capping),86400,"self","/"),zonesCond.length){for(var zoneIdsBack=this.zoneIds,zcl=(i=0,zonesCond.length);i<zcl;i++)zoneIdsBack.push(zonesCond[i]);this.zoneIds=zonesCond,this.zoneIdsCond=null,this.requested=!1,this.displayed=!1,this.request(),this.zoneIds=zoneIdsBack}return this},BannerHandler.prototype.responseError=function(_xhr,_errorThrown){this.requests>=this.maxRequests?(this.setData({}),this.displayCalled||(this.requested=!1,this.responseHandled=!1)):(this.requested=!1,this.request())},BannerHandler.prototype.getContent=function(zoneId){if(void 0===zoneId&&(zoneId=0),this.zones&&this.zones[zoneId]&&this.zones[zoneId].content){var zoneContent=this.zones[zoneId].content.replace(/\[timestamp\]/g,""+Math.random());return'<body style="margin:0;padding:0;">'+(zoneContent=zoneContent.replace(/\[CACHEBUSTER\]/g,""+Math.random()))+"</body>"}return""},BannerHandler.prototype.display=function(){var _this=this;if(this.displayCalled=!0,this.windowWidth=window.innerWidth,this.responseHandled&&!this.displayed){this.displayed=!0;var keys=[];for(var i in this.prepareBackgroundsWithOffset(),this.displayAdblockBanners(),this.zones)({}).hasOwnProperty.call(this.zones,i)&&keys.push(i);keys.length||(this.adBlocked=!0,null!==this.adBlockedCallback&&this.adBlockedCallback(this.adBlocked,window.browser));var allZonesHidden=this.allZoneIds.reduce((function(acc,zoneId){var _a;return __assign(__assign({},acc),((_a={})[zoneId]=ZoneState.HIDDEN,_a))}),{}),renderedZonesState=this.zoneIds.reduce((function(acc,zoneId){var _a;return __assign(__assign({},acc),((_a={})[zoneId]=_this.renderZone(zoneId)?ZoneState.DISPLAYED:ZoneState.HIDDEN,_a))}),{}),actualZonesState_1=__assign(__assign({},allZonesHidden),renderedZonesState);if(this.zoneStateCallbacks.forEach((function(callback){return callback(actualZonesState_1)})),!this.attachedEvents){this.attachedEvents=!0;var self_1=this;window.addEventListener("resize",(function(){window.innerWidth!==self_1.windowWidth&&(self_1.windowWidth=window.innerWidth,self_1.viewportTimeout&&clearTimeout(self_1.viewportTimeout),self_1.viewportTimeout=setTimeout((function(){self_1.viewportChanged()}),600))})),document.hidden||this.prepareRefreshZones();var lastActiveTime_1=new Date;window.addEventListener("visibilitychange",(function(){if(document.hidden)lastActiveTime_1=new Date,_this.clearRefreshZones();else{var diff=(new Date).getTime()-lastActiveTime_1.getTime();_this.prepareRefreshZones(Math.floor(diff/1e3))}}))}}else this.requested||this.request()},BannerHandler.prototype.showZone=function(zoneId){var zone=document.getElementById(this.idPrefix+zoneId);if(zone){zone.style.display="block";var wrapper=zone.closest?zone.closest("div.adsbackground-wrapper"):null;wrapper&&(wrapper.style.display="block")}var zoneIfrm=this.getZoneIframe(zoneId);if(zoneIfrm){var bodyClassAttribute=zoneIfrm.getAttribute("data-body-class");bodyClassAttribute&&document.body.classList.add(bodyClassAttribute)}},BannerHandler.prototype.hideZone=function(zoneId){delete this.zones[zoneId];var zone=document.getElementById(this.idPrefix+zoneId);if(zone){zone.style.display="none";var wrapper=zone.closest?zone.closest("div.adsbackground-wrapper"):null;wrapper&&(wrapper.style.display="none")}var zoneIfrm=this.getZoneIframe(zoneId);if(zoneIfrm){var bodyClassAttribute=zoneIfrm.getAttribute("data-body-class");bodyClassAttribute&&document.body.classList.remove(bodyClassAttribute)}},BannerHandler.prototype.refreshZone=function(zoneId){return-1!==this.zoneIds.indexOf(zoneId)&&(delete this.zones[zoneId],this.resetState(),this._request([zoneId]),!0)},BannerHandler.prototype.prepareRefreshZones=function(intervalSinceLastTime){void 0===intervalSinceLastTime&&(intervalSinceLastTime=0);var _loop_2=function(zoneId){var _self,_zoneId,refreshRate=this_2.refreshRates[zoneId];({}).hasOwnProperty.call(this_2.refreshRateTimers,zoneId)&&(window.clearInterval(this_2.refreshRateTimers[zoneId]),delete this_2.refreshRateTimers[zoneId]),intervalSinceLastTime>=refreshRate&&this_2.refreshZone(parseInt(zoneId)),this_2.refreshRateTimers[zoneId]=(_self=this_2,_zoneId=parseInt(zoneId),window.setInterval((function(){_self.refreshZone(_zoneId)}),1e3*refreshRate))},this_2=this;for(var zoneId in this.refreshRates)_loop_2(zoneId)},BannerHandler.prototype.clearRefreshZones=function(){for(var zoneId in this.refreshRateTimers)window.clearInterval(this.refreshRateTimers[zoneId]),delete this.refreshRateTimers[zoneId]},BannerHandler.prototype.testAdBlock=function(){if(this.requested){var self_2=this;setTimeout((function(){if(self_2.adBlocked=!self_2.responseHandled,self_2.adBlocked)self_2.adBlocked=!0;else for(var i in self_2.zoneIds){var zoneIframe=document.getElementById(self_2.idPrefix+self_2.zoneIds[i]+"-iframe");if(!zoneIframe)break;if(void 0!==self_2.zones[self_2.zoneIds[i]]){if(zoneIframe&&self_2.testAdBlockElement(zoneIframe)){self_2.adBlocked=!0;break}var zoneIframeObj=zoneIframe,zoneIframeDoc=zoneIframeObj.contentWindow?zoneIframeObj.contentWindow:zoneIframeObj.contentDocument.document?zoneIframeObj.contentDocument.document:zoneIframeObj.contentDocument;if("object"!=typeof zoneIframeDoc.document){self_2.adBlocked=!0;break}var body=zoneIframeDoc.document.body;if(body&&(""===body.innerHTML.trim()||self_2.testAdBlockElement(body))){self_2.adBlocked=!0;break}}}null!==self_2.adBlockedCallback&&self_2.adBlockedCallback(self_2.adBlocked,self_2.getBrowser())}),2e3)}},BannerHandler.prototype.uaMatch=function(ua){ua=ua.toLowerCase();var match=/(chrome)[ \/]([\w.]+)/.exec(ua)||/(webkit)[ \/]([\w.]+)/.exec(ua)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua)||/(msie) ([\w.]+)/.exec(ua)||ua.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua)||[];return{browser:match[1]||"",version:match[2]||"0"}},BannerHandler.prototype.getBrowser=function(){var userAgent=this.uaMatch(navigator.userAgent),browser={};return userAgent.browser&&(browser[userAgent.browser]=!0,browser.version=userAgent.version),browser.chrome?browser.webkit=!0:browser.webkit&&(browser.safari=!0),browser},BannerHandler.prototype.backgroundZoneHasOffset=function(zoneId){return!!this.backgroundZonesWithOffset[zoneId]},BannerHandler.prototype.addOrCallAdblockPlusCallback=function(callback){if(window.AdblockPlus&&"function"==typeof window.AdblockPlus.detect){var locationOrigin=location.protocol+"//"+location.host;window.AdblockPlus.detect(locationOrigin+"/px.gif",callback)}return this},BannerHandler.prototype.getViewportSize=function(){var body=document.compatMode&&"CSS1Compat"===document.compatMode?document.documentElement:document.body;return{width:body.clientWidth,height:body.clientHeight}},BannerHandler.prototype.filterZoneIdsByBreakpoints=function(zoneIds){if(this.zoneIdsCond||(this.zoneIdsCond=this.allZoneIdsCond),document.body.classList.contains("mobi"))return zoneIds;var filteredZoneIds=[],fsiElement=document.getElementById("fsi"),isLsInFrame=!1;null!==fsiElement&&(isLsInFrame=fsiElement.classList.contains("lsInFrame"));var viewportSize=this.getViewportSize();for(var i in zoneIds){var zoneId=zoneIds[i];this.zoneIdsCond&&zoneId in this.zoneIdsCond&&"breakpoint"in this.zoneIdsCond[zoneId]&&this.zoneIdsCond[zoneId].breakpoint||(zoneId in this.zoneIdsCond||(this.zoneIdsCond[zoneId]={}),this.zoneIdsCond[zoneId].breakpoint=[1e3,9999]);var breakpoint=this.zoneIdsCond[zoneId].breakpoint,matchedBreakpoint=viewportSize.width>=breakpoint[0]&&viewportSize.width<=breakpoint[1],enabledClientType=!0;if(this.zoneIdsCond[zoneId].client_type_only&&this.zoneIdsCond[zoneId].client_type_only.length>0&&(enabledClientType=-1!==this.zoneIdsCond[zoneId].client_type_only.indexOf(this.getClientType())),isLsInFrame||matchedBreakpoint&&enabledClientType)filteredZoneIds.push(zoneId);else for(var j in this.hideZone(zoneId),this.zoneIdsCond[zoneId].zones)this.hideZone(this.zoneIdsCond[zoneId].zones[j])}return filteredZoneIds},BannerHandler.prototype.getInt=function(int){try{int=parseInt(int)}catch(e){}return"number"==typeof int?int:0},BannerHandler.prototype.prepareZone=function(zoneId){void 0===zoneId&&(zoneId=0),this.zones&&this.zones[zoneId]&&(this.zones[zoneId].rendered=!1,this.resizeZoneToContent(zoneId))},BannerHandler.prototype.resizeZoneToContent=function(zoneId){if(void 0===zoneId&&(zoneId=0),"number"==typeof this.zones[zoneId].w&&"number"==typeof this.zones[zoneId].h){var zone=document.getElementById(this.idPrefix+zoneId),zoneChild=zone&&zone.childNodes[0];if(zone&&zoneChild){var width=Math.min(this.getInt(zone.style.width),this.zones[zoneId].w),height=Math.min(this.getInt(zoneChild.style.height),this.zones[zoneId].h);this.zones[zoneId].width=width,this.zones[zoneId].height=height,zone.style.width=width+"px",zone.style.setProperty("--adsWidth",width+"px"),zoneChild.style.height=height+"px",zoneChild.style.setProperty("--adsHeight",height+"px");var iframe=document.getElementById(this.idPrefix+zoneId+"-iframe");iframe&&(iframe.style.width=width+"px",iframe.style.height=height+"px")}}},BannerHandler.prototype.callBannersLoadedCallback=function(zoneId){for(var callbackIndex=0,len=this.bannersLoadedCallbacks.length;callbackIndex<len;callbackIndex++)"[object Function]"===Object.prototype.toString.call(this.bannersLoadedCallbacks[callbackIndex])&&this.bannersLoadedCallbacks[callbackIndex](zoneId)},BannerHandler.prototype.setIframeContent=function(zoneIfrm,zoneId,content,bannerId){var _this=this,self=this,iterator=this.setIframeContentCounter;return setTimeout((function(){var zoneIfrmDoc=_this.getIframeContentDocument(zoneIfrm);zoneIfrm.style.visibility="",zoneIfrm.setAttribute("banner-id",bannerId.toString());var bodyClassAttribute=zoneIfrm.getAttribute("data-body-class");if(bodyClassAttribute&&document.body.classList.add(bodyClassAttribute),self.noticeTextSelectors[zoneId]){self.setNoticeTextToElement(self.noticeTextSelectors[zoneId]);for(var callbackIndex=0,len=self.setBackgroundCallbacks.length;callbackIndex<len;callbackIndex++)if("[object Function]"===Object.prototype.toString.call(self.setBackgroundCallbacks[callbackIndex])){var hasOffset=self.backgroundZoneHasOffset(zoneId);self.setBackgroundCallbacks[callbackIndex](zoneId,hasOffset)}}zoneIfrmDoc&&"document"in zoneIfrmDoc&&"object"==typeof zoneIfrmDoc.document?(zoneIfrmDoc.document.open(),zoneIfrmDoc.document.write(content)):zoneIfrm.src='javascript:(function(){document.open();document.domain="'+document.domain+'";var c = window.parent.banners.getContent('+zoneId+");document.write(c);})()",!zoneIfrmDoc||!("document"in zoneIfrmDoc)||window.browser.msie&&-1!==content.indexOf("<script")||zoneIfrmDoc.document.close(),self.showZone(zoneId),self.setIframeContentCounter-1===iterator&&(self.testAdBlock(),null!==self.displayedCallback&&self.displayedCallback())}),this.setIframeContentTimeout*this.setIframeContentCounter++),this},BannerHandler.prototype.getIframeContentDocument=function(iframe){if(iframe){if(iframe.contentWindow)return iframe.contentWindow;if(iframe.contentDocument)return iframe.contentDocument.document?iframe.contentDocument.document:iframe.contentDocument}return null},BannerHandler.prototype.setNoticeTextToElement=function(elementSelector){var elements=document.querySelectorAll(elementSelector);if(elements[0]){var span=document.createElement("span");span.classList.add("advert-bgr-notice"),span.appendChild(document.createTextNode(this.noticeText)),elements[0].appendChild(span)}return this},BannerHandler.prototype.prepareBackup=function(bannersBackupCallbacks){var _this=this;if(!this.backupPrepaired&&(this.backupPrepaired=!0,void 0!==bannersBackupCallbacks&&bannersBackupCallbacks.length)){var callbacks_1=bannersBackupCallbacks;this.xhrRequest("//static.criteo.net/js/ld/publishertag.js",(function(script){_this.eval(script);for(var index=0,len=callbacks_1.length;index<len;index++){var callback=callbacks_1[index];"function"==typeof callback&&callback()}}))}},BannerHandler.prototype.eval=function(data){if(data)try{(window.execScript||function(data){window.eval.call(window,data)})(data)}catch(error){}},BannerHandler.prototype.renderZone=function(zoneId){var _a,_b,_this=this,backgroundIds=[];if(this.zoneList&&Object.keys(this.zoneList).forEach((function(zoneName){var _a,_b;0===zoneName.indexOf("background")&&_this.zoneList[zoneName].hasUrl&&backgroundIds.push(null!==(_b=null!==(_a=_this.zoneList[zoneName].id)&&void 0!==_a?_a:_this.zoneList[zoneName].bannerId)&&void 0!==_b?_b:0)})),(this.getClientType()===this.clientTypes.mobile||this.getClientType()===this.clientTypes.tablet)&&-1!==backgroundIds.indexOf(zoneId)){var element=document.getElementById(this.idPrefix+zoneId);return element&&element.remove(),!1}if(this.zones[zoneId]&&this.zones[zoneId].content&&!this.zones[zoneId].rendered){var bannerId=null!==(_a=this.zones[zoneId].id)&&void 0!==_a?_a:this.zones[zoneId].bannerId;this.zones[zoneId].rendered=!0;var clickUrl=null;if(this.zones[zoneId].hasUrl&&(clickUrl=this.adsAdminUrl+"/delivery/ck.php?oaparams=2__bannerid="+bannerId+"__zoneid="+zoneId),this.elementsBackgrounds[zoneId]){var backgroundSet=function(banners,zoneId,click){return function(){for(var callbackIndex=0;callbackIndex<banners.setBackgroundCallbacks.length;callbackIndex++)if("[object Function]"===Object.prototype.toString.call(banners.setBackgroundCallbacks[callbackIndex])){var hasOffset=banners.backgroundZoneHasOffset(zoneId);banners.setBackgroundCallbacks[callbackIndex](zoneId,hasOffset)}var bgrItem=banners.elementsBackgrounds[zoneId],backgroundAdSelector=bgrItem.element,background="",elementContainingBackground=Array.prototype.filter.call(document.getElementsByTagName("div"),(function(element){return element.innerHTML===banners.zones[zoneId].content}))[0];if(elementContainingBackground){var imgElement=elementContainingBackground.getElementsByTagName("img")[0];imgElement&&(background=imgElement.getAttribute("src")||"")}var backgroundElements=document.querySelectorAll(backgroundAdSelector),backgroundElement=backgroundElements[0]?backgroundElements[0]:null;backgroundElement&&(backgroundElement.style.backgroundImage="url("+background+")",backgroundElement.style.backgroundPosition="49.9% 0",backgroundElement.style.backgroundRepeat="repeat-x",backgroundElement.style.cursor="pointer",bgrItem.fixed&&(backgroundElement.style.backgroundAttachment="fixed"));callbackIndex=0;for(var len=banners.afterAdBackgroundElementCreatedCallbacks.length;callbackIndex<len;callbackIndex++)"[object Function]"===Object.prototype.toString.call(banners.afterAdBackgroundElementCreatedCallbacks[callbackIndex])&&banners.afterAdBackgroundElementCreatedCallbacks[callbackIndex](backgroundAdSelector,banners);bgrItem.notice&&banners.setNoticeTextToElement(bgrItem.notice);var _clickUrl,_clickableElement,newStyle=document.createElement("style");newStyle.innerHTML=backgroundAdSelector+" > * {cursor: default;}",newStyle.setAttribute("type","text/css"),document.head.appendChild(newStyle),click&&backgroundElement&&(backgroundElement.onclick=(_clickUrl=click,_clickableElement=backgroundElement,function(e){void 0!==e&&e.target===_clickableElement&&window.open(_clickUrl,"banner")}))}}(this,zoneId,clickUrl);return setTimeout(backgroundSet,this.backgroundSetTimeout+this.setIframeContentTimeout*(this.setIframeContentCounter-1)),!0}var adsClicks=null===(_b=document.getElementById(this.idPrefix+zoneId))||void 0===_b?void 0:_b.querySelectorAll("div.adsclick");if(null==adsClicks||adsClicks.forEach((function(adsClick){return adsClick.remove()})),this.zones[zoneId].hasUrl){var zone=document.getElementById(this.idPrefix+zoneId);if(zone){var adsContent=zone.querySelectorAll("div.adscontent")[0];if(adsContent){var parent_1=adsContent.parentElement;parent_1&&(parent_1.innerHTML='<div class="adsclick"\n\t\t\t\t\t\t\t\t\t\t\t\t\t style="width: 100% !important; height: 100% !important"\n\t\t\t\t\t\t\t\t\t\t\t\t\t onclick="window.open(\''+clickUrl+"')\"></div>"+parent_1.innerHTML)}}}var zoneIfrm=this.getZoneIframe(zoneId);if(zoneIfrm){var content=this.getContent(zoneId);this.setIframeContent(zoneIfrm,zoneId,content,null!=bannerId?bannerId:0)}return!0}return this.zones[zoneId]&&this.zones[zoneId].rendered||this.hideZone(zoneId),!1},BannerHandler.prototype.getZoneIframe=function(zoneId){return document.getElementById(this.idPrefix+zoneId+"-iframe")},BannerHandler.prototype.prepareBackgroundsWithOffset=function(){var self=this,topZoneIds=this.topZoneIds,programmaticZonesIds=Object.keys(this.backgroundZonesWithOffset);topZoneIds.forEach((function(topZoneId){self.zones[topZoneId]&&programmaticZonesIds.length&&programmaticZonesIds.forEach((function(programmaticZoneId){delete self.backgroundZonesWithOffset[programmaticZoneId],delete self.zones[programmaticZoneId]}))}))},BannerHandler.prototype.displayAdblockBanners=function(){var self=this;this.addOrCallAdblockPlusCallback((function(usesABP){if(usesABP){var elements=document.getElementsByClassName("abp_backup_zone");[].forEach.call(elements,(function(element){element.style.display="block"})),self.zoneIds.map(self.hideZone.bind(self))}}))},BannerHandler.prototype.tryFillXHeadersFromGlobalAppParam=function(){var appParams=window.APP_PARAMS;void 0!==appParams&&(this.xHeaders={platform:null==appParams?void 0:appParams.platform,version:null==appParams?void 0:appParams.version,package:null==appParams?void 0:appParams.package})},BannerHandler}();exports.BannerHandler=BannerHandler},5601:(__unused_webpack_module,exports)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.BannerHandlerRegistry=void 0,window.bannerHandlerRegistry=window.bannerHandlerRegistry||[];var BannerHandlerRegistry=function(){function BannerHandlerRegistry(){}return BannerHandlerRegistry.getRegistry=function(){return window.bannerHandlerRegistry},BannerHandlerRegistry.register=function(handler){this.getRegistry().push(handler)},BannerHandlerRegistry.getHandlers=function(){return this.getRegistry()},BannerHandlerRegistry}();exports.BannerHandlerRegistry=BannerHandlerRegistry},1832:(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.BannerReplacer=void 0;var bannerHandlerRegistry_1=__webpack_require__(5601),BannerReplacer=function(){function BannerReplacer(){}return BannerReplacer.prototype.replaceZone=function(originalId,newId){0===bannerHandlerRegistry_1.BannerHandlerRegistry.getHandlers().filter((function(handler){return handler.replaceZone(originalId,newId)})).length&&console.warn("No banner handler found for zone "+originalId)},BannerReplacer}();exports.BannerReplacer=BannerReplacer},1020:function(__unused_webpack_module,exports,__webpack_require__){"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(o,m,k,k2){void 0===k2&&(k2=k),Object.defineProperty(o,k2,{enumerable:!0,get:function(){return m[k]}})}:function(o,m,k,k2){void 0===k2&&(k2=k),o[k2]=m[k]}),__exportStar=this&&this.__exportStar||function(m,exports){for(var p in m)"default"===p||exports.hasOwnProperty(p)||__createBinding(exports,m,p)};Object.defineProperty(exports,"__esModule",{value:!0}),__exportStar(__webpack_require__(9393),exports),__exportStar(__webpack_require__(1832),exports)},9042:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{W:()=>dev});var _coreDebuggerSimulate__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(7160),_coreDebuggerDebugWindow__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(6522),_coreDebuggerSaveReports__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(641),_coreDebuggerFeedPlanter__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(3724),__values=function(o){var s="function"==typeof Symbol&&Symbol.iterator,m=s&&o[s],i=0;if(m)return m.call(o);if(o&&"number"==typeof o.length)return{next:function(){return o&&i>=o.length&&(o=void 0),{value:o&&o[i++],done:!o}}};throw new TypeError(s?"Object is not iterable.":"Symbol.iterator is not defined.")},dev={initialized:!1,simulate:null,debugWindow:null,saveReports:null,feedPlanter:null,myGamesNotifications:null,init:function(callback){var fnc;return fnc=callback,callback=function(){if("function"==typeof fnc)return fnc()},this.initialized||(cjs.Api.config.get("core_debugger","internal")&&(this.feedPlanter=new _coreDebuggerFeedPlanter__WEBPACK_IMPORTED_MODULE_2__.$),this.initialized=!0,this._errorReportsLimit=100,this._errorReportsPrint=!0,this.simulate=_coreDebuggerSimulate__WEBPACK_IMPORTED_MODULE_0__.m,this.debugWindow=_coreDebuggerDebugWindow__WEBPACK_IMPORTED_MODULE_1__.a,this.saveReports=_coreDebuggerSaveReports__WEBPACK_IMPORTED_MODULE_3__.d,this.myGamesNotifications=cjs.dic.get("MyGamesNotificationFactory").make(cjs.dic.get("utilEnviroment"),cjs.dic.get("utilUrl"),cjs.dic.get("utilTrans"),cjs.dic.get("utilSport"),cjs.Api.settingsStorage)),callback()},_errorReportsLimit:/android/i.test(navigator.userAgent)?5:20,_errorReportsReportedMark:"[cjs.devREPORTED]",_errorReportsPrint:!1,_errorReports:[],reportError:function(msg,exception,onlyMessage){var e_1,_a;void 0===exception&&(exception=null),null==onlyMessage&&(onlyMessage=!1),exception&&(msg+="\n\n---- Stack trace ----\n\n".concat(this.stackTrace.get(exception)),exception.message+=" ".concat(this._errorReportsReportedMark)),this._errorReportsPrint&&window.cerr(msg);var error,reports=this._errorReports;this._errorReports=[];var env=cjs.dic.get("util_browser").isMobile()&&!cjs.dic.get("util_browser").isAndroid()||onlyMessage?"{}":this._buildEnv();try{for(var _b=__values(Array.from(this._errorReports)),_c=_b.next();!_c.done;_c=_b.next()){var report=_c.value;reports.push(report)}}catch(e_1_1){e_1={error:e_1_1}}finally{try{_c&&!_c.done&&(_a=_b.return)&&_a.call(_b)}finally{if(e_1)throw e_1.error}}for(this._errorReports=reports,reports=null,error={msg,env,time:cjs.dic.get("utilDate").timestamp2date("y-m-d_H-i-s")};this._errorReports.length&&this._errorReports.length>this._errorReportsLimit;)this._errorReports.splice(0,1);return this._errorReports.push(error)},parseReportObject:function parseReportObject(reports){for(var reportId in reports){var report=reports[reportId];eval("var tmpObj = "+report.env)}return reports},stackTrace:{get:function(exception){var stackTrace=[],stackTracePreMsg="";try{exception?stackTracePreMsg="Exception message [".concat(exception.message,"]\n\n"):exception=this._getException(),stackTrace=this._modes[this._mode(exception)](exception)}catch(e){window.cdir(e),stackTrace.push("Couldn't retrieve stack trace!")}return stackTracePreMsg+stackTrace.join("\n\n")},_getException:function(){try{return this.nonexistingMethod()}catch(e){return e}},_mode:function(e){return e.arguments&&e.stack?"chrome":e.stack?"firefox":"other"},_modes:{chrome:function(e){var stack=(e.stack+"\n").replace(/^\S[^\(]+?[\n$]/g,"").replace(/^\s+(at eval )?at\s+/g,"").replace(/^([^\(]+?)([\n$])/g,"{anonymous}()@$1$2").replace(/^Object.<anonymous>\s*\(([^\)]+)\)/g,"{anonymous}()@$1").split("\n");return stack.pop(),stack},firefox:function(e){return e.stack.replace(/(?:\n@:0)?\s+$/m,"").replace(/^[\(@]/g,"{anonymous}()@").split("\n")},other:function(ex){for(var curr=arguments.callee.caller.caller,fnRE=/function\s*([\w\-$]+)?\s*\(/i,stack=[],fn=void 0,args=void 0;curr&&curr.arguments&&stack.length<10;)fn=fnRE.test(curr.toString())&&RegExp.$1||"{anonymous}",args=Array.prototype.slice.call(curr.arguments||[]),stack[stack.length]=fn+"("+args+")",curr=curr.caller;return stack}}},_timeProfiles:{},_buildEnv:function(){var env;dev=null,null!=("undefined"!=typeof cjs&&null!==cjs?cjs.dev:void 0)&&(dev=cjs.dev,null===cjs||void 0===cjs||delete cjs.dev);try{var manualAdd=["cjs","dic","ls","clientStorage","banners"],stringifyFunction_1=function(fnc){try{return JSON.stringify({"JSON.stringify":{function:fnc.toString(),prototype:fnc.prototype}},(function(key,val){return"function"==typeof val?val.toString():val}))}catch(e){return'"JSON.stringify - stringifyFunction error"'}},manualStringify=function(obj){try{var stringifiedObjects_1=[];return JSON.stringify(obj,(function(key,val){if("webkitStorageInfo"===key)return"";if("object"==typeof val){if(stringifiedObjects_1.includes(val))return'"JSON.stringify - Already stringified"';if(stringifiedObjects_1.push(val),val instanceof HTMLElement)return'"JSON.stringify - HTML element"';if(null!=(null!=val?val.jquery:void 0)&&null!=val.context)return'"JSON.stringify - jquery element"'}return"function"==typeof val?stringifyFunction_1(val):val}))}catch(e){return'"JSON.stringify - manualStringify error"'}};for(var key in env="{",window)try{var value=void 0;if(["webkitStorageInfo","allEvents"].includes(key))continue;var valOfWindow=window[key];void 0===(value=manualAdd.includes(key)?manualStringify(valOfWindow):JSON.stringify(valOfWindow))&&(value="function"==typeof valOfWindow?stringifyFunction_1(valOfWindow):'"'.concat(value,'"')),env+='"'.concat(key,'":').concat(value,",")}catch(error){env+='"'.concat(key,'":"JSON.stringify - error",')}env=env.substring(0,env.length-1),env+="}"}catch(error1){env="{}"}return cjs&&dev&&(cjs.dev=dev),env},setStartTime:function(timeProfileName){return this._timeProfiles[timeProfileName]=(new Date).getTime()},getRunTime:function(timeProfileName){return((new Date).getTime()-this._timeProfiles[timeProfileName])/1e3+" s"}}},6522:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{a:()=>debugWindow});var debugWindow={_elementId:"cjs-debug-window",_reloadInterval:5e3,_reloadIntervalId:undefined,show:function(){var _a,_this=this;this._reloadIntervalId&&clearTimeout(this._reloadIntervalId),this._reloadIntervalId=setTimeout((function(){return _this.show()}),this._reloadInterval);var debugDiv=document.getElementById(this._elementId);debugDiv||((debugDiv=document.createElement("div")).id=this._elementId,document.body.prepend(debugDiv)),debugDiv.innerHTML="";var debugStyle=document.createElement("style");debugStyle.innerHTML=["","{ color: black; width: 200px; padding-bottom: 10px; position: fixed; background-color: rgb(170, 170, 170,); background-color: rgba(170, 170, 170, 0.7); top: 20px; left: 20px; z-index: 999; }","a { cursor: pointer; }",'input[type="checkbox"], input[type="radio"] { vertical-align: bottom; margin: 0; margin-right: 5px; }',"a.hide { position: absolute; right: -5px; top: -5px; background-color: black; font-weight: bold; color: white; padding: 2px 5px; border: solid 1px white; }","h3 { text-align: center; }",".controls { margin: 10px; }",".controls div { margin: 5px; }",".dump { background-color: #9d9; padding: 2px 3px; display: block; margin-left: auto; margin-right: auto; width: 100px; text-align: center; }",".internal-tool {background-color: #9d9; padding: 2px 3px; display: block; margin-left: auto; margin-right: auto; width: 100px; text-align: center;}"].join("\n#".concat(this._elementId," ")),debugDiv.append(debugStyle);var closeButton=document.createElement("a");closeButton.classList.add("hide"),closeButton.title="Close",closeButton.textContent="X",closeButton.addEventListener("click",(function(){return _this.hide()})),debugDiv.append(closeButton);var h3=document.createElement("h3");h3.textContent="FS debug tool",debugDiv.append(h3);var emptyDiv=document.createElement("div");debugDiv.append(emptyDiv),debugDiv.classList.add("content");var controls=document.createElement("fieldset");controls.classList.add("controls");var legend=document.createElement("legend");legend.textContent="Debug logs",controls.append(legend);var label=document.createElement("label"),input=document.createElement("input");input.type="checkbox",input.checked=cjs.dev._errorReportsPrint,input.addEventListener("click",(function(){return cjs.dev._errorReportsPrint=!cjs.dev._errorReportsPrint,_this.show()})),label.append(input);var strong=document.createElement("strong");strong.innerText="Unhandled errors",label.append(strong);var labelDiv=document.createElement("div");labelDiv.append(label),controls.append(labelDiv);var divLabelDebug=document.createElement("div"),labelDebug=document.createElement("label"),labelDebugInput=document.createElement("input");labelDebugInput.type="checkbox",labelDebugInput.checked=cjs.push.isDebugMode(),labelDebugInput.addEventListener("click",(function(){return cjs.push.setDebugMode(!cjs.push.isDebugMode()),_this.show()})),labelDebug.append(labelDebugInput);var strongPush=document.createElement("strong");strongPush.innerText="Push",labelDebug.append(strongPush),divLabelDebug.append(labelDebug),controls.append(divLabelDebug);var pushLogDiv=document.createElement("div"),pushLogLabel=document.createElement("label"),pushLogInput=document.createElement("input");pushLogInput.type="checkbox",pushLogInput.checked=cjs.push.isEnabledLogMessages(),pushLogInput.addEventListener("click",(function(){return cjs.push.enableLogMessages(!cjs.push.isEnabledLogMessages()),_this.show()})),pushLogLabel.append(pushLogInput);var pushLogStrong=document.createElement("strong");if(pushLogStrong.textContent="Push messages log",pushLogLabel.append(pushLogStrong),pushLogDiv.append(pushLogLabel),controls.append(pushLogDiv),debugDiv.append(controls),cjs.push.isEnabledLogMessages()){var downloadMessages=document.createElement("a");downloadMessages.classList.add("dump"),downloadMessages.textContent="Download messages",downloadMessages.addEventListener("click",(function(){return cjs.push.saveLog(this)})),null===(_a=debugDiv.querySelector(".controls"))||void 0===_a||_a.append(downloadMessages)}if(cjs.Api.config.get("core_debugger","internal")){var fieldSet=document.createElement("fieldset");fieldSet.classList.add("controls");var div=document.createElement("div");fieldSet.append(div);var internalTool=document.createElement("a");internalTool.classList.add("internal-tool"),internalTool.textContent="Internal tool",internalTool.addEventListener("click",(function(){return cjs.dev.feedPlanter.showDebugWindow()})),fieldSet.append(internalTool),debugDiv.append(fieldSet)}var downloadDump=document.createElement("a");downloadDump.classList.add("dump"),downloadDump.textContent="Download dump",downloadDump.addEventListener("click",(function(){return cjs.dev.saveReports(this)})),debugDiv.append(downloadDump)},hide:function(){var _a;return this._reloadIntervalId&&clearTimeout(this._reloadIntervalId),null===(_a=document.getElementById(this._elementId))||void 0===_a?void 0:_a.remove()}}},3724:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{$:()=>FeedPlanterImpl});var __values=function(o){var s="function"==typeof Symbol&&Symbol.iterator,m=s&&o[s],i=0;if(m)return m.call(o);if(o&&"number"==typeof o.length)return{next:function(){return o&&i>=o.length&&(o=void 0),{value:o&&o[i++],done:!o}}};throw new TypeError(s?"Object is not iterable.":"Symbol.iterator is not defined.")},FeedPlanterImpl=function(){function FeedPlanterImpl(){}return FeedPlanterImpl.prototype.createFeedString=function(fromElement){var selector;void 0===fromElement&&(fromElement=null);var sport=document.querySelector("input#feed_planter_sport_id").value,eventId=document.querySelector("input#feed_planter_event_id").value,data="";return selector=null===fromElement?'[id^="feed_planter_fs_data"]':"#"+fromElement,document.querySelectorAll(selector).forEach((function(el){var _a,index=null===(_a=el.getAttribute("id"))||void 0===_a?void 0:_a.split("-")[1],value=el.value;data+="".concat(index,"÷").concat(value,"¬")})),cjs.dev.simulate._createFeedString("g_".concat(sport,"_").concat(eventId),data)},FeedPlanterImpl.prototype.addDataInput=function(index,value){if(index=index.toUpperCase(),null===document.getElementById("feed_planter_fs_data-".concat(index))){var planterDataEl=document.getElementById("feed_planter_data");return null===planterDataEl?null:planterDataEl.innerHTML=(null==planterDataEl?void 0:planterDataEl.innerHTML)+"\t\t\t<div> \t\t\t<label for='feed_planter_fs_data-".concat(index,"'>").concat(this.getLabel(index),"</label> \t\t\t<button onclick='this.parentNode.remove()'>-</button> \t\t\t<input id='feed_planter_fs_data-").concat(index,"' type='text' name='' value='").concat(value||"","'/> \t\t\t</div>\t\t")}},FeedPlanterImpl.prototype.getLabel=function(index){return index},FeedPlanterImpl.prototype.reset=function(){var planterEl=document.getElementById("feed_planter_data");planterEl&&(planterEl.innerHTML="");var sportIdEl=document.querySelector("input#feed_planter_sport_id");sportIdEl&&(sportIdEl.value="");var eventIdEl=document.querySelector("input#feed_planter_event_id");eventIdEl&&(eventIdEl.value="")},FeedPlanterImpl.prototype.showDebugWindow=function(){this.getDebugWindow().style.display=""},FeedPlanterImpl.prototype.hideDebugWindow=function(){this.getDebugWindow().style.display="none"},FeedPlanterImpl.prototype.getDebugWindow=function(){return document.getElementById("feed_planter")||this.createDebugElement()},FeedPlanterImpl.prototype.createDebugElement=function(){var _a,_b,_this=this,element=document.createElement("div");element.setAttribute("id","feed_planter");var styleEl=document.createElement("style");styleEl.setAttribute("type","text/css"),styleEl.innerHTML='\t\t\t#feed_planter {display: grid; grid-template-columns: 1fr max-content; grid-template-areas: "data panel"; color: black; width: 100%; height: 200px; padding-bottom: 0px; position: fixed; background-color: #ddd; bottom: 0px; left: 0px; z-index: 999;} \t\t\t#feed_planter_data {grid-area: data; height: 200px; border: 1px solid #abc; overflow: auto;} \t\t\t#feed_planter_panel {grid-area: panel; height: 100%; border: 1px solid #abc;} \t\t\t#feed_planter hr {width: 100%; heiht: 1px; margin: 3px; padding: 0;} \t\t\t#feed_planter_feed {font-size: 10px; width: 98%; height: 72px;} \t\t\t#feed_planter input {border: 1px solid #333; text-align: center; font-size: 11px;} \t\t\t#feed_planter_data > div {float: left; width: 105px; margin: 2px 2px 0 0; border: 1px solid #abc; padding: 2px; height: 20px;} \t\t\t#feed_planter_data > div > input {width: 55px; float: right; margin-right: 3px;} \t\t\t#feed_planter_data > div > button {font-size: 10px; float: right; margin-top: 1px;} \t\t\t#feed_planter_data > div > label {font-size: 10px; font-weight: bold; width: 20px; float: left; padding-top: 5px;} \t\t\t@media only screen and (max-width: 690px) { \t\t\t#feed_planter {height: auto; grid-template-rows: max-content minmax(0px, 240px); grid-template-areas: "panel" "data";} \t\t\t#feed_planter_data {height: auto;} \t\t\t}\t\t',element.insertBefore(styleEl,element.firstChild);var planterEl=document.createElement("div");planterEl.setAttribute("id","feed_planter_data"),element.appendChild(planterEl);var panelEl=document.createElement("div");panelEl.setAttribute("id","feed_planter_panel"),panelEl.innerHTML="\t\t\t&nbsp;<input type='text' id='feed_planter_simulate_count' name='simulate_count' value='10' style='width: 30px; text-align: center;' /> \t\t\t<button title='Simulate live games' onclick='cjs.dev.simulate.live(document.getElementById(\"feed_planter_simulate_count\")?.value || 0)'>L</button> \t\t\t<button title='Simulate finished games' onclick='cjs.dev.simulate.finished(document.getElementById(\"feed_planter_simulate_count\")?.value || 0)'>F</button> \t\t\t<button title='Simulate score' onclick='cjs.dev.simulate.score(document.getElementById(\"feed_planter_simulate_count\")?.value || 0)'>S</button> \t\t\t<button title='Simulate notification' onclick='cjs.dev.simulate.notification(document.getElementById(\"feed_planter_simulate_count\")?.value || 0)'>N</button> \t\t\t&nbsp;|&nbsp;<select name='feed_planter_dialog' id='feed_planter_table_selector'> \t\t\t<option value='table-main'>Main</option> \t\t\t<option value='odds-content'>Odds</option> \t\t\t</select> \t\t\t<hr /> \t\t\t&nbsp;<input type='text' id='feed_planter_input_data_index' name='data_index' value='' style='width: 30px; text-align: center;' /> \t\t\t<button onclick='cjs.dev.feedPlanter.addDataInput(document.getElementById(\"feed_planter_input_data_index\")?.value || \"\")'>+</button> \t\t\t<label for='feed_planter_sport_id'>Sport:</label>&nbsp;<input id='feed_planter_sport_id' type='text' name='' value='' style='width: 20px;' /> \t\t\t<label for='feed_planter_event_id'>Event:</label>&nbsp;<input id='feed_planter_event_id' type='text' name='' value='' style='width: 80px;' /> \t\t\t<label for='feed_planter_auto'> \t\t\t<input type='checkbox' checked='1' id='feed_planter_auto' name='auto_plant' value='1' /> \t\t\tAuto plant feed \t\t\t</label> \t\t\t<hr /> \t\t\t<textarea id='feed_planter_feed'></textarea> \t\t\t<hr /> \t\t\t<button onclick='cjs.dev.feedPlanter.reset()'>Reset</button><button id='feed_planter_update'>Update</button>\t\t",element.appendChild(panelEl),document.body.insertBefore(element,document.body.firstChild),null===(_a=document.getElementById("feed_planter"))||void 0===_a||_a.addEventListener("change",(function(ev){var _a,targetEl=ev.target;if(targetEl.matches("#feed_planter_data input, #feed_planter_sport_id, #feed_planter_event_id")){var fromElement=null,isAutoUpdateEnabled=null!==document.querySelector("#feed_planter_auto:checked");if(isAutoUpdateEnabled){if(!targetEl.id.startsWith("feed_planter_fs_data"))return;fromElement=targetEl.id}var planterEl_1=document.querySelector("textarea#feed_planter_feed");if(planterEl_1&&(planterEl_1.value=_this.createFeedString(fromElement)),isAutoUpdateEnabled)return null===(_a=document.getElementById("feed_planter_update"))||void 0===_a?void 0:_a.click()}}));var overlayEl=document.createElement("div");return overlayEl.id="feed_planter_overlay",overlayEl.style.position="absolute",overlayEl.style.width="100%",overlayEl.style.cursor="pointer",overlayEl.style.backgroundColor="var(--color-background-hover-1)",overlayEl.style.opacity=".33",overlayEl.addEventListener("click",(function(e){var e_1,_a,_b;e.preventDefault();var index,value,id=null===(_b=e.target.getAttribute("data-event-id"))||void 0===_b?void 0:_b.replace(/^x_|^y_/,"g_"),eventHolder=cjs.dic.get("dataEventHolderProxy").getHolder();if(!eventHolder.hasEvent(id))return!1;var eventItem=eventHolder.getEvent(id);_this.reset();var sportIdEl=document.querySelector("input#feed_planter_sport_id");sportIdEl&&(sportIdEl.value=eventItem.getValue("sport_id"));var eventIdEl=document.querySelector("input#feed_planter_event_id");eventIdEl&&(eventIdEl.value=eventItem.getValue("original_id"));var indexes=[],object=eventItem.getData();for(index in object)value=object[index],/^[A-Z]{2}$/.test(index)&&indexes.push(index);indexes.sort();try{for(var _c=__values(Array.from(indexes)),_d=_c.next();!_d.done;_d=_c.next())index=_d.value,value=eventItem.getValue(index),_this.addDataInput(index,value)}catch(e_1_1){e_1={error:e_1_1}}finally{try{_d&&!_d.done&&(_a=_c.return)&&_a.call(_c)}finally{if(e_1)throw e_1.error}}return!1}),!1),document.querySelectorAll("#fs, #tab-content, #live-table").forEach((function(el){var _a,matchEls=el.querySelectorAll("tr, .event__match");null===(_a=matchEls[0].parentNode)||void 0===_a||_a.appendChild(overlayEl),matchEls.forEach((function(matchEl){matchEl.addEventListener("mouseenter",(function(ev){var targetEl=ev.target;overlayEl.style.top=targetEl.offsetTop+"px",overlayEl.style.height=targetEl.offsetHeight+"px",overlayEl.setAttribute("data-event-id",targetEl.id)}))}))})),null===(_b=document.getElementById("feed_planter_update"))||void 0===_b||_b.addEventListener("click",(function(){var _a,feedEl=document.querySelector("textarea#feed_planter_feed"),feed=null;return feedEl&&(feed=feedEl.value),null===(_a=window.updater)||void 0===_a||_a.response_update(null,null,feed,"update"),window.clog(feed)})),element},FeedPlanterImpl}()},641:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{d:()=>saveReports});var saveReports=function(a){clearTimeout(cjs.dev.debugWindow._reloadIntervalId),cjs.dev.debugWindow._reloadIntervalId=setTimeout((function(){return cjs.dev.debugWindow.show()}),2e4);var removeEmptyErrorReports=!1;try{if(!cjs.dev._errorReports.length){if(removeEmptyErrorReports=!0,!confirm("No error found. Do you want to create dump anyway?"))return;cjs.dev.reportError("Save report dump")}var data=JSON.stringify(cjs.dev._errorReports);if(a.download="errorsDump["+cjs.dic.get("utilDate").timestamp2date("y-m-d_H-i-s")+"]("+window.location+")",null!=window.Blob&&null!=window.URL){var file=new window.Blob([data]);a.hidden="",a.href=window.URL.createObjectURL(file)}else a.href="data:application/octet-stream,".concat(escape("[escaped]"+data))}catch(e){alert("Can't create download file on this browser!")}if(removeEmptyErrorReports)return cjs.dev._errorReports=[]}},7160:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{m:()=>simulate});var simulate={simulateLiveCount:0,simulateLiveRepetitions:0,simulateLiveRepetitionsDone:0,simulateFinishedCount:0,simulateFinishedRepetitions:0,simulateFinishedRepetitionsDone:0,simulateScoreCount:0,simulateScoreRepetitions:0,simulateScoreRepetitionsDone:0,simulateNotificationCount:0,homeTeam:"",awayTeam:"",originalId:0,ad:0,_createFeedString:function(game,data){return"SA÷"+game.replace(/g_([0-9]+)_.*/,"$1")+"¬~AA÷"+game.replace(/g_[0-9]+_(.*)/,"$1")+"¬".concat(data,"~")},_makeUpdate:function(update){return window.clog("==== update ====\n".concat(update)),window.updater.response_update(null,null,update,"update")},live:function(countInit){if(null==countInit&&(countInit=0),countInit)return this.simulateLiveCount=0,this.simulateLiveRepetitions=countInit,this.simulateLiveRepetitionsDone=0,cjs.dic.get("dataEventHolderProxy").getHandler().each((that=this,function(index,id){var eventItem=this.getItem(id);return eventItem.setValue("AI","n"),eventItem.setValue("AB",1),eventItem.setValue("AC",1),that.simulateLiveCount++})),window.category=1,setTimeout((function(){return simulate.live()}),1e3);var that,rand=Math.floor(Math.random()*this.simulateLiveCount),count=0;return cjs.dic.get("dataEventHolderProxy").getHandler().each(function(that){return function(index,id){if("n"===this.getItem(id).getValue("AI"))return count===rand?(that._makeUpdate(that._createFeedString(id,"AB÷2¬AI÷y¬AC÷2¬")),that.simulateLiveCount--,!1):count++}}(this)),this.simulateLiveRepetitionsDone++,this.simulateLiveRepetitions>this.simulateLiveRepetitionsDone?setTimeout((function(){return simulate.live()}),300):void 0},finished:function(countInit){if(null==countInit&&(countInit=0),countInit)return this.simulateFinishedCount=0,this.simulateFinishedRepetitions=countInit,this.simulateFinishedRepetitionsDone=0,cjs.dic.get("dataEventHolderProxy").getHandler().each((that=this,function(index,id){var eventItem=this.getItem(id);return eventItem.setValue("AI","n"),eventItem.setValue("AB",1),eventItem.setValue("AC",1),that.simulateFinishedCount++})),window.category=1,setTimeout((function(){return simulate.finished()}),1e3);var that,rand=Math.floor(Math.random()*this.simulateFinishedCount),count=0;return cjs.dic.get("dataEventHolderProxy").getHandler().each(function(that){return function(index,id){if("n"===this.getItem(id).getValue("AI"))return count===rand?(that._makeUpdate(that._createFeedString(id,"AB÷3¬AI÷y¬AC÷3¬")),that.simulateFinishedCount--,!1):count++}}(this)),this.simulateFinishedRepetitionsDone++,this.simulateFinishedRepetitions>this.simulateFinishedRepetitionsDone?setTimeout((function(){return simulate.finished()}),300):void 0},score:function(countInit,itemIndex,_score){if(null==countInit&&(countInit=0),null==itemIndex&&(itemIndex="AG"),null==_score&&(_score=1),countInit)return this.simulateScoreCount=0,this.simulateScoreRepetitions=countInit,this.simulateScoreRepetitionsDone=0,cjs.dic.get("dataEventHolderProxy").getHandler().each((that=this,function(index,id){var eventItem=this.getItem(id);if("y"===eventItem.getValue("AI"))return eventItem.setValue(itemIndex,0),that.simulateScoreCount++})),this.simulateScoreCount?setTimeout((function(){return simulate.score(0,itemIndex,_score)}),1e3):window.clog("No live events found. You should generete some.");var that,rand=Math.floor(Math.random()*this.simulateScoreCount),count=0;return cjs.dic.get("dataEventHolderProxy").getHandler().each(function(that){return function(index,id){var eventItem=this.getItem(id);if("y"===eventItem.getValue("AI")&&0===eventItem.getValue(itemIndex))return count===rand?(that._makeUpdate(that._createFeedString(id,"".concat(itemIndex,"÷").concat(_score,"¬"))),that.simulateScoreCount--,!1):count++}}(this)),this.simulateScoreRepetitionsDone++,this.simulateScoreRepetitions>this.simulateScoreRepetitionsDone?setTimeout((function(){return simulate.score(0,itemIndex,_score)}),300):void 0},notification:function(countInit){var that;null==countInit&&(countInit=0),countInit&&(this.simulateNotificationCount=0,this.homeTeam="Team 1",this.awayTeam="Team 2",this.originalId=0,this.ad=0,cjs.dic.get("dataEventHolderProxy").getHandler().each((that=this,function(){return that.simulateNotificationCount++})));var rand=Math.floor(Math.random()*this.simulateNotificationCount),count=0;cjs.dic.get("dataEventHolderProxy").getHandler().each(function(that){return function(index,id){var eventItem=this.getItem(id);return count===rand?(that.homeTeam=eventItem.getValue("AE"),that.awayTeam=eventItem.getValue("AF"),that.originalId=eventItem.getValue("original_id"),that.ad=eventItem.getValue("AD"),that.simulateNotificationCount--,!1):count++}}(this)),cjs.push.setSubscriptionInfo({"2obZFsrD":{timestamp:0,sportId:1}}),cjs.dev.myGamesNotifications.addNotification(cjs.dic.get("NotificationBuilder").get('["'+cjs.dic.get("utilTrans").translate("TRANS_NOTIFICATION_MESSAGE_GOAL")+'","'+this.homeTeam+'","'+this.awayTeam+'"," 2:1",2,2,"team1","team2","2015","GvGMJcRt-KKEVMQZ3.png",0,"jRbIkel9-jkCav5lq.png",1425052800]',cjs.push,"games_cs_2obZFsrD"));var querySelector=document.querySelector(".game-notification");querySelector&&(querySelector.style.marginBottom="200px")}}},3029:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{deleteDB:()=>deleteDB,openDB:()=>openDB,unwrap:()=>unwrap,wrap:()=>wrap});const instanceOfAny=(object,constructors)=>constructors.some((c=>object instanceof c));let idbProxyableTypes,cursorAdvanceMethods;const cursorRequestMap=new WeakMap,transactionDoneMap=new WeakMap,transactionStoreNamesMap=new WeakMap,transformCache=new WeakMap,reverseTransformCache=new WeakMap;let idbProxyTraps={get(target,prop,receiver){if(target instanceof IDBTransaction){if("done"===prop)return transactionDoneMap.get(target);if("objectStoreNames"===prop)return target.objectStoreNames||transactionStoreNamesMap.get(target);if("store"===prop)return receiver.objectStoreNames[1]?void 0:receiver.objectStore(receiver.objectStoreNames[0])}return wrap(target[prop])},set:(target,prop,value)=>(target[prop]=value,!0),has:(target,prop)=>target instanceof IDBTransaction&&("done"===prop||"store"===prop)||prop in target};function wrapFunction(func){return func!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(cursorAdvanceMethods||(cursorAdvanceMethods=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(func)?function(...args){return func.apply(unwrap(this),args),wrap(cursorRequestMap.get(this))}:function(...args){return wrap(func.apply(unwrap(this),args))}:function(storeNames,...args){const tx=func.call(unwrap(this),storeNames,...args);return transactionStoreNamesMap.set(tx,storeNames.sort?storeNames.sort():[storeNames]),wrap(tx)}}function transformCachableValue(value){return"function"==typeof value?wrapFunction(value):(value instanceof IDBTransaction&&function(tx){if(transactionDoneMap.has(tx))return;const done=new Promise(((resolve,reject)=>{const unlisten=()=>{tx.removeEventListener("complete",complete),tx.removeEventListener("error",error),tx.removeEventListener("abort",error)},complete=()=>{resolve(),unlisten()},error=()=>{reject(tx.error||new DOMException("AbortError","AbortError")),unlisten()};tx.addEventListener("complete",complete),tx.addEventListener("error",error),tx.addEventListener("abort",error)}));transactionDoneMap.set(tx,done)}(value),instanceOfAny(value,idbProxyableTypes||(idbProxyableTypes=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction]))?new Proxy(value,idbProxyTraps):value)}function wrap(value){if(value instanceof IDBRequest)return function(request){const promise=new Promise(((resolve,reject)=>{const unlisten=()=>{request.removeEventListener("success",success),request.removeEventListener("error",error)},success=()=>{resolve(wrap(request.result)),unlisten()},error=()=>{reject(request.error),unlisten()};request.addEventListener("success",success),request.addEventListener("error",error)}));return promise.then((value=>{value instanceof IDBCursor&&cursorRequestMap.set(value,request)})).catch((()=>{})),reverseTransformCache.set(promise,request),promise}(value);if(transformCache.has(value))return transformCache.get(value);const newValue=transformCachableValue(value);return newValue!==value&&(transformCache.set(value,newValue),reverseTransformCache.set(newValue,value)),newValue}const unwrap=value=>reverseTransformCache.get(value);function openDB(name,version,{blocked,upgrade,blocking,terminated}={}){const request=indexedDB.open(name,version),openPromise=wrap(request);return upgrade&&request.addEventListener("upgradeneeded",(event=>{upgrade(wrap(request.result),event.oldVersion,event.newVersion,wrap(request.transaction))})),blocked&&request.addEventListener("blocked",(()=>blocked())),openPromise.then((db=>{terminated&&db.addEventListener("close",(()=>terminated())),blocking&&db.addEventListener("versionchange",(()=>blocking()))})).catch((()=>{})),openPromise}function deleteDB(name,{blocked}={}){const request=indexedDB.deleteDatabase(name);return blocked&&request.addEventListener("blocked",(()=>blocked())),wrap(request).then((()=>{}))}const readMethods=["get","getKey","getAll","getAllKeys","count"],writeMethods=["put","add","delete","clear"],cachedMethods=new Map;function getMethod(target,prop){if(!(target instanceof IDBDatabase)||prop in target||"string"!=typeof prop)return;if(cachedMethods.get(prop))return cachedMethods.get(prop);const targetFuncName=prop.replace(/FromIndex$/,""),useIndex=prop!==targetFuncName,isWrite=writeMethods.includes(targetFuncName);if(!(targetFuncName in(useIndex?IDBIndex:IDBObjectStore).prototype)||!isWrite&&!readMethods.includes(targetFuncName))return;const method=async function(storeName,...args){const tx=this.transaction(storeName,isWrite?"readwrite":"readonly");let target=tx.store;useIndex&&(target=target.index(args.shift()));const returnVal=await target[targetFuncName](...args);return isWrite&&await tx.done,returnVal};return cachedMethods.set(prop,method),method}idbProxyTraps=(oldTraps=>({...oldTraps,get:(target,prop,receiver)=>getMethod(target,prop)||oldTraps.get(target,prop,receiver),has:(target,prop)=>!!getMethod(target,prop)||oldTraps.has(target,prop)}))(idbProxyTraps)},2437:(module,__unused_webpack_exports,__webpack_require__)=>{(module.exports?function(factory){module.exports=factory()}:__webpack_require__.amdD)((function(){"use strict";var isArray,impl={mobileDetectRules:{phones:{iPhone:"\\biPhone\\b|\\biPod\\b",BlackBerry:"BlackBerry|\\bBB10\\b|rim[0-9]+|\\b(BBA100|BBB100|BBD100|BBE100|BBF100|STH100)\\b-[0-9]+",HTC:"HTC|HTC.*(Sensation|Evo|Vision|Explorer|6800|8100|8900|A7272|S510e|C110e|Legend|Desire|T8282)|APX515CKT|Qtek9090|APA9292KT|HD_mini|Sensation.*Z710e|PG86100|Z715e|Desire.*(A8181|HD)|ADR6200|ADR6400L|ADR6425|001HT|Inspire 4G|Android.*\\bEVO\\b|T-Mobile G1|Z520m|Android [0-9.]+; Pixel",Nexus:"Nexus One|Nexus S|Galaxy.*Nexus|Android.*Nexus.*Mobile|Nexus 4|Nexus 5|Nexus 6",Dell:"Dell[;]? (Streak|Aero|Venue|Venue Pro|Flash|Smoke|Mini 3iX)|XCD28|XCD35|\\b001DL\\b|\\b101DL\\b|\\bGS01\\b",Motorola:"Motorola|DROIDX|DROID BIONIC|\\bDroid\\b.*Build|Android.*Xoom|HRI39|MOT-|A1260|A1680|A555|A853|A855|A953|A955|A956|Motorola.*ELECTRIFY|Motorola.*i1|i867|i940|MB200|MB300|MB501|MB502|MB508|MB511|MB520|MB525|MB526|MB611|MB612|MB632|MB810|MB855|MB860|MB861|MB865|MB870|ME501|ME502|ME511|ME525|ME600|ME632|ME722|ME811|ME860|ME863|ME865|MT620|MT710|MT716|MT720|MT810|MT870|MT917|Motorola.*TITANIUM|WX435|WX445|XT300|XT301|XT311|XT316|XT317|XT319|XT320|XT390|XT502|XT530|XT531|XT532|XT535|XT603|XT610|XT611|XT615|XT681|XT701|XT702|XT711|XT720|XT800|XT806|XT860|XT862|XT875|XT882|XT883|XT894|XT901|XT907|XT909|XT910|XT912|XT928|XT926|XT915|XT919|XT925|XT1021|\\bMoto E\\b|XT1068|XT1092|XT1052",Samsung:"\\bSamsung\\b|SM-G950F|SM-G955F|SM-G9250|GT-19300|SGH-I337|BGT-S5230|GT-B2100|GT-B2700|GT-B2710|GT-B3210|GT-B3310|GT-B3410|GT-B3730|GT-B3740|GT-B5510|GT-B5512|GT-B5722|GT-B6520|GT-B7300|GT-B7320|GT-B7330|GT-B7350|GT-B7510|GT-B7722|GT-B7800|GT-C3010|GT-C3011|GT-C3060|GT-C3200|GT-C3212|GT-C3212I|GT-C3262|GT-C3222|GT-C3300|GT-C3300K|GT-C3303|GT-C3303K|GT-C3310|GT-C3322|GT-C3330|GT-C3350|GT-C3500|GT-C3510|GT-C3530|GT-C3630|GT-C3780|GT-C5010|GT-C5212|GT-C6620|GT-C6625|GT-C6712|GT-E1050|GT-E1070|GT-E1075|GT-E1080|GT-E1081|GT-E1085|GT-E1087|GT-E1100|GT-E1107|GT-E1110|GT-E1120|GT-E1125|GT-E1130|GT-E1160|GT-E1170|GT-E1175|GT-E1180|GT-E1182|GT-E1200|GT-E1210|GT-E1225|GT-E1230|GT-E1390|GT-E2100|GT-E2120|GT-E2121|GT-E2152|GT-E2220|GT-E2222|GT-E2230|GT-E2232|GT-E2250|GT-E2370|GT-E2550|GT-E2652|GT-E3210|GT-E3213|GT-I5500|GT-I5503|GT-I5700|GT-I5800|GT-I5801|GT-I6410|GT-I6420|GT-I7110|GT-I7410|GT-I7500|GT-I8000|GT-I8150|GT-I8160|GT-I8190|GT-I8320|GT-I8330|GT-I8350|GT-I8530|GT-I8700|GT-I8703|GT-I8910|GT-I9000|GT-I9001|GT-I9003|GT-I9010|GT-I9020|GT-I9023|GT-I9070|GT-I9082|GT-I9100|GT-I9103|GT-I9220|GT-I9250|GT-I9300|GT-I9305|GT-I9500|GT-I9505|GT-M3510|GT-M5650|GT-M7500|GT-M7600|GT-M7603|GT-M8800|GT-M8910|GT-N7000|GT-S3110|GT-S3310|GT-S3350|GT-S3353|GT-S3370|GT-S3650|GT-S3653|GT-S3770|GT-S3850|GT-S5210|GT-S5220|GT-S5229|GT-S5230|GT-S5233|GT-S5250|GT-S5253|GT-S5260|GT-S5263|GT-S5270|GT-S5300|GT-S5330|GT-S5350|GT-S5360|GT-S5363|GT-S5369|GT-S5380|GT-S5380D|GT-S5560|GT-S5570|GT-S5600|GT-S5603|GT-S5610|GT-S5620|GT-S5660|GT-S5670|GT-S5690|GT-S5750|GT-S5780|GT-S5830|GT-S5839|GT-S6102|GT-S6500|GT-S7070|GT-S7200|GT-S7220|GT-S7230|GT-S7233|GT-S7250|GT-S7500|GT-S7530|GT-S7550|GT-S7562|GT-S7710|GT-S8000|GT-S8003|GT-S8500|GT-S8530|GT-S8600|SCH-A310|SCH-A530|SCH-A570|SCH-A610|SCH-A630|SCH-A650|SCH-A790|SCH-A795|SCH-A850|SCH-A870|SCH-A890|SCH-A930|SCH-A950|SCH-A970|SCH-A990|SCH-I100|SCH-I110|SCH-I400|SCH-I405|SCH-I500|SCH-I510|SCH-I515|SCH-I600|SCH-I730|SCH-I760|SCH-I770|SCH-I830|SCH-I910|SCH-I920|SCH-I959|SCH-LC11|SCH-N150|SCH-N300|SCH-R100|SCH-R300|SCH-R351|SCH-R400|SCH-R410|SCH-T300|SCH-U310|SCH-U320|SCH-U350|SCH-U360|SCH-U365|SCH-U370|SCH-U380|SCH-U410|SCH-U430|SCH-U450|SCH-U460|SCH-U470|SCH-U490|SCH-U540|SCH-U550|SCH-U620|SCH-U640|SCH-U650|SCH-U660|SCH-U700|SCH-U740|SCH-U750|SCH-U810|SCH-U820|SCH-U900|SCH-U940|SCH-U960|SCS-26UC|SGH-A107|SGH-A117|SGH-A127|SGH-A137|SGH-A157|SGH-A167|SGH-A177|SGH-A187|SGH-A197|SGH-A227|SGH-A237|SGH-A257|SGH-A437|SGH-A517|SGH-A597|SGH-A637|SGH-A657|SGH-A667|SGH-A687|SGH-A697|SGH-A707|SGH-A717|SGH-A727|SGH-A737|SGH-A747|SGH-A767|SGH-A777|SGH-A797|SGH-A817|SGH-A827|SGH-A837|SGH-A847|SGH-A867|SGH-A877|SGH-A887|SGH-A897|SGH-A927|SGH-B100|SGH-B130|SGH-B200|SGH-B220|SGH-C100|SGH-C110|SGH-C120|SGH-C130|SGH-C140|SGH-C160|SGH-C170|SGH-C180|SGH-C200|SGH-C207|SGH-C210|SGH-C225|SGH-C230|SGH-C417|SGH-C450|SGH-D307|SGH-D347|SGH-D357|SGH-D407|SGH-D415|SGH-D780|SGH-D807|SGH-D980|SGH-E105|SGH-E200|SGH-E315|SGH-E316|SGH-E317|SGH-E335|SGH-E590|SGH-E635|SGH-E715|SGH-E890|SGH-F300|SGH-F480|SGH-I200|SGH-I300|SGH-I320|SGH-I550|SGH-I577|SGH-I600|SGH-I607|SGH-I617|SGH-I627|SGH-I637|SGH-I677|SGH-I700|SGH-I717|SGH-I727|SGH-i747M|SGH-I777|SGH-I780|SGH-I827|SGH-I847|SGH-I857|SGH-I896|SGH-I897|SGH-I900|SGH-I907|SGH-I917|SGH-I927|SGH-I937|SGH-I997|SGH-J150|SGH-J200|SGH-L170|SGH-L700|SGH-M110|SGH-M150|SGH-M200|SGH-N105|SGH-N500|SGH-N600|SGH-N620|SGH-N625|SGH-N700|SGH-N710|SGH-P107|SGH-P207|SGH-P300|SGH-P310|SGH-P520|SGH-P735|SGH-P777|SGH-Q105|SGH-R210|SGH-R220|SGH-R225|SGH-S105|SGH-S307|SGH-T109|SGH-T119|SGH-T139|SGH-T209|SGH-T219|SGH-T229|SGH-T239|SGH-T249|SGH-T259|SGH-T309|SGH-T319|SGH-T329|SGH-T339|SGH-T349|SGH-T359|SGH-T369|SGH-T379|SGH-T409|SGH-T429|SGH-T439|SGH-T459|SGH-T469|SGH-T479|SGH-T499|SGH-T509|SGH-T519|SGH-T539|SGH-T559|SGH-T589|SGH-T609|SGH-T619|SGH-T629|SGH-T639|SGH-T659|SGH-T669|SGH-T679|SGH-T709|SGH-T719|SGH-T729|SGH-T739|SGH-T746|SGH-T749|SGH-T759|SGH-T769|SGH-T809|SGH-T819|SGH-T839|SGH-T919|SGH-T929|SGH-T939|SGH-T959|SGH-T989|SGH-U100|SGH-U200|SGH-U800|SGH-V205|SGH-V206|SGH-X100|SGH-X105|SGH-X120|SGH-X140|SGH-X426|SGH-X427|SGH-X475|SGH-X495|SGH-X497|SGH-X507|SGH-X600|SGH-X610|SGH-X620|SGH-X630|SGH-X700|SGH-X820|SGH-X890|SGH-Z130|SGH-Z150|SGH-Z170|SGH-ZX10|SGH-ZX20|SHW-M110|SPH-A120|SPH-A400|SPH-A420|SPH-A460|SPH-A500|SPH-A560|SPH-A600|SPH-A620|SPH-A660|SPH-A700|SPH-A740|SPH-A760|SPH-A790|SPH-A800|SPH-A820|SPH-A840|SPH-A880|SPH-A900|SPH-A940|SPH-A960|SPH-D600|SPH-D700|SPH-D710|SPH-D720|SPH-I300|SPH-I325|SPH-I330|SPH-I350|SPH-I500|SPH-I600|SPH-I700|SPH-L700|SPH-M100|SPH-M220|SPH-M240|SPH-M300|SPH-M305|SPH-M320|SPH-M330|SPH-M350|SPH-M360|SPH-M370|SPH-M380|SPH-M510|SPH-M540|SPH-M550|SPH-M560|SPH-M570|SPH-M580|SPH-M610|SPH-M620|SPH-M630|SPH-M800|SPH-M810|SPH-M850|SPH-M900|SPH-M910|SPH-M920|SPH-M930|SPH-N100|SPH-N200|SPH-N240|SPH-N300|SPH-N400|SPH-Z400|SWC-E100|SCH-i909|GT-N7100|GT-N7105|SCH-I535|SM-N900A|SGH-I317|SGH-T999L|GT-S5360B|GT-I8262|GT-S6802|GT-S6312|GT-S6310|GT-S5312|GT-S5310|GT-I9105|GT-I8510|GT-S6790N|SM-G7105|SM-N9005|GT-S5301|GT-I9295|GT-I9195|SM-C101|GT-S7392|GT-S7560|GT-B7610|GT-I5510|GT-S7582|GT-S7530E|GT-I8750|SM-G9006V|SM-G9008V|SM-G9009D|SM-G900A|SM-G900D|SM-G900F|SM-G900H|SM-G900I|SM-G900J|SM-G900K|SM-G900L|SM-G900M|SM-G900P|SM-G900R4|SM-G900S|SM-G900T|SM-G900V|SM-G900W8|SHV-E160K|SCH-P709|SCH-P729|SM-T2558|GT-I9205|SM-G9350|SM-J120F|SM-G920F|SM-G920V|SM-G930F|SM-N910C|SM-A310F|GT-I9190|SM-J500FN|SM-G903F|SM-J330F",LG:"\\bLG\\b;|LG[- ]?(C800|C900|E400|E610|E900|E-900|F160|F180K|F180L|F180S|730|855|L160|LS740|LS840|LS970|LU6200|MS690|MS695|MS770|MS840|MS870|MS910|P500|P700|P705|VM696|AS680|AS695|AX840|C729|E970|GS505|272|C395|E739BK|E960|L55C|L75C|LS696|LS860|P769BK|P350|P500|P509|P870|UN272|US730|VS840|VS950|LN272|LN510|LS670|LS855|LW690|MN270|MN510|P509|P769|P930|UN200|UN270|UN510|UN610|US670|US740|US760|UX265|UX840|VN271|VN530|VS660|VS700|VS740|VS750|VS910|VS920|VS930|VX9200|VX11000|AX840A|LW770|P506|P925|P999|E612|D955|D802|MS323|M257)|LM-G710",Sony:"SonyST|SonyLT|SonyEricsson|SonyEricssonLT15iv|LT18i|E10i|LT28h|LT26w|SonyEricssonMT27i|C5303|C6902|C6903|C6906|C6943|D2533",Asus:"Asus.*Galaxy|PadFone.*Mobile",NokiaLumia:"Lumia [0-9]{3,4}",Micromax:"Micromax.*\\b(A210|A92|A88|A72|A111|A110Q|A115|A116|A110|A90S|A26|A51|A35|A54|A25|A27|A89|A68|A65|A57|A90)\\b",Palm:"PalmSource|Palm",Vertu:"Vertu|Vertu.*Ltd|Vertu.*Ascent|Vertu.*Ayxta|Vertu.*Constellation(F|Quest)?|Vertu.*Monika|Vertu.*Signature",Pantech:"PANTECH|IM-A850S|IM-A840S|IM-A830L|IM-A830K|IM-A830S|IM-A820L|IM-A810K|IM-A810S|IM-A800S|IM-T100K|IM-A725L|IM-A780L|IM-A775C|IM-A770K|IM-A760S|IM-A750K|IM-A740S|IM-A730S|IM-A720L|IM-A710K|IM-A690L|IM-A690S|IM-A650S|IM-A630K|IM-A600S|VEGA PTL21|PT003|P8010|ADR910L|P6030|P6020|P9070|P4100|P9060|P5000|CDM8992|TXT8045|ADR8995|IS11PT|P2030|P6010|P8000|PT002|IS06|CDM8999|P9050|PT001|TXT8040|P2020|P9020|P2000|P7040|P7000|C790",Fly:"IQ230|IQ444|IQ450|IQ440|IQ442|IQ441|IQ245|IQ256|IQ236|IQ255|IQ235|IQ245|IQ275|IQ240|IQ285|IQ280|IQ270|IQ260|IQ250",Wiko:"KITE 4G|HIGHWAY|GETAWAY|STAIRWAY|DARKSIDE|DARKFULL|DARKNIGHT|DARKMOON|SLIDE|WAX 4G|RAINBOW|BLOOM|SUNSET|GOA(?!nna)|LENNY|BARRY|IGGY|OZZY|CINK FIVE|CINK PEAX|CINK PEAX 2|CINK SLIM|CINK SLIM 2|CINK +|CINK KING|CINK PEAX|CINK SLIM|SUBLIM",iMobile:"i-mobile (IQ|i-STYLE|idea|ZAA|Hitz)",SimValley:"\\b(SP-80|XT-930|SX-340|XT-930|SX-310|SP-360|SP60|SPT-800|SP-120|SPT-800|SP-140|SPX-5|SPX-8|SP-100|SPX-8|SPX-12)\\b",Wolfgang:"AT-B24D|AT-AS50HD|AT-AS40W|AT-AS55HD|AT-AS45q2|AT-B26D|AT-AS50Q",Alcatel:"Alcatel",Nintendo:"Nintendo (3DS|Switch)",Amoi:"Amoi",INQ:"INQ",OnePlus:"ONEPLUS",GenericPhone:"Tapatalk|PDA;|SAGEM|\\bmmp\\b|pocket|\\bpsp\\b|symbian|Smartphone|smartfon|treo|up.browser|up.link|vodafone|\\bwap\\b|nokia|Series40|Series60|S60|SonyEricsson|N900|MAUI.*WAP.*Browser"},tablets:{iPad:"iPad|iPad.*Mobile",NexusTablet:"Android.*Nexus[\\s]+(7|9|10)",GoogleTablet:"Android.*Pixel C",SamsungTablet:"SAMSUNG.*Tablet|Galaxy.*Tab|SC-01C|GT-P1000|GT-P1003|GT-P1010|GT-P3105|GT-P6210|GT-P6800|GT-P6810|GT-P7100|GT-P7300|GT-P7310|GT-P7500|GT-P7510|SCH-I800|SCH-I815|SCH-I905|SGH-I957|SGH-I987|SGH-T849|SGH-T859|SGH-T869|SPH-P100|GT-P3100|GT-P3108|GT-P3110|GT-P5100|GT-P5110|GT-P6200|GT-P7320|GT-P7511|GT-N8000|GT-P8510|SGH-I497|SPH-P500|SGH-T779|SCH-I705|SCH-I915|GT-N8013|GT-P3113|GT-P5113|GT-P8110|GT-N8010|GT-N8005|GT-N8020|GT-P1013|GT-P6201|GT-P7501|GT-N5100|GT-N5105|GT-N5110|SHV-E140K|SHV-E140L|SHV-E140S|SHV-E150S|SHV-E230K|SHV-E230L|SHV-E230S|SHW-M180K|SHW-M180L|SHW-M180S|SHW-M180W|SHW-M300W|SHW-M305W|SHW-M380K|SHW-M380S|SHW-M380W|SHW-M430W|SHW-M480K|SHW-M480S|SHW-M480W|SHW-M485W|SHW-M486W|SHW-M500W|GT-I9228|SCH-P739|SCH-I925|GT-I9200|GT-P5200|GT-P5210|GT-P5210X|SM-T311|SM-T310|SM-T310X|SM-T210|SM-T210R|SM-T211|SM-P600|SM-P601|SM-P605|SM-P900|SM-P901|SM-T217|SM-T217A|SM-T217S|SM-P6000|SM-T3100|SGH-I467|XE500|SM-T110|GT-P5220|GT-I9200X|GT-N5110X|GT-N5120|SM-P905|SM-T111|SM-T2105|SM-T315|SM-T320|SM-T320X|SM-T321|SM-T520|SM-T525|SM-T530NU|SM-T230NU|SM-T330NU|SM-T900|XE500T1C|SM-P605V|SM-P905V|SM-T337V|SM-T537V|SM-T707V|SM-T807V|SM-P600X|SM-P900X|SM-T210X|SM-T230|SM-T230X|SM-T325|GT-P7503|SM-T531|SM-T330|SM-T530|SM-T705|SM-T705C|SM-T535|SM-T331|SM-T800|SM-T700|SM-T537|SM-T807|SM-P907A|SM-T337A|SM-T537A|SM-T707A|SM-T807A|SM-T237|SM-T807P|SM-P607T|SM-T217T|SM-T337T|SM-T807T|SM-T116NQ|SM-T116BU|SM-P550|SM-T350|SM-T550|SM-T9000|SM-P9000|SM-T705Y|SM-T805|GT-P3113|SM-T710|SM-T810|SM-T815|SM-T360|SM-T533|SM-T113|SM-T335|SM-T715|SM-T560|SM-T670|SM-T677|SM-T377|SM-T567|SM-T357T|SM-T555|SM-T561|SM-T713|SM-T719|SM-T813|SM-T819|SM-T580|SM-T355Y?|SM-T280|SM-T817A|SM-T820|SM-W700|SM-P580|SM-T587|SM-P350|SM-P555M|SM-P355M|SM-T113NU|SM-T815Y|SM-T585|SM-T285|SM-T825|SM-W708|SM-T835|SM-T830|SM-T837V|SM-T720|SM-T510|SM-T387V",Kindle:"Kindle|Silk.*Accelerated|Android.*\\b(KFOT|KFTT|KFJWI|KFJWA|KFOTE|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|WFJWAE|KFSAWA|KFSAWI|KFASWI|KFARWI|KFFOWI|KFGIWI|KFMEWI)\\b|Android.*Silk/[0-9.]+ like Chrome/[0-9.]+ (?!Mobile)",SurfaceTablet:"Windows NT [0-9.]+; ARM;.*(Tablet|ARMBJS)",HPTablet:"HP Slate (7|8|10)|HP ElitePad 900|hp-tablet|EliteBook.*Touch|HP 8|Slate 21|HP SlateBook 10",AsusTablet:"^.*PadFone((?!Mobile).)*$|Transformer|TF101|TF101G|TF300T|TF300TG|TF300TL|TF700T|TF700KL|TF701T|TF810C|ME171|ME301T|ME302C|ME371MG|ME370T|ME372MG|ME172V|ME173X|ME400C|Slider SL101|\\bK00F\\b|\\bK00C\\b|\\bK00E\\b|\\bK00L\\b|TX201LA|ME176C|ME102A|\\bM80TA\\b|ME372CL|ME560CG|ME372CG|ME302KL| K010 | K011 | K017 | K01E |ME572C|ME103K|ME170C|ME171C|\\bME70C\\b|ME581C|ME581CL|ME8510C|ME181C|P01Y|PO1MA|P01Z|\\bP027\\b|\\bP024\\b|\\bP00C\\b",BlackBerryTablet:"PlayBook|RIM Tablet",HTCtablet:"HTC_Flyer_P512|HTC Flyer|HTC Jetstream|HTC-P715a|HTC EVO View 4G|PG41200|PG09410",MotorolaTablet:"xoom|sholest|MZ615|MZ605|MZ505|MZ601|MZ602|MZ603|MZ604|MZ606|MZ607|MZ608|MZ609|MZ615|MZ616|MZ617",NookTablet:"Android.*Nook|NookColor|nook browser|BNRV200|BNRV200A|BNTV250|BNTV250A|BNTV400|BNTV600|LogicPD Zoom2",AcerTablet:"Android.*; \\b(A100|A101|A110|A200|A210|A211|A500|A501|A510|A511|A700|A701|W500|W500P|W501|W501P|W510|W511|W700|G100|G100W|B1-A71|B1-710|B1-711|A1-810|A1-811|A1-830)\\b|W3-810|\\bA3-A10\\b|\\bA3-A11\\b|\\bA3-A20\\b|\\bA3-A30",ToshibaTablet:"Android.*(AT100|AT105|AT200|AT205|AT270|AT275|AT300|AT305|AT1S5|AT500|AT570|AT700|AT830)|TOSHIBA.*FOLIO",LGTablet:"\\bL-06C|LG-V909|LG-V900|LG-V700|LG-V510|LG-V500|LG-V410|LG-V400|LG-VK810\\b",FujitsuTablet:"Android.*\\b(F-01D|F-02F|F-05E|F-10D|M532|Q572)\\b",PrestigioTablet:"PMP3170B|PMP3270B|PMP3470B|PMP7170B|PMP3370B|PMP3570C|PMP5870C|PMP3670B|PMP5570C|PMP5770D|PMP3970B|PMP3870C|PMP5580C|PMP5880D|PMP5780D|PMP5588C|PMP7280C|PMP7280C3G|PMP7280|PMP7880D|PMP5597D|PMP5597|PMP7100D|PER3464|PER3274|PER3574|PER3884|PER5274|PER5474|PMP5097CPRO|PMP5097|PMP7380D|PMP5297C|PMP5297C_QUAD|PMP812E|PMP812E3G|PMP812F|PMP810E|PMP880TD|PMT3017|PMT3037|PMT3047|PMT3057|PMT7008|PMT5887|PMT5001|PMT5002",LenovoTablet:"Lenovo TAB|Idea(Tab|Pad)( A1|A10| K1|)|ThinkPad([ ]+)?Tablet|YT3-850M|YT3-X90L|YT3-X90F|YT3-X90X|Lenovo.*(S2109|S2110|S5000|S6000|K3011|A3000|A3500|A1000|A2107|A2109|A1107|A5500|A7600|B6000|B8000|B8080)(-|)(FL|F|HV|H|)|TB-X103F|TB-X304X|TB-X304F|TB-X304L|TB-X505F|TB-X505L|TB-X505X|TB-X605F|TB-X605L|TB-8703F|TB-8703X|TB-8703N|TB-8704N|TB-8704F|TB-8704X|TB-8704V|TB-7304F|TB-7304I|TB-7304X|Tab2A7-10F|Tab2A7-20F|TB2-X30L|YT3-X50L|YT3-X50F|YT3-X50M|YT-X705F|YT-X703F|YT-X703L|YT-X705L|YT-X705X|TB2-X30F|TB2-X30L|TB2-X30M|A2107A-F|A2107A-H|TB3-730F|TB3-730M|TB3-730X|TB-7504F|TB-7504X",DellTablet:"Venue 11|Venue 8|Venue 7|Dell Streak 10|Dell Streak 7",YarvikTablet:"Android.*\\b(TAB210|TAB211|TAB224|TAB250|TAB260|TAB264|TAB310|TAB360|TAB364|TAB410|TAB411|TAB420|TAB424|TAB450|TAB460|TAB461|TAB464|TAB465|TAB467|TAB468|TAB07-100|TAB07-101|TAB07-150|TAB07-151|TAB07-152|TAB07-200|TAB07-201-3G|TAB07-210|TAB07-211|TAB07-212|TAB07-214|TAB07-220|TAB07-400|TAB07-485|TAB08-150|TAB08-200|TAB08-201-3G|TAB08-201-30|TAB09-100|TAB09-211|TAB09-410|TAB10-150|TAB10-201|TAB10-211|TAB10-400|TAB10-410|TAB13-201|TAB274EUK|TAB275EUK|TAB374EUK|TAB462EUK|TAB474EUK|TAB9-200)\\b",MedionTablet:"Android.*\\bOYO\\b|LIFE.*(P9212|P9514|P9516|S9512)|LIFETAB",ArnovaTablet:"97G4|AN10G2|AN7bG3|AN7fG3|AN8G3|AN8cG3|AN7G3|AN9G3|AN7dG3|AN7dG3ST|AN7dG3ChildPad|AN10bG3|AN10bG3DT|AN9G2",IntensoTablet:"INM8002KP|INM1010FP|INM805ND|Intenso Tab|TAB1004",IRUTablet:"M702pro",MegafonTablet:"MegaFon V9|\\bZTE V9\\b|Android.*\\bMT7A\\b",EbodaTablet:"E-Boda (Supreme|Impresspeed|Izzycomm|Essential)",AllViewTablet:"Allview.*(Viva|Alldro|City|Speed|All TV|Frenzy|Quasar|Shine|TX1|AX1|AX2)",ArchosTablet:"\\b(101G9|80G9|A101IT)\\b|Qilive 97R|Archos5|\\bARCHOS (70|79|80|90|97|101|FAMILYPAD|)(b|c|)(G10| Cobalt| TITANIUM(HD|)| Xenon| Neon|XSK| 2| XS 2| PLATINUM| CARBON|GAMEPAD)\\b",AinolTablet:"NOVO7|NOVO8|NOVO10|Novo7Aurora|Novo7Basic|NOVO7PALADIN|novo9-Spark",NokiaLumiaTablet:"Lumia 2520",SonyTablet:"Sony.*Tablet|Xperia Tablet|Sony Tablet S|SO-03E|SGPT12|SGPT13|SGPT114|SGPT121|SGPT122|SGPT123|SGPT111|SGPT112|SGPT113|SGPT131|SGPT132|SGPT133|SGPT211|SGPT212|SGPT213|SGP311|SGP312|SGP321|EBRD1101|EBRD1102|EBRD1201|SGP351|SGP341|SGP511|SGP512|SGP521|SGP541|SGP551|SGP621|SGP641|SGP612|SOT31|SGP771|SGP611|SGP612|SGP712",PhilipsTablet:"\\b(PI2010|PI3000|PI3100|PI3105|PI3110|PI3205|PI3210|PI3900|PI4010|PI7000|PI7100)\\b",CubeTablet:"Android.*(K8GT|U9GT|U10GT|U16GT|U17GT|U18GT|U19GT|U20GT|U23GT|U30GT)|CUBE U8GT",CobyTablet:"MID1042|MID1045|MID1125|MID1126|MID7012|MID7014|MID7015|MID7034|MID7035|MID7036|MID7042|MID7048|MID7127|MID8042|MID8048|MID8127|MID9042|MID9740|MID9742|MID7022|MID7010",MIDTablet:"M9701|M9000|M9100|M806|M1052|M806|T703|MID701|MID713|MID710|MID727|MID760|MID830|MID728|MID933|MID125|MID810|MID732|MID120|MID930|MID800|MID731|MID900|MID100|MID820|MID735|MID980|MID130|MID833|MID737|MID960|MID135|MID860|MID736|MID140|MID930|MID835|MID733|MID4X10",MSITablet:"MSI \\b(Primo 73K|Primo 73L|Primo 81L|Primo 77|Primo 93|Primo 75|Primo 76|Primo 73|Primo 81|Primo 91|Primo 90|Enjoy 71|Enjoy 7|Enjoy 10)\\b",SMiTTablet:"Android.*(\\bMID\\b|MID-560|MTV-T1200|MTV-PND531|MTV-P1101|MTV-PND530)",RockChipTablet:"Android.*(RK2818|RK2808A|RK2918|RK3066)|RK2738|RK2808A",FlyTablet:"IQ310|Fly Vision",bqTablet:"Android.*(bq)?.*\\b(Elcano|Curie|Edison|Maxwell|Kepler|Pascal|Tesla|Hypatia|Platon|Newton|Livingstone|Cervantes|Avant|Aquaris ([E|M]10|M8))\\b|Maxwell.*Lite|Maxwell.*Plus",HuaweiTablet:"MediaPad|MediaPad 7 Youth|IDEOS S7|S7-201c|S7-202u|S7-101|S7-103|S7-104|S7-105|S7-106|S7-201|S7-Slim|M2-A01L|BAH-L09|BAH-W09|AGS-L09|CMR-AL19",NecTablet:"\\bN-06D|\\bN-08D",PantechTablet:"Pantech.*P4100",BronchoTablet:"Broncho.*(N701|N708|N802|a710)",VersusTablet:"TOUCHPAD.*[78910]|\\bTOUCHTAB\\b",ZyncTablet:"z1000|Z99 2G|z930|z990|z909|Z919|z900",PositivoTablet:"TB07STA|TB10STA|TB07FTA|TB10FTA",NabiTablet:"Android.*\\bNabi",KoboTablet:"Kobo Touch|\\bK080\\b|\\bVox\\b Build|\\bArc\\b Build",DanewTablet:"DSlide.*\\b(700|701R|702|703R|704|802|970|971|972|973|974|1010|1012)\\b",TexetTablet:"NaviPad|TB-772A|TM-7045|TM-7055|TM-9750|TM-7016|TM-7024|TM-7026|TM-7041|TM-7043|TM-7047|TM-8041|TM-9741|TM-9747|TM-9748|TM-9751|TM-7022|TM-7021|TM-7020|TM-7011|TM-7010|TM-7023|TM-7025|TM-7037W|TM-7038W|TM-7027W|TM-9720|TM-9725|TM-9737W|TM-1020|TM-9738W|TM-9740|TM-9743W|TB-807A|TB-771A|TB-727A|TB-725A|TB-719A|TB-823A|TB-805A|TB-723A|TB-715A|TB-707A|TB-705A|TB-709A|TB-711A|TB-890HD|TB-880HD|TB-790HD|TB-780HD|TB-770HD|TB-721HD|TB-710HD|TB-434HD|TB-860HD|TB-840HD|TB-760HD|TB-750HD|TB-740HD|TB-730HD|TB-722HD|TB-720HD|TB-700HD|TB-500HD|TB-470HD|TB-431HD|TB-430HD|TB-506|TB-504|TB-446|TB-436|TB-416|TB-146SE|TB-126SE",PlaystationTablet:"Playstation.*(Portable|Vita)",TrekstorTablet:"ST10416-1|VT10416-1|ST70408-1|ST702xx-1|ST702xx-2|ST80208|ST97216|ST70104-2|VT10416-2|ST10216-2A|SurfTab",PyleAudioTablet:"\\b(PTBL10CEU|PTBL10C|PTBL72BC|PTBL72BCEU|PTBL7CEU|PTBL7C|PTBL92BC|PTBL92BCEU|PTBL9CEU|PTBL9CUK|PTBL9C)\\b",AdvanTablet:"Android.* \\b(E3A|T3X|T5C|T5B|T3E|T3C|T3B|T1J|T1F|T2A|T1H|T1i|E1C|T1-E|T5-A|T4|E1-B|T2Ci|T1-B|T1-D|O1-A|E1-A|T1-A|T3A|T4i)\\b ",DanyTechTablet:"Genius Tab G3|Genius Tab S2|Genius Tab Q3|Genius Tab G4|Genius Tab Q4|Genius Tab G-II|Genius TAB GII|Genius TAB GIII|Genius Tab S1",GalapadTablet:"Android.*\\bG1\\b(?!\\))",MicromaxTablet:"Funbook|Micromax.*\\b(P250|P560|P360|P362|P600|P300|P350|P500|P275)\\b",KarbonnTablet:"Android.*\\b(A39|A37|A34|ST8|ST10|ST7|Smart Tab3|Smart Tab2)\\b",AllFineTablet:"Fine7 Genius|Fine7 Shine|Fine7 Air|Fine8 Style|Fine9 More|Fine10 Joy|Fine11 Wide",PROSCANTablet:"\\b(PEM63|PLT1023G|PLT1041|PLT1044|PLT1044G|PLT1091|PLT4311|PLT4311PL|PLT4315|PLT7030|PLT7033|PLT7033D|PLT7035|PLT7035D|PLT7044K|PLT7045K|PLT7045KB|PLT7071KG|PLT7072|PLT7223G|PLT7225G|PLT7777G|PLT7810K|PLT7849G|PLT7851G|PLT7852G|PLT8015|PLT8031|PLT8034|PLT8036|PLT8080K|PLT8082|PLT8088|PLT8223G|PLT8234G|PLT8235G|PLT8816K|PLT9011|PLT9045K|PLT9233G|PLT9735|PLT9760G|PLT9770G)\\b",YONESTablet:"BQ1078|BC1003|BC1077|RK9702|BC9730|BC9001|IT9001|BC7008|BC7010|BC708|BC728|BC7012|BC7030|BC7027|BC7026",ChangJiaTablet:"TPC7102|TPC7103|TPC7105|TPC7106|TPC7107|TPC7201|TPC7203|TPC7205|TPC7210|TPC7708|TPC7709|TPC7712|TPC7110|TPC8101|TPC8103|TPC8105|TPC8106|TPC8203|TPC8205|TPC8503|TPC9106|TPC9701|TPC97101|TPC97103|TPC97105|TPC97106|TPC97111|TPC97113|TPC97203|TPC97603|TPC97809|TPC97205|TPC10101|TPC10103|TPC10106|TPC10111|TPC10203|TPC10205|TPC10503",GUTablet:"TX-A1301|TX-M9002|Q702|kf026",PointOfViewTablet:"TAB-P506|TAB-navi-7-3G-M|TAB-P517|TAB-P-527|TAB-P701|TAB-P703|TAB-P721|TAB-P731N|TAB-P741|TAB-P825|TAB-P905|TAB-P925|TAB-PR945|TAB-PL1015|TAB-P1025|TAB-PI1045|TAB-P1325|TAB-PROTAB[0-9]+|TAB-PROTAB25|TAB-PROTAB26|TAB-PROTAB27|TAB-PROTAB26XL|TAB-PROTAB2-IPS9|TAB-PROTAB30-IPS9|TAB-PROTAB25XXL|TAB-PROTAB26-IPS10|TAB-PROTAB30-IPS10",OvermaxTablet:"OV-(SteelCore|NewBase|Basecore|Baseone|Exellen|Quattor|EduTab|Solution|ACTION|BasicTab|TeddyTab|MagicTab|Stream|TB-08|TB-09)|Qualcore 1027",HCLTablet:"HCL.*Tablet|Connect-3G-2.0|Connect-2G-2.0|ME Tablet U1|ME Tablet U2|ME Tablet G1|ME Tablet X1|ME Tablet Y2|ME Tablet Sync",DPSTablet:"DPS Dream 9|DPS Dual 7",VistureTablet:"V97 HD|i75 3G|Visture V4( HD)?|Visture V5( HD)?|Visture V10",CrestaTablet:"CTP(-)?810|CTP(-)?818|CTP(-)?828|CTP(-)?838|CTP(-)?888|CTP(-)?978|CTP(-)?980|CTP(-)?987|CTP(-)?988|CTP(-)?989",MediatekTablet:"\\bMT8125|MT8389|MT8135|MT8377\\b",ConcordeTablet:"Concorde([ ]+)?Tab|ConCorde ReadMan",GoCleverTablet:"GOCLEVER TAB|A7GOCLEVER|M1042|M7841|M742|R1042BK|R1041|TAB A975|TAB A7842|TAB A741|TAB A741L|TAB M723G|TAB M721|TAB A1021|TAB I921|TAB R721|TAB I720|TAB T76|TAB R70|TAB R76.2|TAB R106|TAB R83.2|TAB M813G|TAB I721|GCTA722|TAB I70|TAB I71|TAB S73|TAB R73|TAB R74|TAB R93|TAB R75|TAB R76.1|TAB A73|TAB A93|TAB A93.2|TAB T72|TAB R83|TAB R974|TAB R973|TAB A101|TAB A103|TAB A104|TAB A104.2|R105BK|M713G|A972BK|TAB A971|TAB R974.2|TAB R104|TAB R83.3|TAB A1042",ModecomTablet:"FreeTAB 9000|FreeTAB 7.4|FreeTAB 7004|FreeTAB 7800|FreeTAB 2096|FreeTAB 7.5|FreeTAB 1014|FreeTAB 1001 |FreeTAB 8001|FreeTAB 9706|FreeTAB 9702|FreeTAB 7003|FreeTAB 7002|FreeTAB 1002|FreeTAB 7801|FreeTAB 1331|FreeTAB 1004|FreeTAB 8002|FreeTAB 8014|FreeTAB 9704|FreeTAB 1003",VoninoTablet:"\\b(Argus[ _]?S|Diamond[ _]?79HD|Emerald[ _]?78E|Luna[ _]?70C|Onyx[ _]?S|Onyx[ _]?Z|Orin[ _]?HD|Orin[ _]?S|Otis[ _]?S|SpeedStar[ _]?S|Magnet[ _]?M9|Primus[ _]?94[ _]?3G|Primus[ _]?94HD|Primus[ _]?QS|Android.*\\bQ8\\b|Sirius[ _]?EVO[ _]?QS|Sirius[ _]?QS|Spirit[ _]?S)\\b",ECSTablet:"V07OT2|TM105A|S10OT1|TR10CS1",StorexTablet:"eZee[_']?(Tab|Go)[0-9]+|TabLC7|Looney Tunes Tab",VodafoneTablet:"SmartTab([ ]+)?[0-9]+|SmartTabII10|SmartTabII7|VF-1497|VFD 1400",EssentielBTablet:"Smart[ ']?TAB[ ]+?[0-9]+|Family[ ']?TAB2",RossMoorTablet:"RM-790|RM-997|RMD-878G|RMD-974R|RMT-705A|RMT-701|RME-601|RMT-501|RMT-711",iMobileTablet:"i-mobile i-note",TolinoTablet:"tolino tab [0-9.]+|tolino shine",AudioSonicTablet:"\\bC-22Q|T7-QC|T-17B|T-17P\\b",AMPETablet:"Android.* A78 ",SkkTablet:"Android.* (SKYPAD|PHOENIX|CYCLOPS)",TecnoTablet:"TECNO P9|TECNO DP8D",JXDTablet:"Android.* \\b(F3000|A3300|JXD5000|JXD3000|JXD2000|JXD300B|JXD300|S5800|S7800|S602b|S5110b|S7300|S5300|S602|S603|S5100|S5110|S601|S7100a|P3000F|P3000s|P101|P200s|P1000m|P200m|P9100|P1000s|S6600b|S908|P1000|P300|S18|S6600|S9100)\\b",iJoyTablet:"Tablet (Spirit 7|Essentia|Galatea|Fusion|Onix 7|Landa|Titan|Scooby|Deox|Stella|Themis|Argon|Unique 7|Sygnus|Hexen|Finity 7|Cream|Cream X2|Jade|Neon 7|Neron 7|Kandy|Scape|Saphyr 7|Rebel|Biox|Rebel|Rebel 8GB|Myst|Draco 7|Myst|Tab7-004|Myst|Tadeo Jones|Tablet Boing|Arrow|Draco Dual Cam|Aurix|Mint|Amity|Revolution|Finity 9|Neon 9|T9w|Amity 4GB Dual Cam|Stone 4GB|Stone 8GB|Andromeda|Silken|X2|Andromeda II|Halley|Flame|Saphyr 9,7|Touch 8|Planet|Triton|Unique 10|Hexen 10|Memphis 4GB|Memphis 8GB|Onix 10)",FX2Tablet:"FX2 PAD7|FX2 PAD10",XoroTablet:"KidsPAD 701|PAD[ ]?712|PAD[ ]?714|PAD[ ]?716|PAD[ ]?717|PAD[ ]?718|PAD[ ]?720|PAD[ ]?721|PAD[ ]?722|PAD[ ]?790|PAD[ ]?792|PAD[ ]?900|PAD[ ]?9715D|PAD[ ]?9716DR|PAD[ ]?9718DR|PAD[ ]?9719QR|PAD[ ]?9720QR|TelePAD1030|Telepad1032|TelePAD730|TelePAD731|TelePAD732|TelePAD735Q|TelePAD830|TelePAD9730|TelePAD795|MegaPAD 1331|MegaPAD 1851|MegaPAD 2151",ViewsonicTablet:"ViewPad 10pi|ViewPad 10e|ViewPad 10s|ViewPad E72|ViewPad7|ViewPad E100|ViewPad 7e|ViewSonic VB733|VB100a",VerizonTablet:"QTAQZ3|QTAIR7|QTAQTZ3|QTASUN1|QTASUN2|QTAXIA1",OdysTablet:"LOOX|XENO10|ODYS[ -](Space|EVO|Xpress|NOON)|\\bXELIO\\b|Xelio10Pro|XELIO7PHONETAB|XELIO10EXTREME|XELIOPT2|NEO_QUAD10",CaptivaTablet:"CAPTIVA PAD",IconbitTablet:"NetTAB|NT-3702|NT-3702S|NT-3702S|NT-3603P|NT-3603P|NT-0704S|NT-0704S|NT-3805C|NT-3805C|NT-0806C|NT-0806C|NT-0909T|NT-0909T|NT-0907S|NT-0907S|NT-0902S|NT-0902S",TeclastTablet:"T98 4G|\\bP80\\b|\\bX90HD\\b|X98 Air|X98 Air 3G|\\bX89\\b|P80 3G|\\bX80h\\b|P98 Air|\\bX89HD\\b|P98 3G|\\bP90HD\\b|P89 3G|X98 3G|\\bP70h\\b|P79HD 3G|G18d 3G|\\bP79HD\\b|\\bP89s\\b|\\bA88\\b|\\bP10HD\\b|\\bP19HD\\b|G18 3G|\\bP78HD\\b|\\bA78\\b|\\bP75\\b|G17s 3G|G17h 3G|\\bP85t\\b|\\bP90\\b|\\bP11\\b|\\bP98t\\b|\\bP98HD\\b|\\bG18d\\b|\\bP85s\\b|\\bP11HD\\b|\\bP88s\\b|\\bA80HD\\b|\\bA80se\\b|\\bA10h\\b|\\bP89\\b|\\bP78s\\b|\\bG18\\b|\\bP85\\b|\\bA70h\\b|\\bA70\\b|\\bG17\\b|\\bP18\\b|\\bA80s\\b|\\bA11s\\b|\\bP88HD\\b|\\bA80h\\b|\\bP76s\\b|\\bP76h\\b|\\bP98\\b|\\bA10HD\\b|\\bP78\\b|\\bP88\\b|\\bA11\\b|\\bA10t\\b|\\bP76a\\b|\\bP76t\\b|\\bP76e\\b|\\bP85HD\\b|\\bP85a\\b|\\bP86\\b|\\bP75HD\\b|\\bP76v\\b|\\bA12\\b|\\bP75a\\b|\\bA15\\b|\\bP76Ti\\b|\\bP81HD\\b|\\bA10\\b|\\bT760VE\\b|\\bT720HD\\b|\\bP76\\b|\\bP73\\b|\\bP71\\b|\\bP72\\b|\\bT720SE\\b|\\bC520Ti\\b|\\bT760\\b|\\bT720VE\\b|T720-3GE|T720-WiFi",OndaTablet:"\\b(V975i|Vi30|VX530|V701|Vi60|V701s|Vi50|V801s|V719|Vx610w|VX610W|V819i|Vi10|VX580W|Vi10|V711s|V813|V811|V820w|V820|Vi20|V711|VI30W|V712|V891w|V972|V819w|V820w|Vi60|V820w|V711|V813s|V801|V819|V975s|V801|V819|V819|V818|V811|V712|V975m|V101w|V961w|V812|V818|V971|V971s|V919|V989|V116w|V102w|V973|Vi40)\\b[\\s]+|V10 \\b4G\\b",JaytechTablet:"TPC-PA762",BlaupunktTablet:"Endeavour 800NG|Endeavour 1010",DigmaTablet:"\\b(iDx10|iDx9|iDx8|iDx7|iDxD7|iDxD8|iDsQ8|iDsQ7|iDsQ8|iDsD10|iDnD7|3TS804H|iDsQ11|iDj7|iDs10)\\b",EvolioTablet:"ARIA_Mini_wifi|Aria[ _]Mini|Evolio X10|Evolio X7|Evolio X8|\\bEvotab\\b|\\bNeura\\b",LavaTablet:"QPAD E704|\\bIvoryS\\b|E-TAB IVORY|\\bE-TAB\\b",AocTablet:"MW0811|MW0812|MW0922|MTK8382|MW1031|MW0831|MW0821|MW0931|MW0712",MpmanTablet:"MP11 OCTA|MP10 OCTA|MPQC1114|MPQC1004|MPQC994|MPQC974|MPQC973|MPQC804|MPQC784|MPQC780|\\bMPG7\\b|MPDCG75|MPDCG71|MPDC1006|MP101DC|MPDC9000|MPDC905|MPDC706HD|MPDC706|MPDC705|MPDC110|MPDC100|MPDC99|MPDC97|MPDC88|MPDC8|MPDC77|MP709|MID701|MID711|MID170|MPDC703|MPQC1010",CelkonTablet:"CT695|CT888|CT[\\s]?910|CT7 Tab|CT9 Tab|CT3 Tab|CT2 Tab|CT1 Tab|C820|C720|\\bCT-1\\b",WolderTablet:"miTab \\b(DIAMOND|SPACE|BROOKLYN|NEO|FLY|MANHATTAN|FUNK|EVOLUTION|SKY|GOCAR|IRON|GENIUS|POP|MINT|EPSILON|BROADWAY|JUMP|HOP|LEGEND|NEW AGE|LINE|ADVANCE|FEEL|FOLLOW|LIKE|LINK|LIVE|THINK|FREEDOM|CHICAGO|CLEVELAND|BALTIMORE-GH|IOWA|BOSTON|SEATTLE|PHOENIX|DALLAS|IN 101|MasterChef)\\b",MediacomTablet:"M-MPI10C3G|M-SP10EG|M-SP10EGP|M-SP10HXAH|M-SP7HXAH|M-SP10HXBH|M-SP8HXAH|M-SP8MXA",MiTablet:"\\bMI PAD\\b|\\bHM NOTE 1W\\b",NibiruTablet:"Nibiru M1|Nibiru Jupiter One",NexoTablet:"NEXO NOVA|NEXO 10|NEXO AVIO|NEXO FREE|NEXO GO|NEXO EVO|NEXO 3G|NEXO SMART|NEXO KIDDO|NEXO MOBI",LeaderTablet:"TBLT10Q|TBLT10I|TBL-10WDKB|TBL-10WDKBO2013|TBL-W230V2|TBL-W450|TBL-W500|SV572|TBLT7I|TBA-AC7-8G|TBLT79|TBL-8W16|TBL-10W32|TBL-10WKB|TBL-W100",UbislateTablet:"UbiSlate[\\s]?7C",PocketBookTablet:"Pocketbook",KocasoTablet:"\\b(TB-1207)\\b",HisenseTablet:"\\b(F5281|E2371)\\b",Hudl:"Hudl HT7S3|Hudl 2",TelstraTablet:"T-Hub2",GenericTablet:"Android.*\\b97D\\b|Tablet(?!.*PC)|BNTV250A|MID-WCDMA|LogicPD Zoom2|\\bA7EB\\b|CatNova8|A1_07|CT704|CT1002|\\bM721\\b|rk30sdk|\\bEVOTAB\\b|M758A|ET904|ALUMIUM10|Smartfren Tab|Endeavour 1010|Tablet-PC-4|Tagi Tab|\\bM6pro\\b|CT1020W|arc 10HD|\\bTP750\\b|\\bQTAQZ3\\b|WVT101|TM1088|KT107"},oss:{AndroidOS:"Android",BlackBerryOS:"blackberry|\\bBB10\\b|rim tablet os",PalmOS:"PalmOS|avantgo|blazer|elaine|hiptop|palm|plucker|xiino",SymbianOS:"Symbian|SymbOS|Series60|Series40|SYB-[0-9]+|\\bS60\\b",WindowsMobileOS:"Windows CE.*(PPC|Smartphone|Mobile|[0-9]{3}x[0-9]{3})|Windows Mobile|Windows Phone [0-9.]+|WCE;",WindowsPhoneOS:"Windows Phone 10.0|Windows Phone 8.1|Windows Phone 8.0|Windows Phone OS|XBLWP7|ZuneWP7|Windows NT 6.[23]; ARM;",iOS:"\\biPhone.*Mobile|\\biPod|\\biPad|AppleCoreMedia",iPadOS:"CPU OS 13",MeeGoOS:"MeeGo",MaemoOS:"Maemo",JavaOS:"J2ME/|\\bMIDP\\b|\\bCLDC\\b",webOS:"webOS|hpwOS",badaOS:"\\bBada\\b",BREWOS:"BREW"},uas:{Chrome:"\\bCrMo\\b|CriOS|Android.*Chrome/[.0-9]* (Mobile)?",Dolfin:"\\bDolfin\\b",Opera:"Opera.*Mini|Opera.*Mobi|Android.*Opera|Mobile.*OPR/[0-9.]+$|Coast/[0-9.]+",Skyfire:"Skyfire",Edge:"Mobile Safari/[.0-9]* Edge",IE:"IEMobile|MSIEMobile",Firefox:"fennec|firefox.*maemo|(Mobile|Tablet).*Firefox|Firefox.*Mobile|FxiOS",Bolt:"bolt",TeaShark:"teashark",Blazer:"Blazer",Safari:"Version.*Mobile.*Safari|Safari.*Mobile|MobileSafari",WeChat:"\\bMicroMessenger\\b",UCBrowser:"UC.*Browser|UCWEB",baiduboxapp:"baiduboxapp",baidubrowser:"baidubrowser",DiigoBrowser:"DiigoBrowser",Mercury:"\\bMercury\\b",ObigoBrowser:"Obigo",NetFront:"NF-Browser",GenericBrowser:"NokiaBrowser|OviBrowser|OneBrowser|TwonkyBeamBrowser|SEMC.*Browser|FlyFlow|Minimo|NetFront|Novarra-Vision|MQQBrowser|MicroMessenger",PaleMoon:"Android.*PaleMoon|Mobile.*PaleMoon"},props:{Mobile:"Mobile/[VER]",Build:"Build/[VER]",Version:"Version/[VER]",VendorID:"VendorID/[VER]",iPad:"iPad.*CPU[a-z ]+[VER]",iPhone:"iPhone.*CPU[a-z ]+[VER]",iPod:"iPod.*CPU[a-z ]+[VER]",Kindle:"Kindle/[VER]",Chrome:["Chrome/[VER]","CriOS/[VER]","CrMo/[VER]"],Coast:["Coast/[VER]"],Dolfin:"Dolfin/[VER]",Firefox:["Firefox/[VER]","FxiOS/[VER]"],Fennec:"Fennec/[VER]",Edge:"Edge/[VER]",IE:["IEMobile/[VER];","IEMobile [VER]","MSIE [VER];","Trident/[0-9.]+;.*rv:[VER]"],NetFront:"NetFront/[VER]",NokiaBrowser:"NokiaBrowser/[VER]",Opera:[" OPR/[VER]","Opera Mini/[VER]","Version/[VER]"],"Opera Mini":"Opera Mini/[VER]","Opera Mobi":"Version/[VER]",UCBrowser:["UCWEB[VER]","UC.*Browser/[VER]"],MQQBrowser:"MQQBrowser/[VER]",MicroMessenger:"MicroMessenger/[VER]",baiduboxapp:"baiduboxapp/[VER]",baidubrowser:"baidubrowser/[VER]",SamsungBrowser:"SamsungBrowser/[VER]",Iron:"Iron/[VER]",Safari:["Version/[VER]","Safari/[VER]"],Skyfire:"Skyfire/[VER]",Tizen:"Tizen/[VER]",Webkit:"webkit[ /][VER]",PaleMoon:"PaleMoon/[VER]",Gecko:"Gecko/[VER]",Trident:"Trident/[VER]",Presto:"Presto/[VER]",Goanna:"Goanna/[VER]",iOS:" \\bi?OS\\b [VER][ ;]{1}",Android:"Android [VER]",BlackBerry:["BlackBerry[\\w]+/[VER]","BlackBerry.*Version/[VER]","Version/[VER]"],BREW:"BREW [VER]",Java:"Java/[VER]","Windows Phone OS":["Windows Phone OS [VER]","Windows Phone [VER]"],"Windows Phone":"Windows Phone [VER]","Windows CE":"Windows CE/[VER]","Windows NT":"Windows NT [VER]",Symbian:["SymbianOS/[VER]","Symbian/[VER]"],webOS:["webOS/[VER]","hpwOS/[VER];"]},utils:{Bot:"Googlebot|facebookexternalhit|Google-AMPHTML|s~amp-validator|AdsBot-Google|Google Keyword Suggestion|Facebot|YandexBot|YandexMobileBot|bingbot|ia_archiver|AhrefsBot|Ezooms|GSLFbot|WBSearchBot|Twitterbot|TweetmemeBot|Twikle|PaperLiBot|Wotbox|UnwindFetchor|Exabot|MJ12bot|YandexImages|TurnitinBot|Pingdom|contentkingapp",MobileBot:"Googlebot-Mobile|AdsBot-Google-Mobile|YahooSeeker/M1A1-R2D2",DesktopMode:"WPDesktop",TV:"SonyDTV|HbbTV",WebKit:"(webkit)[ /]([\\w.]+)",Console:"\\b(Nintendo|Nintendo WiiU|Nintendo 3DS|Nintendo Switch|PLAYSTATION|Xbox)\\b",Watch:"SM-V700"}},detectMobileBrowsers:{fullPattern:/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,shortPattern:/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,tabletPattern:/android|ipad|playbook|silk/i}},hasOwnProp=Object.prototype.hasOwnProperty;function equalIC(a,b){return null!=a&&null!=b&&a.toLowerCase()===b.toLowerCase()}function containsIC(array,value){var valueLC,i,len=array.length;if(!len||!value)return!1;for(valueLC=value.toLowerCase(),i=0;i<len;++i)if(valueLC===array[i].toLowerCase())return!0;return!1}function convertPropsToRegExp(object){for(var key in object)hasOwnProp.call(object,key)&&(object[key]=new RegExp(object[key],"i"))}function MobileDetect(userAgent,maxPhoneWidth){this.ua=function(userAgent){return(userAgent||"").substr(0,500)}(userAgent),this._cache={},this.maxPhoneWidth=maxPhoneWidth||600}return impl.FALLBACK_PHONE="UnknownPhone",impl.FALLBACK_TABLET="UnknownTablet",impl.FALLBACK_MOBILE="UnknownMobile",isArray="isArray"in Array?Array.isArray:function(value){return"[object Array]"===Object.prototype.toString.call(value)},function(){var key,values,value,i,len,verPos,mobileDetectRules=impl.mobileDetectRules;for(key in mobileDetectRules.props)if(hasOwnProp.call(mobileDetectRules.props,key)){for(values=mobileDetectRules.props[key],isArray(values)||(values=[values]),len=values.length,i=0;i<len;++i)(verPos=(value=values[i]).indexOf("[VER]"))>=0&&(value=value.substring(0,verPos)+"([\\w._\\+]+)"+value.substring(verPos+5)),values[i]=new RegExp(value,"i");mobileDetectRules.props[key]=values}convertPropsToRegExp(mobileDetectRules.oss),convertPropsToRegExp(mobileDetectRules.phones),convertPropsToRegExp(mobileDetectRules.tablets),convertPropsToRegExp(mobileDetectRules.uas),convertPropsToRegExp(mobileDetectRules.utils),mobileDetectRules.oss0={WindowsPhoneOS:mobileDetectRules.oss.WindowsPhoneOS,WindowsMobileOS:mobileDetectRules.oss.WindowsMobileOS}}(),impl.findMatch=function(rules,userAgent){for(var key in rules)if(hasOwnProp.call(rules,key)&&rules[key].test(userAgent))return key;return null},impl.findMatches=function(rules,userAgent){var result=[];for(var key in rules)hasOwnProp.call(rules,key)&&rules[key].test(userAgent)&&result.push(key);return result},impl.getVersionStr=function(propertyName,userAgent){var patterns,i,len,match,props=impl.mobileDetectRules.props;if(hasOwnProp.call(props,propertyName))for(len=(patterns=props[propertyName]).length,i=0;i<len;++i)if(null!==(match=patterns[i].exec(userAgent)))return match[1];return null},impl.getVersion=function(propertyName,userAgent){var version=impl.getVersionStr(propertyName,userAgent);return version?impl.prepareVersionNo(version):NaN},impl.prepareVersionNo=function(version){var numbers;return 1===(numbers=version.split(/[a-z._ \/\-]/i)).length&&(version=numbers[0]),numbers.length>1&&(version=numbers[0]+".",numbers.shift(),version+=numbers.join("")),Number(version)},impl.isMobileFallback=function(userAgent){return impl.detectMobileBrowsers.fullPattern.test(userAgent)||impl.detectMobileBrowsers.shortPattern.test(userAgent.substr(0,4))},impl.isTabletFallback=function(userAgent){return impl.detectMobileBrowsers.tabletPattern.test(userAgent)},impl.prepareDetectionCache=function(cache,userAgent,maxPhoneWidth){if(void 0===cache.mobile){var phone,tablet,phoneSized;if(tablet=impl.findMatch(impl.mobileDetectRules.tablets,userAgent))return cache.mobile=cache.tablet=tablet,void(cache.phone=null);if(phone=impl.findMatch(impl.mobileDetectRules.phones,userAgent))return cache.mobile=cache.phone=phone,void(cache.tablet=null);impl.isMobileFallback(userAgent)?void 0===(phoneSized=MobileDetect.isPhoneSized(maxPhoneWidth))?(cache.mobile=impl.FALLBACK_MOBILE,cache.tablet=cache.phone=null):phoneSized?(cache.mobile=cache.phone=impl.FALLBACK_PHONE,cache.tablet=null):(cache.mobile=cache.tablet=impl.FALLBACK_TABLET,cache.phone=null):impl.isTabletFallback(userAgent)?(cache.mobile=cache.tablet=impl.FALLBACK_TABLET,cache.phone=null):cache.mobile=cache.tablet=cache.phone=null}},impl.mobileGrade=function(t){var $isMobile=null!==t.mobile();return t.os("iOS")&&t.version("iPad")>=4.3||t.os("iOS")&&t.version("iPhone")>=3.1||t.os("iOS")&&t.version("iPod")>=3.1||t.version("Android")>2.1&&t.is("Webkit")||t.version("Windows Phone OS")>=7||t.is("BlackBerry")&&t.version("BlackBerry")>=6||t.match("Playbook.*Tablet")||t.version("webOS")>=1.4&&t.match("Palm|Pre|Pixi")||t.match("hp.*TouchPad")||t.is("Firefox")&&t.version("Firefox")>=12||t.is("Chrome")&&t.is("AndroidOS")&&t.version("Android")>=4||t.is("Skyfire")&&t.version("Skyfire")>=4.1&&t.is("AndroidOS")&&t.version("Android")>=2.3||t.is("Opera")&&t.version("Opera Mobi")>11&&t.is("AndroidOS")||t.is("MeeGoOS")||t.is("Tizen")||t.is("Dolfin")&&t.version("Bada")>=2||(t.is("UC Browser")||t.is("Dolfin"))&&t.version("Android")>=2.3||t.match("Kindle Fire")||t.is("Kindle")&&t.version("Kindle")>=3||t.is("AndroidOS")&&t.is("NookTablet")||t.version("Chrome")>=11&&!$isMobile||t.version("Safari")>=5&&!$isMobile||t.version("Firefox")>=4&&!$isMobile||t.version("MSIE")>=7&&!$isMobile||t.version("Opera")>=10&&!$isMobile?"A":t.os("iOS")&&t.version("iPad")<4.3||t.os("iOS")&&t.version("iPhone")<3.1||t.os("iOS")&&t.version("iPod")<3.1||t.is("Blackberry")&&t.version("BlackBerry")>=5&&t.version("BlackBerry")<6||t.version("Opera Mini")>=5&&t.version("Opera Mini")<=6.5&&(t.version("Android")>=2.3||t.is("iOS"))||t.match("NokiaN8|NokiaC7|N97.*Series60|Symbian/3")||t.version("Opera Mobi")>=11&&t.is("SymbianOS")?"B":(t.version("BlackBerry")<5||t.match("MSIEMobile|Windows CE.*Mobile")||t.version("Windows Mobile"),"C")},impl.detectOS=function(ua){return impl.findMatch(impl.mobileDetectRules.oss0,ua)||impl.findMatch(impl.mobileDetectRules.oss,ua)},impl.getDeviceSmallerSide=function(){return window.screen.width<window.screen.height?window.screen.width:window.screen.height},MobileDetect.prototype={constructor:MobileDetect,mobile:function(){return impl.prepareDetectionCache(this._cache,this.ua,this.maxPhoneWidth),this._cache.mobile},phone:function(){return impl.prepareDetectionCache(this._cache,this.ua,this.maxPhoneWidth),this._cache.phone},tablet:function(){return impl.prepareDetectionCache(this._cache,this.ua,this.maxPhoneWidth),this._cache.tablet},userAgent:function(){return void 0===this._cache.userAgent&&(this._cache.userAgent=impl.findMatch(impl.mobileDetectRules.uas,this.ua)),this._cache.userAgent},userAgents:function(){return void 0===this._cache.userAgents&&(this._cache.userAgents=impl.findMatches(impl.mobileDetectRules.uas,this.ua)),this._cache.userAgents},os:function(){return void 0===this._cache.os&&(this._cache.os=impl.detectOS(this.ua)),this._cache.os},version:function(key){return impl.getVersion(key,this.ua)},versionStr:function(key){return impl.getVersionStr(key,this.ua)},is:function(key){return containsIC(this.userAgents(),key)||equalIC(key,this.os())||equalIC(key,this.phone())||equalIC(key,this.tablet())||containsIC(impl.findMatches(impl.mobileDetectRules.utils,this.ua),key)},match:function(pattern){return pattern instanceof RegExp||(pattern=new RegExp(pattern,"i")),pattern.test(this.ua)},isPhoneSized:function(maxPhoneWidth){return MobileDetect.isPhoneSized(maxPhoneWidth||this.maxPhoneWidth)},mobileGrade:function(){return void 0===this._cache.grade&&(this._cache.grade=impl.mobileGrade(this)),this._cache.grade}},"undefined"!=typeof window&&window.screen?MobileDetect.isPhoneSized=function(maxPhoneWidth){return maxPhoneWidth<0?void 0:impl.getDeviceSmallerSide()<=maxPhoneWidth}:MobileDetect.isPhoneSized=function(){},MobileDetect._impl=impl,MobileDetect.version="1.4.4 2019-09-21",MobileDetect}))},2408:(__unused_webpack_module,exports)=>{"use strict";var l=Symbol.for("react.element"),n=Symbol.for("react.portal"),p=Symbol.for("react.fragment"),q=Symbol.for("react.strict_mode"),r=Symbol.for("react.profiler"),t=Symbol.for("react.provider"),u=Symbol.for("react.context"),v=Symbol.for("react.forward_ref"),w=Symbol.for("react.suspense"),x=Symbol.for("react.memo"),y=Symbol.for("react.lazy"),z=Symbol.iterator;var B={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},C=Object.assign,D={};function E(a,b,e){this.props=a,this.context=b,this.refs=D,this.updater=e||B}function F(){}function G(a,b,e){this.props=a,this.context=b,this.refs=D,this.updater=e||B}E.prototype.isReactComponent={},E.prototype.setState=function(a,b){if("object"!=typeof a&&"function"!=typeof a&&null!=a)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,a,b,"setState")},E.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate")},F.prototype=E.prototype;var H=G.prototype=new F;H.constructor=G,C(H,E.prototype),H.isPureReactComponent=!0;var I=Array.isArray,J=Object.prototype.hasOwnProperty,K={current:null},L={key:!0,ref:!0,__self:!0,__source:!0};function M(a,b,e){var d,c={},k=null,h=null;if(null!=b)for(d in void 0!==b.ref&&(h=b.ref),void 0!==b.key&&(k=""+b.key),b)J.call(b,d)&&!L.hasOwnProperty(d)&&(c[d]=b[d]);var g=arguments.length-2;if(1===g)c.children=e;else if(1<g){for(var f=Array(g),m=0;m<g;m++)f[m]=arguments[m+2];c.children=f}if(a&&a.defaultProps)for(d in g=a.defaultProps)void 0===c[d]&&(c[d]=g[d]);return{$$typeof:l,type:a,key:k,ref:h,props:c,_owner:K.current}}function O(a){return"object"==typeof a&&null!==a&&a.$$typeof===l}var P=/\/+/g;function Q(a,b){return"object"==typeof a&&null!==a&&null!=a.key?function(a){var b={"=":"=0",":":"=2"};return"$"+a.replace(/[=:]/g,(function(a){return b[a]}))}(""+a.key):b.toString(36)}function R(a,b,e,d,c){var k=typeof a;"undefined"!==k&&"boolean"!==k||(a=null);var h=!1;if(null===a)h=!0;else switch(k){case"string":case"number":h=!0;break;case"object":switch(a.$$typeof){case l:case n:h=!0}}if(h)return c=c(h=a),a=""===d?"."+Q(h,0):d,I(c)?(e="",null!=a&&(e=a.replace(P,"$&/")+"/"),R(c,b,e,"",(function(a){return a}))):null!=c&&(O(c)&&(c=function(a,b){return{$$typeof:l,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}}(c,e+(!c.key||h&&h.key===c.key?"":(""+c.key).replace(P,"$&/")+"/")+a)),b.push(c)),1;if(h=0,d=""===d?".":d+":",I(a))for(var g=0;g<a.length;g++){var f=d+Q(k=a[g],g);h+=R(k,b,e,f,c)}else if(f=function(a){return null===a||"object"!=typeof a?null:"function"==typeof(a=z&&a[z]||a["@@iterator"])?a:null}(a),"function"==typeof f)for(a=f.call(a),g=0;!(k=a.next()).done;)h+=R(k=k.value,b,e,f=d+Q(k,g++),c);else if("object"===k)throw b=String(a),Error("Objects are not valid as a React child (found: "+("[object Object]"===b?"object with keys {"+Object.keys(a).join(", ")+"}":b)+"). If you meant to render a collection of children, use an array instead.");return h}function S(a,b,e){if(null==a)return a;var d=[],c=0;return R(a,d,"","",(function(a){return b.call(e,a,c++)})),d}function T(a){if(-1===a._status){var b=a._result;(b=b()).then((function(b){0!==a._status&&-1!==a._status||(a._status=1,a._result=b)}),(function(b){0!==a._status&&-1!==a._status||(a._status=2,a._result=b)})),-1===a._status&&(a._status=0,a._result=b)}if(1===a._status)return a._result.default;throw a._result}var U={current:null},V={transition:null}},7294:(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";__webpack_require__(2408)},7685:(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=__webpack_require__(8003).Z.Symbol},3243:(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>_baseGetTag});var _Symbol=__webpack_require__(7685),objectProto=Object.prototype,_getRawTag_hasOwnProperty=objectProto.hasOwnProperty,nativeObjectToString=objectProto.toString,symToStringTag=_Symbol.Z?_Symbol.Z.toStringTag:void 0;const _getRawTag=function(value){var isOwn=_getRawTag_hasOwnProperty.call(value,symToStringTag),tag=value[symToStringTag];try{value[symToStringTag]=void 0;var unmasked=!0}catch(e){}var result=nativeObjectToString.call(value);return unmasked&&(isOwn?value[symToStringTag]=tag:delete value[symToStringTag]),result};var _objectToString_nativeObjectToString=Object.prototype.toString;const _objectToString=function(value){return _objectToString_nativeObjectToString.call(value)};var _baseGetTag_symToStringTag=_Symbol.Z?_Symbol.Z.toStringTag:void 0;const _baseGetTag=function(value){return null==value?void 0===value?"[object Undefined]":"[object Null]":_baseGetTag_symToStringTag&&_baseGetTag_symToStringTag in Object(value)?_getRawTag(value):_objectToString(value)}},2548:(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>_castPath});const lodash_es_isArray=Array.isArray;var isSymbol=__webpack_require__(9054),reIsDeepProp=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,reIsPlainProp=/^\w*$/;const _isKey=function(value,object){if(lodash_es_isArray(value))return!1;var type=typeof value;return!("number"!=type&&"symbol"!=type&&"boolean"!=type&&null!=value&&!(0,isSymbol.Z)(value))||(reIsPlainProp.test(value)||!reIsDeepProp.test(value)||null!=object&&value in Object(object))};var _getNative=__webpack_require__(5032);const _nativeCreate=(0,_getNative.Z)(Object,"create");const _hashClear=function(){this.__data__=_nativeCreate?_nativeCreate(null):{},this.size=0};const _hashDelete=function(key){var result=this.has(key)&&delete this.__data__[key];return this.size-=result?1:0,result};var _hashGet_hasOwnProperty=Object.prototype.hasOwnProperty;const _hashGet=function(key){var data=this.__data__;if(_nativeCreate){var result=data[key];return"__lodash_hash_undefined__"===result?void 0:result}return _hashGet_hasOwnProperty.call(data,key)?data[key]:void 0};var _hashHas_hasOwnProperty=Object.prototype.hasOwnProperty;const _hashHas=function(key){var data=this.__data__;return _nativeCreate?void 0!==data[key]:_hashHas_hasOwnProperty.call(data,key)};const _hashSet=function(key,value){var data=this.__data__;return this.size+=this.has(key)?0:1,data[key]=_nativeCreate&&void 0===value?"__lodash_hash_undefined__":value,this};function Hash(entries){var index=-1,length=null==entries?0:entries.length;for(this.clear();++index<length;){var entry=entries[index];this.set(entry[0],entry[1])}}Hash.prototype.clear=_hashClear,Hash.prototype.delete=_hashDelete,Hash.prototype.get=_hashGet,Hash.prototype.has=_hashHas,Hash.prototype.set=_hashSet;const _Hash=Hash;const _listCacheClear=function(){this.__data__=[],this.size=0};var eq=__webpack_require__(9651);const _assocIndexOf=function(array,key){for(var length=array.length;length--;)if((0,eq.Z)(array[length][0],key))return length;return-1};var splice=Array.prototype.splice;const _listCacheDelete=function(key){var data=this.__data__,index=_assocIndexOf(data,key);return!(index<0)&&(index==data.length-1?data.pop():splice.call(data,index,1),--this.size,!0)};const _listCacheGet=function(key){var data=this.__data__,index=_assocIndexOf(data,key);return index<0?void 0:data[index][1]};const _listCacheHas=function(key){return _assocIndexOf(this.__data__,key)>-1};const _listCacheSet=function(key,value){var data=this.__data__,index=_assocIndexOf(data,key);return index<0?(++this.size,data.push([key,value])):data[index][1]=value,this};function ListCache(entries){var index=-1,length=null==entries?0:entries.length;for(this.clear();++index<length;){var entry=entries[index];this.set(entry[0],entry[1])}}ListCache.prototype.clear=_listCacheClear,ListCache.prototype.delete=_listCacheDelete,ListCache.prototype.get=_listCacheGet,ListCache.prototype.has=_listCacheHas,ListCache.prototype.set=_listCacheSet;const _ListCache=ListCache;var _root=__webpack_require__(8003);const _Map=(0,_getNative.Z)(_root.Z,"Map");const _mapCacheClear=function(){this.size=0,this.__data__={hash:new _Hash,map:new(_Map||_ListCache),string:new _Hash}};const _isKeyable=function(value){var type=typeof value;return"string"==type||"number"==type||"symbol"==type||"boolean"==type?"__proto__"!==value:null===value};const _getMapData=function(map,key){var data=map.__data__;return _isKeyable(key)?data["string"==typeof key?"string":"hash"]:data.map};const _mapCacheDelete=function(key){var result=_getMapData(this,key).delete(key);return this.size-=result?1:0,result};const _mapCacheGet=function(key){return _getMapData(this,key).get(key)};const _mapCacheHas=function(key){return _getMapData(this,key).has(key)};const _mapCacheSet=function(key,value){var data=_getMapData(this,key),size=data.size;return data.set(key,value),this.size+=data.size==size?0:1,this};function MapCache(entries){var index=-1,length=null==entries?0:entries.length;for(this.clear();++index<length;){var entry=entries[index];this.set(entry[0],entry[1])}}MapCache.prototype.clear=_mapCacheClear,MapCache.prototype.delete=_mapCacheDelete,MapCache.prototype.get=_mapCacheGet,MapCache.prototype.has=_mapCacheHas,MapCache.prototype.set=_mapCacheSet;const _MapCache=MapCache;function memoize(func,resolver){if("function"!=typeof func||null!=resolver&&"function"!=typeof resolver)throw new TypeError("Expected a function");var memoized=function(){var args=arguments,key=resolver?resolver.apply(this,args):args[0],cache=memoized.cache;if(cache.has(key))return cache.get(key);var result=func.apply(this,args);return memoized.cache=cache.set(key,result)||cache,result};return memoized.cache=new(memoize.Cache||_MapCache),memoized}memoize.Cache=_MapCache;const lodash_es_memoize=memoize;var rePropName=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,reEscapeChar=/\\(\\)?/g;const _stringToPath=function(func){var result=lodash_es_memoize(func,(function(key){return 500===cache.size&&cache.clear(),key})),cache=result.cache;return result}((function(string){var result=[];return 46===string.charCodeAt(0)&&result.push(""),string.replace(rePropName,(function(match,number,quote,subString){result.push(quote?subString.replace(reEscapeChar,"$1"):number||match)})),result}));var _Symbol=__webpack_require__(7685);const _arrayMap=function(array,iteratee){for(var index=-1,length=null==array?0:array.length,result=Array(length);++index<length;)result[index]=iteratee(array[index],index,array);return result};var symbolProto=_Symbol.Z?_Symbol.Z.prototype:void 0,symbolToString=symbolProto?symbolProto.toString:void 0;const _baseToString=function baseToString(value){if("string"==typeof value)return value;if(lodash_es_isArray(value))return _arrayMap(value,baseToString)+"";if((0,isSymbol.Z)(value))return symbolToString?symbolToString.call(value):"";var result=value+"";return"0"==result&&1/value==-Infinity?"-0":result};const lodash_es_toString=function(value){return null==value?"":_baseToString(value)};const _castPath=function(value,object){return lodash_es_isArray(value)?value:_isKey(value,object)?[value]:_stringToPath(lodash_es_toString(value))}},5032:(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>_getNative});var _baseGetTag=__webpack_require__(3243),isObject=__webpack_require__(7226);const lodash_es_isFunction=function(value){if(!(0,isObject.Z)(value))return!1;var tag=(0,_baseGetTag.Z)(value);return"[object Function]"==tag||"[object GeneratorFunction]"==tag||"[object AsyncFunction]"==tag||"[object Proxy]"==tag};const _coreJsData=__webpack_require__(8003).Z["__core-js_shared__"];var uid,maskSrcKey=(uid=/[^.]+$/.exec(_coreJsData&&_coreJsData.keys&&_coreJsData.keys.IE_PROTO||""))?"Symbol(src)_1."+uid:"";const _isMasked=function(func){return!!maskSrcKey&&maskSrcKey in func};var funcToString=Function.prototype.toString;const _toSource=function(func){if(null!=func){try{return funcToString.call(func)}catch(e){}try{return func+""}catch(e){}}return""};var reIsHostCtor=/^\[object .+?Constructor\]$/,_baseIsNative_funcProto=Function.prototype,objectProto=Object.prototype,_baseIsNative_funcToString=_baseIsNative_funcProto.toString,_baseIsNative_hasOwnProperty=objectProto.hasOwnProperty,reIsNative=RegExp("^"+_baseIsNative_funcToString.call(_baseIsNative_hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");const _baseIsNative=function(value){return!(!(0,isObject.Z)(value)||_isMasked(value))&&(lodash_es_isFunction(value)?reIsNative:reIsHostCtor).test(_toSource(value))};const _getValue=function(object,key){return null==object?void 0:object[key]};const _getNative=function(object,key){var value=_getValue(object,key);return _baseIsNative(value)?value:void 0}},8003:(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>_root});const _freeGlobal="object"==typeof global&&global&&global.Object===Object&&global;var freeSelf="object"==typeof self&&self&&self.Object===Object&&self;const _root=_freeGlobal||freeSelf||Function("return this")()},2281:(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _isSymbol_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(9054);const __WEBPACK_DEFAULT_EXPORT__=function(value){if("string"==typeof value||(0,_isSymbol_js__WEBPACK_IMPORTED_MODULE_0__.Z)(value))return value;var result=value+"";return"0"==result&&1/value==-Infinity?"-0":result}},9651:(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=function(value,other){return value===other||value!=value&&other!=other}},63:(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>lodash_es_get});var _castPath=__webpack_require__(2548),_toKey=__webpack_require__(2281);const _baseGet=function(object,path){for(var index=0,length=(path=(0,_castPath.Z)(path,object)).length;null!=object&&index<length;)object=object[(0,_toKey.Z)(path[index++])];return index&&index==length?object:void 0};const lodash_es_get=function(object,path,defaultValue){var result=null==object?void 0:_baseGet(object,path);return void 0===result?defaultValue:result}},7601:(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=function(value){return null==value}},7226:(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__=function(value){var type=typeof value;return null!=value&&("object"==type||"function"==type)}},9054:(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>lodash_es_isSymbol});var _baseGetTag=__webpack_require__(3243);const lodash_es_isObjectLike=function(value){return null!=value&&"object"==typeof value};const lodash_es_isSymbol=function(value){return"symbol"==typeof value||lodash_es_isObjectLike(value)&&"[object Symbol]"==(0,_baseGetTag.Z)(value)}},7466:(__unused_webpack___webpack_module__,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>lodash_es_setWith});var _getNative=__webpack_require__(5032);const _defineProperty=function(){try{var func=(0,_getNative.Z)(Object,"defineProperty");return func({},"",{}),func}catch(e){}}();const _baseAssignValue=function(object,key,value){"__proto__"==key&&_defineProperty?_defineProperty(object,key,{configurable:!0,enumerable:!0,value,writable:!0}):object[key]=value};var eq=__webpack_require__(9651),_assignValue_hasOwnProperty=Object.prototype.hasOwnProperty;const _assignValue=function(object,key,value){var objValue=object[key];_assignValue_hasOwnProperty.call(object,key)&&(0,eq.Z)(objValue,value)&&(void 0!==value||key in object)||_baseAssignValue(object,key,value)};var _castPath=__webpack_require__(2548),reIsUint=/^(?:0|[1-9]\d*)$/;const _isIndex=function(value,length){var type=typeof value;return!!(length=null==length?9007199254740991:length)&&("number"==type||"symbol"!=type&&reIsUint.test(value))&&value>-1&&value%1==0&&value<length};var isObject=__webpack_require__(7226),_toKey=__webpack_require__(2281);const _baseSet=function(object,path,value,customizer){if(!(0,isObject.Z)(object))return object;for(var index=-1,length=(path=(0,_castPath.Z)(path,object)).length,lastIndex=length-1,nested=object;null!=nested&&++index<length;){var key=(0,_toKey.Z)(path[index]),newValue=value;if("__proto__"===key||"constructor"===key||"prototype"===key)return object;if(index!=lastIndex){var objValue=nested[key];void 0===(newValue=customizer?customizer(objValue,key,nested):void 0)&&(newValue=(0,isObject.Z)(objValue)?objValue:_isIndex(path[index+1])?[]:{})}_assignValue(nested,key,newValue),nested=nested[key]}return object};const lodash_es_setWith=function(object,path,value,customizer){return customizer="function"==typeof customizer?customizer:void 0,null==object?object:_baseSet(object,path,value,customizer)}}},__webpack_module_cache__={};function __webpack_require__(moduleId){var cachedModule=__webpack_module_cache__[moduleId];if(void 0!==cachedModule)return cachedModule.exports;var module=__webpack_module_cache__[moduleId]={exports:{}};return __webpack_modules__[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.exports}__webpack_require__.amdD=function(){throw new Error("define cannot be used indirect")},__webpack_require__.n=module=>{var getter=module&&module.__esModule?()=>module.default:()=>module;return __webpack_require__.d(getter,{a:getter}),getter},__webpack_require__.d=(exports,definition)=>{for(var key in definition)__webpack_require__.o(definition,key)&&!__webpack_require__.o(exports,key)&&Object.defineProperty(exports,key,{enumerable:!0,get:definition[key]})},__webpack_require__.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),__webpack_require__.o=(obj,prop)=>Object.prototype.hasOwnProperty.call(obj,prop),__webpack_require__.r=exports=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(exports,"__esModule",{value:!0})};var __webpack_exports__={};(()=>{"use strict";var SportList_SportList,LegacyIndexFeedConstants=function(){function LegacyIndexFeedConstants(){}return LegacyIndexFeedConstants.COMMONINDEXES_ACTIVE_LIVE_ODDS_BOOKMAKERS="CQ",LegacyIndexFeedConstants.COMMONINDEXES_AVAILABLE_TABS_NEW="DX",LegacyIndexFeedConstants.COMMONINDEXES_AWAY_FT_SCORE="DH",LegacyIndexFeedConstants.COMMONINDEXES_AWAY_SCORE="DF",LegacyIndexFeedConstants.COMMONINDEXES_BETTING_TYPE="DL",LegacyIndexFeedConstants.COMMONINDEXES_CURRENT_SERVICE_SIDE="DR",LegacyIndexFeedConstants.COMMONINDEXES_EVENT_END_TIME="DS",LegacyIndexFeedConstants.COMMONINDEXES_EVENT_INFO="DM",LegacyIndexFeedConstants.COMMONINDEXES_EVENT_STAGE_ID="DB",LegacyIndexFeedConstants.COMMONINDEXES_EVENT_STAGE_START_TIME="DD",LegacyIndexFeedConstants.COMMONINDEXES_EVENT_STAGE_TYPE_ID="DA",LegacyIndexFeedConstants.COMMONINDEXES_EVENT_START_TIME="DC",LegacyIndexFeedConstants.COMMONINDEXES_FT_WINNER="AZ",LegacyIndexFeedConstants.COMMONINDEXES_GOLF_TOTAL_HOLES_PLAYED="EJ",LegacyIndexFeedConstants.COMMONINDEXES_HOME_FT_SCORE="DG",LegacyIndexFeedConstants.COMMONINDEXES_HOME_SCORE="DE",LegacyIndexFeedConstants.COMMONINDEXES_IS_7_RUGBY="EI",LegacyIndexFeedConstants.COMMONINDEXES_LAST_SCORE_UPDATE="DK",LegacyIndexFeedConstants.COMMONINDEXES_WINNER="DJ",LegacyIndexFeedConstants.DCAPIPARTICIPANTINDEXES_TEAM_INFO="PR",LegacyIndexFeedConstants.DCAPIPARTICIPANTINDEXES_TEAM_INFO_DELETED="PRD",LegacyIndexFeedConstants.DETAILCOMMONTABSINDEXES_ODDS="OD",LegacyIndexFeedConstants.DETAILHASHINDEXES_ALL_RESULTS_HASH="CD",LegacyIndexFeedConstants.DETAILHASHINDEXES_COMMON_HASH="CA",LegacyIndexFeedConstants.DETAILHASHINDEXES_FALL_OF_WICKETS_HASH="FOW",LegacyIndexFeedConstants.DETAILHASHINDEXES_LINEUP_HASH="CG",LegacyIndexFeedConstants.DETAILHASHINDEXES_LIVE_ODDS_HASH="CN",LegacyIndexFeedConstants.DETAILHASHINDEXES_MATCH_COMMENT_HASH="CV",LegacyIndexFeedConstants.DETAILHASHINDEXES_MATCH_HIGHLIGHTS_HASH="CL",LegacyIndexFeedConstants.DETAILHASHINDEXES_MISSING_PLAYERS_HASH="MP",LegacyIndexFeedConstants.DETAILHASHINDEXES_NEWSFEED_HASH="NF",LegacyIndexFeedConstants.DETAILHASHINDEXES_OVERS_HASH="OV",LegacyIndexFeedConstants.DETAILHASHINDEXES_PLAYER_STATISTICS_HASH="CZ",LegacyIndexFeedConstants.DETAILHASHINDEXES_PROPERTIES_HASH="CH",LegacyIndexFeedConstants.DETAILHASHINDEXES_STATIC_COMMENT_HASH="CF",LegacyIndexFeedConstants.DETAILHASHINDEXES_STATS_STATISTICS_PREVIEW_HASH="CEP",LegacyIndexFeedConstants.DETAILHASHINDEXES_TV_STREAM_HASH="TVS",LegacyIndexFeedConstants.DETAILHASHINDEXES_TV_STREAM_ALL_HASH="TSA",LegacyIndexFeedConstants.DRAWINDEXES_UPCOMING_DRAW_START_TIME="US",LegacyIndexFeedConstants.FULLFEEDINDEXES_AWAY_CRICKET_OVERS_FIRST_INNING="DP",LegacyIndexFeedConstants.FULLFEEDINDEXES_AWAY_RESULT_TIEBREAK_1="DB",LegacyIndexFeedConstants.FULLFEEDINDEXES_AWAY_RESULT_TIEBREAK_2="DD",LegacyIndexFeedConstants.FULLFEEDINDEXES_AWAY_RESULT_TIEBREAK_3="DF",LegacyIndexFeedConstants.FULLFEEDINDEXES_AWAY_RESULT_TIEBREAK_4="DH",LegacyIndexFeedConstants.FULLFEEDINDEXES_AWAY_RESULT_TIEBREAK_5="DJ",LegacyIndexFeedConstants.FULLFEEDINDEXES_AWAY_SCORE_PART_PESAPALLO_FIRST_HALF="BT",LegacyIndexFeedConstants.FULLFEEDINDEXES_AWAY_SCORE_PART_PESAPALLO_PENALTIES="FB",LegacyIndexFeedConstants.FULLFEEDINDEXES_AWAY_SCORE_PART_PESAPALLO_SECOND_HALF="BV",LegacyIndexFeedConstants.FULLFEEDINDEXES_AWAY_TEAM_LOGO="OB",LegacyIndexFeedConstants.FULLFEEDINDEXES_AWAY_TENNIS_GAME="WB",LegacyIndexFeedConstants.FULLFEEDINDEXES_EVENT_WITH_UPDATED_START="QB",LegacyIndexFeedConstants.FULLFEEDINDEXES_EVENT_WITH_UPDATED_START_AND_END_TIME="QC",LegacyIndexFeedConstants.FULLFEEDINDEXES_HOME_CRICKET_OVERS_FIRST_INNING="DO",LegacyIndexFeedConstants.FULLFEEDINDEXES_HOME_RESULT_TIEBREAK_1="DA",LegacyIndexFeedConstants.FULLFEEDINDEXES_HOME_RESULT_TIEBREAK_2="DC",LegacyIndexFeedConstants.FULLFEEDINDEXES_HOME_RESULT_TIEBREAK_3="DE",LegacyIndexFeedConstants.FULLFEEDINDEXES_HOME_RESULT_TIEBREAK_4="DG",LegacyIndexFeedConstants.FULLFEEDINDEXES_HOME_RESULT_TIEBREAK_5="DI",LegacyIndexFeedConstants.FULLFEEDINDEXES_HOME_SCORE_PART_PESAPALLO_FIRST_HALF="BS",LegacyIndexFeedConstants.FULLFEEDINDEXES_HOME_SCORE_PART_PESAPALLO_PENALTIES="FA",LegacyIndexFeedConstants.FULLFEEDINDEXES_HOME_SCORE_PART_PESAPALLO_SECOND_HALF="BU",LegacyIndexFeedConstants.FULLFEEDINDEXES_HOME_TEAM_LOGO="OA",LegacyIndexFeedConstants.FULLFEEDINDEXES_HOME_TENNIS_GAME="WA",LegacyIndexFeedConstants.FULLFEEDINDEXES_MOVED_EVENTS_ID="QA",LegacyIndexFeedConstants.FULLFEEDINDEXES_PAST_FUTURE_GAMES="FG",LegacyIndexFeedConstants.FULLFEEDINDEXES_SWAPPED_PARTICIPANTS="WE",LegacyIndexFeedConstants.FULLFEEDINDEXES_TEAM_NAME="NA",LegacyIndexFeedConstants.FULLFEEDINDEXES_WINNER="AS",LegacyIndexFeedConstants.LEAGUEINDEXES_TOURNAMENT_TYPE="ZD",LegacyIndexFeedConstants.LOCALIZEKEYINDEXES_PARTICIPANT_EVENTS_CLASS_LOCALIZED_VAR="LV",LegacyIndexFeedConstants.ODDSINDEXES_EACH_WAY_HANDICAP="XI",LegacyIndexFeedConstants.ODDSINDEXES_HANDICAP="XH",LegacyIndexFeedConstants.ODDSINDEXES_ODDS_0_PREVIOUS="YB",LegacyIndexFeedConstants.ODDSINDEXES_ODDS_02_PREVIOUS="YE",LegacyIndexFeedConstants.ODDSINDEXES_ODDS_1="XA",LegacyIndexFeedConstants.ODDSINDEXES_ODDS_1_PREVIOUS="YA",LegacyIndexFeedConstants.ODDSINDEXES_ODDS_10_PREVIOUS="YD",LegacyIndexFeedConstants.ODDSINDEXES_ODDS_2="XC",LegacyIndexFeedConstants.ODDSINDEXES_ODDS_2_PREVIOUS="YC",LegacyIndexFeedConstants.ODDSINDEXES_ODDS_AH1="XF",LegacyIndexFeedConstants.ODDSINDEXES_ODDS_AH1_PREVIOUS="YF",LegacyIndexFeedConstants.ODDSINDEXES_ODDS_AH2="XG",LegacyIndexFeedConstants.ODDSINDEXES_ODDS_AH2_PREVIOUS="YG",LegacyIndexFeedConstants.ODDSINDEXES_ODDS_ML1="XL",LegacyIndexFeedConstants.ODDSINDEXES_ODDS_ML1_PREVIOUS="YL",LegacyIndexFeedConstants.ODDSINDEXES_ODDS_ML2="XM",LegacyIndexFeedConstants.ODDSINDEXES_ODDS_ML2_PREVIOUS="YM",LegacyIndexFeedConstants.ODDSINDEXES_ODDS_OU1_PREVIOUS="YI",LegacyIndexFeedConstants.ODDSINDEXES_ODDS_OU2_PREVIOUS="YJ",LegacyIndexFeedConstants.ODDSINDEXES_OVER_UNDER_HANDICAP="XK",LegacyIndexFeedConstants.RESULTSINDEXES_ROW_VALUE="RAB",LegacyIndexFeedConstants.SHAREDINDEXES_ALTER_EVENT_STAGE_TYPE_ID="DZ",LegacyIndexFeedConstants.SHAREDINDEXES_AWAY_CRICKET_RUN_RATE="RV",LegacyIndexFeedConstants.SHAREDINDEXES_AWAY_CURRENT_RESULT="AH",LegacyIndexFeedConstants.SHAREDINDEXES_AWAY_DRAW_PARTICIPANT_WINNER="BZ",LegacyIndexFeedConstants.SHAREDINDEXES_AWAY_ERRORS="WI",LegacyIndexFeedConstants.SHAREDINDEXES_AWAY_FULL_TIME_RESULT="AU",LegacyIndexFeedConstants.SHAREDINDEXES_AWAY_GOAL_UNDER_REVIEW="GRB",LegacyIndexFeedConstants.SHAREDINDEXES_AWAY_HITS="WG",LegacyIndexFeedConstants.SHAREDINDEXES_AWAY_MARTIAL_ARTS_FINISHED="IB",LegacyIndexFeedConstants.SHAREDINDEXES_AWAY_MARTIAL_ARTS_FINISHED_ROUND="ID",LegacyIndexFeedConstants.SHAREDINDEXES_AWAY_MARTIAL_ARTS_FINISHED_SUB="IF",LegacyIndexFeedConstants.SHAREDINDEXES_AWAY_RED_CARD_COUNT="AK",LegacyIndexFeedConstants.SHAREDINDEXES_AWAY_RESULT_PERIOD_1="BB",LegacyIndexFeedConstants.SHAREDINDEXES_AWAY_RESULT_PERIOD_2="BD",LegacyIndexFeedConstants.SHAREDINDEXES_AWAY_RESULT_PERIOD_3="BF",LegacyIndexFeedConstants.SHAREDINDEXES_AWAY_RESULT_PERIOD_4="BH",LegacyIndexFeedConstants.SHAREDINDEXES_AWAY_RESULT_PERIOD_5="BJ",LegacyIndexFeedConstants.SHAREDINDEXES_AWAY_RESULT_PERIOD_6="BL",LegacyIndexFeedConstants.SHAREDINDEXES_AWAY_RESULT_PERIOD_7="BN",LegacyIndexFeedConstants.SHAREDINDEXES_AWAY_RESULT_PERIOD_8="BP",LegacyIndexFeedConstants.SHAREDINDEXES_AWAY_RESULT_PERIOD_9="BR",LegacyIndexFeedConstants.SHAREDINDEXES_AWAY_RESULT_PERIOD_X="BT",LegacyIndexFeedConstants.SHAREDINDEXES_CRICKET_SENTENCE="AQ",LegacyIndexFeedConstants.SHAREDINDEXES_EVENT_ID="AA",LegacyIndexFeedConstants.SHAREDINDEXES_EVENT_STAGE_ID="AC",LegacyIndexFeedConstants.SHAREDINDEXES_EVENT_STAGE_TYPE_ID="AB",LegacyIndexFeedConstants.SHAREDINDEXES_FEED_SIGNATURE="A1",LegacyIndexFeedConstants.SHAREDINDEXES_GAP="NG",LegacyIndexFeedConstants.SHAREDINDEXES_GOLF_FINAL_RESULT="GR",LegacyIndexFeedConstants.SHAREDINDEXES_HOME_CRICKET_RUN_RATE="RU",LegacyIndexFeedConstants.SHAREDINDEXES_HOME_CURRENT_RESULT="AG",LegacyIndexFeedConstants.SHAREDINDEXES_HOME_DRAW_PARTICIPANT_WINNER="BY",LegacyIndexFeedConstants.SHAREDINDEXES_HOME_ERRORS="WH",LegacyIndexFeedConstants.SHAREDINDEXES_HOME_FULL_TIME_RESULT="AT",LegacyIndexFeedConstants.SHAREDINDEXES_HOME_GOAL_UNDER_REVIEW="GRA",LegacyIndexFeedConstants.SHAREDINDEXES_HOME_HITS="WF",LegacyIndexFeedConstants.SHAREDINDEXES_HOME_MARTIAL_ARTS_FINISHED="IA",LegacyIndexFeedConstants.SHAREDINDEXES_HOME_MARTIAL_ARTS_FINISHED_ROUND="IC",LegacyIndexFeedConstants.SHAREDINDEXES_HOME_MARTIAL_ARTS_FINISHED_SUB="IE",LegacyIndexFeedConstants.SHAREDINDEXES_HOME_RED_CARD_COUNT="AJ",LegacyIndexFeedConstants.SHAREDINDEXES_HOME_RESULT_PERIOD_1="BA",LegacyIndexFeedConstants.SHAREDINDEXES_HOME_RESULT_PERIOD_2="BC",LegacyIndexFeedConstants.SHAREDINDEXES_HOME_RESULT_PERIOD_3="BE",LegacyIndexFeedConstants.SHAREDINDEXES_HOME_RESULT_PERIOD_4="BG",LegacyIndexFeedConstants.SHAREDINDEXES_HOME_RESULT_PERIOD_5="BI",LegacyIndexFeedConstants.SHAREDINDEXES_HOME_RESULT_PERIOD_6="BK",LegacyIndexFeedConstants.SHAREDINDEXES_HOME_RESULT_PERIOD_7="BM",LegacyIndexFeedConstants.SHAREDINDEXES_HOME_RESULT_PERIOD_8="BO",LegacyIndexFeedConstants.SHAREDINDEXES_HOME_RESULT_PERIOD_9="BQ",LegacyIndexFeedConstants.SHAREDINDEXES_HOME_RESULT_PERIOD_X="BS",LegacyIndexFeedConstants.SHAREDINDEXES_MATCH_START_UTIME="AD",LegacyIndexFeedConstants.SHAREDINDEXES_REFRESH_UTIME="A2",LegacyIndexFeedConstants.SHAREDINDEXES_SERVICE="WC",LegacyIndexFeedConstants.SHAREDINDEXES_SPORT_ID="SA",LegacyIndexFeedConstants.SHAREDINDEXES_TIME="ND",LegacyIndexFeedConstants.SHAREDINDEXES_TOURNAMENT_NAME="ZA",LegacyIndexFeedConstants.SHAREDINDEXES_TOURNAMENT_STAGE_ID="ZC",LegacyIndexFeedConstants.SHAREDINDEXES_UPCOMING_DRAW_ID="UD",LegacyIndexFeedConstants.SHAREDINDEXES_UPDATE_LOCAL_FEED_UPDATED_TIME="UL",LegacyIndexFeedConstants.STANDINGSSIGNSINDEXES_TABLE_HASH="ST",LegacyIndexFeedConstants.TVINDEXES_CHANNEL_ID="CBT",LegacyIndexFeedConstants.UPDATEINDEXES_AWAY_GOAL_DISALLOWED="GDB",LegacyIndexFeedConstants.UPDATEINDEXES_AWAY_PENALTY_MISSED="ED",LegacyIndexFeedConstants.UPDATEINDEXES_AWAY_PENALTY_SHOT="EB",LegacyIndexFeedConstants.UPDATEINDEXES_AWAY_SCORES_CHANGED="SCB",LegacyIndexFeedConstants.UPDATEINDEXES_HOME_GOAL_DISALLOWED="GDA",LegacyIndexFeedConstants.UPDATEINDEXES_HOME_PENALTY_MISSED="EC",LegacyIndexFeedConstants.UPDATEINDEXES_HOME_PENALTY_SHOT="EA",LegacyIndexFeedConstants.UPDATEINDEXES_HOME_SCORES_CHANGED="SCA",LegacyIndexFeedConstants.UPDATEINDEXES_PERIOD_UPDATE_UTIME="AR",LegacyIndexFeedConstants}();!function(SportList){SportList[SportList.SOCCER=1]="SOCCER",SportList[SportList.TENNIS=2]="TENNIS",SportList[SportList.BASKETBALL=3]="BASKETBALL",SportList[SportList.HOCKEY=4]="HOCKEY",SportList[SportList.AMERICAN_FOOTBALL=5]="AMERICAN_FOOTBALL",SportList[SportList.BASEBALL=6]="BASEBALL",SportList[SportList.HANDBALL=7]="HANDBALL",SportList[SportList.RUGBY_UNION=8]="RUGBY_UNION",SportList[SportList.FLOORBALL=9]="FLOORBALL",SportList[SportList.BANDY=10]="BANDY",SportList[SportList.FUTSAL=11]="FUTSAL",SportList[SportList.VOLLEYBALL=12]="VOLLEYBALL",SportList[SportList.CRICKET=13]="CRICKET",SportList[SportList.DARTS=14]="DARTS",SportList[SportList.SNOOKER=15]="SNOOKER",SportList[SportList.BOXING=16]="BOXING",SportList[SportList.BEACH_VOLLEYBALL=17]="BEACH_VOLLEYBALL",SportList[SportList.AUSSIE_RULES=18]="AUSSIE_RULES",SportList[SportList.RUGBY_LEAGUE=19]="RUGBY_LEAGUE",SportList[SportList.BADMINTON=21]="BADMINTON",SportList[SportList.WATER_POLO=22]="WATER_POLO",SportList[SportList.GOLF=23]="GOLF",SportList[SportList.FIELD_HOCKEY=24]="FIELD_HOCKEY",SportList[SportList.TABLE_TENNIS=25]="TABLE_TENNIS",SportList[SportList.BEACH_SOCCER=26]="BEACH_SOCCER",SportList[SportList.MMA=28]="MMA",SportList[SportList.NETBALL=29]="NETBALL",SportList[SportList.PESAPALLO=30]="PESAPALLO",SportList[SportList.MOTORSPORT=31]="MOTORSPORT",SportList[SportList.MOTORSPORT_AUTO_RACING=32]="MOTORSPORT_AUTO_RACING",SportList[SportList.MOTORSPORT_MOTO_RACING=33]="MOTORSPORT_MOTO_RACING",SportList[SportList.CYCLING=34]="CYCLING",SportList[SportList.HORSE_RACING=35]="HORSE_RACING",SportList[SportList.ESPORTS=36]="ESPORTS",SportList[SportList.WINTER_SPORTS=37]="WINTER_SPORTS",SportList[SportList.WINTER_SPORTS_SKI_JUMPING=38]="WINTER_SPORTS_SKI_JUMPING",SportList[SportList.WINTER_SPORTS_ALPINE_SKIING=39]="WINTER_SPORTS_ALPINE_SKIING",SportList[SportList.WINTER_SPORTS_CROSS_COUNTRY=40]="WINTER_SPORTS_CROSS_COUNTRY",SportList[SportList.WINTER_SPORTS_BIATHLON=41]="WINTER_SPORTS_BIATHLON",SportList[SportList.KABADDI=42]="KABADDI"}(SportList_SportList||(SportList_SportList={}));var EventStageTypeList,CategoryList,SortKeyHelperImpl=function(){function SortKeyHelperImpl(utilString){this._utilString=utilString}return SortKeyHelperImpl.prototype.sportPart=function(leagueSortKey){return leagueSortKey.substr(0,2)},SortKeyHelperImpl.prototype.startTimePart=function(sortByTime,startUTime){return sortByTime?"":String(9999999999+startUTime)},SortKeyHelperImpl.prototype.playerNamesPart=function(homeName,awayName){return this._utilString.rpad(homeName+"",10," ")+this._utilString.rpad(awayName+"",10," ")},SortKeyHelperImpl.prototype.horseRacingCountryAndTournamentTemplatePart=function(sportId,title){if(sportId==SportList_SportList.HORSE_RACING){var titleParts=title.split(":"),country=titleParts[0]||"",tournamentTemplate=titleParts[1]||"";return this._getReplacedStringPart(country)+this._getReplacedStringPart(tournamentTemplate)}return""},SortKeyHelperImpl.prototype._getReplacedStringPart=function(replacedString){return this._utilString.rpad(replacedString.replace(/\ /g,""),15,"0")},SortKeyHelperImpl}();!function(EventStageTypeList){EventStageTypeList[EventStageTypeList.SCHEDULED=1]="SCHEDULED",EventStageTypeList[EventStageTypeList.LIVE=2]="LIVE",EventStageTypeList[EventStageTypeList.FINISHED=3]="FINISHED"}(EventStageTypeList||(EventStageTypeList={})),function(CategoryList){CategoryList[CategoryList.ALL_RACES=0]="ALL_RACES",CategoryList[CategoryList.LIVE=1]="LIVE",CategoryList[CategoryList.FINISHED=2]="FINISHED",CategoryList[CategoryList.SCHEDULED=3]="SCHEDULED",CategoryList[CategoryList.ODDS=4]="ODDS",CategoryList[CategoryList.MY_GAMES=5]="MY_GAMES",CategoryList[CategoryList.TV=8]="TV",CategoryList[CategoryList.AUDIO=9]="AUDIO"}(CategoryList||(CategoryList={}));var TournamentTypeList,TimePartImpl=function(){function TimePartImpl(isWinterSport,isStageSport,endUtime,startUtime,sortByDesc,sortByTime,sportId,categoryId,eventStageType,leagueSortKey,isNoDuelTournament,isSeasonPage){this._isWinterSport=isWinterSport,this._isStageSport=isStageSport,this._endUtime=endUtime,this._startUtime=startUtime,this._sortByDesc=sortByDesc,this._sortByTime=sortByTime,this._sportId=sportId,this._categoryId=categoryId,this._eventStageType=eventStageType,this._leagueSortKey=leagueSortKey,this._isNoDuelTournament=isNoDuelTournament,this._isSeasonPage=isSeasonPage}return TimePartImpl.prototype.getValue=function(){return this._sortByTime?this._getTimePart():this._getStageSportPart()},TimePartImpl.prototype._getStageSportPart=function(){var keyPart=[];if(this._isStageSport&&(this._isNoDuelTournament||this._isSeasonPage))if(this._sportId===SportList_SportList.CYCLING&&keyPart.push(String(this._categoryId)+this._leagueSortKey.substr(this._leagueSortKey.indexOf(".")+4,12)),keyPart.push(this._leagueSortKey.substr(2,this._leagueSortKey.indexOf(".")+2)),this._sportId===SportList_SportList.HORSE_RACING)keyPart.push(String(9999999999-this._startUtime));else{this._eventStageType===EventStageTypeList.SCHEDULED?(keyPart.push("9"),keyPart.push(String(this._startUtime))):keyPart.push("00000000000");keyPart.push(String([0,3,1,2][this._eventStageType])),keyPart.push(String(9999999999-this._startUtime))}return keyPart.join("")},TimePartImpl.prototype._getTimePart=function(){var uTimePart,descPart=1;return uTimePart=this._isWinterSport&&this._endUtime?this._endUtime:this._startUtime,this._sortByDesc&&(descPart=-1),String(5555555555+descPart*uTimePart)},TimePartImpl}(),TimePartBuilder=function(){function TimePartBuilder(){this._isWinterSport=!1,this._isStageSport=!1,this._endUtime=0,this._startUtime=0,this._sortByDesc=!1,this._sortByTime=!1,this._sportId=0,this._categoryId=CategoryList.ALL_RACES,this._eventStageType=0,this._leagueSortKey="",this._isNoDuelTournament=!0,this._isSeasonPage=!1}return TimePartBuilder.prototype.setIsWinterSport=function(value){return this._isWinterSport=value,this},TimePartBuilder.prototype.setIsStageSport=function(value){return this._isStageSport=value,this},TimePartBuilder.prototype.setEndUtime=function(value){return this._endUtime=value,this},TimePartBuilder.prototype.setStartUtime=function(value){return this._startUtime=value,this},TimePartBuilder.prototype.setSortByDesc=function(value){return this._sortByDesc=value,this},TimePartBuilder.prototype.setSortByTime=function(value){return this._sortByTime=value,this},TimePartBuilder.prototype.setSportId=function(value){return this._sportId=value,this},TimePartBuilder.prototype.setCategoryId=function(value){return this._categoryId=value,this},TimePartBuilder.prototype.setEventStageType=function(value){return this._eventStageType=value,this},TimePartBuilder.prototype.setLeagueSortKey=function(value){return this._leagueSortKey=value,this},TimePartBuilder.prototype.setIsNoDuelTournament=function(value){return this._isNoDuelTournament=value,this},TimePartBuilder.prototype.setIsSeasonPage=function(value){return this._isSeasonPage=value,this},TimePartBuilder.prototype.build=function(){return new TimePartImpl(this._isWinterSport,this._isStageSport,this._endUtime,this._startUtime,this._sortByDesc,this._sortByTime,this._sportId,this._categoryId,this._eventStageType,this._leagueSortKey,this._isNoDuelTournament,this._isSeasonPage)},TimePartBuilder}(),LabelPartImpl=function(){function LabelPartImpl(leagueSortKey,isStatsResults,statsResultsSortKey,statsSortKey,isNoDuelTournament){this._leagueSortKey=leagueSortKey,this._isStatsResults=isStatsResults,this._statsResultsSortKey=statsResultsSortKey,this._statsSortKey=statsSortKey,this._isNoDuelTournament=isNoDuelTournament}return LabelPartImpl.prototype.getValue=function(){return this._leagueSortKey+this._getStatsPart()},LabelPartImpl.prototype._getStatsPart=function(){var keyPart=[];return this._isStatsResults?keyPart.push(1e3+this._statsResultsSortKey):this._statsSortKey&&this._isNoDuelTournament?keyPart.push(1e3+this._statsSortKey):keyPart.push(9999),keyPart.join("")},LabelPartImpl}(),LabelPartBuilder=function(){function LabelPartBuilder(){this._leagueSortKey="",this._isStatsResults=!1,this._statsResultsSortKey=0,this._statsSortKey=null,this._isNoDuelTournament=!1}return LabelPartBuilder.prototype.setLeagueSortKey=function(value){return this._leagueSortKey=value,this},LabelPartBuilder.prototype.setIsStatsResults=function(value){return this._isStatsResults=value,this},LabelPartBuilder.prototype.setStatsResultsSortKey=function(value){return this._statsResultsSortKey=value,this},LabelPartBuilder.prototype.setStatsSortKey=function(value){return this._statsSortKey=value,this},LabelPartBuilder.prototype.setIsNoDuelTournament=function(value){return this._isNoDuelTournament=value,this},LabelPartBuilder.prototype.build=function(){return new LabelPartImpl(this._leagueSortKey,this._isStatsResults,this._statsResultsSortKey,this._statsSortKey,this._isNoDuelTournament)},LabelPartBuilder}(),RankPartImpl=function(){function RankPartImpl(isNoDuelTournament,isWinterSport,participantStatus,homeScorePart,rank,eventStageType,golfHoleResult,utilString){this._isNoDuelTournament=isNoDuelTournament,this._isWinterSport=isWinterSport,this._participantStatus=participantStatus,this._homeScorePart=homeScorePart,this._rank=rank,this._eventStageType=eventStageType,this._golfHoleResult=golfHoleResult,this._utilString=utilString}return RankPartImpl.prototype.getValue=function(){var keyPart=[];if(this._isNoDuelTournament&&!this._isWinterSport)if(this._participantStatus?keyPart.push("9"):keyPart.push("0"),""===this._homeScorePart?keyPart.push("99999999"):keyPart.push("9999"+this._utilString.lpad(String(this._rank),4,"0")),this._eventStageType===EventStageTypeList.SCHEDULED||""===this._homeScorePart){var holeStartTime="9999999999";/^[0-9]{3,}$/.test(this._golfHoleResult)&&(holeStartTime=String(Number(holeStartTime)+Number(this._golfHoleResult))),keyPart.push(this._utilString.lpad(holeStartTime,10,"0"))}else keyPart.push("0000000000");else keyPart.push("0000");return keyPart.join("")},RankPartImpl}(),RankPartBuilder=function(){function RankPartBuilder(utilString){this._isNoDuelTournament=!1,this._isWinterSport=!1,this._participantStatus=null,this._homeScorePart=null,this._rank=null,this._eventStageType=0,this._golfHoleResult="",this._utilString=utilString}return RankPartBuilder.prototype.setIsNoDuelTournament=function(value){return this._isNoDuelTournament=value,this},RankPartBuilder.prototype.setIsWinterSport=function(value){return this._isWinterSport=value,this},RankPartBuilder.prototype.setParticipantStatus=function(value){return this._participantStatus=value,this},RankPartBuilder.prototype.setHomeScorePart=function(value){return this._homeScorePart=value,this},RankPartBuilder.prototype.setRank=function(value){return this._rank=value,this},RankPartBuilder.prototype.setEventStageType=function(value){return this._eventStageType=value,this},RankPartBuilder.prototype.setGolfHoleResult=function(value){return this._golfHoleResult=value,this},RankPartBuilder.prototype.build=function(){return new RankPartImpl(this._isNoDuelTournament,this._isWinterSport,this._participantStatus,this._homeScorePart,this._rank,this._eventStageType,this._golfHoleResult,this._utilString)},RankPartBuilder}(),ItemImpl=function(){function ItemImpl(){this.id="",this.data={},this.reinit()}return ItemImpl.prototype.setId=function(id){this.id=id},ItemImpl.prototype.getId=function(){return this.id},ItemImpl.prototype.getSortKey=function(){return""},ItemImpl.prototype.setValue=function(index,value){this.data[index]=value},ItemImpl.prototype.getValue=function(index,defaultReturnValueIfNotFound){return void 0===defaultReturnValueIfNotFound&&(defaultReturnValueIfNotFound=null),index in this.data?this.data[index]:defaultReturnValueIfNotFound},ItemImpl.prototype.getStatsResults=function(typeId,defaultReturnValueIfNotFound,isHomeParticipant){void 0===defaultReturnValueIfNotFound&&(defaultReturnValueIfNotFound=null),void 0===isHomeParticipant&&(isHomeParticipant=void 0);var key=cjs.Api.statsResultsIndexGenerator.get(typeId,isHomeParticipant);return this.getValue(key,defaultReturnValueIfNotFound)},ItemImpl.prototype.pushValue=function(index,value){index in this.data||(this.data[index]=[]),this.data[index].push(value)},ItemImpl.prototype.removeValue=function(index){delete this.data[index]},ItemImpl.prototype.reinit=function(dataObject){void 0===dataObject&&(dataObject={}),null==dataObject&&(dataObject={}),this.data=dataObject,null==this.data.is_valid&&(this.data.is_valid=!0)},ItemImpl.prototype.isValid=function(){return!cjs.Api.config.get("app","myteams","enable")||(null==this.data.is_valid||this.data.is_valid)},ItemImpl.prototype.invalidate=function(){this.data.is_valid=!1},ItemImpl.prototype.getData=function(clone){if(null==clone&&(clone=!1),!clone)return this.data;var newDataObj={};for(var id in this.data)newDataObj[id]=this.getValue(id);return newDataObj},ItemImpl}();!function(TournamentTypeList){TournamentTypeList.UNKNOWN="",TournamentTypeList.TOP="t",TournamentTypeList.PRIMARY="p",TournamentTypeList.SECONDARY="s",TournamentTypeList.CLOSED="c"}(TournamentTypeList||(TournamentTypeList={}));var _extendStatics,BlockTypeList,__extends=(_extendStatics=function(d,b){return _extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)Object.prototype.hasOwnProperty.call(b,p)&&(d[p]=b[p])},_extendStatics(d,b)},function(d,b){if("function"!=typeof b&&null!==b)throw new TypeError("Class extends value "+String(b)+" is not a constructor or null");function __(){this.constructor=d}_extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}),LeagueItemImpl=function(_super){function LeagueItemImpl(){return _super.call(this)||this}return __extends(LeagueItemImpl,_super),LeagueItemImpl.prototype.getOriginalId=function(){return this.getId().split("_")[1]},LeagueItemImpl.prototype.getSortKey=function(){return this.getValue("ZX")||""},LeagueItemImpl.prototype.hasTable=function(){return 1===parseInt(this.getValue("ZG"))},LeagueItemImpl.prototype.hasLiveTable=function(){return 1===parseInt(this.getValue("ZO"))},LeagueItemImpl.prototype.hasDraw=function(){return 2===parseInt(this.getValue("ZG"))},LeagueItemImpl.prototype.getStatsType=function(){return this.getValue("ZG")},LeagueItemImpl.prototype.getTournamentName=function(){return this.getValue("ZA","")},LeagueItemImpl.prototype.getCountryId=function(){return parseInt(this.getValue("ZB"))},LeagueItemImpl.prototype.getCountryName=function(){return this.getValue("ZY")},LeagueItemImpl.prototype.getTournamentId=function(){return this.getValue("ZE")},LeagueItemImpl.prototype.getDefaultTournamentId=function(){return""},LeagueItemImpl.prototype.getTournamentStageId=function(){return this.getValue("ZC")},LeagueItemImpl.prototype.getStageId=function(){return this.getValue("ZC")},LeagueItemImpl.prototype.getStagesCount=function(){return this.getValue("ZCC")},LeagueItemImpl.prototype.getTournamentStageType=function(){return this.getValue("ZJ")},LeagueItemImpl.prototype.getTournamentTemplateKey=function(){return this.getValue("ZH")},LeagueItemImpl.prototype.getTournamentTemplateId=function(){return this.getValue("ZEE")},LeagueItemImpl.prototype.getTournamentTemplateNameFromTitle=function(){return this.getTournamentName().replace(/(.+: )(.+)( \(.+)/,"$2")},LeagueItemImpl.prototype.getStageName=function(){return this.getValue("ZAE","")},LeagueItemImpl.prototype.getSuperTemplateId=function(){return parseInt(this.getValue("ZHS","0"))},LeagueItemImpl.prototype.getCategoryId=function(){var categoryId=this.parseValueFromTournamentTemplateKey(0);return null!=categoryId?parseInt(categoryId):CategoryList.ALL_RACES},LeagueItemImpl.prototype.getCategoryCaption=function(){return this.getValue("ZAF")},LeagueItemImpl.prototype.isRaceTypeRace=function(){return"r"===this.getValue("ZM")},LeagueItemImpl.prototype.getRaceInfoText=function(){return this.getValue("ZN")},LeagueItemImpl.prototype.getPrizeMoney=function(){return this.getValue("ZP")},LeagueItemImpl.prototype.getPar=function(){return this.getValue("ZQ")},LeagueItemImpl.prototype.getEventId=function(){return this.getValue("ZZ")},LeagueItemImpl.prototype.getMeetingId=function(){return this.getValue("QM")},LeagueItemImpl.prototype.getMeetingName=function(){return this.getValue("QMN")},LeagueItemImpl.prototype.getStageTabs=function(){return this.getValue("ZV")},LeagueItemImpl.prototype.getUrl=function(){return this.getValue("ZL")},LeagueItemImpl.prototype.getIs7Rugby=function(){return parseInt(this.getValue("ZR"))},LeagueItemImpl.prototype.getSportId=function(){return parseInt(this.getValue("sport_id"))},LeagueItemImpl.prototype.getSportName=function(){return this.getValue("sport")},LeagueItemImpl.prototype.isOpen=function(){return this.getValue("display")},LeagueItemImpl.prototype.getEventCount=function(){return this.getValue("g_count")},LeagueItemImpl.prototype.isPrimary=function(){return this.getTournamentType()===TournamentTypeList.PRIMARY},LeagueItemImpl.prototype.isSecondary=function(){return this.getTournamentType()===TournamentTypeList.SECONDARY},LeagueItemImpl.prototype.isTop=function(){return this.getTournamentType()===TournamentTypeList.TOP},LeagueItemImpl.prototype.isClosed=function(){return this.getTournamentType()===TournamentTypeList.CLOSED},LeagueItemImpl.prototype.isDuel=function(){return[null,"1",!0].includes(this.getValue("ZW","1"))},LeagueItemImpl.prototype.isStableford=function(){return["1",!0].includes(this.getValue("ZT"))},LeagueItemImpl.prototype.addUpcomingDraw=function(upcomingDrawItem){return this.pushValue("upcoming_draw_item",upcomingDrawItem)},LeagueItemImpl.prototype.getUpcomingDraw=function(){return this.getValue("upcoming_draw_item")},LeagueItemImpl.prototype.isNoDuel=function(){return!(!cjs.noDuelSports.includes(this.getSportId())||this.getIsDuelEvenThoughSportGenerallyIsnt())},LeagueItemImpl.prototype.getIsDuelEvenThoughSportGenerallyIsnt=function(){return null===this.getValue("ZW")||1==this.getValue("ZW")},LeagueItemImpl.prototype.parseValueFromTournamentTemplateKey=function(index){var ttk=this.getTournamentTemplateKey();return null!=ttk?ttk.split("_")[index]:null},LeagueItemImpl.prototype.getTournamentType=function(){return this.getValue("ZD")},LeagueItemImpl}(ItemImpl),TopLeaguesPartImpl=function(){function TopLeaguesPartImpl(participant,isSeasonPage,isLeagueTop){this._participant=participant,this._isSeasonPage=isSeasonPage,this._isLeagueTop=isLeagueTop}return TopLeaguesPartImpl.prototype.getValue=function(){return null!=this._participant?"":!this._isSeasonPage&&this._isLeagueTop?"a":"b"},TopLeaguesPartImpl}(),SortKeyGeneratorImpl=function(){function SortKeyGeneratorImpl(leagueItem,isStatsResults,statsResultsSortKey,statsSortKey,participantStatus,homeScorePart,rank,golfHoleResult,endUtime,startUtime,sportId,eventStageType,homeName,awayName,utilEnvironment,utilSport,utilPage,sortKeyHelper,timePartBuilder,labelPartBuilder,rankPartBuilder,liveTableSettings){this.leagueItem=leagueItem,this.isStatsResults=isStatsResults,this.statsResultsSortKey=statsResultsSortKey,this.statsSortKey=statsSortKey,this.participantStatus=participantStatus,this.homeScorePart=homeScorePart,this.rank=rank,this.golfHoleResult=golfHoleResult,this.endUtime=endUtime,this.startUtime=startUtime,this.sportId=sportId,this.eventStageType=eventStageType,this.homeName=homeName,this.awayName=awayName,this.utilEnvironment=utilEnvironment,this.utilSport=utilSport,this.utilPage=utilPage,this.sortKeyHelper=sortKeyHelper,this.timePartBuilder=timePartBuilder,this.labelPartBuilder=labelPartBuilder,this.rankPartBuilder=rankPartBuilder,this.liveTableSettings=liveTableSettings,this.sortByDesc=this.isSortDesc(),this.sortByTime=this.isSortByTime()}return SortKeyGeneratorImpl.prototype.generate=function(){var sortKey=[];sortKey.push(this.sortKeyHelper.sportPart(this.leagueItem.getSortKey()));var topLeaguesPart=new TopLeaguesPartImpl(this.utilEnvironment.getParticipant(),this.utilPage.isSeasonPage(),this.utilEnvironment.getMyLeaguesObject().isTop(this.leagueItem.getSportId(),this.leagueItem.getTournamentTemplateKey(),this.leagueItem.isTop()));sortKey.push(topLeaguesPart.getValue()),sortKey.push(this.sortKeyHelper.horseRacingCountryAndTournamentTemplatePart(this.sportId,this.leagueItem.getTournamentName()));var timePart=this.timePartBuilder.setIsWinterSport(this.utilSport.inGroup(this.sportId,SportList_SportList.WINTER_SPORTS)).setIsStageSport(this.utilSport.isStageSport(this.sportId)).setEndUtime(this.endUtime).setStartUtime(this.startUtime).setSortByDesc(this.sortByDesc).setSortByTime(this.sortByTime).setSportId(this.sportId).setCategoryId(this.leagueItem.getCategoryId()).setLeagueSortKey(this.leagueItem.getSortKey()).setEventStageType(this.eventStageType).setIsNoDuelTournament(this.leagueItem.isNoDuel()).setIsSeasonPage(this.utilPage.isSeasonPage()).build();sortKey.push(timePart.getValue());var labelPart=this.labelPartBuilder.setLeagueSortKey(this.leagueItem.getSortKey()).setIsNoDuelTournament(this.leagueItem.isNoDuel()).setIsStatsResults(this.isStatsResults).setStatsResultsSortKey(this.statsResultsSortKey).setStatsSortKey(this.statsSortKey).build();sortKey.push(labelPart.getValue());var rankPart=this.rankPartBuilder.setIsNoDuelTournament(this.leagueItem.isNoDuel()).setIsWinterSport(this.utilSport.inGroup(this.sportId,SportList_SportList.WINTER_SPORTS)).setParticipantStatus(this.participantStatus).setHomeScorePart(this.homeScorePart).setRank(this.rank).setEventStageType(this.eventStageType).setGolfHoleResult(this.golfHoleResult).build();return sortKey.push(rankPart.getValue()),sortKey.push(this.sortKeyHelper.startTimePart(this.sortByTime,this.startUtime)),sortKey.push(this.sortKeyHelper.playerNamesPart(this.homeName,this.awayName)),sortKey.join("")},SortKeyGeneratorImpl.prototype.isSortDesc=function(){var _a,_b,isCountryPage=this.utilPage.isCountryPage(),isCategoryPage=isCountryPage&&this.utilSport.hasCategoryPage(this.sportId);return!!(isCountryPage&&this.utilSport.inGroup(this.sportId,SportList_SportList.MOTORSPORT)||this.utilPage.isParticipantPage()&&this.utilSport.isMeetingSport(this.sportId))||!(!this.utilPage.isSeasonPage()&&!isCategoryPage)&&(null!==(_b=null===(_a=this.utilEnvironment.getUpdater())||void 0===_a?void 0:_a.country_tournament_order_fin)&&void 0!==_b&&_b)},SortKeyGeneratorImpl.prototype.isSortByTime=function(){var _a,isCategoryPage=this.utilPage.isCountryPage()&&this.utilSport.hasCategoryPage(this.sportId),isMotorsportCategoryPage=isCategoryPage&&this.utilSport.inGroup(this.sportId,SportList_SportList.MOTORSPORT),isCategoryPageWithHistoryTournaments=isCategoryPage&&(null===(_a=this.utilEnvironment.getUpdater())||void 0===_a?void 0:_a.country_tournament_order_fin);return!isMotorsportCategoryPage&&(!(!isCategoryPageWithHistoryTournaments&&!this.utilPage.isParticipantPage())||(!(!(this.utilPage.isSeasonPage()&&this.sportId!==SportList_SportList.GOLF||this.utilPage.isTournamentPagePassiveTable()||this.utilPage.isTournamentSubPage())||this.utilSport.isStageSport(this.sportId))||this.liveTableSettings.isSortByTime()))},SortKeyGeneratorImpl}(),SortKeyGeneratorBuilder=function(){function SortKeyGeneratorBuilder(utilEnviroment,utilString,utilSport,utilPage,liveTableSettings){this.utilEnviroment=utilEnviroment,this.utilString=utilString,this.utilSport=utilSport,this.utilPage=utilPage,this.liveTableSettings=liveTableSettings,this.leagueItem=null,this.isStatsResults=!1,this.statsResultsSortKey=0,this.statsSortKey=null,this.participantStatus=null,this.homeScorePart=null,this.rank=null,this.golfHoleResult="",this.endUtime=0,this.startUtime=0,this.sportId=0,this.eventStageType=0,this.homeName=null,this.awayName=null}return SortKeyGeneratorBuilder.prototype.setLeagueItem=function(value){return this.leagueItem=value,this},SortKeyGeneratorBuilder.prototype.setIsStatsResults=function(value){return this.isStatsResults=value,this},SortKeyGeneratorBuilder.prototype.setStatsResultsSortKey=function(value){return this.statsResultsSortKey=value,this},SortKeyGeneratorBuilder.prototype.setStatsSortKey=function(value){return this.statsSortKey=value,this},SortKeyGeneratorBuilder.prototype.setParticipantStatus=function(value){return this.participantStatus=value,this},SortKeyGeneratorBuilder.prototype.setHomeScorePart=function(value){return this.homeScorePart=value,this},SortKeyGeneratorBuilder.prototype.setRank=function(value){return this.rank=value,this},SortKeyGeneratorBuilder.prototype.setGolfHoleResult=function(value){return this.golfHoleResult=value,this},SortKeyGeneratorBuilder.prototype.setEndUtime=function(value){return this.endUtime=value,this},SortKeyGeneratorBuilder.prototype.setStartUtime=function(value){return this.startUtime=value,this},SortKeyGeneratorBuilder.prototype.setSportId=function(value){return this.sportId=value,this},SortKeyGeneratorBuilder.prototype.setEventStageType=function(value){return this.eventStageType=value,this},SortKeyGeneratorBuilder.prototype.setHomeName=function(value){return this.homeName=value,this},SortKeyGeneratorBuilder.prototype.setAwayName=function(value){return this.awayName=value,this},SortKeyGeneratorBuilder.prototype.build=function(){var _a;return new SortKeyGeneratorImpl(null!==(_a=this.leagueItem)&&void 0!==_a?_a:new LeagueItemImpl,this.isStatsResults,this.statsResultsSortKey,this.statsSortKey,this.participantStatus,this.homeScorePart,this.rank,this.golfHoleResult,this.endUtime,this.startUtime,this.sportId,this.eventStageType,this.homeName,this.awayName,this.utilEnviroment,this.utilSport,this.utilPage,new SortKeyHelperImpl(this.utilString),new TimePartBuilder,new LabelPartBuilder,new RankPartBuilder(this.utilString),this.liveTableSettings)},SortKeyGeneratorBuilder}(),ClickableBookmakerImpl=function(){function ClickableBookmakerImpl(util_trans,Helper_BookmakersDataStorage){this._utilTrans=util_trans,this._helperBookmakersDataStorage=Helper_BookmakersDataStorage}return ClickableBookmakerImpl.prototype.setBookmakerGeoGroupsData=function(data){this._helperBookmakersDataStorage.setBookmakerGeoGroupsData(data)},ClickableBookmakerImpl.prototype.isClickable=function(geoIp,geoIpIsoSubdivisionCode){return this._helperBookmakersDataStorage.isClickable(geoIp,geoIpIsoSubdivisionCode)},ClickableBookmakerImpl.prototype.showOddsComparisonTab=function(geoIp,geoIpIsoSubdivisionCode){return this._helperBookmakersDataStorage.showOddsComparisonTab(geoIp,geoIpIsoSubdivisionCode)},ClickableBookmakerImpl.prototype.showSummaryLogo=function(geoIp,geoIpIsoSubdivisionCode){return this._helperBookmakersDataStorage.showSummaryLogo(geoIp,geoIpIsoSubdivisionCode)},ClickableBookmakerImpl.prototype.showTextRepresentationOfSummaryLogo=function(geoIp,geoIpIsoSubdivisionCode){return this._helperBookmakersDataStorage.showTextRepresentationOfSummaryLogo(geoIp,geoIpIsoSubdivisionCode)},ClickableBookmakerImpl.prototype.showTextRepresentationOfOddsComparisonLogo=function(geoIp,geoIpIsoSubdivisionCode){return this._helperBookmakersDataStorage.showTextRepresentationOfOddsComparisonLogo(geoIp,geoIpIsoSubdivisionCode)},ClickableBookmakerImpl.prototype.showTextRepresentationOfBonusesLogo=function(geoIp,geoIpIsoSubdivisionCode){return this._helperBookmakersDataStorage.showTextRepresentationOfBonusesLogo(geoIp,geoIpIsoSubdivisionCode)},ClickableBookmakerImpl.prototype.showOddsComparisonLogo=function(geoIp,geoIpIsoSubdivisionCode){return this._helperBookmakersDataStorage.showOddsComparisonLogo(geoIp,geoIpIsoSubdivisionCode)},ClickableBookmakerImpl.prototype.isSummaryLogoClickable=function(geoIp,geoIpIsoSubdivisionCode){return this._helperBookmakersDataStorage.isSummaryLogoClickable(geoIp,geoIpIsoSubdivisionCode)},ClickableBookmakerImpl.prototype.isOddsComparisonLogoClickable=function(geoIp,geoIpIsoSubdivisionCode){return this._helperBookmakersDataStorage.isOddsComparisonLogoClickable(geoIp,geoIpIsoSubdivisionCode)},ClickableBookmakerImpl.prototype.isOddsComparisonBackgroundHighlighted=function(geoIp,geoIpIsoSubdivisionCode){return this._helperBookmakersDataStorage.isOddsComparisonBackgroundHighlighted(geoIp,geoIpIsoSubdivisionCode)},ClickableBookmakerImpl.prototype.renamePrematchOddsTab=function(geoIp,geoIpIsoSubdivisionCode){if(!this._helperBookmakersDataStorage.isClickable(geoIp,geoIpIsoSubdivisionCode)){var parentElement=document.getElementById("odds-tab-prematch");if(parentElement)parentElement.getElementsByTagName("a")[0].textContent=this._utilTrans.translate("TRANS_DETAIL_BOOKMARK_PRE_MATCH_ODDS_UNCLICKABLE")}},ClickableBookmakerImpl}(),BookmakersDataStorageImpl=function(){function BookmakersDataStorageImpl(){this._bookmakerGeoGroups={},this._bookmakers={}}return BookmakersDataStorageImpl.prototype.isAvailableBookmaker=function(geoIp,geoIpIsoSubdivisionCode,bookmakersData){return this.getBookmakersDataByGeo(geoIp,geoIpIsoSubdivisionCode,bookmakersData).length>0},BookmakersDataStorageImpl.prototype.setBookmakerGeoGroupsData=function(data){this._bookmakerGeoGroups=data},BookmakersDataStorageImpl.prototype.setBookmakerData=function(data){this._bookmakers=data},BookmakersDataStorageImpl.prototype.getBookmakersDataByGeo=function(geoIp,geoIpIsoSubdivisionCode,bookmakersData){"string"!=typeof geoIp&&(geoIp=""),"string"!=typeof geoIpIsoSubdivisionCode&&(geoIpIsoSubdivisionCode="");var mergedGeoIp=this._getGeoIpWithSubdivision(geoIp,geoIpIsoSubdivisionCode);return bookmakersData&&void 0!==bookmakersData[mergedGeoIp]&&mergedGeoIp!==geoIp?bookmakersData[mergedGeoIp]:bookmakersData&&void 0!==bookmakersData[geoIp]?bookmakersData[geoIp]:bookmakersData&&void 0!==bookmakersData.default?bookmakersData.default:{}},BookmakersDataStorageImpl.prototype.getCurrentGeoGroupData=function(geoIp,geoIpIsoSubdivisionCode){"string"!=typeof geoIp&&(geoIp=""),"string"!=typeof geoIpIsoSubdivisionCode&&(geoIpIsoSubdivisionCode="");var mergedGeoIp=this._getGeoIpWithSubdivision(geoIp,geoIpIsoSubdivisionCode);return this._bookmakerGeoGroups&&void 0!==this._bookmakerGeoGroups[mergedGeoIp]&&mergedGeoIp!==geoIp?this._bookmakerGeoGroups[mergedGeoIp]:this._bookmakerGeoGroups&&void 0!==this._bookmakerGeoGroups[geoIp]?this._bookmakerGeoGroups[geoIp]:this._bookmakerGeoGroups&&void 0!==this._bookmakerGeoGroups.default?this._bookmakerGeoGroups.default:{}},BookmakersDataStorageImpl.prototype.isClickable=function(geoIp,geoIpIsoSubdivisionCode){var groupData=this.getCurrentGeoGroupData(geoIp,geoIpIsoSubdivisionCode);return!(groupData.clickable&&"0"===String(groupData.clickable))},BookmakersDataStorageImpl.prototype.showOddsComparisonTab=function(geoIp,geoIpIsoSubdivisionCode){var groupData=this.getCurrentGeoGroupData(geoIp,geoIpIsoSubdivisionCode);return!(groupData.show_odds_comparison_tab&&"0"===String(groupData.show_odds_comparison_tab))},BookmakersDataStorageImpl.prototype.showSummaryLogo=function(geoIp,geoIpIsoSubdivisionCode){var groupData=this.getCurrentGeoGroupData(geoIp,geoIpIsoSubdivisionCode);return!(groupData.show_bookmaker_logo_in_summary&&"0"===String(groupData.show_bookmaker_logo_in_summary))},BookmakersDataStorageImpl.prototype.showTextRepresentationOfSummaryLogo=function(geoIp,geoIpIsoSubdivisionCode){var groupData=this.getCurrentGeoGroupData(geoIp,geoIpIsoSubdivisionCode);return!(groupData.logo_to_text_match_summary&&"0"===String(groupData.logo_to_text_match_summary))},BookmakersDataStorageImpl.prototype.showTextRepresentationOfOddsComparisonLogo=function(geoIp,geoIpIsoSubdivisionCode){var groupData=this.getCurrentGeoGroupData(geoIp,geoIpIsoSubdivisionCode);return!(groupData.logo_to_text_match_summary&&"0"===String(groupData.logo_to_text_match_summary))},BookmakersDataStorageImpl.prototype.showTextRepresentationOfBonusesLogo=function(geoIp,geoIpIsoSubdivisionCode){var groupData=this.getCurrentGeoGroupData(geoIp,geoIpIsoSubdivisionCode);return!(groupData.logo_to_text_match_summary&&"0"===String(groupData.logo_to_text_bonus))},BookmakersDataStorageImpl.prototype.showOddsComparisonLogo=function(geoIp,geoIpIsoSubdivisionCode){var groupData=this.getCurrentGeoGroupData(geoIp,geoIpIsoSubdivisionCode);return!(groupData.show_bookmaker_logo_odds_comparison&&"0"===String(groupData.show_bookmaker_logo_odds_comparison))},BookmakersDataStorageImpl.prototype.isSummaryLogoClickable=function(geoIp,geoIpIsoSubdivisionCode){var groupData=this.getCurrentGeoGroupData(geoIp,geoIpIsoSubdivisionCode);return!(groupData.clickable_bookmaker_logo_in_summary&&"0"===String(groupData.clickable_bookmaker_logo_in_summary))},BookmakersDataStorageImpl.prototype.isOddsComparisonLogoClickable=function(geoIp,geoIpIsoSubdivisionCode){var groupData=this.getCurrentGeoGroupData(geoIp,geoIpIsoSubdivisionCode);return!(groupData.clickable_bookmaker_logo_odds_comparison&&"0"===String(groupData.clickable_bookmaker_logo_odds_comparison))},BookmakersDataStorageImpl.prototype.isOddsComparisonBackgroundHighlighted=function(geoIp,geoIpIsoSubdivisionCode){var groupData=this.getCurrentGeoGroupData(geoIp,geoIpIsoSubdivisionCode);return!(groupData.odds_background_in_odds_comparison&&"0"===String(groupData.odds_background_in_odds_comparison))},BookmakersDataStorageImpl.prototype._getGeoIpWithSubdivision=function(geoIp,geoIpIsoSubdivisionCode){var mergedGeoIp=geoIp;return geoIp?geoIpIsoSubdivisionCode&&(mergedGeoIp=geoIp+":"+geoIpIsoSubdivisionCode):mergedGeoIp="default",mergedGeoIp},BookmakersDataStorageImpl}(),GambleResponsiblyImpl=function(){function GambleResponsiblyImpl(Helper_BookmakersDataStorage){this._helperBookmakersDataStorage=Helper_BookmakersDataStorage}return GambleResponsiblyImpl.prototype.isNoticeHidden=function(geoIp,geoIpIsoSubdivisionCode,bookmakersData){return!this._helperBookmakersDataStorage.isAvailableBookmaker(geoIp,geoIpIsoSubdivisionCode,bookmakersData)||!this._helperBookmakersDataStorage.isClickable(geoIp,geoIpIsoSubdivisionCode)},GambleResponsiblyImpl.prototype.removeNotice=function(geoIp,geoIpIsoSubdivisionCode,bookmakersData){if(this.isNoticeHidden(geoIp,geoIpIsoSubdivisionCode,bookmakersData)){var elements=window.document.querySelectorAll(".footerAdvertGambling");[].forEach.call(elements,(function(element){element.remove()}))}},GambleResponsiblyImpl.prototype.setBookmakerGeoGroupsData=function(data){this._helperBookmakersDataStorage.setBookmakerGeoGroupsData(data)},GambleResponsiblyImpl}(),ReversedSportTimeImpl=function(){function ReversedSportTimeImpl(utilEnviroment){this._sportReversedList=utilEnviroment.getSportReversedList()}return ReversedSportTimeImpl.prototype.getTime=function(time,sportId,eventStageId,dataStageTime){if(!(sportId in this._sportReversedList))return time;var dataStageTimeParsed=ReversedSportTimeImpl._parseDataStageTime(dataStageTime);if(void 0!==this._sportReversedList[sportId].stages&&this._sportReversedList[sportId].stages.includes(eventStageId)){var stageTime=dataStageTimeParsed[0]?dataStageTimeParsed[0]:this._sportReversedList[sportId].stage_time;time=ReversedSportTimeImpl._countReverseTime(stageTime,time)}if(void 0!==this._sportReversedList[sportId].extra_time_stages&&this._sportReversedList[sportId].extra_time_stages.includes(eventStageId)){stageTime=dataStageTimeParsed[1]?dataStageTimeParsed[1]:this._sportReversedList[sportId].extra_time;time=ReversedSportTimeImpl._countReverseTime(stageTime,time)}return time},ReversedSportTimeImpl._countReverseTime=function(stageTime,time){return 0!=time&&(time-=1),(time=stageTime-time)<0&&(time=0),time},ReversedSportTimeImpl._parseDataStageTime=function(dataStageTime){return null==dataStageTime?[0,0]:dataStageTime.split(":").map((function(value){return parseInt(value,10)}))},ReversedSportTimeImpl}();!function(BlockTypeList){BlockTypeList.BLOCK_TYPE_SUMMARY_FIXTURES="summary-fixtures",BlockTypeList.BLOCK_TYPE_SUMMARY_RESULTS="summary-results",BlockTypeList.BLOCK_TYPE_SUMMARY="summary",BlockTypeList.BLOCK_TYPE_RESULTS="results",BlockTypeList.BLOCK_TYPE_FIXTURES="fixtures",BlockTypeList.BLOCK_TYPE_SQUAD="squad",BlockTypeList.BLOCK_TYPE_TRANSFERS="transfers",BlockTypeList.BLOCK_TYPE_NEWS="news",BlockTypeList.BLOCK_TYPE_DRAW="draw",BlockTypeList.BLOCK_TYPE_STANDINGS_TABLE="standings_table",BlockTypeList.BLOCK_TYPE_PARTICIPANT_TEAMS="participants_teams",BlockTypeList.BLOCK_TYPE_ARCHIVE="archive",BlockTypeList.BLOCK_TYPE_STANDINGS_DRAW="standings_draw",BlockTypeList.BLOCK_TYPE_PARTICIPANT_PLAYERS="participants_players",BlockTypeList.BLOCK_TYPE_DEFAULT=""}(BlockTypeList||(BlockTypeList={}));var WinnerSidesList,SidesList,__awaiter=function(thisArg,_arguments,P,generator){return new(P||(P=Promise))((function(resolve,reject){function fulfilled(value){try{step(generator.next(value))}catch(e){reject(e)}}function rejected(value){try{step(generator.throw(value))}catch(e){reject(e)}}function step(result){var value;result.done?resolve(result.value):(value=result.value,value instanceof P?value:new P((function(resolve){resolve(value)}))).then(fulfilled,rejected)}step((generator=generator.apply(thisArg,_arguments||[])).next())}))},__generator=function(thisArg,body){var f,y,t,g,_={label:0,sent:function(){if(1&t[0])throw t[1];return t[1]},trys:[],ops:[]};return g={next:verb(0),throw:verb(1),return:verb(2)},"function"==typeof Symbol&&(g[Symbol.iterator]=function(){return this}),g;function verb(n){return function(v){return function(op){if(f)throw new TypeError("Generator is already executing.");for(;g&&(g=0,op[0]&&(_=0)),_;)try{if(f=1,y&&(t=2&op[0]?y.return:op[0]?y.throw||((t=y.return)&&t.call(y),0):y.next)&&!(t=t.call(y,op[1])).done)return t;switch(y=0,t&&(op=[2&op[0],t.value]),op[0]){case 0:case 1:t=op;break;case 4:return _.label++,{value:op[1],done:!1};case 5:_.label++,y=op[1],op=[0];continue;case 7:op=_.ops.pop(),_.trys.pop();continue;default:if(!(t=_.trys,(t=t.length>0&&t[t.length-1])||6!==op[0]&&2!==op[0])){_=0;continue}if(3===op[0]&&(!t||op[1]>t[0]&&op[1]<t[3])){_.label=op[1];break}if(6===op[0]&&_.label<t[1]){_.label=t[1],t=op;break}if(t&&_.label<t[2]){_.label=t[2],_.ops.push(op);break}t[2]&&_.ops.pop(),_.trys.pop();continue}op=body.call(thisArg,_)}catch(e){op=[6,e],y=0}finally{f=t=0}if(5&op[0])throw op[1];return{value:op[0]?op[1]:void 0,done:!0}}([n,v])}}},__read=function(o,n){var m="function"==typeof Symbol&&o[Symbol.iterator];if(!m)return o;var r,e,i=m.call(o),ar=[];try{for(;(void 0===n||n-- >0)&&!(r=i.next()).done;)ar.push(r.value)}catch(error){e={error}}finally{try{r&&!r.done&&(m=i.return)&&m.call(i)}finally{if(e)throw e.error}}return ar},ParticipantNoDuelImpl=function(){function ParticipantNoDuelImpl(Feed_NameComposer,Feed_Fetcher){this.feedFetcher=Feed_Fetcher,this.feedNameComposer=Feed_NameComposer}return ParticipantNoDuelImpl.prototype.load=function(participantKey){cjs.Api.loader.get("reactCalls").call((function(reactCalls){return reactCalls.loadingState("noDuel",!0)})),this.fetchData(participantKey)},ParticipantNoDuelImpl.prototype.appendMoreLinkElement=function(){var div=document.createElement("div");div.id="participant-page-".concat(BlockTypeList.BLOCK_TYPE_SUMMARY_RESULTS,"-more");var linkHref=document.createElement("a");linkHref.href="#",div.append(linkHref),document.body.append(div)},ParticipantNoDuelImpl.prototype.fetchData=function(participantKey){return __awaiter(this,void 0,Promise,(function(){var _a,participantResponse,eventsResponse,repairResponse;return __generator(this,(function(_c){switch(_c.label){case 0:return _c.trys.push([0,2,,3]),cjs.initialFeeds||(cjs.initialFeeds={}),[4,Promise.all([this.feedFetcher.fetch(this.feedNameComposer.getParticipantFeed(participantKey,"x")),this.feedFetcher.fetch(this.feedNameComposer.getParticipantEventDataFeed(participantKey)),this.feedFetcher.fetch(this.feedNameComposer.getRepairFeed())])];case 1:return _a=__read.apply(void 0,[_c.sent(),3]),participantResponse=_a[0],eventsResponse=_a[1],repairResponse=_a[2],this.hasResponseData(participantResponse)&&this.hasResponseData(eventsResponse)&&this.hasResponseData(repairResponse)&&(cjs.Api.loader.get("reactCalls").call((function(reactCalls){return reactCalls.loadingState("noDuel",!1)})),cjs.initialFeeds[BlockTypeList.BLOCK_TYPE_SUMMARY_RESULTS]={data:"".concat(participantResponse.getBody()).concat(eventsResponse.getBody(),"ST÷repair¬").concat(repairResponse.getBody()),allEventsCount:null},this.appendMoreLinkElement(),cjs.Api.loader.get("reactCalls").call((function(reactCalls){return reactCalls.reloadStaticContent()}))),[3,3];case 2:return _c.sent(),cjs.Api.loader.get("reactCalls").call((function(reactCalls){return reactCalls.loadingState("noDuel",!1)})),[3,3];case 3:return[2]}}))}))},ParticipantNoDuelImpl.prototype.hasResponseData=function(response){var body=response.getBody();return Boolean("string"==typeof body&&body.length>0&&"0"!==body)},ParticipantNoDuelImpl}();!function(WinnerSidesList){WinnerSidesList[WinnerSidesList.UNKNOWN=-1]="UNKNOWN",WinnerSidesList[WinnerSidesList.DRAW=0]="DRAW",WinnerSidesList[WinnerSidesList.HOME=1]="HOME",WinnerSidesList[WinnerSidesList.AWAY=2]="AWAY"}(WinnerSidesList||(WinnerSidesList={})),function(SidesList){SidesList[SidesList.UNKNOWN=0]="UNKNOWN",SidesList[SidesList.HOME=1]="HOME",SidesList[SidesList.AWAY=2]="AWAY",SidesList[SidesList.LAST=3]="LAST",SidesList[SidesList.NEXT=4]="NEXT"}(SidesList||(SidesList={}));var EventStageList_EventStageList,WinLoseImpl=function(){function WinLoseImpl(utilTrans){this._formTitles={},this._shortTranslate={},this._formClass="",this._formType="",this._shortType="",this._formTitles={WO:utilTrans.translate("TRANS_DRAW")+"/"+utilTrans.translate("TRANS_WIN"),LO:utilTrans.translate("TRANS_DRAW")+"/"+utilTrans.translate("TRANS_LOST"),W:utilTrans.translate("TRANS_WIN"),L:utilTrans.translate("TRANS_LOST"),D:utilTrans.translate("TRANS_DRAW"),DO:utilTrans.translate("TRANS_DRAW"),DW:utilTrans.translate("TRANS_WIN")+"/"+utilTrans.translate("TRANS_DRAW"),DL:utilTrans.translate("TRANS_LOST")+"/"+utilTrans.translate("TRANS_DRAW"),WW:utilTrans.translate("TRANS_WIN")+"/"+utilTrans.translate("TRANS_WIN"),WL:utilTrans.translate("TRANS_LOST")+"/"+utilTrans.translate("TRANS_WIN"),LW:utilTrans.translate("TRANS_WIN")+"/"+utilTrans.translate("TRANS_LOST"),LL:utilTrans.translate("TRANS_LOST")+"/"+utilTrans.translate("TRANS_LOST")},this._shortTranslate={win:utilTrans.translate("TRANS_WIN_SHORT"),draw:utilTrans.translate("TRANS_DRAW_SHORT"),lost:utilTrans.translate("TRANS_LOST_SHORT")}}return WinLoseImpl.prototype._setForms=function(eventItem,participant){var participantSide=String(eventItem.getHomeParticipantIds()).split("/").includes(participant)?SidesList.HOME:SidesList.AWAY;eventItem.isDraw()?(this._formType="D",this._shortType="draw"):eventItem.isHomeWinner()&&participantSide===SidesList.HOME||eventItem.isAwayWinner()&&participantSide===SidesList.AWAY?(this._formType="W",this._shortType="win"):(this._formType="L",this._shortType="lost"),this._formClass=this._formType;var fullTimeWinner=eventItem.getFtWinner();"D"===this._formType&&fullTimeWinner!==WinnerSidesList.DRAW?fullTimeWinner===WinnerSidesList.HOME&&participantSide===SidesList.HOME||fullTimeWinner===WinnerSidesList.AWAY&&participantSide===SidesList.AWAY?(this._formClass+="W",this._formType+="W"):(this._formClass+="L",this._formType+="L"):this.isAfterExtraTime(eventItem)&&(fullTimeWinner===WinnerSidesList.DRAW?(this._formClass+="O",this._formType+="O"):fullTimeWinner===WinnerSidesList.HOME&&participantSide===SidesList.HOME||fullTimeWinner===WinnerSidesList.AWAY&&participantSide===SidesList.AWAY?(this._formClass+="W",this._formType+="W"):(this._formClass+="L",this._formType+="L"))},WinLoseImpl.prototype.getFormClass=function(eventItem,participant){return this._setForms(eventItem,participant),this._formClass},WinLoseImpl.prototype.getFormTitle=function(eventItem,participant){return this._setForms(eventItem,participant),this._formTitles[this._formType]||""},WinLoseImpl.prototype.getShortTranslate=function(eventItem,participant){return this._setForms(eventItem,participant),this._shortTranslate[this._shortType]},WinLoseImpl.prototype.isAfterExtraTime=function(eventItem){if(eventItem.getSportId()===SportList_SportList.AUSSIE_RULES){var homeAussieRulesFullTimePoints=eventItem.getValue("PRO",0)+eventItem.getValue("PRW",0)+eventItem.getValue("PSE",0)+eventItem.getValue("PSM",0),awayAussieRulesFullTimePoints=eventItem.getValue("PRS",0)+eventItem.getValue("PSA",0)+eventItem.getValue("PSI",0)+eventItem.getValue("PSQ",0);return homeAussieRulesFullTimePoints!==eventItem.getValue("PRM",0)||awayAussieRulesFullTimePoints!==eventItem.getValue("PRN",0)}return""!==eventItem.getHomeFullTimeScore()},WinLoseImpl}(),ScoresChanged=function(){function ScoresChanged(){}return ScoresChanged.prototype.getHighlightHtml=function(message){var html=message?'<div class="scoresChanged">\n\t\t\t\t  <div class="scoresChanged__ring"></div>\n\t\t\t\t  <div class="scoresChanged__circle"></div>\n\t\t\t\t  </div>':"";return'<span class="highlight-message scores-changed" onmouseover="tt.show(this, event)" onmouseout="tt.hide(this)" title="'.concat(message,'">').concat(html,"</span>")},ScoresChanged}(),StringsImpl=function(){function StringsImpl(charset,webLanguage){this.charset=charset,this.webLanguage=webLanguage,this._accents={},this._language="",this._locale="",this._letters={},this._lettersUpper={},this._localeCompareSupported=null,this._globalReplaceRegexCache={},this.LANG_GREEK="el",this._fillAccents(),this._fillLetters(),this._setLocaleAndLanguage()}return StringsImpl.prototype._fillLetters=function(){this._letters={tr:["i"],el:["ά","έ","ή","ί","ό","ύ","ώ","ϊ","ϋ","ς"]},this._lettersUpper={tr:["İ"],el:["Α","Ε","Η","Ι","Ο","Υ","Ω","Ι","Υ","Σ"]}},StringsImpl.prototype._setLocaleAndLanguage=function(){this._locale=(this.charset+"").replace("_","-"),this._language=this.webLanguage},StringsImpl.prototype._fillAccents=function(){this._accents={default:{À:"A",Á:"A",Â:"A",Ã:"A",Ä:"A",Å:"A",Æ:"AE",Ç:"C",È:"E",É:"E",Ê:"E",Ë:"E",Ì:"I",Í:"I",Î:"I",Ï:"I",Ð:"D",Ñ:"N",Ò:"O",Ó:"O",Ô:"O",Õ:"O",Ö:"O",Ø:"O",Ù:"U",Ú:"U",Û:"U",Ü:"U",Ý:"Y",ß:"s",à:"a",á:"a",â:"a",ã:"a",ä:"a",å:"a",æ:"ae",ç:"c",è:"e",é:"e",ê:"e",ë:"e",ì:"i",í:"i",î:"i",ï:"i",ñ:"n",ò:"o",ó:"o",ô:"o",õ:"o",ö:"o",ø:"o",ù:"u",ú:"u",û:"u",ü:"u",ý:"y",ÿ:"y",Ā:"A",ā:"a",Ă:"A",ă:"a",Ą:"A",ą:"a",Ć:"C",ć:"c",Ĉ:"C",ĉ:"c",Ċ:"C",ċ:"c",Č:"C",č:"c",Ď:"D",ď:"d",Đ:"D",đ:"d",Ē:"E",ē:"e",Ĕ:"E",ĕ:"e",Ė:"E",ė:"e",Ę:"E",ę:"e",Ě:"E",ě:"e",Ĝ:"G",ĝ:"g",Ğ:"G",ğ:"g",Ġ:"G",ġ:"g",Ģ:"G",ģ:"g",Ĥ:"H",ĥ:"h",Ħ:"H",ħ:"h",Ĩ:"I",ĩ:"i",Ī:"I",ī:"i",Ĭ:"I",ĭ:"i",Į:"I",į:"i",ı:"i",Ĳ:"IJ",ĳ:"ij",Ĵ:"J",ĵ:"j",Ķ:"K",ķ:"k",Ĺ:"L",ĺ:"l",Ļ:"L",ļ:"l",Ľ:"L",ľ:"l",Ŀ:"L",ŀ:"l",Ł:"L",ł:"l",Ń:"N",ń:"n",Ņ:"N",ņ:"n",Ň:"N",ň:"n",ŉ:"n",Ō:"O",ō:"o",Ŏ:"O",ŏ:"o",Ő:"O",ő:"o",Œ:"OE",œ:"oe",Ŕ:"R",ŕ:"r",Ŗ:"R",ŗ:"r",Ř:"R",ř:"r",Ś:"S",ś:"s",Ŝ:"S",ŝ:"s",Ş:"S",ş:"s",Š:"S",š:"s",Ţ:"T",ţ:"t",Ť:"T",ť:"t",Ŧ:"T",ŧ:"t",Ũ:"U",ũ:"u",Ū:"U",ū:"u",Ŭ:"U",ŭ:"u",Ů:"U",ů:"u",Ű:"U",ű:"u",Ų:"U",ų:"u",Ŵ:"W",ŵ:"w",Ŷ:"Y",ŷ:"y",Ÿ:"Y",Ź:"Z",ź:"z",Ż:"Z",ż:"z",Ž:"Z",ž:"z",ſ:"s",ƒ:"f",Ơ:"O",ơ:"o",Ư:"U",ư:"u",Ǎ:"A",ǎ:"a",Ǐ:"I",ǐ:"i",Ǒ:"O",ǒ:"o",Ǔ:"U",ǔ:"u",Ǖ:"U",ǖ:"u",Ǘ:"U",ǘ:"u",Ǚ:"U",ǚ:"u",Ǜ:"U",ǜ:"u",Ǻ:"A",ǻ:"a",Ǽ:"AE",ǽ:"ae",Ǿ:"O",ǿ:"o"},cs:{Á:"Aÿ",Č:"Cÿ",Ď:"Dÿ",É:"Eþ",Ě:"Eÿ",CH:"Hþ",Ch:"Hÿ",Í:"Iÿ",Ň:"Nÿ",Ó:"Oÿ",Ř:"Rÿ",Š:"Sÿ",Ť:"Tÿ",Ú:"Uþ",Ů:"Uÿ",Ý:"Yÿ",Ž:"Zÿ",á:"aÿ",č:"cÿ",ch:"hÿ",ď:"dÿ",é:"eï",ě:"eÿ",í:"iÿ",ň:"nÿ",ó:"oÿ",ř:"rÿ",š:"sÿ",ť:"tÿ",ú:"uï",ů:"uÿ",ý:"yÿ",ž:"zÿ"},da:{Æ:"Zý",Ø:"Zþ",Å:"Zÿ",æ:"zý",ø:"zþ",å:"zÿ"},de:{Ä:"Aÿ",Ö:"Oÿ",Ü:"Uÿ",ä:"aÿ",ö:"oÿ",ü:"uÿ"},en:{},"en-africa":{},"en-asia":{},"en-au":{},"en-ca":{},"en-india":{},"en-uk":{},"en-usa":{},el:{Α:"Aÿ",Β:"Bÿ",Γ:"Cÿ",Δ:"DxFF",Ε:"Eÿ",Ζ:"Fÿ",Η:"Hÿ",Θ:"Iþ",Ι:"Iÿ",Κ:"Kÿ",Λ:"Lÿ",Μ:"Mÿ",Ν:"Nÿ",Ξ:"Oþ",Ο:"Oÿ",Π:"Pþ",Ρ:"Pÿ",Σ:"Rÿ",Τ:"Tÿ",Υ:"Yþ",Φ:"Yÿ",Χ:"Zý",Ψ:"Zþ",Ω:"Zÿ",Ά:"Aý",Έ:"Eý",Ή:"Hþ",Ί:"Iÿ",Ό:"Oý",Ύ:"Vþ",Ώ:"Zÿ",ά:"aþ",α:"aÿ",β:"bÿ",γ:"cÿ",δ:"dÿ",έ:"eþ",ε:"eÿ",ζ:"fÿ",η:"gÿ",ή:"hþ",θ:"hÿ",ι:"iþ",ί:"iÿ",κ:"kÿ",λ:"lÿ",μ:"mÿ",ν:"nÿ",ξ:"oý",ό:"oþ",ο:"oÿ",π:"pÿ",ρ:"rÿ",σ:"sÿ",τ:"tÿ",υ:"uÿ",ύ:"vï",φ:"vÿ",χ:"xÿ",ψ:"yÿ",ω:"zï",ώ:"zÿ"},es:{Ñ:"Nÿ",ñ:"nÿ"},fi:{Å:"Zý",Ä:"Zþ",Ö:"Zÿ",å:"zý",ä:"zþ",ö:"zÿ"},fr:{É:"Eý",È:"Eþ",Ê:"Eÿ",à:"aÿ",ç:"cÿ",é:"eý",è:"eþ",ê:"eÿ"},hr:{Č:"Cþ",Ć:"Cÿ",DŽ:"Dþ",Dž:"Dþ",Đ:"Dÿ",LJ:"Lÿ",Lj:"Lÿ",NJ:"Nÿ",Nj:"Nÿ",Š:"Sÿ",Ž:"Zÿ",č:"cþ",ć:"cÿ",dž:"dþ",đ:"dÿ",lj:"lÿ",nj:"nÿ",š:"sÿ",ž:"zÿ"},hu:{Á:"Aþ","Ã":"Aþ",CS:"Cÿ",Cs:"Cÿ",Dz:"Dþ",DZ:"Dþ",Dzs:"Dÿ",É:"Eÿ",Gy:"Gÿ",GY:"Gÿ",Í:"Iÿ",Ly:"Lÿ",LY:"Lÿ",Ny:"Nÿ",NY:"Nÿ",Ó:"Oý",Ö:"Oþ",Ő:"Oÿ",Sz:"Sÿ",SZ:"Sÿ",Ty:"Tÿ",TY:"Tÿ",Ú:"Uý",Ü:"Uþ",Ű:"Uÿ",Zs:"Zÿ",ZS:"Zÿ",á:"aÿ",cs:"cÿ",dz:"dþ",dzs:"dFF",é:"eÿ",gy:"gÿ",í:"iÿ",ly:"lÿ",ny:"nÿ",ó:"oý",ö:"oþ",ő:"oÿ",sz:"sÿ",ty:"tÿ",ú:"uý",ü:"uþ",ű:"uÿ",zs:"zÿ"},it:{Á:"Aÿ",É:"Eÿ",Í:"Iÿ",Ó:"Oÿ",Ú:"Uÿ",á:"aÿ",é:"eÿ",í:"iÿ",ó:"oÿ",ú:"uÿ"},lt:{Ą:"Aÿ",Č:"Cÿ",Ę:"Eþ",Ė:"Eÿ",Į:"Iþ",Y:"Iÿ",Š:"Sÿ",Ų:"Uþ",Ū:"Uÿ",Ž:"Zÿ",ą:"aÿ",č:"cÿ",ę:"eþ",ė:"eÿ",į:"iþ",y:"iÿ",š:"sÿ",ų:"uþ",ū:"uÿ",ž:"zÿ"},nl:{Á:"Aþ",Ä:"Aÿ",É:"Eþ",Ë:"Eÿ",Ï:"Iÿ",Ó:"Oþ",Ö:"Oÿ",Ú:"Uþ",Ü:"Uÿ",á:"aþ",ä:"aÿ",é:"eþ",ë:"eÿ",ï:"iÿ",ó:"oþ",ö:"oÿ",ú:"uþ",ü:"uÿ"},no:{Æ:"Zý",Ø:"Zþ",Å:"Zÿ",æ:"zý",ø:"zþ",å:"zÿ"},pl:{Ą:"Aÿ",Ć:"Cÿ",Ę:"Eÿ",Ł:"Lÿ",Ń:"Nÿ",Ó:"Oÿ",Ś:"Sÿ",Ź:"Zþ",Ż:"Zÿ",ą:"aÿ",ć:"cÿ",ę:"eÿ",ł:"lÿ",ń:"nÿ",ó:"oÿ",ś:"sÿ",ź:"zþ",ż:"zÿ"},pt:{Á:"Aÿ",É:"Eÿ",Í:"Iÿ",Ó:"Oÿ",Ú:"Uÿ",á:"aÿ",é:"eÿ",í:"iÿ",ó:"oÿ",ú:"uÿ"},"pt-br":{À:"Aü",Á:"Aý",Â:"Aþ",Ã:"Aÿ",Ç:"Cÿ",É:"Eþ",Ê:"Eÿ",Í:"Iÿ",Ó:"Oý",Ô:"Oþ",Õ:"Oÿ",Ú:"Uþ",Ü:"Uÿ",à:"aü",á:"aý",â:"aþ",ã:"aÿ",ç:"cÿ",é:"eþ",ê:"eÿ",í:"iÿ",ó:"oý",ô:"oþ",õ:"oÿ",ú:"uþ",ü:"uÿ"},ro:{Ă:"Aþ",Â:"Aÿ",Î:"Iÿ",Ș:"Sÿ",Ț:"Tþ",Ţ:"Tÿ",ă:"aþ",â:"aÿ",ș:"sÿ",ț:"tÿ"},ru:{А:"Aú",Б:"Aû",В:"Aü",Г:"Aý",Д:"Aþ",Е:"Aÿ",Ё:"Bú",Ж:"Bû",З:"Bü",И:"Bý",Й:"Bþ",К:"Bÿ",Л:"Cú",М:"Cû",Н:"Cü",О:"Cý",П:"Cþ",Р:"Cÿ",С:"Dú",Т:"Dû",У:"Dü",Ф:"Dý",Х:"Dþ",Ц:"Dÿ",Ч:"Eú",Ш:"Eû",Щ:"Eü",Ъ:"Eý",Ы:"Eþ",Ь:"Eÿ",Э:"Fý",Ю:"Fþ",Я:"Fÿ",а:"aú",б:"aû",в:"aü",г:"aý",д:"aþ",е:"aÿ",ё:"bú",ж:"bû",з:"bü",и:"bý",й:"bþ",к:"bÿ",л:"cú",м:"cû",н:"cü",о:"cý",п:"cþ",р:"cÿ",с:"dú",т:"dû",у:"dü",ф:"dý",х:"dþ",ц:"dÿ",ч:"eú",ш:"eû",щ:"eü",ъ:"eý",ы:"eþ",ь:"eÿ",э:"fý",ю:"fþ",я:"fÿ"},sk:{Á:"Aþ",Ä:"Aÿ",Č:"Cÿ",Ď:"Dý",DZ:"Dþ",DŽ:"Dÿ",Dz:"Dþ",Dž:"Dÿ",É:"Eÿ",CH:"Hþ",Ch:"Hÿ",Í:"Iÿ",Ĺ:"Lþ",Ľ:"Lÿ",Ň:"Nÿ",Ó:"Oþ",Ô:"Oÿ",Ŕ:"Rÿ",Š:"Sÿ",Ť:"Tÿ",Ú:"Uÿ",Ý:"Yÿ",Ž:"Zÿ",á:"aþ",ä:"aÿ",č:"cÿ",ď:"dý",dz:"dþ",dž:"dÿ",é:"eÿ",ch:"hÿ",í:"iÿ",ĺ:"lþ",ľ:"lÿ",ň:"nÿ",ó:"oþ",ô:"oÿ",ŕ:"rÿ",š:"sÿ",ť:"tÿ",ú:"uÿ",ý:"yÿ",ž:"zÿ"},sl:{Č:"Cÿ",Š:"Sÿ",Ž:"Zÿ",č:"cÿ",š:"sÿ",ž:"zÿ"},sr:{Č:"Cþ",Ć:"Cÿ",DŽ:"Dþ",Đ:"Dÿ",LJ:"Lÿ",NJ:"Nÿ",Lj:"Lÿ",Nj:"Nÿ",Š:"Sÿ",Ž:"Zÿ",č:"cþ",ć:"cÿ",dž:"dþ",đ:"dÿ",lj:"lÿ",nj:"nÿ",š:"sÿ",ž:"zÿ"},sv:{Å:"Zý",Ä:"Zþ",Ö:"Zÿ",å:"zý",ä:"zþ",ö:"zÿ"},tr:{Ç:"Cÿ",Ğ:"Gÿ",İ:"Iÿ",Ö:"Oÿ",Ş:"Sÿ",Ü:"Uÿ",ç:"cÿ",ğ:"gÿ",ı:"hÿ",ö:"oÿ",ş:"sÿ",ü:"uÿ"},vi:{Ă:"Aþ",Â:"Aÿ",Đ:"Dÿ",Ê:"Eÿ",Ô:"Oþ",Ơ:"Oÿ",Ư:"Uÿ",ă:"aþ",â:"aÿ",đ:"dÿ",ê:"eÿ",ô:"oþ",ơ:"oÿ",ư:"uÿ"}},this._accents["de-at"]=this._accents.de,this._accents.in=this._accents.en,this._accents.ms=this._accents.en,this._fillMissingAccentsFromDefault()},StringsImpl.prototype._fillMissingAccentsFromDefault=function(){var accentKey="",lang="",accentVal="";for(lang in this._accents)if("default"!==lang)for(accentKey in this._accents.default)accentVal=this._accents.default[accentKey],null==this._accents[lang][accentKey]&&(this._accents[lang][accentKey]=accentVal)},StringsImpl.prototype._globalReplace=function(input,replacePairs,type){if(!this._globalReplaceRegexCache.hasOwnProperty(type)){var keys=[];for(var key in replacePairs)keys.push(key);if(!keys.length)return input;this._globalReplaceRegexCache[type]=new RegExp(keys.join("|"),"g")}return input.replace(this._globalReplaceRegexCache[type],(function(key){return replacePairs[key]}))},StringsImpl.prototype.toUpperFirstChar=function(input){return input.charAt(0).toUpperCase()+input.slice(1)},StringsImpl.prototype.toUpper=function(input){var firstPart,secondPart;if(this._language===this.LANG_GREEK?(firstPart=input.charAt(0).toUpperCase(),secondPart=input.slice(1)):(firstPart="",secondPart=input),this._letters[this._language]&&this._letters[this._language].length===this._lettersUpper[this._language].length)for(var i=0;i<=this._letters[this._language].length-1;i++){var re=new RegExp(this._letters[this._language][i],"g");secondPart=secondPart.replace(re,this._lettersUpper[this._language][i])}return firstPart+secondPart.toUpperCase()},StringsImpl.prototype.ltrim=function(input,char){return void 0===char&&(char="\\s"),input.replace(new RegExp("^".concat(char,"+"),"g"),"")},StringsImpl.prototype.rtrim=function(input,char){return void 0===char&&(char="\\s"),input.replace(new RegExp("".concat(char,"+$"),"g"),"")},StringsImpl.prototype.trim=function(input,char){return void 0===char&&(char="\\s"),input.replace(new RegExp("^".concat(char,"+|").concat(char,"+$"),"g"),"")},StringsImpl.prototype.pad=function(input,maxStringLength,fillWithChar,leftSide){void 0===fillWithChar&&(fillWithChar=" "),void 0===leftSide&&(leftSide=!1);var outputString=input,stringDiff=maxStringLength-input.length,fillString="";if(stringDiff<0)outputString=input.substr(0,maxStringLength);else if(stringDiff>0&&fillWithChar.length>0)for(var i=1;i<=stringDiff/fillWithChar.length;i++)fillString+=fillWithChar;return outputString=leftSide?fillString+outputString:outputString+fillString},StringsImpl.prototype.lpad=function(input,maxStringLength,fillWithChar){return void 0===fillWithChar&&(fillWithChar=" "),this.pad(input,maxStringLength,fillWithChar,!0)},StringsImpl.prototype.rpad=function(input,maxStringLength,fillWithChar){return void 0===fillWithChar&&(fillWithChar=" "),this.pad(input,maxStringLength,fillWithChar)},StringsImpl.prototype.fastCompare=function(a,b){return a===b?0:a<b?-1:1},StringsImpl.prototype.compare=function(a,b){return this.isLocaleCompareSupported()?a.localeCompare(b,this._locale):this.fastCompare(a,b)},StringsImpl.prototype.isLocaleCompareSupported=function(){if("boolean"!=typeof this._localeCompareSupported&&(this._localeCompareSupported=!1,this._locale&&"function"==typeof"".localeCompare))try{"".localeCompare("",this._locale),this._localeCompareSupported=!0}catch(e){}return this._localeCompareSupported},StringsImpl.prototype.replaceAccents=function(input){var type=this.hasAccentsForLanguage()?this._language:"default";return this._globalReplace(input,this._accents[type],type)},StringsImpl.prototype.hasAccentsForLanguage=function(){return!(!this._accents||!this._accents[this._language])},StringsImpl}();!function(EventStageList){EventStageList[EventStageList.UNKNOWN=0]="UNKNOWN",EventStageList[EventStageList.SCHEDULED=1]="SCHEDULED",EventStageList[EventStageList.LIVE=2]="LIVE",EventStageList[EventStageList.FINISHED=3]="FINISHED",EventStageList[EventStageList.POSTPONED=4]="POSTPONED",EventStageList[EventStageList.CANCELED=5]="CANCELED",EventStageList[EventStageList.EXTRA_TIME=6]="EXTRA_TIME",EventStageList[EventStageList.PENALTIES=7]="PENALTIES",EventStageList[EventStageList.RETIRED=8]="RETIRED",EventStageList[EventStageList.WALKOVER=9]="WALKOVER",EventStageList[EventStageList.AFTER_EXTRA_TIME=10]="AFTER_EXTRA_TIME",EventStageList[EventStageList.AFTER_PENALTIES=11]="AFTER_PENALTIES",EventStageList[EventStageList.FIRST_HALF=12]="FIRST_HALF",EventStageList[EventStageList.SECOND_HALF=13]="SECOND_HALF",EventStageList[EventStageList.FIRST_PERIOD=14]="FIRST_PERIOD",EventStageList[EventStageList.SECOND_PERIOD=15]="SECOND_PERIOD",EventStageList[EventStageList.THIRD_PERIOD=16]="THIRD_PERIOD",EventStageList[EventStageList.FIRST_SET=17]="FIRST_SET",EventStageList[EventStageList.SECOND_SET=18]="SECOND_SET",EventStageList[EventStageList.THIRD_SET=19]="THIRD_SET",EventStageList[EventStageList.FOURTH_SET=20]="FOURTH_SET",EventStageList[EventStageList.FIFTH_SET=21]="FIFTH_SET",EventStageList[EventStageList.FIRST_QUARTER=22]="FIRST_QUARTER",EventStageList[EventStageList.SECOND_QUARTER=23]="SECOND_QUARTER",EventStageList[EventStageList.THIRD_QUARTER=24]="THIRD_QUARTER",EventStageList[EventStageList.FOURTH_QUARTER=25]="FOURTH_QUARTER",EventStageList[EventStageList.FIRST_INNING=26]="FIRST_INNING",EventStageList[EventStageList.SECOND_INNING=27]="SECOND_INNING",EventStageList[EventStageList.THIRD_INNING=28]="THIRD_INNING",EventStageList[EventStageList.FOURTH_INNING=29]="FOURTH_INNING",EventStageList[EventStageList.FIFTH_INNING=30]="FIFTH_INNING",EventStageList[EventStageList.SIXTH_INNING=31]="SIXTH_INNING",EventStageList[EventStageList.SEVENTH_INNING=32]="SEVENTH_INNING",EventStageList[EventStageList.EIGHTH_INNING=33]="EIGHTH_INNING",EventStageList[EventStageList.NINTH_INNING=34]="NINTH_INNING",EventStageList[EventStageList.EXTRA_INNING=35]="EXTRA_INNING",EventStageList[EventStageList.INTERRUPTED=36]="INTERRUPTED",EventStageList[EventStageList.ABANDONED=37]="ABANDONED",EventStageList[EventStageList.HALF_TIME=38]="HALF_TIME",EventStageList[EventStageList.TIME_OUT=39]="TIME_OUT",EventStageList[EventStageList.FIRST_EXTRA_TIME=40]="FIRST_EXTRA_TIME",EventStageList[EventStageList.SECOND_EXTRA_TIME=41]="SECOND_EXTRA_TIME",EventStageList[EventStageList.PENDING=42]="PENDING",EventStageList[EventStageList.DELAYED=43]="DELAYED",EventStageList[EventStageList.SUSPENDED=44]="SUSPENDED",EventStageList[EventStageList.TO_FINISH=45]="TO_FINISH",EventStageList[EventStageList.PAUSE=46]="PAUSE",EventStageList[EventStageList.FIRST_SET_TIEBREAK=47]="FIRST_SET_TIEBREAK",EventStageList[EventStageList.SECOND_SET_TIEBREAK=48]="SECOND_SET_TIEBREAK",EventStageList[EventStageList.THIRD_SET_TIEBREAK=49]="THIRD_SET_TIEBREAK",EventStageList[EventStageList.FOURTH_SET_TIEBREAK=50]="FOURTH_SET_TIEBREAK",EventStageList[EventStageList.FIFTH_SET_TIEBREAK=51]="FIFTH_SET_TIEBREAK",EventStageList[EventStageList.GAME=52]="GAME",EventStageList[EventStageList.SECOND_PLACE=53]="SECOND_PLACE",EventStageList[EventStageList.AWARDED=54]="AWARDED",EventStageList[EventStageList.SIXTH_SET=55]="SIXTH_SET",EventStageList[EventStageList.SEVENTH_SET=56]="SEVENTH_SET",EventStageList[EventStageList.AFTER_DAY1=57]="AFTER_DAY1",EventStageList[EventStageList.AFTER_DAY2=58]="AFTER_DAY2",EventStageList[EventStageList.AFTER_DAY3=59]="AFTER_DAY3",EventStageList[EventStageList.AFTER_DAY4=60]="AFTER_DAY4",EventStageList[EventStageList.AFTER_DAY5=61]="AFTER_DAY5",EventStageList[EventStageList.AFTER_DAY6=257]="AFTER_DAY6",EventStageList[EventStageList.AFTER_DAY7=258]="AFTER_DAY7",EventStageList[EventStageList.AFTER_DAY8=259]="AFTER_DAY8",EventStageList[EventStageList.AFTER_DAY9=260]="AFTER_DAY9",EventStageList[EventStageList.AFTER_DAY10=261]="AFTER_DAY10",EventStageList[EventStageList.AFTER_ROUND1=62]="AFTER_ROUND1",EventStageList[EventStageList.AFTER_ROUND2=63]="AFTER_ROUND2",EventStageList[EventStageList.AFTER_ROUND3=64]="AFTER_ROUND3",EventStageList[EventStageList.FIRST_ROUND=65]="FIRST_ROUND",EventStageList[EventStageList.SECOND_ROUND=66]="SECOND_ROUND",EventStageList[EventStageList.THIRD_ROUND=67]="THIRD_ROUND",EventStageList[EventStageList.FOURTH_ROUND=68]="FOURTH_ROUND",EventStageList[EventStageList.AFTER_EXTRA_INNING=69]="AFTER_EXTRA_INNING",EventStageList[EventStageList.PRACTICE=70]="PRACTICE",EventStageList[EventStageList.QUALIFICATION=71]="QUALIFICATION",EventStageList[EventStageList.WARM_UP=72]="WARM_UP",EventStageList[EventStageList.WARM_UP_2=234]="WARM_UP_2",EventStageList[EventStageList.WARM_UP_1=235]="WARM_UP_1",EventStageList[EventStageList.RACE=73]="RACE",EventStageList[EventStageList.MAIN=74]="MAIN",EventStageList[EventStageList.PLAY_OFFS=75]="PLAY_OFFS",EventStageList[EventStageList.PRACTICE_1=76]="PRACTICE_1",EventStageList[EventStageList.PRACTICE_2=77]="PRACTICE_2",EventStageList[EventStageList.PRACTICE_3=78]="PRACTICE_3",EventStageList[EventStageList.PRACTICE_4=79]="PRACTICE_4",EventStageList[EventStageList.PRACTICE_5=80]="PRACTICE_5",EventStageList[EventStageList.PRACTICE_6=81]="PRACTICE_6",EventStageList[EventStageList.PRACTICE_7=82]="PRACTICE_7",EventStageList[EventStageList.PRACTICE_8=229]="PRACTICE_8",EventStageList[EventStageList.PRACTICE_9=236]="PRACTICE_9",EventStageList[EventStageList.QUALIFICATION_FIRST_STAGE=83]="QUALIFICATION_FIRST_STAGE",EventStageList[EventStageList.QUALIFICATION_SECOND_STAGE=84]="QUALIFICATION_SECOND_STAGE",EventStageList[EventStageList.QUALIFICATION_THIRD_STAGE=85]="QUALIFICATION_THIRD_STAGE",EventStageList[EventStageList.QUALIFICATION_1=86]="QUALIFICATION_1",EventStageList[EventStageList.QUALIFICATION_2=87]="QUALIFICATION_2",EventStageList[EventStageList.QUALIFICATION_3=88]="QUALIFICATION_3",EventStageList[EventStageList.QUALIFICATION_4=243]="QUALIFICATION_4",EventStageList[EventStageList.QUALIFICATION_5=244]="QUALIFICATION_5",EventStageList[EventStageList.RACE_1=89]="RACE_1",EventStageList[EventStageList.RACE_2=90]="RACE_2",EventStageList[EventStageList.RACE_3=207]="RACE_3",EventStageList[EventStageList.RACE_4=208]="RACE_4",EventStageList[EventStageList.RACE_5=209]="RACE_5",EventStageList[EventStageList.RACE_6=210]="RACE_6",EventStageList[EventStageList.RACE_7=211]="RACE_7",EventStageList[EventStageList.RACE_8=212]="RACE_8",EventStageList[EventStageList.RACE_9=213]="RACE_9",EventStageList[EventStageList.RACE_10=214]="RACE_10",EventStageList[EventStageList.RACE_11=215]="RACE_11",EventStageList[EventStageList.RACE_12=216]="RACE_12",EventStageList[EventStageList.RACE_13=217]="RACE_13",EventStageList[EventStageList.RACE_14=218]="RACE_14",EventStageList[EventStageList.RACE_15=219]="RACE_15",EventStageList[EventStageList.RACE_16=237]="RACE_16",EventStageList[EventStageList.RACE_17=238]="RACE_17",EventStageList[EventStageList.RACE_18=239]="RACE_18",EventStageList[EventStageList.TESTING=91]="TESTING",EventStageList[EventStageList.SPECIAL_STAGE_1=92]="SPECIAL_STAGE_1",EventStageList[EventStageList.SPECIAL_STAGE_2=93]="SPECIAL_STAGE_2",EventStageList[EventStageList.SPECIAL_STAGE_3=94]="SPECIAL_STAGE_3",EventStageList[EventStageList.SPECIAL_STAGE_4=95]="SPECIAL_STAGE_4",EventStageList[EventStageList.SPECIAL_STAGE_5=96]="SPECIAL_STAGE_5",EventStageList[EventStageList.SPECIAL_STAGE_6=97]="SPECIAL_STAGE_6",EventStageList[EventStageList.SPECIAL_STAGE_7=99]="SPECIAL_STAGE_7",EventStageList[EventStageList.SPECIAL_STAGE_8=100]="SPECIAL_STAGE_8",EventStageList[EventStageList.SPECIAL_STAGE_9=101]="SPECIAL_STAGE_9",EventStageList[EventStageList.SPECIAL_STAGE_10=102]="SPECIAL_STAGE_10",EventStageList[EventStageList.SPECIAL_STAGE_11=103]="SPECIAL_STAGE_11",EventStageList[EventStageList.SPECIAL_STAGE_12=104]="SPECIAL_STAGE_12",EventStageList[EventStageList.SPECIAL_STAGE_13=105]="SPECIAL_STAGE_13",EventStageList[EventStageList.SPECIAL_STAGE_14=106]="SPECIAL_STAGE_14",EventStageList[EventStageList.SPECIAL_STAGE_15=107]="SPECIAL_STAGE_15",EventStageList[EventStageList.SPECIAL_STAGE_16=108]="SPECIAL_STAGE_16",EventStageList[EventStageList.SPECIAL_STAGE_17=109]="SPECIAL_STAGE_17",EventStageList[EventStageList.SPECIAL_STAGE_18=110]="SPECIAL_STAGE_18",EventStageList[EventStageList.SPECIAL_STAGE_19=111]="SPECIAL_STAGE_19",EventStageList[EventStageList.SPECIAL_STAGE_20=112]="SPECIAL_STAGE_20",EventStageList[EventStageList.SPECIAL_STAGE_21=113]="SPECIAL_STAGE_21",EventStageList[EventStageList.SPECIAL_STAGE_22=114]="SPECIAL_STAGE_22",EventStageList[EventStageList.SPECIAL_STAGE_23=115]="SPECIAL_STAGE_23",EventStageList[EventStageList.SPECIAL_STAGE_24=116]="SPECIAL_STAGE_24",EventStageList[EventStageList.SPECIAL_STAGE_25=117]="SPECIAL_STAGE_25",EventStageList[EventStageList.SPECIAL_STAGE_26=118]="SPECIAL_STAGE_26",EventStageList[EventStageList.HEAT_1=119]="HEAT_1",EventStageList[EventStageList.HEAT_2=120]="HEAT_2",EventStageList[EventStageList.HEAT_3=121]="HEAT_3",EventStageList[EventStageList.HEAT_4=122]="HEAT_4",EventStageList[EventStageList.HEAT_5=123]="HEAT_5",EventStageList[EventStageList.HEAT_6=124]="HEAT_6",EventStageList[EventStageList.HEAT_7=125]="HEAT_7",EventStageList[EventStageList.HEAT_8=126]="HEAT_8",EventStageList[EventStageList.HEAT_9=127]="HEAT_9",EventStageList[EventStageList.HEAT_10=128]="HEAT_10",EventStageList[EventStageList.HEAT_11=129]="HEAT_11",EventStageList[EventStageList.HEAT_12=130]="HEAT_12",EventStageList[EventStageList.HEAT_13=131]="HEAT_13",EventStageList[EventStageList.HEAT_14=132]="HEAT_14",EventStageList[EventStageList.HEAT_15=133]="HEAT_15",EventStageList[EventStageList.HEAT_16=134]="HEAT_16",EventStageList[EventStageList.HEAT_17=135]="HEAT_17",EventStageList[EventStageList.HEAT_18=136]="HEAT_18",EventStageList[EventStageList.HEAT_19=137]="HEAT_19",EventStageList[EventStageList.HEAT_20=138]="HEAT_20",EventStageList[EventStageList.HEAT_21=139]="HEAT_21",EventStageList[EventStageList.HEAT_22=140]="HEAT_22",EventStageList[EventStageList.HEAT_23=141]="HEAT_23",EventStageList[EventStageList.HEAT_24=142]="HEAT_24",EventStageList[EventStageList.HEAT_25=143]="HEAT_25",EventStageList[EventStageList.TEST_DAY_1=144]="TEST_DAY_1",EventStageList[EventStageList.TEST_DAY_2=145]="TEST_DAY_2",EventStageList[EventStageList.TEST_DAY_3=146]="TEST_DAY_3",EventStageList[EventStageList.TEST_DAY_4=147]="TEST_DAY_4",EventStageList[EventStageList.TEST_DAY_5=148]="TEST_DAY_5",EventStageList[EventStageList.AFTER_STAGE_1=149]="AFTER_STAGE_1",EventStageList[EventStageList.AFTER_STAGE_2=150]="AFTER_STAGE_2",EventStageList[EventStageList.AFTER_STAGE_3=151]="AFTER_STAGE_3",EventStageList[EventStageList.AFTER_STAGE_4=152]="AFTER_STAGE_4",EventStageList[EventStageList.AFTER_STAGE_5=153]="AFTER_STAGE_5",EventStageList[EventStageList.AFTER_STAGE_6=154]="AFTER_STAGE_6",EventStageList[EventStageList.AFTER_STAGE_7=155]="AFTER_STAGE_7",EventStageList[EventStageList.AFTER_STAGE_8=156]="AFTER_STAGE_8",EventStageList[EventStageList.AFTER_STAGE_9=157]="AFTER_STAGE_9",EventStageList[EventStageList.AFTER_STAGE_10=158]="AFTER_STAGE_10",EventStageList[EventStageList.AFTER_STAGE_11=159]="AFTER_STAGE_11",EventStageList[EventStageList.AFTER_STAGE_12=160]="AFTER_STAGE_12",EventStageList[EventStageList.AFTER_STAGE_13=161]="AFTER_STAGE_13",EventStageList[EventStageList.AFTER_STAGE_14=162]="AFTER_STAGE_14",EventStageList[EventStageList.AFTER_STAGE_15=163]="AFTER_STAGE_15",EventStageList[EventStageList.AFTER_STAGE_16=164]="AFTER_STAGE_16",EventStageList[EventStageList.AFTER_STAGE_17=165]="AFTER_STAGE_17",EventStageList[EventStageList.AFTER_STAGE_18=166]="AFTER_STAGE_18",EventStageList[EventStageList.AFTER_STAGE_19=167]="AFTER_STAGE_19",EventStageList[EventStageList.AFTER_STAGE_20=168]="AFTER_STAGE_20",EventStageList[EventStageList.AFTER_STAGE_21=169]="AFTER_STAGE_21",EventStageList[EventStageList.AFTER_STAGE_22=170]="AFTER_STAGE_22",EventStageList[EventStageList.AFTER_STAGE_23=171]="AFTER_STAGE_23",EventStageList[EventStageList.AFTER_STAGE_24=172]="AFTER_STAGE_24",EventStageList[EventStageList.AFTER_STAGE_25=173]="AFTER_STAGE_25",EventStageList[EventStageList.AFTER_STAGE_26=174]="AFTER_STAGE_26",EventStageList[EventStageList.AFTER_STAGE_27=175]="AFTER_STAGE_27",EventStageList[EventStageList.AFTER_STAGE_28=176]="AFTER_STAGE_28",EventStageList[EventStageList.AFTER_STAGE_29=177]="AFTER_STAGE_29",EventStageList[EventStageList.AFTER_STAGE_30=178]="AFTER_STAGE_30",EventStageList[EventStageList.STAGE_1=179]="STAGE_1",EventStageList[EventStageList.STAGE_2=180]="STAGE_2",EventStageList[EventStageList.STAGE_3=181]="STAGE_3",EventStageList[EventStageList.STAGE_4=182]="STAGE_4",EventStageList[EventStageList.STAGE_5=183]="STAGE_5",EventStageList[EventStageList.STAGE_6=184]="STAGE_6",EventStageList[EventStageList.STAGE_7=185]="STAGE_7",EventStageList[EventStageList.STAGE_8=186]="STAGE_8",EventStageList[EventStageList.STAGE_9=187]="STAGE_9",EventStageList[EventStageList.STAGE_10=188]="STAGE_10",EventStageList[EventStageList.STAGE_11=189]="STAGE_11",EventStageList[EventStageList.STAGE_12=190]="STAGE_12",EventStageList[EventStageList.STAGE_13=191]="STAGE_13",EventStageList[EventStageList.STAGE_14=192]="STAGE_14",EventStageList[EventStageList.STAGE_15=193]="STAGE_15",EventStageList[EventStageList.STAGE_16=194]="STAGE_16",EventStageList[EventStageList.STAGE_17=195]="STAGE_17",EventStageList[EventStageList.STAGE_18=196]="STAGE_18",EventStageList[EventStageList.STAGE_19=197]="STAGE_19",EventStageList[EventStageList.STAGE_20=198]="STAGE_20",EventStageList[EventStageList.STAGE_21=199]="STAGE_21",EventStageList[EventStageList.STAGE_22=200]="STAGE_22",EventStageList[EventStageList.STAGE_23=201]="STAGE_23",EventStageList[EventStageList.STAGE_24=202]="STAGE_24",EventStageList[EventStageList.STAGE_25=203]="STAGE_25",EventStageList[EventStageList.SEMIFINAL=251]="SEMIFINAL",EventStageList[EventStageList.SEMIFINAL_1=204]="SEMIFINAL_1",EventStageList[EventStageList.SEMIFINAL_2=205]="SEMIFINAL_2",EventStageList[EventStageList.SEMIFINAL_3=253]="SEMIFINAL_3",EventStageList[EventStageList.FINAL_ROUND=206]="FINAL_ROUND",EventStageList[EventStageList.FIFTH_ROUND=220]="FIFTH_ROUND",EventStageList[EventStageList.SIXTH_ROUND=221]="SIXTH_ROUND",EventStageList[EventStageList.SEVENTH_ROUND=222]="SEVENTH_ROUND",EventStageList[EventStageList.EIGHTH_ROUND=223]="EIGHTH_ROUND",EventStageList[EventStageList.NINTH_ROUND=224]="NINTH_ROUND",EventStageList[EventStageList.TENTH_ROUND=225]="TENTH_ROUND",EventStageList[EventStageList.ELEVENTH_ROUND=226]="ELEVENTH_ROUND",EventStageList[EventStageList.TWELFTH_ROUND=227]="TWELFTH_ROUND",EventStageList[EventStageList.AFTER_RACE_1=262]="AFTER_RACE_1",EventStageList[EventStageList.AFTER_RACE_2=263]="AFTER_RACE_2",EventStageList[EventStageList.AFTER_RACE_3=264]="AFTER_RACE_3",EventStageList[EventStageList.AFTER_RACE_4=265]="AFTER_RACE_4",EventStageList[EventStageList.CURRENT=228]="CURRENT",EventStageList[EventStageList.QUALIFICATION_1_FIRST_STAGE=230]="QUALIFICATION_1_FIRST_STAGE",EventStageList[EventStageList.QUALIFICATION_2_FIRST_STAGE=231]="QUALIFICATION_2_FIRST_STAGE",EventStageList[EventStageList.QUALIFICATION_1_SECOND_STAGE=232]="QUALIFICATION_1_SECOND_STAGE",EventStageList[EventStageList.QUALIFICATION_2_SECOND_STAGE=233]="QUALIFICATION_2_SECOND_STAGE",EventStageList[EventStageList.FULL_TIME=242]="FULL_TIME",EventStageList[EventStageList.QUARTER_FINAL_1=245]="QUARTER_FINAL_1",EventStageList[EventStageList.QUARTER_FINAL_2=246]="QUARTER_FINAL_2",EventStageList[EventStageList.QUARTER_FINAL_3=247]="QUARTER_FINAL_3",EventStageList[EventStageList.QUARTER_FINAL_4=248]="QUARTER_FINAL_4",EventStageList[EventStageList.QUARTER_FINAL_5=249]="QUARTER_FINAL_5",EventStageList[EventStageList.QUARTER_FINAL_6=250]="QUARTER_FINAL_6",EventStageList[EventStageList.QUARTER_FINAL=252]="QUARTER_FINAL",EventStageList[EventStageList.FINAL_B=254]="FINAL_B",EventStageList[EventStageList.SPECIAL_STAGE_1_B=256]="SPECIAL_STAGE_1_B",EventStageList[EventStageList.AFTER_QUALIFICATION=255]="AFTER_QUALIFICATION",EventStageList[EventStageList.AFTER_QUALIFICATION_1=266]="AFTER_QUALIFICATION_1",EventStageList[EventStageList.AFTER_QUALIFICATION_2=267]="AFTER_QUALIFICATION_2",EventStageList[EventStageList.AFTER_QUALIFICATION_3=268]="AFTER_QUALIFICATION_3",EventStageList[EventStageList.AFTER_QUALIFICATION_4=269]="AFTER_QUALIFICATION_4",EventStageList[EventStageList.AFTER_QUALIFICATION_5=270]="AFTER_QUALIFICATION_5",EventStageList[EventStageList.AFTER_QUALIFICATION_FIRST_STAGE=271]="AFTER_QUALIFICATION_FIRST_STAGE",EventStageList[EventStageList.AFTER_QUALIFICATION_SECOND_STAGE=272]="AFTER_QUALIFICATION_SECOND_STAGE",EventStageList[EventStageList.AFTER_QUALIFICATION_THIRD_STAGE=273]="AFTER_QUALIFICATION_THIRD_STAGE",EventStageList[EventStageList.AFTER_QUALIFICATION_1_FIRST_STAGE=274]="AFTER_QUALIFICATION_1_FIRST_STAGE",EventStageList[EventStageList.AFTER_QUALIFICATION_1_SECOND_STAGE=275]="AFTER_QUALIFICATION_1_SECOND_STAGE",EventStageList[EventStageList.AFTER_QUALIFICATION_2_FIRST_STAGE=276]="AFTER_QUALIFICATION_2_FIRST_STAGE",EventStageList[EventStageList.AFTER_QUALIFICATION_2_SECOND_STAGE=277]="AFTER_QUALIFICATION_2_SECOND_STAGE",EventStageList[EventStageList.AFTER_PRACTICE_1=278]="AFTER_PRACTICE_1",EventStageList[EventStageList.AFTER_PRACTICE_2=279]="AFTER_PRACTICE_2",EventStageList[EventStageList.AFTER_PRACTICE_3=280]="AFTER_PRACTICE_3",EventStageList[EventStageList.AFTER_PRACTICE_4=281]="AFTER_PRACTICE_4",EventStageList[EventStageList.AFTER_PRACTICE_5=282]="AFTER_PRACTICE_5",EventStageList[EventStageList.AFTER_PRACTICE_6=283]="AFTER_PRACTICE_6",EventStageList[EventStageList.AFTER_PRACTICE_7=284]="AFTER_PRACTICE_7",EventStageList[EventStageList.AFTER_PRACTICE_8=285]="AFTER_PRACTICE_8",EventStageList[EventStageList.AFTER_PRACTICE_9=286]="AFTER_PRACTICE_9",EventStageList[EventStageList.AFTER_SPECIAL_STAGE_1=287]="AFTER_SPECIAL_STAGE_1",EventStageList[EventStageList.AFTER_SPECIAL_STAGE_2=288]="AFTER_SPECIAL_STAGE_2",EventStageList[EventStageList.AFTER_SPECIAL_STAGE_3=289]="AFTER_SPECIAL_STAGE_3",EventStageList[EventStageList.AFTER_SPECIAL_STAGE_4=290]="AFTER_SPECIAL_STAGE_4",EventStageList[EventStageList.AFTER_SPECIAL_STAGE_5=291]="AFTER_SPECIAL_STAGE_5",EventStageList[EventStageList.AFTER_SPECIAL_STAGE_6=292]="AFTER_SPECIAL_STAGE_6",EventStageList[EventStageList.AFTER_SPECIAL_STAGE_7=293]="AFTER_SPECIAL_STAGE_7",EventStageList[EventStageList.AFTER_SPECIAL_STAGE_8=294]="AFTER_SPECIAL_STAGE_8",EventStageList[EventStageList.AFTER_SPECIAL_STAGE_9=295]="AFTER_SPECIAL_STAGE_9",EventStageList[EventStageList.AFTER_SPECIAL_STAGE_10=296]="AFTER_SPECIAL_STAGE_10",EventStageList[EventStageList.AFTER_SPECIAL_STAGE_11=297]="AFTER_SPECIAL_STAGE_11",EventStageList[EventStageList.AFTER_SPECIAL_STAGE_12=298]="AFTER_SPECIAL_STAGE_12",EventStageList[EventStageList.AFTER_SPECIAL_STAGE_13=299]="AFTER_SPECIAL_STAGE_13",EventStageList[EventStageList.AFTER_SPECIAL_STAGE_14=300]="AFTER_SPECIAL_STAGE_14",EventStageList[EventStageList.AFTER_SPECIAL_STAGE_15=301]="AFTER_SPECIAL_STAGE_15",EventStageList[EventStageList.AFTER_SPECIAL_STAGE_16=302]="AFTER_SPECIAL_STAGE_16",EventStageList[EventStageList.AFTER_SPECIAL_STAGE_17=303]="AFTER_SPECIAL_STAGE_17",EventStageList[EventStageList.AFTER_SPECIAL_STAGE_18=304]="AFTER_SPECIAL_STAGE_18",EventStageList[EventStageList.AFTER_SPECIAL_STAGE_19=305]="AFTER_SPECIAL_STAGE_19",EventStageList[EventStageList.AFTER_SPECIAL_STAGE_20=306]="AFTER_SPECIAL_STAGE_20",EventStageList[EventStageList.AFTER_SPECIAL_STAGE_21=307]="AFTER_SPECIAL_STAGE_21",EventStageList[EventStageList.AFTER_SPECIAL_STAGE_22=308]="AFTER_SPECIAL_STAGE_22",EventStageList[EventStageList.AFTER_SPECIAL_STAGE_23=309]="AFTER_SPECIAL_STAGE_23",EventStageList[EventStageList.AFTER_SPECIAL_STAGE_24=310]="AFTER_SPECIAL_STAGE_24",EventStageList[EventStageList.AFTER_SPECIAL_STAGE_25=311]="AFTER_SPECIAL_STAGE_25",EventStageList[EventStageList.AFTER_SPECIAL_STAGE_26=312]="AFTER_SPECIAL_STAGE_26",EventStageList[EventStageList.AFTER_SPECIAL_STAGE_1_B=313]="AFTER_SPECIAL_STAGE_1_B",EventStageList[EventStageList.AFTER_WARM_UP=314]="AFTER_WARM_UP",EventStageList[EventStageList.AFTER_WARM_UP_1=315]="AFTER_WARM_UP_1",EventStageList[EventStageList.AFTER_WARM_UP_2=316]="AFTER_WARM_UP_2",EventStageList[EventStageList.AFTER_HEAT_1=317]="AFTER_HEAT_1",EventStageList[EventStageList.AFTER_HEAT_2=318]="AFTER_HEAT_2",EventStageList[EventStageList.AFTER_HEAT_3=319]="AFTER_HEAT_3",EventStageList[EventStageList.AFTER_HEAT_4=320]="AFTER_HEAT_4",EventStageList[EventStageList.AFTER_HEAT_5=321]="AFTER_HEAT_5",EventStageList[EventStageList.EIGHTH_SET=324]="EIGHTH_SET",EventStageList[EventStageList.NINTH_SET=325]="NINTH_SET",EventStageList[EventStageList.TENTH_SET=326]="TENTH_SET",EventStageList[EventStageList.ELEVENTH_SET=327]="ELEVENTH_SET",EventStageList[EventStageList.TWELFTH_SET=328]="TWELFTH_SET",EventStageList[EventStageList.THIRTEENTH_SET=329]="THIRTEENTH_SET",EventStageList[EventStageList.LUNCH=333]="LUNCH",EventStageList[EventStageList.TEA=334]="TEA",EventStageList[EventStageList.MEDICAL_TIMEOUT=335]="MEDICAL_TIMEOUT",EventStageList[EventStageList.FIRST_AND_SECOND_HALF=9999]="FIRST_AND_SECOND_HALF",EventStageList[EventStageList.OVERALL=74]="OVERALL"}(EventStageList_EventStageList||(EventStageList_EventStageList={}));EventStageList_EventStageList.SCHEDULED,EventStageList_EventStageList.POSTPONED,EventStageList_EventStageList.CANCELED,EventStageList_EventStageList.RETIRED,EventStageList_EventStageList.WALKOVER,EventStageList_EventStageList.INTERRUPTED,EventStageList_EventStageList.ABANDONED,EventStageList_EventStageList.AFTER_DAY1,EventStageList_EventStageList.AFTER_DAY2,EventStageList_EventStageList.AFTER_DAY3,EventStageList_EventStageList.AFTER_DAY4,EventStageList_EventStageList.AFTER_DAY5,EventStageList_EventStageList.AFTER_DAY6,EventStageList_EventStageList.AFTER_DAY7,EventStageList_EventStageList.AFTER_DAY8,EventStageList_EventStageList.AFTER_DAY9,EventStageList_EventStageList.AFTER_DAY10;var EventIncidentTypeList,Darts=function(){function Darts(utilTrans){this.utilTrans=utilTrans}return Darts.prototype.getStatus=function(status,eventStageTypeId,homeScore,awayScore,isPlayingOnSets){if(!isPlayingOnSets&&eventStageTypeId==EventStageList_EventStageList.LIVE){var firstSetTrans=this.utilTrans.translate("TRANS_DARTS_DEFAULT_MATCH_STATUS_SET1"),liveTrans=this.utilTrans.translate("TRANS_DEFAULT_MATCH_STATUS_LIVE"),firstSetTransShort=this.utilTrans.translate("TRANS_DARTS_DEFAULT_MATCH_STATUS_IFRAME_SET1"),firstSetTransShortMobile=this.utilTrans.translate("TRANS_DARTS_DEFAULT_MATCH_STATUS_IFRAME_SHORT_SET1"),liveTransShort=this.utilTrans.translate("TRANS_DEFAULT_MATCH_STATUS_IFRAME_LIVE"),legNumber=""+(Number(homeScore)+Number(awayScore)+1),legNumberTrans=this.utilTrans.translate("TRANS_DARTS_LEG_NUMBER").replace("%s",legNumber),transToReplace="";status.indexOf(firstSetTrans)>-1?transToReplace=firstSetTrans:status.indexOf(firstSetTransShort)>-1?transToReplace=firstSetTransShort:status.indexOf(firstSetTransShortMobile)>-1?transToReplace=firstSetTransShortMobile:status.indexOf(liveTrans)>-1?transToReplace=liveTrans:status.indexOf(liveTransShort)>-1&&(transToReplace=liveTransShort),transToReplace&&(status=status.replace(transToReplace,legNumberTrans))}return status},Darts.prototype.getCurrentScore=function(isPlayingOnSets,homeLegs,awayLegs,homePoints,awayPoints){var text="";return isPlayingOnSets?(void 0!==homeLegs&&""!==homeLegs&&void 0!==awayLegs&&""!==awayLegs&&(text+="<br />"+homeLegs+" : "+awayLegs),void 0!==homePoints&&""!==homePoints&&void 0!==awayPoints&&""!==awayPoints&&(text+=" ( "+homePoints+" : "+awayPoints+" )")):void 0!==homePoints&&""!==homePoints&&void 0!==awayPoints&&""!==awayPoints&&(text+="<br />"+homePoints+" : "+awayPoints),text},Darts.prototype.getBestOf=function(isPlayingOnSets,bestOfFrames,iframe){var text="";return bestOfFrames&&(text=(isPlayingOnSets?iframe?this.utilTrans.translate("TRANS_DARTS_BEST_OF_SETS_IFRAME"):this.utilTrans.translate("TRANS_DARTS_BEST_OF_SETS"):iframe?this.utilTrans.translate("TRANS_DARTS_BEST_OF_LEGS_IFRAME"):this.utilTrans.translate("TRANS_DARTS_BEST_OF_LEGS")).replace("%s",bestOfFrames)),text},Darts}(),StatsResultsParser=function(){function StatsResultsParser(){this._statsResults={},this._statsResultsIsForDuel=!1,this._statsResultsTypeId=null,this._homeEncodedEventParticipantId=null,this._awayEncodedEventParticipantId=null,this._rowEncodedEventParticipantId=null,this._statsResultsIndexGenerator=window.cjs.Api.statsResultsIndexGenerator}return StatsResultsParser.prototype._setStatsResultsIsForDuel=function(index,value){return"RAC"==index?(this._statsResultsIsForDuel=!0,this._rowEncodedEventParticipantId=value):"RAD"==index&&(this._statsResultsIsForDuel=!1),this._statsResultsIsForDuel},StatsResultsParser.prototype._setStatsResult=function(index,value){if("RAB"==index){if(null!==this._statsResultsTypeId)if(this._statsResultsIsForDuel){if(this._homeEncodedEventParticipantId||this._awayEncodedEventParticipantId){var statsResultsKey,isHomeParticipant=this._isHomeParticipant(this._rowEncodedEventParticipantId);(statsResultsKey=this._statsResultsIndexGenerator.get(this._statsResultsTypeId,isHomeParticipant))&&(this._statsResults[statsResultsKey]=value)}}else(statsResultsKey=this._statsResultsIndexGenerator.get(this._statsResultsTypeId,!0))&&(this._statsResults[statsResultsKey]=value);this._statsResultsTypeId=null}return this},StatsResultsParser.prototype._isHomeParticipant=function(encodedEventParticipantId){return null!==encodedEventParticipantId&&this._homeEncodedEventParticipantId==encodedEventParticipantId},StatsResultsParser.prototype._setStatsResultsTypeId=function(index,value){return"RAA"==index&&(this._statsResultsTypeId=value),this},StatsResultsParser.prototype.setHomeAndAwayParticipantIdsFromEventItem=function(eventItem){var homeEncodedEventParticipantId=eventItem.getValue("JA"),awayEncodedEventParticipantId=eventItem.getValue("JB");return homeEncodedEventParticipantId&&(this._homeEncodedEventParticipantId=homeEncodedEventParticipantId),awayEncodedEventParticipantId&&(this._awayEncodedEventParticipantId=awayEncodedEventParticipantId),this},StatsResultsParser.prototype.isStatsResultsIndex=function(index){return["RAC","RAA","RAB","RAD"].indexOf(index)>-1},StatsResultsParser.prototype.processKeyAndValue=function(key,value){return this._setStatsResultsIsForDuel(key,value),this._setStatsResultsTypeId(key,value),this._setStatsResult(key,value),this},StatsResultsParser.prototype.getStatsResults=function(){return this._statsResults},StatsResultsParser}();!function(EventIncidentTypeList){EventIncidentTypeList[EventIncidentTypeList.UNKNOWN=0]="UNKNOWN",EventIncidentTypeList[EventIncidentTypeList.YELLOW_CARD=1]="YELLOW_CARD",EventIncidentTypeList[EventIncidentTypeList.RED_CARD=2]="RED_CARD",EventIncidentTypeList[EventIncidentTypeList.GOAL=3]="GOAL",EventIncidentTypeList[EventIncidentTypeList.OWN_GOAL=4]="OWN_GOAL",EventIncidentTypeList[EventIncidentTypeList.PENALTY_KICK=5]="PENALTY_KICK",EventIncidentTypeList[EventIncidentTypeList.SUBSTITUTION_OUT=6]="SUBSTITUTION_OUT",EventIncidentTypeList[EventIncidentTypeList.SUBSTITUTION_IN=7]="SUBSTITUTION_IN",EventIncidentTypeList[EventIncidentTypeList.ASSISTANCE=8]="ASSISTANCE",EventIncidentTypeList[EventIncidentTypeList.SUSPENSION=9]="SUSPENSION",EventIncidentTypeList[EventIncidentTypeList.PENALTY_SCORED=10]="PENALTY_SCORED",EventIncidentTypeList[EventIncidentTypeList.PENALTY_MISSED=11]="PENALTY_MISSED",EventIncidentTypeList[EventIncidentTypeList.BALL_POSSESSION=12]="BALL_POSSESSION",EventIncidentTypeList[EventIncidentTypeList.SHOTS_ON_GOAL=13]="SHOTS_ON_GOAL",EventIncidentTypeList[EventIncidentTypeList.SHOTS_OFF_GOAL=14]="SHOTS_OFF_GOAL",EventIncidentTypeList[EventIncidentTypeList.FREE_KICKS=15]="FREE_KICKS",EventIncidentTypeList[EventIncidentTypeList.CORNER_KICKS=16]="CORNER_KICKS",EventIncidentTypeList[EventIncidentTypeList.OFFSIDES=17]="OFFSIDES",EventIncidentTypeList[EventIncidentTypeList.THROW_IN=18]="THROW_IN",EventIncidentTypeList[EventIncidentTypeList.GOALKEEPER_SAVES=19]="GOALKEEPER_SAVES",EventIncidentTypeList[EventIncidentTypeList.GOAL_KICKS=20]="GOAL_KICKS",EventIncidentTypeList[EventIncidentTypeList.FOULS=21]="FOULS",EventIncidentTypeList[EventIncidentTypeList.RED_CARDS=22]="RED_CARDS",EventIncidentTypeList[EventIncidentTypeList.YELLOW_CARDS=23]="YELLOW_CARDS",EventIncidentTypeList[EventIncidentTypeList.SERVICE=24]="SERVICE",EventIncidentTypeList[EventIncidentTypeList.HITS=25]="HITS",EventIncidentTypeList[EventIncidentTypeList.ERRORS=26]="ERRORS",EventIncidentTypeList[EventIncidentTypeList.TOUCH_DOWN=27]="TOUCH_DOWN",EventIncidentTypeList[EventIncidentTypeList.EXTRA_POINT=28]="EXTRA_POINT",EventIncidentTypeList[EventIncidentTypeList.TWO_POINT_CONVERSION=29]="TWO_POINT_CONVERSION",EventIncidentTypeList[EventIncidentTypeList.FIELD_GOAL=30]="FIELD_GOAL",EventIncidentTypeList[EventIncidentTypeList.SAFETY=31]="SAFETY",EventIncidentTypeList[EventIncidentTypeList.FOUR_P_FIELD_GOAL=32]="FOUR_P_FIELD_GOAL",EventIncidentTypeList[EventIncidentTypeList.ROUGE=33]="ROUGE",EventIncidentTypeList[EventIncidentTypeList.GOAL_ATTEMPTS=34]="GOAL_ATTEMPTS",EventIncidentTypeList[EventIncidentTypeList.OUTS=35]="OUTS",EventIncidentTypeList[EventIncidentTypeList.OVERS=36]="OVERS",EventIncidentTypeList[EventIncidentTypeList.ACES=37]="ACES",EventIncidentTypeList[EventIncidentTypeList.DOUBLE_FAULTS=38]="DOUBLE_FAULTS",EventIncidentTypeList[EventIncidentTypeList.BREAKS=39]="BREAKS",EventIncidentTypeList[EventIncidentTypeList.BREAK_POINTS_WON=40]="BREAK_POINTS_WON",EventIncidentTypeList[EventIncidentTypeList.MAX_POINTS_IN_ROW=41]="MAX_POINTS_IN_ROW",EventIncidentTypeList[EventIncidentTypeList.MAX_GAMES_IN_ROWS=42]="MAX_GAMES_IN_ROWS",EventIncidentTypeList[EventIncidentTypeList.SERVICE_POINTS_WON=43]="SERVICE_POINTS_WON",EventIncidentTypeList[EventIncidentTypeList.SERVICE_POINTS_LOST=44]="SERVICE_POINTS_LOST",EventIncidentTypeList[EventIncidentTypeList.SERVICE_GAMES_WON=45]="SERVICE_GAMES_WON",EventIncidentTypeList[EventIncidentTypeList.SERVICE_GAMES_LOST=46]="SERVICE_GAMES_LOST",EventIncidentTypeList[EventIncidentTypeList.NOT_ON_PITCH=47]="NOT_ON_PITCH",EventIncidentTypeList[EventIncidentTypeList.ASSISTANCE_SECOND=48]="ASSISTANCE_SECOND",EventIncidentTypeList[EventIncidentTypeList.SHOOTING=49]="SHOOTING",EventIncidentTypeList[EventIncidentTypeList.PENALTIES=50]="PENALTIES",EventIncidentTypeList[EventIncidentTypeList.POWERPLAY_GOALS=51]="POWERPLAY_GOALS",EventIncidentTypeList[EventIncidentTypeList.SHORTHANDED_GOALS=52]="SHORTHANDED_GOALS",EventIncidentTypeList[EventIncidentTypeList.POWERPLAY=53]="POWERPLAY",EventIncidentTypeList[EventIncidentTypeList.PENALTY_KILLING=54]="PENALTY_KILLING",EventIncidentTypeList[EventIncidentTypeList.FACEOFFS_WON=55]="FACEOFFS_WON",EventIncidentTypeList[EventIncidentTypeList.EMPTY_NET_GOALS=56]="EMPTY_NET_GOALS",EventIncidentTypeList[EventIncidentTypeList.SAVES=57]="SAVES",EventIncidentTypeList[EventIncidentTypeList.PIM=58]="PIM",EventIncidentTypeList[EventIncidentTypeList.SERVE_1ST_PCT=59]="SERVE_1ST_PCT",EventIncidentTypeList[EventIncidentTypeList.SERVE_1ST_WON=60]="SERVE_1ST_WON",EventIncidentTypeList[EventIncidentTypeList.SERVE_2ND_WON=61]="SERVE_2ND_WON",EventIncidentTypeList[EventIncidentTypeList.SERVICE_GAMES_PLAYED=62]="SERVICE_GAMES_PLAYED",EventIncidentTypeList[EventIncidentTypeList.RETURN_POINTS_1ST_WON=63]="RETURN_POINTS_1ST_WON",EventIncidentTypeList[EventIncidentTypeList.RETURN_POINTS_2ND_WON=64]="RETURN_POINTS_2ND_WON",EventIncidentTypeList[EventIncidentTypeList.TOTAL_POINTS_WON=65]="TOTAL_POINTS_WON",EventIncidentTypeList[EventIncidentTypeList.RETURN_GAMES_PLAYED=66]="RETURN_GAMES_PLAYED",EventIncidentTypeList[EventIncidentTypeList.BREAK_POINTS_SAVED=67]="BREAK_POINTS_SAVED",EventIncidentTypeList[EventIncidentTypeList.WINNERS=68]="WINNERS",EventIncidentTypeList[EventIncidentTypeList.UNFORCED_ERRORS=69]="UNFORCED_ERRORS",EventIncidentTypeList[EventIncidentTypeList.SERVE_1ST_TOTAL=70]="SERVE_1ST_TOTAL",EventIncidentTypeList[EventIncidentTypeList.SERVE_2ND_TOTAL=71]="SERVE_2ND_TOTAL",EventIncidentTypeList[EventIncidentTypeList.RETURN_GAMES_WON=72]="RETURN_GAMES_WON",EventIncidentTypeList[EventIncidentTypeList.RETURN_GAMES_LOST=73]="RETURN_GAMES_LOST",EventIncidentTypeList[EventIncidentTypeList.RETURN_POINTS_WON=74]="RETURN_POINTS_WON",EventIncidentTypeList[EventIncidentTypeList.RETURN_POINTS_LOST=75]="RETURN_POINTS_LOST",EventIncidentTypeList[EventIncidentTypeList.TOTAL_GAMES_WON=76]="TOTAL_GAMES_WON",EventIncidentTypeList[EventIncidentTypeList.TOTAL_POINTS=77]="TOTAL_POINTS",EventIncidentTypeList[EventIncidentTypeList.TOTAL_GAMES=78]="TOTAL_GAMES",EventIncidentTypeList[EventIncidentTypeList.SERVICE_POINTS_PLAYED=79]="SERVICE_POINTS_PLAYED",EventIncidentTypeList[EventIncidentTypeList.RETURN_POINTS_PLAYED=80]="RETURN_POINTS_PLAYED",EventIncidentTypeList[EventIncidentTypeList.WICKETS_1ST_INNING=81]="WICKETS_1ST_INNING",EventIncidentTypeList[EventIncidentTypeList.WICKETS_2ND_INNING=82]="WICKETS_2ND_INNING",EventIncidentTypeList[EventIncidentTypeList.POWERPLAY_GOAL=83]="POWERPLAY_GOAL",EventIncidentTypeList[EventIncidentTypeList.SHORTHANDED_GOAL=84]="SHORTHANDED_GOAL",EventIncidentTypeList[EventIncidentTypeList.EMPTY_NET_GOAL=85]="EMPTY_NET_GOAL",EventIncidentTypeList[EventIncidentTypeList.GOAL_UNDER_REVIEW=86]="GOAL_UNDER_REVIEW",EventIncidentTypeList[EventIncidentTypeList.BALLS_BOWLED_SS=88]="BALLS_BOWLED_SS",EventIncidentTypeList[EventIncidentTypeList.OVERS_BOWLED_SS=89]="OVERS_BOWLED_SS",EventIncidentTypeList[EventIncidentTypeList.WICKETS_TAKEN_SS=90]="WICKETS_TAKEN_SS",EventIncidentTypeList[EventIncidentTypeList.MAIDENS_BOWLED_SS=91]="MAIDENS_BOWLED_SS",EventIncidentTypeList[EventIncidentTypeList.RUNS_CONCEDED_SS=92]="RUNS_CONCEDED_SS",EventIncidentTypeList[EventIncidentTypeList.RUNS_CONCEDED_PER_OVER_SS=93]="RUNS_CONCEDED_PER_OVER_SS",EventIncidentTypeList[EventIncidentTypeList.RUNS_SCORED_SS=94]="RUNS_SCORED_SS",EventIncidentTypeList[EventIncidentTypeList.BALLS_FACED_SS=95]="BALLS_FACED_SS",EventIncidentTypeList[EventIncidentTypeList.BOUNDARY_FOURS_SS=96]="BOUNDARY_FOURS_SS",EventIncidentTypeList[EventIncidentTypeList.BOUNDARY_SIXES_SS=97]="BOUNDARY_SIXES_SS",EventIncidentTypeList[EventIncidentTypeList.BATTING_STRIKE_RATE_SS=98]="BATTING_STRIKE_RATE_SS",EventIncidentTypeList[EventIncidentTypeList.RUN_RATE_SS=99]="RUN_RATE_SS",EventIncidentTypeList[EventIncidentTypeList.MINUTES_BATTED_SS=100]="MINUTES_BATTED_SS",EventIncidentTypeList[EventIncidentTypeList.BALLS_BOWLED=101]="BALLS_BOWLED",EventIncidentTypeList[EventIncidentTypeList.OVERS_BOWLED=102]="OVERS_BOWLED",EventIncidentTypeList[EventIncidentTypeList.BALLS_FACED=103]="BALLS_FACED",EventIncidentTypeList[EventIncidentTypeList.WICKETS_TAKEN=104]="WICKETS_TAKEN",EventIncidentTypeList[EventIncidentTypeList.MAIDENS_BOWLED=105]="MAIDENS_BOWLED",EventIncidentTypeList[EventIncidentTypeList.BOUNDARY_FOURS=106]="BOUNDARY_FOURS",EventIncidentTypeList[EventIncidentTypeList.BOUNDARY_SIXES=107]="BOUNDARY_SIXES",EventIncidentTypeList[EventIncidentTypeList.WICKETS_LOST=108]="WICKETS_LOST",EventIncidentTypeList[EventIncidentTypeList.RUNS_SCORED=109]="RUNS_SCORED",EventIncidentTypeList[EventIncidentTypeList.RUNS_CONCEDED=110]="RUNS_CONCEDED",EventIncidentTypeList[EventIncidentTypeList.RUN_RATE=111]="RUN_RATE",EventIncidentTypeList[EventIncidentTypeList.ECONOMY_RATE=112]="ECONOMY_RATE",EventIncidentTypeList[EventIncidentTypeList.MINUTES_BATTED=113]="MINUTES_BATTED",EventIncidentTypeList[EventIncidentTypeList.ASSISTS=114]="ASSISTS",EventIncidentTypeList[EventIncidentTypeList.BLOCKS=115]="BLOCKS",EventIncidentTypeList[EventIncidentTypeList.TURNOVERS=116]="TURNOVERS",EventIncidentTypeList[EventIncidentTypeList.PERSONAL_FAULTS=117]="PERSONAL_FAULTS",EventIncidentTypeList[EventIncidentTypeList.FIELD_GOALS_ATTEMPTED=118]="FIELD_GOALS_ATTEMPTED",EventIncidentTypeList[EventIncidentTypeList.FIELD_GOALS_MADE=119]="FIELD_GOALS_MADE",EventIncidentTypeList[EventIncidentTypeList.FIELD_GOALS_PERCENTAGE=120]="FIELD_GOALS_PERCENTAGE",EventIncidentTypeList[EventIncidentTypeList.TWO_POINTS_FIELD_GOALS_ATTEMPTED=121]="TWO_POINTS_FIELD_GOALS_ATTEMPTED",EventIncidentTypeList[EventIncidentTypeList.TWO_POINTS_FIELD_GOALS_MADE=122]="TWO_POINTS_FIELD_GOALS_MADE",EventIncidentTypeList[EventIncidentTypeList.TWO_POINTS_FIELD_GOALS_PERCENTAGE=123]="TWO_POINTS_FIELD_GOALS_PERCENTAGE",EventIncidentTypeList[EventIncidentTypeList.THREE_POINTS_FIELD_GOALS_ATTEMPTED=124]="THREE_POINTS_FIELD_GOALS_ATTEMPTED",EventIncidentTypeList[EventIncidentTypeList.THREE_POINTS_FIELD_GOALS_MADE=125]="THREE_POINTS_FIELD_GOALS_MADE",EventIncidentTypeList[EventIncidentTypeList.THREE_POINTS_FIELD_GOALS_PERCENTAGE=126]="THREE_POINTS_FIELD_GOALS_PERCENTAGE",EventIncidentTypeList[EventIncidentTypeList.FREE_THROWS_ATTEMPTED=127]="FREE_THROWS_ATTEMPTED",EventIncidentTypeList[EventIncidentTypeList.FREE_THROWS_MADE=128]="FREE_THROWS_MADE",EventIncidentTypeList[EventIncidentTypeList.FREE_THROWS_PERCENTAGE=129]="FREE_THROWS_PERCENTAGE",EventIncidentTypeList[EventIncidentTypeList.OFFENSIVE_REBOUNDS=130]="OFFENSIVE_REBOUNDS",EventIncidentTypeList[EventIncidentTypeList.DEFFENSIVE_REBOUNDS=131]="DEFFENSIVE_REBOUNDS",EventIncidentTypeList[EventIncidentTypeList.BATSMAN=134]="BATSMAN",EventIncidentTypeList[EventIncidentTypeList.WAITING_BATSMAN=135]="WAITING_BATSMAN",EventIncidentTypeList[EventIncidentTypeList.WAITING_BOWLER=136]="WAITING_BOWLER",EventIncidentTypeList[EventIncidentTypeList.BOWLER=137]="BOWLER",EventIncidentTypeList[EventIncidentTypeList.AT_BAT=138]="AT_BAT",EventIncidentTypeList[EventIncidentTypeList.TWO_B_DOUBLE=139]="TWO_B_DOUBLE",EventIncidentTypeList[EventIncidentTypeList.THREE_B_TRIPLE=140]="THREE_B_TRIPLE",EventIncidentTypeList[EventIncidentTypeList.HOME_RUNS=141]="HOME_RUNS",EventIncidentTypeList[EventIncidentTypeList.RUNS_BATTED_IN=142]="RUNS_BATTED_IN",EventIncidentTypeList[EventIncidentTypeList.LEFT_ON_BASE=143]="LEFT_ON_BASE",EventIncidentTypeList[EventIncidentTypeList.BASE_ON_BALLS=144]="BASE_ON_BALLS",EventIncidentTypeList[EventIncidentTypeList.STRIKEOUTS=145]="STRIKEOUTS",EventIncidentTypeList[EventIncidentTypeList.STOLEN_BASES=146]="STOLEN_BASES",EventIncidentTypeList[EventIncidentTypeList.BATTING_AVERAGE=147]="BATTING_AVERAGE",EventIncidentTypeList[EventIncidentTypeList.DOWNS_1ST=152]="DOWNS_1ST",EventIncidentTypeList[EventIncidentTypeList.TOTAL_YARDS=153]="TOTAL_YARDS",EventIncidentTypeList[EventIncidentTypeList.PASSING_YARDS=154]="PASSING_YARDS",EventIncidentTypeList[EventIncidentTypeList.RUSHING_YARDS=155]="RUSHING_YARDS",EventIncidentTypeList[EventIncidentTypeList.PENALTIES_YARDS=156]="PENALTIES_YARDS",EventIncidentTypeList[EventIncidentTypeList.PUNTS=157]="PUNTS",EventIncidentTypeList[EventIncidentTypeList.BLOCKED_SHOOTS=158]="BLOCKED_SHOOTS",EventIncidentTypeList[EventIncidentTypeList.OUT=159]="OUT",EventIncidentTypeList[EventIncidentTypeList.B=160]="B",EventIncidentTypeList[EventIncidentTypeList.C=161]="C",EventIncidentTypeList[EventIncidentTypeList.LBW=162]="LBW",EventIncidentTypeList[EventIncidentTypeList.NO_BALLS=163]="NO_BALLS",EventIncidentTypeList[EventIncidentTypeList.WIDE=164]="WIDE",EventIncidentTypeList[EventIncidentTypeList.NO_BALLS_SS=165]="NO_BALLS_SS",EventIncidentTypeList[EventIncidentTypeList.WIDE_SS=166]="WIDE_SS",EventIncidentTypeList[EventIncidentTypeList.TRIES=167]="TRIES",EventIncidentTypeList[EventIncidentTypeList.TOTAL_REBOUNDS=168]="TOTAL_REBOUNDS",EventIncidentTypeList[EventIncidentTypeList.POINTS=169]="POINTS",EventIncidentTypeList[EventIncidentTypeList.TOTAL_REBOUNDS_SS=170]="TOTAL_REBOUNDS_SS",EventIncidentTypeList[EventIncidentTypeList.ASSISTS_SS=171]="ASSISTS_SS",EventIncidentTypeList[EventIncidentTypeList.BYE_SS=172]="BYE_SS",EventIncidentTypeList[EventIncidentTypeList.LEG_BYE_SS=173]="LEG_BYE_SS",EventIncidentTypeList[EventIncidentTypeList.BYE=174]="BYE",EventIncidentTypeList[EventIncidentTypeList.LEG_BYE=175]="LEG_BYE",EventIncidentTypeList[EventIncidentTypeList.EXTRAS=176]="EXTRAS",EventIncidentTypeList[EventIncidentTypeList.EXTRAS_SS=177]="EXTRAS_SS",EventIncidentTypeList[EventIncidentTypeList.WICKETS=178]="WICKETS",EventIncidentTypeList[EventIncidentTypeList.BEHIND=179]="BEHIND",EventIncidentTypeList[EventIncidentTypeList.GOALS_2=180]="GOALS_2",EventIncidentTypeList[EventIncidentTypeList.RUN_OUT=181]="RUN_OUT",EventIncidentTypeList[EventIncidentTypeList.KICKS=182]="KICKS",EventIncidentTypeList[EventIncidentTypeList.MARKS=183]="MARKS",EventIncidentTypeList[EventIncidentTypeList.HANDBALLS=184]="HANDBALLS",EventIncidentTypeList[EventIncidentTypeList.DISPOSALS=185]="DISPOSALS",EventIncidentTypeList[EventIncidentTypeList.GOALS=186]="GOALS",EventIncidentTypeList[EventIncidentTypeList.BEHINDS=187]="BEHINDS",EventIncidentTypeList[EventIncidentTypeList.HITOUTS=188]="HITOUTS",EventIncidentTypeList[EventIncidentTypeList.TACKLES=189]="TACKLES",EventIncidentTypeList[EventIncidentTypeList.FREES_FOR=190]="FREES_FOR",EventIncidentTypeList[EventIncidentTypeList.FREES_AGAINST=191]="FREES_AGAINST",EventIncidentTypeList[EventIncidentTypeList.KICKS_SS=192]="KICKS_SS",EventIncidentTypeList[EventIncidentTypeList.MARKS_SS=193]="MARKS_SS",EventIncidentTypeList[EventIncidentTypeList.HANDBALLS_SS=194]="HANDBALLS_SS",EventIncidentTypeList[EventIncidentTypeList.DISPOSALS_SS=195]="DISPOSALS_SS",EventIncidentTypeList[EventIncidentTypeList.BEHINDS_SS=196]="BEHINDS_SS",EventIncidentTypeList[EventIncidentTypeList.SUPER_GOALS=197]="SUPER_GOALS",EventIncidentTypeList[EventIncidentTypeList.SUPER_GOALS_SS=198]="SUPER_GOALS_SS",EventIncidentTypeList[EventIncidentTypeList.SUPER_GOAL=199]="SUPER_GOAL",EventIncidentTypeList[EventIncidentTypeList.CLEARENCES=200]="CLEARENCES",EventIncidentTypeList[EventIncidentTypeList.ST=201]="ST",EventIncidentTypeList[EventIncidentTypeList.CONVERSION_GOALS=202]="CONVERSION_GOALS",EventIncidentTypeList[EventIncidentTypeList.PENALTY_GOALS=203]="PENALTY_GOALS",EventIncidentTypeList[EventIncidentTypeList.PENALTY_GOAL_ATTEMPTS=204]="PENALTY_GOAL_ATTEMPTS",EventIncidentTypeList[EventIncidentTypeList.DROPPED_GOALS=205]="DROPPED_GOALS",EventIncidentTypeList[EventIncidentTypeList.DO_TRY=206]="DO_TRY",EventIncidentTypeList[EventIncidentTypeList.CONVERSION_GOAL=207]="CONVERSION_GOAL",EventIncidentTypeList[EventIncidentTypeList.PENALTY_GOAL=208]="PENALTY_GOAL",EventIncidentTypeList[EventIncidentTypeList.DROP_GOAL=209]="DROP_GOAL",EventIncidentTypeList[EventIncidentTypeList.CONVERSION_GOAL_ATTEMPTS=210]="CONVERSION_GOAL_ATTEMPTS",EventIncidentTypeList[EventIncidentTypeList.GOALS_PERCENT=211]="GOALS_PERCENT",EventIncidentTypeList[EventIncidentTypeList.TOTAL_RUNS=212]="TOTAL_RUNS",EventIncidentTypeList[EventIncidentTypeList.METRES_RUN_WITH_BALL=213]="METRES_RUN_WITH_BALL",EventIncidentTypeList[EventIncidentTypeList.RED_CARDS_2=218]="RED_CARDS_2",EventIncidentTypeList[EventIncidentTypeList.YELLOW_CARDS_2=219]="YELLOW_CARDS_2",EventIncidentTypeList[EventIncidentTypeList.SHOTS_ON_GOAL_SS=220]="SHOTS_ON_GOAL_SS",EventIncidentTypeList[EventIncidentTypeList.SHOTS_OFF_GOAL_SS=221]="SHOTS_OFF_GOAL_SS",EventIncidentTypeList[EventIncidentTypeList.OFFSIDES_SS=222]="OFFSIDES_SS",EventIncidentTypeList[EventIncidentTypeList.FOULS_COMMITTED_SS=223]="FOULS_COMMITTED_SS",EventIncidentTypeList[EventIncidentTypeList.FOULS_SUFFERED_SS=224]="FOULS_SUFFERED_SS",EventIncidentTypeList[EventIncidentTypeList.GOALKEEPER_SAVES_SS=225]="GOALKEEPER_SAVES_SS",EventIncidentTypeList[EventIncidentTypeList.DROPPED_GOALS_ATTEMPTS=226]="DROPPED_GOALS_ATTEMPTS",EventIncidentTypeList[EventIncidentTypeList.BLOCKED_SHOTS_SS=227]="BLOCKED_SHOTS_SS",EventIncidentTypeList[EventIncidentTypeList.BLOCK_AGAINST_SS=228]="BLOCK_AGAINST_SS",EventIncidentTypeList[EventIncidentTypeList.TURNOVERS_SS=229]="TURNOVERS_SS",EventIncidentTypeList[EventIncidentTypeList.STEALS_SS=230]="STEALS_SS",EventIncidentTypeList[EventIncidentTypeList.PERSONAL_FOULS_SS=231]="PERSONAL_FOULS_SS",EventIncidentTypeList[EventIncidentTypeList.OFFENSIVE_REBOUNDS_SS=232]="OFFENSIVE_REBOUNDS_SS",EventIncidentTypeList[EventIncidentTypeList.DEFENSIVE_REBOUNDS_SS=233]="DEFENSIVE_REBOUNDS_SS",EventIncidentTypeList[EventIncidentTypeList.PLUS_MINUS_POINTS=234]="PLUS_MINUS_POINTS",EventIncidentTypeList[EventIncidentTypeList.GIVEAWAYS_SS=235]="GIVEAWAYS_SS",EventIncidentTypeList[EventIncidentTypeList.HITS_SS=236]="HITS_SS",EventIncidentTypeList[EventIncidentTypeList.PIM_SS=237]="PIM_SS",EventIncidentTypeList[EventIncidentTypeList.FACEOFFS_PERCENTAGE_SS=238]="FACEOFFS_PERCENTAGE_SS",EventIncidentTypeList[EventIncidentTypeList.TIME_ON_ICE_SS=239]="TIME_ON_ICE_SS",EventIncidentTypeList[EventIncidentTypeList.TAKEAWAYS_SS=240]="TAKEAWAYS_SS",EventIncidentTypeList[EventIncidentTypeList.MINUTES_PLAYED_SS=241]="MINUTES_PLAYED_SS",EventIncidentTypeList[EventIncidentTypeList.FIELD_GOALS_SS=242]="FIELD_GOALS_SS",EventIncidentTypeList[EventIncidentTypeList.THREE_POINT_FIELD_GOALS_SS=243]="THREE_POINT_FIELD_GOALS_SS",EventIncidentTypeList[EventIncidentTypeList.FREE_THROWS_SS=244]="FREE_THROWS_SS",EventIncidentTypeList[EventIncidentTypeList.AT_BAT_SS=245]="AT_BAT_SS",EventIncidentTypeList[EventIncidentTypeList.RUNS_BATTED_IN_SS=246]="RUNS_BATTED_IN_SS",EventIncidentTypeList[EventIncidentTypeList.BASE_ON_BALLS_SS=247]="BASE_ON_BALLS_SS",EventIncidentTypeList[EventIncidentTypeList.STRIKEOUTS_SS=248]="STRIKEOUTS_SS",EventIncidentTypeList[EventIncidentTypeList.LEFT_ON_BASE_SS=249]="LEFT_ON_BASE_SS",EventIncidentTypeList[EventIncidentTypeList.BATTING_AVERAGE_SS=250]="BATTING_AVERAGE_SS",EventIncidentTypeList[EventIncidentTypeList.GOALKEEPER_EVEN_STRENGTH_SAVES_SS=251]="GOALKEEPER_EVEN_STRENGTH_SAVES_SS",EventIncidentTypeList[EventIncidentTypeList.GOALKEEPER_POWERPLAY_SAVES_SS=252]="GOALKEEPER_POWERPLAY_SAVES_SS",EventIncidentTypeList[EventIncidentTypeList.GOALKEEPER_SHORTHANDED_SAVES_SS=253]="GOALKEEPER_SHORTHANDED_SAVES_SS",EventIncidentTypeList[EventIncidentTypeList.GOALKEEPER_SAVES_PERCENTAGE_SS=255]="GOALKEEPER_SAVES_PERCENTAGE_SS",EventIncidentTypeList[EventIncidentTypeList.INNINGS_PITCHED_SS=256]="INNINGS_PITCHED_SS",EventIncidentTypeList[EventIncidentTypeList.HITS_ALLOWED_SS=257]="HITS_ALLOWED_SS",EventIncidentTypeList[EventIncidentTypeList.EARNED_RUNS_SS=258]="EARNED_RUNS_SS",EventIncidentTypeList[EventIncidentTypeList.HOME_RUNS_SS=259]="HOME_RUNS_SS",EventIncidentTypeList[EventIncidentTypeList.EARNED_RUN_AVERAGE_SS=260]="EARNED_RUN_AVERAGE_SS",EventIncidentTypeList[EventIncidentTypeList.DROPPED_GOALS_SS=261]="DROPPED_GOALS_SS",EventIncidentTypeList[EventIncidentTypeList.PENALTY_GOALS_SS=262]="PENALTY_GOALS_SS",EventIncidentTypeList[EventIncidentTypeList.CONVERSION_GOALS_SS=263]="CONVERSION_GOALS_SS",EventIncidentTypeList[EventIncidentTypeList.TRIES_SS=264]="TRIES_SS",EventIncidentTypeList[EventIncidentTypeList.PENALTY_TRY=265]="PENALTY_TRY",EventIncidentTypeList[EventIncidentTypeList.PENALTY_SHOT=267]="PENALTY_SHOT",EventIncidentTypeList[EventIncidentTypeList.GOLF_FINAL_RESULT=268]="GOLF_FINAL_RESULT",EventIncidentTypeList[EventIncidentTypeList.GOAL_ATTEMPTS_SS=270]="GOAL_ATTEMPTS_SS",EventIncidentTypeList[EventIncidentTypeList.TOTAL_PASSES_SS=271]="TOTAL_PASSES_SS",EventIncidentTypeList[EventIncidentTypeList.PASS_SUCCESS_PERCENTAGE_SS=272]="PASS_SUCCESS_PERCENTAGE_SS",EventIncidentTypeList[EventIncidentTypeList.POWERPLAY_TIME_ON_ICE_SS=273]="POWERPLAY_TIME_ON_ICE_SS",EventIncidentTypeList[EventIncidentTypeList.STEALS=274]="STEALS",EventIncidentTypeList[EventIncidentTypeList.TWO_POINT_FIELD_GOALS=275]="TWO_POINT_FIELD_GOALS",EventIncidentTypeList[EventIncidentTypeList.MINOR_PENALTY=276]="MINOR_PENALTY",EventIncidentTypeList[EventIncidentTypeList.MAJOR_PENALTY=277]="MAJOR_PENALTY",EventIncidentTypeList[EventIncidentTypeList.PERSONAL_FOUL=278]="PERSONAL_FOUL",EventIncidentTypeList[EventIncidentTypeList.GAME_MISCONDUCT=279]="GAME_MISCONDUCT",EventIncidentTypeList[EventIncidentTypeList.CUT_OFF=280]="CUT_OFF",EventIncidentTypeList[EventIncidentTypeList.DISQUALIFIED=281]="DISQUALIFIED",EventIncidentTypeList[EventIncidentTypeList.DID_NOT_START=282]="DID_NOT_START",EventIncidentTypeList[EventIncidentTypeList.DID_NOT_FINISH=283]="DID_NOT_FINISH",EventIncidentTypeList[EventIncidentTypeList.MADE_CUT_DID_NOT_FINISH=284]="MADE_CUT_DID_NOT_FINISH",EventIncidentTypeList[EventIncidentTypeList.WITHDRAWN=285]="WITHDRAWN",EventIncidentTypeList[EventIncidentTypeList.RETIRED=291]="RETIRED",EventIncidentTypeList[EventIncidentTypeList.DID_NOT_CLASSIFIED=294]="DID_NOT_CLASSIFIED",EventIncidentTypeList[EventIncidentTypeList.BEHIND_RUSHED=295]="BEHIND_RUSHED",EventIncidentTypeList[EventIncidentTypeList.SINGLE_POINT=296]="SINGLE_POINT",EventIncidentTypeList[EventIncidentTypeList.NET_RUN_RATE=299]="NET_RUN_RATE",EventIncidentTypeList[EventIncidentTypeList.NOT_QUALIFIED=300]="NOT_QUALIFIED",EventIncidentTypeList[EventIncidentTypeList.OWNER_POINTS=301]="OWNER_POINTS",EventIncidentTypeList[EventIncidentTypeList.ON_COURSE_TRACK=302]="ON_COURSE_TRACK",EventIncidentTypeList[EventIncidentTypeList.PASS_SUCCESS=303]="PASS_SUCCESS",EventIncidentTypeList[EventIncidentTypeList.TOTAL_PASSES=304]="TOTAL_PASSES",EventIncidentTypeList[EventIncidentTypeList.COMPLETED_PASSES_SS=305]="COMPLETED_PASSES_SS",EventIncidentTypeList[EventIncidentTypeList.CURRENT_LAP=306]="CURRENT_LAP",EventIncidentTypeList[EventIncidentTypeList.RETIRED_HURT=310]="RETIRED_HURT",EventIncidentTypeList[EventIncidentTypeList.HIT_WICKET=311]="HIT_WICKET",EventIncidentTypeList[EventIncidentTypeList.LEADER=312]="LEADER",EventIncidentTypeList[EventIncidentTypeList.GENERAL_LEADER=314]="GENERAL_LEADER",EventIncidentTypeList[EventIncidentTypeList.POINTS_LEADER=315]="POINTS_LEADER",EventIncidentTypeList[EventIncidentTypeList.MOUNTAINS_LEADER=316]="MOUNTAINS_LEADER",EventIncidentTypeList[EventIncidentTypeList.YOUTH_LEADER=317]="YOUTH_LEADER",EventIncidentTypeList[EventIncidentTypeList.CURRENT_WORLD_CHAMPION=318]="CURRENT_WORLD_CHAMPION",EventIncidentTypeList[EventIncidentTypeList.LAST_IN_RACE=319]="LAST_IN_RACE",EventIncidentTypeList[EventIncidentTypeList.CURRENT_DISTANCE=323]="CURRENT_DISTANCE",EventIncidentTypeList[EventIncidentTypeList.NON_RUNNER=326]="NON_RUNNER",EventIncidentTypeList[EventIncidentTypeList.PULLED_UP=327]="PULLED_UP",EventIncidentTypeList[EventIncidentTypeList.UNSEATED_RIDER=328]="UNSEATED_RIDER",EventIncidentTypeList[EventIncidentTypeList.RAN_OUT=329]="RAN_OUT",EventIncidentTypeList[EventIncidentTypeList.FALL=330]="FALL",EventIncidentTypeList[EventIncidentTypeList.BROUGHT_DOWN=331]="BROUGHT_DOWN",EventIncidentTypeList[EventIncidentTypeList.HIT_RAILS=332]="HIT_RAILS",EventIncidentTypeList[EventIncidentTypeList.REFUSED_TO_RACE=333]="REFUSED_TO_RACE",EventIncidentTypeList[EventIncidentTypeList.SEVEN_METER_THROW=334]="SEVEN_METER_THROW",EventIncidentTypeList[EventIncidentTypeList.SEVEN_METER_SCORED=335]="SEVEN_METER_SCORED",EventIncidentTypeList[EventIncidentTypeList.SEVEN_METER_MISSED=336]="SEVEN_METER_MISSED",EventIncidentTypeList[EventIncidentTypeList.OBSTRUCTING_THE_FIELD=337]="OBSTRUCTING_THE_FIELD",EventIncidentTypeList[EventIncidentTypeList.KNOCKOUT=338]="KNOCKOUT",EventIncidentTypeList[EventIncidentTypeList.MARTIAL_ARTS_FINISHED=340]="MARTIAL_ARTS_FINISHED",EventIncidentTypeList[EventIncidentTypeList.TECHNICAL_KNOCKOUT=341]="TECHNICAL_KNOCKOUT",EventIncidentTypeList[EventIncidentTypeList.COMPLETED_PASSES=342]="COMPLETED_PASSES",EventIncidentTypeList[EventIncidentTypeList.DISTANCE_COVERED_METRES=343]="DISTANCE_COVERED_METRES",EventIncidentTypeList[EventIncidentTypeList.SUBMISSION=344]="SUBMISSION",EventIncidentTypeList[EventIncidentTypeList.STARS=345]="STARS",EventIncidentTypeList[EventIncidentTypeList.NO_CONTEST=346]="NO_CONTEST",EventIncidentTypeList[EventIncidentTypeList.FIRST_SERVICE=347]="FIRST_SERVICE",EventIncidentTypeList[EventIncidentTypeList.MISSED_PENALTY=348]="MISSED_PENALTY",EventIncidentTypeList[EventIncidentTypeList.MISSED_CONVERSION=349]="MISSED_CONVERSION",EventIncidentTypeList[EventIncidentTypeList.MISSED_DROP_GOAL=350]="MISSED_DROP_GOAL",EventIncidentTypeList[EventIncidentTypeList.MISSED_FIELD_GOAL=351]="MISSED_FIELD_GOAL",EventIncidentTypeList[EventIncidentTypeList.MISSED_EXTRA_POINT=352]="MISSED_EXTRA_POINT",EventIncidentTypeList[EventIncidentTypeList.TWO_POINT_CONVERSION_FAILED=353]="TWO_POINT_CONVERSION_FAILED",EventIncidentTypeList[EventIncidentTypeList.SLIPPED_UP=356]="SLIPPED_UP",EventIncidentTypeList[EventIncidentTypeList.STOLEN_BASES_SS=357]="STOLEN_BASES_SS",EventIncidentTypeList[EventIncidentTypeList.DEFENSIVE_2_POINT_CONVERSION=361]="DEFENSIVE_2_POINT_CONVERSION",EventIncidentTypeList[EventIncidentTypeList.GOAL_DISALLOWED=362]="GOAL_DISALLOWED",EventIncidentTypeList[EventIncidentTypeList.RAID_POINTS=363]="RAID_POINTS",EventIncidentTypeList[EventIncidentTypeList.TACKLE_POINTS=364]="TACKLE_POINTS",EventIncidentTypeList[EventIncidentTypeList.ALL_OUT_POINTS=365]="ALL_OUT_POINTS",EventIncidentTypeList[EventIncidentTypeList.EXTRA_POINTS=366]="EXTRA_POINTS",EventIncidentTypeList[EventIncidentTypeList.TOUCH_POINTS_PLAYER=367]="TOUCH_POINTS_PLAYER",EventIncidentTypeList[EventIncidentTypeList.BONUS_POINTS_PLAYER=368]="BONUS_POINTS_PLAYER",EventIncidentTypeList[EventIncidentTypeList.RAID_POINTS_PLAYER=369]="RAID_POINTS_PLAYER",EventIncidentTypeList[EventIncidentTypeList.TACKLE_POINTS_PLAYER=370]="TACKLE_POINTS_PLAYER",EventIncidentTypeList[EventIncidentTypeList.TOTAL_POINTS_PLAYER=371]="TOTAL_POINTS_PLAYER",EventIncidentTypeList[EventIncidentTypeList.ATTACKS=372]="ATTACKS",EventIncidentTypeList[EventIncidentTypeList.DANGEROUS_ATTACKS=373]="DANGEROUS_ATTACKS",EventIncidentTypeList[EventIncidentTypeList.ELECTED_START_ON=374]="ELECTED_START_ON",EventIncidentTypeList[EventIncidentTypeList.EXPECTED_GOALS=432]="EXPECTED_GOALS",EventIncidentTypeList[EventIncidentTypeList.SCORES_CHANGED=382]="SCORES_CHANGED",EventIncidentTypeList[EventIncidentTypeList.NET_POINTS_WON=404]="NET_POINTS_WON",EventIncidentTypeList[EventIncidentTypeList.NET_POINTS_PLAYED=405]="NET_POINTS_PLAYED",EventIncidentTypeList[EventIncidentTypeList.VIRTUAL_YELLOW_RED_CARD=-2]="VIRTUAL_YELLOW_RED_CARD",EventIncidentTypeList[EventIncidentTypeList.RUSHING_TOUCHDOWNS=393]="RUSHING_TOUCHDOWNS",EventIncidentTypeList[EventIncidentTypeList.PASSING_TOUCHDOWNS=394]="PASSING_TOUCHDOWNS",EventIncidentTypeList[EventIncidentTypeList.TURNOVER_TOUCHDOWNS=403]="TURNOVER_TOUCHDOWNS",EventIncidentTypeList[EventIncidentTypeList.FIELD_GOALS_SUCCEEDED=395]="FIELD_GOALS_SUCCEEDED",EventIncidentTypeList[EventIncidentTypeList.INTERCEPTION_THROWN=396]="INTERCEPTION_THROWN",EventIncidentTypeList[EventIncidentTypeList.FUMBLE_LOST=397]="FUMBLE_LOST",EventIncidentTypeList[EventIncidentTypeList.SACKS_ALLOWED=398]="SACKS_ALLOWED",EventIncidentTypeList[EventIncidentTypeList.TOUCHDOWNS=399]="TOUCHDOWNS",EventIncidentTypeList[EventIncidentTypeList.SAFETIES=400]="SAFETIES",EventIncidentTypeList[EventIncidentTypeList.TWO_POINT_CONVERSIONS=401]="TWO_POINT_CONVERSIONS",EventIncidentTypeList[EventIncidentTypeList.TECHNICAL_FOULS=402]="TECHNICAL_FOULS",EventIncidentTypeList[EventIncidentTypeList.TECHNICAL_FOULS_SS=410]="TECHNICAL_FOULS_SS",EventIncidentTypeList[EventIncidentTypeList.FACEOFFS=411]="FACEOFFS"}(EventIncidentTypeList||(EventIncidentTypeList={}));var StatsResultsImpl=function(){function StatsResultsImpl(utilTrans,utilSport,utilDate){this._utilTrans=utilTrans,this._utilSport=utilSport,this._utilDate=utilDate,this._utilConfig=window.cjs.Api.config,this._timezone=window.cjs.Api.timezone}return StatsResultsImpl.prototype.getGap=function(eventItem){var sportId=eventItem.getSportId(),rank=eventItem.getStatsResultsRank()||0,currentDistance=this._getCurrentDistance(sportId,eventItem.isLive(),eventItem.getCurrentDistance(),rank),gap=this._getGap(sportId,eventItem.getStatsResultsLapDistance()||0,eventItem.getStatsResultsGap()||"",rank);return currentDistance?currentDistance+(currentDistance&&gap?" ".concat(gap):""):gap},StatsResultsImpl.prototype.getJumpRound1=function(eventItem){var participantStatusId=eventItem.getStatsResultsStopReasonRound1();return participantStatusId?this.getParticipantStatusTrans(participantStatusId,!0):eventItem.getStatsResultsJumpRound1()},StatsResultsImpl.prototype.getJumpRound2=function(eventItem){var participantStatusId=eventItem.getStatsResultsStopReasonRound2();return participantStatusId?this.getParticipantStatusTrans(participantStatusId,!0):eventItem.getStatsResultsJumpRound2()},StatsResultsImpl.prototype.getRankNoLive=function(eventItem){return eventItem.isScheduled()?this._utilDate.timestamp2date(this._getRankNoLiveFormat(eventItem.getStartTime()),eventItem.getStartTime(),this._timezone.getGmtOffset()):this.getRank(eventItem,!1)},StatsResultsImpl.prototype.getRank=function(eventItem,isMyTeams){return this._getScheduledRank(eventItem,isMyTeams)||this._getRank(eventItem)},StatsResultsImpl.prototype.getShooting=function(eventItem){var penaltyLap=eventItem.getStatsResultsPenaltyLap(),missedShot=eventItem.getStatsResultsMissedShot(),result=[];return penaltyLap&&result.push(penaltyLap),missedShot&&result.push(missedShot),result.join(" + ")},StatsResultsImpl.prototype.getTime=function(eventItem){var participantStatusId=eventItem.getStatsResultsStopReason();return participantStatusId?eventItem.getStatsResultsStopReasonRound1()||eventItem.getStatsResultsStopReasonRound2()?"":this.getParticipantStatusTrans(participantStatusId,!0):eventItem.getStatsResultsTime()},StatsResultsImpl.prototype.getParticipantStatusTrans=function(participantStatusId,isShort){switch(participantStatusId){case EventIncidentTypeList.CUT_OFF:return this._utilTrans.translate(isShort?"TRANS_DC_SHORT_CUT_OFF":"TRANS_DC_CUT_OFF");case EventIncidentTypeList.DISQUALIFIED:return this._utilTrans.translate(isShort?"TRANS_DC_SHORT_DISQUALIFIED":"TRANS_DC_DISQUALIFIED");case EventIncidentTypeList.DID_NOT_START:return this._utilTrans.translate(isShort?"TRANS_DC_SHORT_DID_NOT_START":"TRANS_DC_DID_NOT_START");case EventIncidentTypeList.DID_NOT_FINISH:return this._utilTrans.translate(isShort?"TRANS_DC_SHORT_DID_NOT_FINISH":"TRANS_DC_DID_NOT_FINISH");case EventIncidentTypeList.MADE_CUT_DID_NOT_FINISH:return this._utilTrans.translate(isShort?"TRANS_DC_SHORT_MADE_CUT_DID_NOT_FINISH":"TRANS_DC_MADE_CUT_DID_NOT_FINISH");case EventIncidentTypeList.WITHDRAWN:return this._utilTrans.translate(isShort?"TRANS_DC_SHORT_WITHDRAWN":"TRANS_DC_WITHDRAWN");case EventIncidentTypeList.RETIRED:return this._utilTrans.translate(isShort?"TRANS_DC_SHORT_RETIRED":"TRANS_DC_RETIRED");case EventIncidentTypeList.DID_NOT_CLASSIFIED:return this._utilTrans.translate(isShort?"TRANS_DC_SHORT_DID_NOT_CLASSIFIED":"TRANS_DC_DID_NOT_CLASSIFIED");case EventIncidentTypeList.NOT_QUALIFIED:return this._utilTrans.translate(isShort?"TRANS_DC_SHORT_NOT_QUALIFIED":"TRANS_DC_NOT_QUALIFIED");case EventIncidentTypeList.OWNER_POINTS:return this._utilTrans.translate(isShort?"TRANS_DC_SHORT_OWNER_POINTS":"TRANS_DC_OWNER_POINTS");case EventIncidentTypeList.NON_RUNNER:return this._utilTrans.translate(isShort?"TRANS_DC_SHORT_NON_RUNNER":"TRANS_DC_NON_RUNNER");case EventIncidentTypeList.PULLED_UP:return this._utilTrans.translate(isShort?"TRANS_DC_SHORT_PULLED_UP":"TRANS_DC_PULLED_UP");case EventIncidentTypeList.UNSEATED_RIDER:return this._utilTrans.translate(isShort?"TRANS_DC_SHORT_UNSEATED_RIDER":"TRANS_DC_UNSEATED_RIDER");case EventIncidentTypeList.RAN_OUT:return this._utilTrans.translate(isShort?"TRANS_DC_SHORT_RAN_OUT":"TRANS_DC_RAN_OUT");case EventIncidentTypeList.FALL:return this._utilTrans.translate(isShort?"TRANS_DC_SHORT_FALL":"TRANS_DC_FALL");case EventIncidentTypeList.BROUGHT_DOWN:return this._utilTrans.translate(isShort?"TRANS_DC_SHORT_BROUGHT_DOWN":"TRANS_DC_BROUGHT_DOWN");case EventIncidentTypeList.HIT_RAILS:return this._utilTrans.translate(isShort?"TRANS_DC_SHORT_HIT_RAILS":"TRANS_DC_HIT_RAILS");case EventIncidentTypeList.REFUSED_TO_RACE:return this._utilTrans.translate(isShort?"TRANS_DC_SHORT_REFUSED_TO_RACE":"TRANS_DC_REFUSED_TO_RACE");case EventIncidentTypeList.SLIPPED_UP:return this._utilTrans.translate(isShort?"TRANS_DC_SHORT_SLIPPED_UP":"TRANS_DC_SLIPPED_UP");default:return""}},StatsResultsImpl.prototype._getRankNoLiveFormat=function(eventStartUTime){var isUsTimeFormat=this._utilConfig.get("app","US_time_format")||!1;return this._utilDate.getMidnight()===this._utilDate.getMidnight(eventStartUTime)?isUsTimeFormat?"h:i A":"H:i":isUsTimeFormat?"M d":"d.m."},StatsResultsImpl.prototype._getCurrentDistance=function(sportId,isLive,currentDistance,rank){return this._utilSport.inGroup(sportId,SportList_SportList.WINTER_SPORTS)&&isLive&&currentDistance&&1===rank?"".concat(currentDistance," ").concat(this._utilTrans.translate("TRANS_WINTER_SPORTS_KM")):""},StatsResultsImpl.prototype._getGap=function(sportId,lapDistance,gap,rank){if(0!==lapDistance){var lapDistanceWithPrefix=lapDistance>0?"+".concat(lapDistance):lapDistance;return"".concat(lapDistanceWithPrefix," ").concat(this._utilSport.getRacingSportShortLapsLabel(sportId))}return""!==gap&&1!==rank?Number(gap)>0||Number(gap.replace(/:/g,""))>=0?"+".concat(gap):gap:""},StatsResultsImpl.prototype._getScheduledRank=function(eventItem,isMyTeams){if(eventItem.isScheduled()){if(eventItem.getSportId()===SportList_SportList.GOLF&&isMyTeams&&!eventItem.isDelayed())return eventItem.getStartUTimeDate();if(eventItem.getSportId()===SportList_SportList.HORSE_RACING&&eventItem.getParticipantStatus()===EventIncidentTypeList.NON_RUNNER)return this._utilTrans.translate("TRANS_DC_SHORT_NON_RUNNER")}return""},StatsResultsImpl.prototype._getRank=function(eventItem){var currentParticipantStatus,currentRank,isGolf=eventItem.getSportId()===SportList_SportList.GOLF,rank="";if(eventItem.isStatsResults()){var rankNumber=eventItem.getStatsResultsRank();currentRank=null!==rankNumber?rankNumber.toString():"",currentParticipantStatus=eventItem.getStatsResultsStopReason()||0}else currentRank=eventItem.getRank()||"",currentParticipantStatus=eventItem.getParticipantStatus()||0;if(currentParticipantStatus)rank=this.getParticipantStatusTrans(currentParticipantStatus,!0);else if(currentRank){isGolf&&!eventItem.isParticipantLive()&&!eventItem.wasParticipantLive()&&!eventItem.isDelayed()||(rank=isGolf?eventItem.getRankIsTied()?"T".concat(currentRank):currentRank:"".concat(currentRank,"."))}return rank},StatsResultsImpl}(),MyGamesCheckerImpl=function(){function MyGamesCheckerImpl(utilEnviroment){this.utilEnviroment=utilEnviroment}return MyGamesCheckerImpl.prototype.isMyGames=function(){return this.utilEnviroment.getCategory()===CategoryList.MY_GAMES},MyGamesCheckerImpl}(),ApplicationImpl=function(){function ApplicationImpl(utilEnviroment){this._utilConfig=cjs.Api.config,this._utilEnviroment=utilEnviroment,this._mainBookmakerIds=[]}return ApplicationImpl.prototype.setMainBookmakerIds=function(mainBookmakerIds){this._mainBookmakerIds=mainBookmakerIds},ApplicationImpl.prototype.getMainBookmakerId=function(){return this._mainBookmakerIds[0]},ApplicationImpl.prototype.getMainBookmakerIds=function(){return this._mainBookmakerIds},ApplicationImpl.prototype.getGeoIpWithSubdivision=function(geoIp,geoIpIsoSubdivisionCode){geoIp||(geoIp=this._utilEnviroment.getGlobalGeoIp()),geoIpIsoSubdivisionCode||(geoIpIsoSubdivisionCode=this._utilEnviroment.getGeoIpIsoSubdivisionCode0());var mergedGeoIp="";return geoIp?geoIpIsoSubdivisionCode&&(mergedGeoIp=geoIp+":"+geoIpIsoSubdivisionCode):mergedGeoIp="default",mergedGeoIp},ApplicationImpl}(),GameTimeImpl=function(){function GameTimeImpl(){this.stagesWithGameTime=[EventStageList_EventStageList.FIRST_HALF,EventStageList_EventStageList.SECOND_HALF,EventStageList_EventStageList.FIRST_PERIOD,EventStageList_EventStageList.SECOND_PERIOD,EventStageList_EventStageList.THIRD_PERIOD,EventStageList_EventStageList.FIRST_QUARTER,EventStageList_EventStageList.SECOND_QUARTER,EventStageList_EventStageList.THIRD_QUARTER,EventStageList_EventStageList.FOURTH_QUARTER,EventStageList_EventStageList.EXTRA_TIME,EventStageList_EventStageList.FIRST_EXTRA_TIME,EventStageList_EventStageList.SECOND_EXTRA_TIME,EventStageList_EventStageList.LIVE],this.stagesExtraTime=[EventStageList_EventStageList.EXTRA_TIME,EventStageList_EventStageList.FIRST_EXTRA_TIME,EventStageList_EventStageList.SECOND_EXTRA_TIME],this.sportsWithCountedGameTime=[SportList_SportList.SOCCER,SportList_SportList.BANDY,SportList_SportList.RUGBY_LEAGUE,SportList_SportList.RUGBY_UNION,SportList_SportList.AUSSIE_RULES]}return GameTimeImpl.prototype.hasStageWithTime=function(eventStage){return this.stagesWithGameTime.includes(eventStage)},GameTimeImpl.prototype.isExtraTime=function(eventStage){return this.stagesExtraTime.includes(eventStage)},GameTimeImpl.prototype.displayBlink=function(eventItem){var hasSportGameTime=null!=eventItem.getGameTime()&&Number(eventItem.getGameTime())>0,hasStageWithTime=this.hasStageWithTime(eventItem.getStage()),blinkInsertedGameTime=hasSportGameTime&&hasStageWithTime,blinkCountedGameTime=this.sportsWithCountedGameTime.includes(eventItem.getSportId())&&hasStageWithTime;return blinkInsertedGameTime||blinkCountedGameTime},GameTimeImpl.prototype.getBlink=function(eventItem){return this.displayBlink(eventItem)?'<span class="blink">&nbsp;</span>':""},GameTimeImpl}(),coreDebugger=__webpack_require__(9042),extendStatics=function(d,b){return extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)Object.prototype.hasOwnProperty.call(b,p)&&(d[p]=b[p])},extendStatics(d,b)};function tslib_es6_extends(d,b){if("function"!=typeof b&&null!==b)throw new TypeError("Class extends value "+String(b)+" is not a constructor or null");function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}function tslib_es6_awaiter(thisArg,_arguments,P,generator){return new(P||(P=Promise))((function(resolve,reject){function fulfilled(value){try{step(generator.next(value))}catch(e){reject(e)}}function rejected(value){try{step(generator.throw(value))}catch(e){reject(e)}}function step(result){var value;result.done?resolve(result.value):(value=result.value,value instanceof P?value:new P((function(resolve){resolve(value)}))).then(fulfilled,rejected)}step((generator=generator.apply(thisArg,_arguments||[])).next())}))}function tslib_es6_generator(thisArg,body){var f,y,t,g,_={label:0,sent:function(){if(1&t[0])throw t[1];return t[1]},trys:[],ops:[]};return g={next:verb(0),throw:verb(1),return:verb(2)},"function"==typeof Symbol&&(g[Symbol.iterator]=function(){return this}),g;function verb(n){return function(v){return function(op){if(f)throw new TypeError("Generator is already executing.");for(;g&&(g=0,op[0]&&(_=0)),_;)try{if(f=1,y&&(t=2&op[0]?y.return:op[0]?y.throw||((t=y.return)&&t.call(y),0):y.next)&&!(t=t.call(y,op[1])).done)return t;switch(y=0,t&&(op=[2&op[0],t.value]),op[0]){case 0:case 1:t=op;break;case 4:return _.label++,{value:op[1],done:!1};case 5:_.label++,y=op[1],op=[0];continue;case 7:op=_.ops.pop(),_.trys.pop();continue;default:if(!(t=_.trys,(t=t.length>0&&t[t.length-1])||6!==op[0]&&2!==op[0])){_=0;continue}if(3===op[0]&&(!t||op[1]>t[0]&&op[1]<t[3])){_.label=op[1];break}if(6===op[0]&&_.label<t[1]){_.label=t[1],t=op;break}if(t&&_.label<t[2]){_.label=t[2],_.ops.push(op);break}t[2]&&_.ops.pop(),_.trys.pop();continue}op=body.call(thisArg,_)}catch(e){op=[6,e],y=0}finally{f=t=0}if(5&op[0])throw op[1];return{value:op[0]?op[1]:void 0,done:!0}}([n,v])}}}Object.create;function __values(o){var s="function"==typeof Symbol&&Symbol.iterator,m=s&&o[s],i=0;if(m)return m.call(o);if(o&&"number"==typeof o.length)return{next:function(){return o&&i>=o.length&&(o=void 0),{value:o&&o[i++],done:!o}}};throw new TypeError(s?"Object is not iterable.":"Symbol.iterator is not defined.")}function tslib_es6_read(o,n){var m="function"==typeof Symbol&&o[Symbol.iterator];if(!m)return o;var r,e,i=m.call(o),ar=[];try{for(;(void 0===n||n-- >0)&&!(r=i.next()).done;)ar.push(r.value)}catch(error){e={error}}finally{try{r&&!r.done&&(m=i.return)&&m.call(i)}finally{if(e)throw e.error}}return ar}function __spreadArray(to,from,pack){if(pack||2===arguments.length)for(var ar,i=0,l=from.length;i<l;i++)!ar&&i in from||(ar||(ar=Array.prototype.slice.call(from,0,i)),ar[i]=from[i]);return to.concat(ar||Array.prototype.slice.call(from))}function __await(v){return this instanceof __await?(this.v=v,this):new __await(v)}function __asyncGenerator(thisArg,_arguments,generator){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var i,g=generator.apply(thisArg,_arguments||[]),q=[];return i={},verb("next"),verb("throw"),verb("return"),i[Symbol.asyncIterator]=function(){return this},i;function verb(n){g[n]&&(i[n]=function(v){return new Promise((function(a,b){q.push([n,v,a,b])>1||resume(n,v)}))})}function resume(n,v){try{(r=g[n](v)).value instanceof __await?Promise.resolve(r.value.v).then(fulfill,reject):settle(q[0][2],r)}catch(e){settle(q[0][3],e)}var r}function fulfill(value){resume("next",value)}function reject(value){resume("throw",value)}function settle(f,v){f(v),q.shift(),q.length&&resume(q[0][0],q[0][1])}}function __asyncValues(o){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var i,m=o[Symbol.asyncIterator];return m?m.call(o):(o=__values(o),i={},verb("next"),verb("throw"),verb("return"),i[Symbol.asyncIterator]=function(){return this},i);function verb(n){i[n]=o[n]&&function(v){return new Promise((function(resolve,reject){(function(resolve,reject,d,v){Promise.resolve(v).then((function(v){resolve({value:v,done:d})}),reject)})(resolve,reject,(v=o[n](v)).done,v.value)}))}}}Object.create;function isFunction_isFunction(value){return"function"==typeof value}function createErrorClass(createImpl){var ctorFunc=createImpl((function(instance){Error.call(instance),instance.stack=(new Error).stack}));return ctorFunc.prototype=Object.create(Error.prototype),ctorFunc.prototype.constructor=ctorFunc,ctorFunc}var UnsubscriptionError=createErrorClass((function(_super){return function(errors){_super(this),this.message=errors?errors.length+" errors occurred during unsubscription:\n"+errors.map((function(err,i){return i+1+") "+err.toString()})).join("\n  "):"",this.name="UnsubscriptionError",this.errors=errors}}));function arrRemove(arr,item){if(arr){var index=arr.indexOf(item);0<=index&&arr.splice(index,1)}}var Subscription=function(){function Subscription(initialTeardown){this.initialTeardown=initialTeardown,this.closed=!1,this._parentage=null,this._finalizers=null}return Subscription.prototype.unsubscribe=function(){var e_1,_a,e_2,_b,errors;if(!this.closed){this.closed=!0;var _parentage=this._parentage;if(_parentage)if(this._parentage=null,Array.isArray(_parentage))try{for(var _parentage_1=__values(_parentage),_parentage_1_1=_parentage_1.next();!_parentage_1_1.done;_parentage_1_1=_parentage_1.next()){_parentage_1_1.value.remove(this)}}catch(e_1_1){e_1={error:e_1_1}}finally{try{_parentage_1_1&&!_parentage_1_1.done&&(_a=_parentage_1.return)&&_a.call(_parentage_1)}finally{if(e_1)throw e_1.error}}else _parentage.remove(this);var initialFinalizer=this.initialTeardown;if(isFunction_isFunction(initialFinalizer))try{initialFinalizer()}catch(e){errors=e instanceof UnsubscriptionError?e.errors:[e]}var _finalizers=this._finalizers;if(_finalizers){this._finalizers=null;try{for(var _finalizers_1=__values(_finalizers),_finalizers_1_1=_finalizers_1.next();!_finalizers_1_1.done;_finalizers_1_1=_finalizers_1.next()){var finalizer=_finalizers_1_1.value;try{execFinalizer(finalizer)}catch(err){errors=null!=errors?errors:[],err instanceof UnsubscriptionError?errors=__spreadArray(__spreadArray([],tslib_es6_read(errors)),tslib_es6_read(err.errors)):errors.push(err)}}}catch(e_2_1){e_2={error:e_2_1}}finally{try{_finalizers_1_1&&!_finalizers_1_1.done&&(_b=_finalizers_1.return)&&_b.call(_finalizers_1)}finally{if(e_2)throw e_2.error}}}if(errors)throw new UnsubscriptionError(errors)}},Subscription.prototype.add=function(teardown){var _a;if(teardown&&teardown!==this)if(this.closed)execFinalizer(teardown);else{if(teardown instanceof Subscription){if(teardown.closed||teardown._hasParent(this))return;teardown._addParent(this)}(this._finalizers=null!==(_a=this._finalizers)&&void 0!==_a?_a:[]).push(teardown)}},Subscription.prototype._hasParent=function(parent){var _parentage=this._parentage;return _parentage===parent||Array.isArray(_parentage)&&_parentage.includes(parent)},Subscription.prototype._addParent=function(parent){var _parentage=this._parentage;this._parentage=Array.isArray(_parentage)?(_parentage.push(parent),_parentage):_parentage?[_parentage,parent]:parent},Subscription.prototype._removeParent=function(parent){var _parentage=this._parentage;_parentage===parent?this._parentage=null:Array.isArray(_parentage)&&arrRemove(_parentage,parent)},Subscription.prototype.remove=function(teardown){var _finalizers=this._finalizers;_finalizers&&arrRemove(_finalizers,teardown),teardown instanceof Subscription&&teardown._removeParent(this)},Subscription.EMPTY=function(){var empty=new Subscription;return empty.closed=!0,empty}(),Subscription}(),EMPTY_SUBSCRIPTION=Subscription.EMPTY;function isSubscription(value){return value instanceof Subscription||value&&"closed"in value&&isFunction_isFunction(value.remove)&&isFunction_isFunction(value.add)&&isFunction_isFunction(value.unsubscribe)}function execFinalizer(finalizer){isFunction_isFunction(finalizer)?finalizer():finalizer.unsubscribe()}var config={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1},timeoutProvider={setTimeout:function(handler,timeout){for(var args=[],_i=2;_i<arguments.length;_i++)args[_i-2]=arguments[_i];var delegate=timeoutProvider.delegate;return(null==delegate?void 0:delegate.setTimeout)?delegate.setTimeout.apply(delegate,__spreadArray([handler,timeout],tslib_es6_read(args))):setTimeout.apply(void 0,__spreadArray([handler,timeout],tslib_es6_read(args)))},clearTimeout:function(handle){var delegate=timeoutProvider.delegate;return((null==delegate?void 0:delegate.clearTimeout)||clearTimeout)(handle)},delegate:void 0};function reportUnhandledError(err){timeoutProvider.setTimeout((function(){var onUnhandledError=config.onUnhandledError;if(!onUnhandledError)throw err;onUnhandledError(err)}))}function noop(){}var COMPLETE_NOTIFICATION=createNotification("C",void 0,void 0);function createNotification(kind,value,error){return{kind,value,error}}var context=null;function errorContext(cb){if(config.useDeprecatedSynchronousErrorHandling){var isRoot=!context;if(isRoot&&(context={errorThrown:!1,error:null}),cb(),isRoot){var _a=context,errorThrown=_a.errorThrown,error=_a.error;if(context=null,errorThrown)throw error}}else cb()}var Subscriber=function(_super){function Subscriber(destination){var _this=_super.call(this)||this;return _this.isStopped=!1,destination?(_this.destination=destination,isSubscription(destination)&&destination.add(_this)):_this.destination=EMPTY_OBSERVER,_this}return tslib_es6_extends(Subscriber,_super),Subscriber.create=function(next,error,complete){return new SafeSubscriber(next,error,complete)},Subscriber.prototype.next=function(value){this.isStopped?handleStoppedNotification(function(value){return createNotification("N",value,void 0)}(value),this):this._next(value)},Subscriber.prototype.error=function(err){this.isStopped?handleStoppedNotification(createNotification("E",void 0,err),this):(this.isStopped=!0,this._error(err))},Subscriber.prototype.complete=function(){this.isStopped?handleStoppedNotification(COMPLETE_NOTIFICATION,this):(this.isStopped=!0,this._complete())},Subscriber.prototype.unsubscribe=function(){this.closed||(this.isStopped=!0,_super.prototype.unsubscribe.call(this),this.destination=null)},Subscriber.prototype._next=function(value){this.destination.next(value)},Subscriber.prototype._error=function(err){try{this.destination.error(err)}finally{this.unsubscribe()}},Subscriber.prototype._complete=function(){try{this.destination.complete()}finally{this.unsubscribe()}},Subscriber}(Subscription),_bind=Function.prototype.bind;function bind(fn,thisArg){return _bind.call(fn,thisArg)}var ConsumerObserver=function(){function ConsumerObserver(partialObserver){this.partialObserver=partialObserver}return ConsumerObserver.prototype.next=function(value){var partialObserver=this.partialObserver;if(partialObserver.next)try{partialObserver.next(value)}catch(error){handleUnhandledError(error)}},ConsumerObserver.prototype.error=function(err){var partialObserver=this.partialObserver;if(partialObserver.error)try{partialObserver.error(err)}catch(error){handleUnhandledError(error)}else handleUnhandledError(err)},ConsumerObserver.prototype.complete=function(){var partialObserver=this.partialObserver;if(partialObserver.complete)try{partialObserver.complete()}catch(error){handleUnhandledError(error)}},ConsumerObserver}(),SafeSubscriber=function(_super){function SafeSubscriber(observerOrNext,error,complete){var partialObserver,context_1,_this=_super.call(this)||this;isFunction_isFunction(observerOrNext)||!observerOrNext?partialObserver={next:null!=observerOrNext?observerOrNext:void 0,error:null!=error?error:void 0,complete:null!=complete?complete:void 0}:_this&&config.useDeprecatedNextContext?((context_1=Object.create(observerOrNext)).unsubscribe=function(){return _this.unsubscribe()},partialObserver={next:observerOrNext.next&&bind(observerOrNext.next,context_1),error:observerOrNext.error&&bind(observerOrNext.error,context_1),complete:observerOrNext.complete&&bind(observerOrNext.complete,context_1)}):partialObserver=observerOrNext;return _this.destination=new ConsumerObserver(partialObserver),_this}return tslib_es6_extends(SafeSubscriber,_super),SafeSubscriber}(Subscriber);function handleUnhandledError(error){var err;config.useDeprecatedSynchronousErrorHandling?(err=error,config.useDeprecatedSynchronousErrorHandling&&context&&(context.errorThrown=!0,context.error=err)):reportUnhandledError(error)}function handleStoppedNotification(notification,subscriber){var onStoppedNotification=config.onStoppedNotification;onStoppedNotification&&timeoutProvider.setTimeout((function(){return onStoppedNotification(notification,subscriber)}))}var EMPTY_OBSERVER={closed:!0,next:noop,error:function(err){throw err},complete:noop},observable="function"==typeof Symbol&&Symbol.observable||"@@observable";function identity(x){return x}function pipeFromArray(fns){return 0===fns.length?identity:1===fns.length?fns[0]:function(input){return fns.reduce((function(prev,fn){return fn(prev)}),input)}}var Observable_Observable=function(){function Observable(subscribe){subscribe&&(this._subscribe=subscribe)}return Observable.prototype.lift=function(operator){var observable=new Observable;return observable.source=this,observable.operator=operator,observable},Observable.prototype.subscribe=function(observerOrNext,error,complete){var value,_this=this,subscriber=(value=observerOrNext)&&value instanceof Subscriber||function(value){return value&&isFunction_isFunction(value.next)&&isFunction_isFunction(value.error)&&isFunction_isFunction(value.complete)}(value)&&isSubscription(value)?observerOrNext:new SafeSubscriber(observerOrNext,error,complete);return errorContext((function(){var _a=_this,operator=_a.operator,source=_a.source;subscriber.add(operator?operator.call(subscriber,source):source?_this._subscribe(subscriber):_this._trySubscribe(subscriber))})),subscriber},Observable.prototype._trySubscribe=function(sink){try{return this._subscribe(sink)}catch(err){sink.error(err)}},Observable.prototype.forEach=function(next,promiseCtor){var _this=this;return new(promiseCtor=getPromiseCtor(promiseCtor))((function(resolve,reject){var subscriber=new SafeSubscriber({next:function(value){try{next(value)}catch(err){reject(err),subscriber.unsubscribe()}},error:reject,complete:resolve});_this.subscribe(subscriber)}))},Observable.prototype._subscribe=function(subscriber){var _a;return null===(_a=this.source)||void 0===_a?void 0:_a.subscribe(subscriber)},Observable.prototype[observable]=function(){return this},Observable.prototype.pipe=function(){for(var operations=[],_i=0;_i<arguments.length;_i++)operations[_i]=arguments[_i];return pipeFromArray(operations)(this)},Observable.prototype.toPromise=function(promiseCtor){var _this=this;return new(promiseCtor=getPromiseCtor(promiseCtor))((function(resolve,reject){var value;_this.subscribe((function(x){return value=x}),(function(err){return reject(err)}),(function(){return resolve(value)}))}))},Observable.create=function(subscribe){return new Observable(subscribe)},Observable}();function getPromiseCtor(promiseCtor){var _a;return null!==(_a=null!=promiseCtor?promiseCtor:config.Promise)&&void 0!==_a?_a:Promise}var EventTrackerEventType,AffilClickEventNames,ObjectUnsubscribedError=createErrorClass((function(_super){return function(){_super(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"}})),Subject_Subject=function(_super){function Subject(){var _this=_super.call(this)||this;return _this.closed=!1,_this.currentObservers=null,_this.observers=[],_this.isStopped=!1,_this.hasError=!1,_this.thrownError=null,_this}return tslib_es6_extends(Subject,_super),Subject.prototype.lift=function(operator){var subject=new AnonymousSubject(this,this);return subject.operator=operator,subject},Subject.prototype._throwIfClosed=function(){if(this.closed)throw new ObjectUnsubscribedError},Subject.prototype.next=function(value){var _this=this;errorContext((function(){var e_1,_a;if(_this._throwIfClosed(),!_this.isStopped){_this.currentObservers||(_this.currentObservers=Array.from(_this.observers));try{for(var _b=__values(_this.currentObservers),_c=_b.next();!_c.done;_c=_b.next()){_c.value.next(value)}}catch(e_1_1){e_1={error:e_1_1}}finally{try{_c&&!_c.done&&(_a=_b.return)&&_a.call(_b)}finally{if(e_1)throw e_1.error}}}}))},Subject.prototype.error=function(err){var _this=this;errorContext((function(){if(_this._throwIfClosed(),!_this.isStopped){_this.hasError=_this.isStopped=!0,_this.thrownError=err;for(var observers=_this.observers;observers.length;)observers.shift().error(err)}}))},Subject.prototype.complete=function(){var _this=this;errorContext((function(){if(_this._throwIfClosed(),!_this.isStopped){_this.isStopped=!0;for(var observers=_this.observers;observers.length;)observers.shift().complete()}}))},Subject.prototype.unsubscribe=function(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null},Object.defineProperty(Subject.prototype,"observed",{get:function(){var _a;return(null===(_a=this.observers)||void 0===_a?void 0:_a.length)>0},enumerable:!1,configurable:!0}),Subject.prototype._trySubscribe=function(subscriber){return this._throwIfClosed(),_super.prototype._trySubscribe.call(this,subscriber)},Subject.prototype._subscribe=function(subscriber){return this._throwIfClosed(),this._checkFinalizedStatuses(subscriber),this._innerSubscribe(subscriber)},Subject.prototype._innerSubscribe=function(subscriber){var _this=this,hasError=this.hasError,isStopped=this.isStopped,observers=this.observers;return hasError||isStopped?EMPTY_SUBSCRIPTION:(this.currentObservers=null,observers.push(subscriber),new Subscription((function(){_this.currentObservers=null,arrRemove(observers,subscriber)})))},Subject.prototype._checkFinalizedStatuses=function(subscriber){var hasError=this.hasError,thrownError=this.thrownError,isStopped=this.isStopped;hasError?subscriber.error(thrownError):isStopped&&subscriber.complete()},Subject.prototype.asObservable=function(){var observable=new Observable_Observable;return observable.source=this,observable},Subject.create=function(destination,source){return new AnonymousSubject(destination,source)},Subject}(Observable_Observable),AnonymousSubject=function(_super){function AnonymousSubject(destination,source){var _this=_super.call(this)||this;return _this.destination=destination,_this.source=source,_this}return tslib_es6_extends(AnonymousSubject,_super),AnonymousSubject.prototype.next=function(value){var _a,_b;null===(_b=null===(_a=this.destination)||void 0===_a?void 0:_a.next)||void 0===_b||_b.call(_a,value)},AnonymousSubject.prototype.error=function(err){var _a,_b;null===(_b=null===(_a=this.destination)||void 0===_a?void 0:_a.error)||void 0===_b||_b.call(_a,err)},AnonymousSubject.prototype.complete=function(){var _a,_b;null===(_b=null===(_a=this.destination)||void 0===_a?void 0:_a.complete)||void 0===_b||_b.call(_a)},AnonymousSubject.prototype._subscribe=function(subscriber){var _a,_b;return null!==(_b=null===(_a=this.source)||void 0===_a?void 0:_a.subscribe(subscriber))&&void 0!==_b?_b:EMPTY_SUBSCRIPTION},AnonymousSubject}(Subject_Subject);!function(EventTrackerEventType){EventTrackerEventType.ARTICLE_MATCH_NEWS_CLICK="CLICK_ARTICLE_MATCH_NEWS",EventTrackerEventType.ARTICLE_TEAM_NEWS_CLICK="CLICK_ARTICLE_TEAM_NEWS",EventTrackerEventType.BANNER_CLICK="CLICK_BANNER",EventTrackerEventType.CALENDAR_CURRENT_DAY="SCN_DAY",EventTrackerEventType.CALENDAR_NEXT_DAY="SCN_DAY_NEXT",EventTrackerEventType.CALENDAR_PREVIOUS_DAY="SCN_DAY_PREV",EventTrackerEventType.DETAIL_AUDIO_CLICK="detail-audio-click",EventTrackerEventType.FEATURE_REGISTRATION_CLICK="CLICK_FEATURE_REGISTRATION",EventTrackerEventType.HIGHLIGHT_CLICK="CLICK_HIGHLIGHT",EventTrackerEventType.ICON_CLICK="CLICK_ICON",EventTrackerEventType.IFRAME_CLICK="iframe-click",EventTrackerEventType.LEAGUE_EVENT_ICON_CLICK="CLICK_ICON",EventTrackerEventType.LOGIN_FORM_VALIDATION_ERROR="LOGIN_FORM_VALIDATION_ERROR",EventTrackerEventType.MATCH_DETAIL_IFRAME_CLICK="iframe-click",EventTrackerEventType.MISSING_MATCH_ODDS_PREVIEW="missing_mop",EventTrackerEventType.MOVE_OVER_ICON="OVER_ICON",EventTrackerEventType.MYFS_SETTINGS_SORT_BY_SPORT="SETT_ORDER_BY",EventTrackerEventType.MYFS_SETTINGS_SHOW_ODDS="SETT_ODD",EventTrackerEventType.MYFS_SETTINGS_SKIP_FAVOURITES="SETT_REMOVE_FAVS",EventTrackerEventType.MYFS_SETTINGS_DISPLAY_GROUPS="SETT_GROUPS",EventTrackerEventType.MY_GAMES_NOTIFICATION="NOTIF_IMP",EventTrackerEventType.MY_GAMES_ADD="ADD_MY_GAMES",EventTrackerEventType.MY_GAMES_REMOVE="REMOVE_MY_GAMES",EventTrackerEventType.MY_GAMES_GROUP_COLLAPSE="COLLAPSE_UNGROUPED",EventTrackerEventType.MY_GAMES_LEAGUES_ADD="ADD_MY_GAMES_LEAGUE",EventTrackerEventType.MY_GAMES_LEAGUES_REMOVE="REMOVE_MY_GAMES_LEAGUE",EventTrackerEventType.MY_LEAGUES_ADD="ADD_MY_LEAGUES",EventTrackerEventType.MY_LEAGUES_REMOVE="REMOVE_MY_LEAGUES",EventTrackerEventType.MY_TEAM_ADD="ADD_MY_TEAM",EventTrackerEventType.MY_TEAM_REMOVE="REMOVE_MY_TEAM",EventTrackerEventType.NOTIFICATION_CLICK="NOTIF_CLICK",EventTrackerEventType.NOTIFICATION_CLOSE="NOTIF_CLOSE",EventTrackerEventType.ODD_CLICK="CLICK_ODD",EventTrackerEventType.ODD_LIVETABLE_CLICK="SCN_EVENT_CLICK_ODD",EventTrackerEventType.ONBOARDING="OPEN_FAV_ONBOARDING",EventTrackerEventType.OPEN_FAV_SECTION="OPEN_FAV_SECTION",EventTrackerEventType.PARTICIPANT_NAV_TAB_LINK_CLICK="SCN_TAB_PARTICIPANT",EventTrackerEventType.PREVIEW_CLICK="CLICK_PREVIEW",EventTrackerEventType.PREVIEW_SHOW="SHOW_PREVIEW",EventTrackerEventType.RECOMBOX_CLICK="click_recommending_box",EventTrackerEventType.REGISTRATION_PROMPT_INCENTIVE_SHOW="REG_INCENTIVE_SHOW",EventTrackerEventType.REGISTRATION_PROMPT_INCENTIVE_CLICK="REG_INCENTIVE_CLICK",EventTrackerEventType.SCROLL_TO_TOP_NAVIGATION="navigation",EventTrackerEventType.SET_LEGAL_AGE="SET_LEGAL_AGE",EventTrackerEventType.SEARCH_MODAL="SCN_SEARCH",EventTrackerEventType.SETTINGS_CLICK="CLICK_SETTINGS",EventTrackerEventType.TAB_ON_DETAIL="SCN_TAB_DETAIL",EventTrackerEventType.TAB_ON_DETAIL_ODDS="SCN_TAB_DETAIL_ODDS",EventTrackerEventType.TAB_ON_MYFS="SCN_TAB_MAIN_FAV",EventTrackerEventType.TAB_ON_MYFS_MATCHES="SCN_TAB_MAIN_FAV_MATCHES",EventTrackerEventType.TAB_ON_SCORES="SCN_TAB_MAIN",EventTrackerEventType.USER_CHANGED="uid_change",EventTrackerEventType.USER_LOGIN_SCREEN_BACK="USER_LOGIN_SCREEN_BACK",EventTrackerEventType.USER_MY="userMy",EventTrackerEventType.USER_PASSWORD_SCREEN_BACK="USER_PASSWORD_SCREEN_BACK",EventTrackerEventType.USER_PROFILE="USER_PROFILE",EventTrackerEventType.USER_PROVIDER_LOGIN="USER_PROVIDER_LOGIN",EventTrackerEventType.USER_REG_SCREEN_BACK="USER_REG_SCREEN_BACK",EventTrackerEventType.WEB_NOTIFICATION_STATUS="webNotificationStatus",EventTrackerEventType.YOUTUBE_LINK_CLICK="CLICK_YTB_LINK",EventTrackerEventType.AFFIL_CLICK="AFFIL_CLICK",EventTrackerEventType.LANGUAGE_DIALOG="LANGUAGE_DIALOG",EventTrackerEventType.SHOW_PREVIEW="SHOW_PREVIEW"}(EventTrackerEventType||(EventTrackerEventType={})),function(AffilClickEventNames){AffilClickEventNames.TOURNAMENT_BANNER="tournament_banner",AffilClickEventNames.TV_STREAM="tv_streaming",AffilClickEventNames.TV_ICON="tv_icon",AffilClickEventNames.LIVE_ICON="live_icon"}(AffilClickEventNames||(AffilClickEventNames={}));var MyLeaguesAction,EventTracker_assign=function(){return EventTracker_assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t},EventTracker_assign.apply(this,arguments)},EventTracker_read=function(o,n){var m="function"==typeof Symbol&&o[Symbol.iterator];if(!m)return o;var r,e,i=m.call(o),ar=[];try{for(;(void 0===n||n-- >0)&&!(r=i.next()).done;)ar.push(r.value)}catch(error){e={error}}finally{try{r&&!r.done&&(m=i.return)&&m.call(i)}finally{if(e)throw e.error}}return ar},EventTracker_spreadArray=function(to,from,pack){if(pack||2===arguments.length)for(var ar,i=0,l=from.length;i<l;i++)!ar&&i in from||(ar||(ar=Array.prototype.slice.call(from,0,i)),ar[i]=from[i]);return to.concat(ar||Array.prototype.slice.call(from))},getEventStageName=function(eventStageTypeId){switch(eventStageTypeId){case 1:return"scheduled";case 2:return"live";case 3:return"finished"}},EventTracker=function(){function EventTracker(){}return EventTracker.trackEvent=function(data){if("undefined"==typeof window)throw new Error("Window object is undefined. Use this method only on the client side.");window.dataLayer||(window.dataLayer=[]),window.dataLayer.push(data)},EventTracker.trackEventWithUserThemeInfo=function(data,darkModeLocal,userId){EventTracker.trackEvent(EventTracker_assign(EventTracker_assign({},data),{theme:darkModeLocal.isDarkModeEnabled()?"dark":"default","theme-user":darkModeLocal.isUserDefinedTheme(),"theme-browser":darkModeLocal.getPreferredDarkModeBasedOnBrowser()?"dark":"default",user_id:userId}))},EventTracker.trackEventWithMatchInfo=function(event,eventName,eventStageTypeId,sportName,data){void 0===eventStageTypeId&&(eventStageTypeId=window.event_stage_type_id),void 0===sportName&&(sportName=window.sport),void 0===data&&(data={}),EventTracker.trackEvent(EventTracker_assign({event,"event-value":data.eventValue,"event-name":eventName,"event-sport":sportName,"event-time":eventStageTypeId?getEventStageName(eventStageTypeId):void 0},data))},EventTracker.bindAdsCallbackClick=function(sportName){var currentElement;EventTracker_spreadArray([],EventTracker_read(document.getElementsByClassName("adsclick")),!1).forEach((function(element){element.addEventListener("click",(function(e){var _a,_b,_c,elm=e.target instanceof Element&&e.target.closest(".adsenvelope");elm&&EventTracker.trackEvent({event:EventTrackerEventType.BANNER_CLICK,bannerZoneId:elm.getAttribute("id")||"",bannerPosition:(null===(_a=elm.closest(".adscontent"))||void 0===_a?void 0:_a.getAttribute("id"))||"","event-sport":sportName,bannerId:(null===(_c=null===(_b=elm.getElementsByClassName("adscontent")[0])||void 0===_b?void 0:_b.getElementsByTagName("iframe")[0])||void 0===_c?void 0:_c.getAttribute("banner-id"))||""})}))})),EventTracker_spreadArray([],EventTracker_read(document.getElementsByClassName("adscontent")),!1).forEach((function(element){element.addEventListener("mouseenter",(function(e){currentElement=e.target})),element.addEventListener("mouseleave",(function(e){currentElement=null}))})),window.addEventListener("blur",(function(e){var _a,_b,_c,elm=currentElement instanceof Element&&currentElement.closest(".adsenvelope");elm&&EventTracker.trackEvent({event:EventTrackerEventType.BANNER_CLICK,bannerZoneId:elm.getAttribute("id")||"",bannerPosition:(null===(_a=elm.closest(".adscontent"))||void 0===_a?void 0:_a.getAttribute("id"))||"","event-sport":sportName,bannerId:(null===(_c=null===(_b=elm.getElementsByClassName("adscontent")[0])||void 0===_b?void 0:_b.getElementsByTagName("iframe")[0])||void 0===_c?void 0:_c.getAttribute("banner-id"))||""})}))},EventTracker.trackAffill=function(eventName,params){this.trackEvent({event:EventTrackerEventType.AFFIL_CLICK,"event-name":eventName,bookmaker_id:params.bookmakerId,advertiser_id:params.advertiserId})},EventTracker}(),MyLeagues_assign=function(){return MyLeagues_assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t},MyLeagues_assign.apply(this,arguments)},MyLeagues_values=function(o){var s="function"==typeof Symbol&&Symbol.iterator,m=s&&o[s],i=0;if(m)return m.call(o);if(o&&"number"==typeof o.length)return{next:function(){return o&&i>=o.length&&(o=void 0),{value:o&&o[i++],done:!o}}};throw new TypeError(s?"Object is not iterable.":"Symbol.iterator is not defined.")},MyLeagues_read=function(o,n){var m="function"==typeof Symbol&&o[Symbol.iterator];if(!m)return o;var r,e,i=m.call(o),ar=[];try{for(;(void 0===n||n-- >0)&&!(r=i.next()).done;)ar.push(r.value)}catch(error){e={error}}finally{try{r&&!r.done&&(m=i.return)&&m.call(i)}finally{if(e)throw e.error}}return ar},MyLeagues_spreadArray=function(to,from,pack){if(pack||2===arguments.length)for(var ar,i=0,l=from.length;i<l;i++)!ar&&i in from||(ar||(ar=Array.prototype.slice.call(from,0,i)),ar[i]=from[i]);return to.concat(ar||Array.prototype.slice.call(from))};!function(MyLeaguesAction){MyLeaguesAction.ADD="add",MyLeaguesAction.REMOVE="remove"}(MyLeaguesAction||(MyLeaguesAction={}));var LiveTableSettingsNotificationType,MyLeaguesFactory=function(){function MyLeaguesFactory(){}return MyLeaguesFactory.prototype.create=function(lsid,defaultTopLeagues,contextId,translations,utilSport,utilPage,utilEnvironment,fetchFunction,config){return new MyLeaguesImpl(lsid,defaultTopLeagues,contextId,translations,utilSport,utilPage,utilEnvironment,fetchFunction,config)},MyLeaguesFactory}(),MyLeaguesImpl=function(){function MyLeaguesImpl(lsid,defaultTopLeagues,contextId,translations,utilSport,utilPage,utilEnvironment,fetchFunction,config){void 0===defaultTopLeagues&&(defaultTopLeagues=[]),this.lsid=lsid,this.defaultTopLeagues=defaultTopLeagues,this.contextId=contextId,this.translations=translations,this.utilSport=utilSport,this.utilPage=utilPage,this.utilEnvironment=utilEnvironment,this.fetchFunction=fetchFunction,this.config=config,this.callbacks={},this.onChangeHandlers=new Subject_Subject,this.dataKey="myLeagues",this.toggleButtonClass=cjs.Api.config.get("app","pinned","enabled")?"pinMyLeague":"toggleMyLeague",this.tooltipDelegationClass="myLeaguesTooltipDelegation",this.unconfirmedToggles={},this.parentSelectorsForTooltip={},this.superTemplateDefinition={},this.useOnlyLocal=!1,this.tooltipObj=this.utilEnvironment.getTooltipObject(),this.parentSelectorsForTooltip={"#ls-search-window":!0,"#fscountry":!0,".tournament-page #my-leagues-list":!1,".tournament-page":!0},this.superTemplateDefinition=this.utilEnvironment.getSuperTemplateDefinition(),this.useOnlyLocal=cjs.Api.config.get("app","user_functions","use_only_local"),this.useOnlyLocal&&this.lsid.addDataKeyToLocalUsage(this.dataKey)}return MyLeaguesImpl.prototype.isFunction=function(fnct){return"[object Function]"==Object.prototype.toString.call(fnct)},MyLeaguesImpl.prototype.getLabelKey=function(sportId,tournamentTemplateKey){return"".concat(sportId,"_").concat(tournamentTemplateKey||"")},MyLeaguesImpl.prototype.getDataKey=function(labelKey){void 0===labelKey&&(labelKey="");var context=labelKey.replace(new RegExp("^([0-9]+)_.*"),"$1");return context?"".concat(this.dataKey,".").concat(context):"".concat(this.dataKey,".").concat(this.contextId)},MyLeaguesImpl.prototype.getToggleConfirmCallback=function(labelKey,callback){return void 0===callback&&(callback=function(){}),myLeagues=this,function(){delete myLeagues.unconfirmedToggles[labelKey],callback()};var myLeagues},MyLeaguesImpl.prototype.getToggleRollbackCallback=function(labelKey,adding){return void 0===adding&&(adding=!1),myLeagues=this,function(){if(!myLeagues.useOnlyLocal)return myLeagues.lsid.loggedIn()&&myLeagues.lsid.showTechnicalError(),myLeagues.runCallback(adding?MyLeaguesAction.REMOVE:MyLeaguesAction.ADD),myLeagues.reloadToggleIcons(labelKey)};var myLeagues},MyLeaguesImpl.prototype.createCallbackGroup=function(callbacks){return void 0===callbacks&&(callbacks=[]),function(){return callbacks.map((function(callback){return callback()}))}},MyLeaguesImpl.prototype.runCallback=function(triggerName){void 0===triggerName&&(triggerName=""),this.callbacks[triggerName]&&this.createCallbackGroup(this.callbacks[triggerName])(),this.onChangeHandlers.next()},MyLeaguesImpl.prototype.registerCallback=function(triggerName,callback){void 0===triggerName&&(triggerName=""),this.isFunction(callback)&&(this.callbacks[triggerName]||(this.callbacks[triggerName]=[]),this.callbacks[triggerName].push(callback))},MyLeaguesImpl.prototype.getOnChangeObservable=function(){return this.onChangeHandlers},MyLeaguesImpl.prototype.isTopByLabelKey=function(labelKey){return this.isTopByStorage(labelKey)},MyLeaguesImpl.prototype.isTop=function(sportId,tournamentTemplateKey,isTopByTournamentType){return this.isTopByStorage(this.getLabelKey(sportId,tournamentTemplateKey),isTopByTournamentType)},MyLeaguesImpl.prototype.isTopByStorage=function(labelKey,isTopByTournamentType){void 0===isTopByTournamentType&&(isTopByTournamentType=!1);var topLeagues=this.lsid.getData(this.getDataKey(labelKey));return topLeagues?topLeagues.hasOwnProperty(labelKey):!!this.defaultTopLeagues.includes(labelKey)||isTopByTournamentType},MyLeaguesImpl.prototype.getTopLabelKeys=function(){var e_1,_a,topLabelKey,sportId=this.utilSport.getMainSport(this.contextId),sportIds=this.utilSport.isGroupSport(sportId)?this.utilSport.getSportIdsInParentSport(sportId):[sportId],topLabelKeys=[];try{for(var _b=MyLeagues_values(Array.from(sportIds)),_c=_b.next();!_c.done;_c=_b.next()){sportId=_c.value;var dataKey="".concat(this.dataKey,".").concat(sportId),topLeagues=this.lsid.getData(dataKey);if(null!==topLeagues)for(topLabelKey in topLeagues)"used"!==topLabelKey&&topLabelKeys.push(topLabelKey);else topLabelKeys.push.apply(topLabelKeys,MyLeagues_spreadArray([],MyLeagues_read(this.getDefaultTopLeaguesBySportId(sportId)),!1))}}catch(e_1_1){e_1={error:e_1_1}}finally{try{_c&&!_c.done&&(_a=_b.return)&&_a.call(_b)}finally{if(e_1)throw e_1.error}}return topLabelKeys},MyLeaguesImpl.prototype.getToggleIconClass=function(labelKey,isTopByTournamentType){void 0===isTopByTournamentType&&(isTopByTournamentType=!1);var isPinnedEnabled=this.config.get("app","pinned","enabled"),iconClass="".concat(this.toggleButtonClass," ").concat(isPinnedEnabled?"":this.tooltipDelegationClass);return this.isTopByStorage(labelKey,isTopByTournamentType)&&(iconClass+=" active"),labelKey?"".concat(iconClass," ").concat(labelKey):iconClass},MyLeaguesImpl.prototype.getToggleIconTitle=function(labelKey,isTopByTournamentType){return void 0===isTopByTournamentType&&(isTopByTournamentType=!1),this.isTopByStorage(labelKey,isTopByTournamentType)?this.translations.remove:this.translations.add},MyLeaguesImpl.prototype.getToggleIcon=function(labelKey,isPinnedFromTournamentPage){if(void 0===isPinnedFromTournamentPage&&(isPinnedFromTournamentPage=!1),!labelKey)return"";var iconClass=this.getToggleIconClass(labelKey),iconTitle=this.getToggleIconTitle(labelKey),isPinnedEnabled=this.config.get("app","pinned","enabled"),pinStarClass=isPinnedEnabled?"pinMyLeague":"star--interactive",symbol=isPinnedEnabled?"/res/_fs/image/13_symbols/action.svg?".concat(this.config.get("css_serial"),"#pin"):"/res/_fs/image/13_symbols/action.svg#star";return iconClass.includes("active")?document.getElementById("tomyleagues").classList.add("heading__starElement--active"):document.getElementById("tomyleagues").classList.remove("heading__starElement--active"),isPinnedFromTournamentPage?'<div title="'.concat(iconTitle,'" class="myLeaguesTooltipDelegation heading__pinBox ').concat(labelKey,'" data-label-key="').concat(labelKey,'" onclick="cjs.myLeagues.toggleTop(\'').concat(labelKey,'\', event); return false;"><span class=" ').concat(pinStarClass," ").concat(iconClass,'"><svg><use xlink:href=').concat(symbol,'></svg></span><div class="heading__pinText">').concat(iconClass.includes("active")?"UNPIN":"PIN","</div></div>"):'<span title="'.concat(iconTitle,'" class=" ').concat(pinStarClass," ").concat(iconClass," ").concat(labelKey,'" data-label-key="').concat(labelKey,'" onclick="cjs.myLeagues.toggleTop(\'').concat(labelKey,"', event); return false;\"><svg><use xlink:href=").concat(symbol,"></svg></span>")},MyLeaguesImpl.prototype.reloadToggleIcons=function(labelKey){var _this=this;document.querySelectorAll(".".concat(this.toggleButtonClass,".").concat(CSS.escape(labelKey))).forEach((function(element){element.outerHTML=_this.getToggleIcon(labelKey)}))},MyLeaguesImpl.prototype.toggleTop=function(labelKey,event,withoutToggleIcons,callback,isTopByTournamentType){var _this=this;void 0===withoutToggleIcons&&(withoutToggleIcons=!1),void 0===callback&&(callback=function(){}),void 0===isTopByTournamentType&&(isTopByTournamentType=!1);var elementSelector="";if(!this.lsid.userFunctionsAreAvailable(this.dataKey)){var msgDiv=document.createElement("div");msgDiv.classList.add("lsid-messages"),msgDiv.classList.add("reg-version-two");var loginNeeded=document.createElement("div");loginNeeded.classList.add("message"),loginNeeded.classList.add("err"),loginNeeded.innerHTML=this.translations.loginNeeded,msgDiv.appendChild(loginNeeded);var loginJq=[{selector:"#login-content",functionName:"prepend",params:[msgDiv]}];return this.lsid.showDialog("login",loginJq),!1}if(!labelKey)return!1;if(this.unconfirmedToggles.hasOwnProperty(labelKey)||this.unconfirmedToggles.hasOwnProperty("ALL"))return!1;event&&(elementSelector=this.createSelectorFromEvent(event,["active"]));var elementIndex=this.getIndexFromSelectorAndEvent(elementSelector,event);this.unconfirmedToggles[labelKey]=!0;var confirmToggleCallback=this.getToggleConfirmCallback(labelKey,callback),dataKey=this.getDataKey(labelKey),topLeagues={};if(null==this.lsid.getData(dataKey)){var sportId=parseInt(labelKey.replace(new RegExp("^([0-9]+)_.*"),"$1"));topLeagues=this.getDefaultTopLeaguesBySportId(sportId).reduce((function(acc,key){var _a;return MyLeagues_assign(MyLeagues_assign({},acc),((_a={})[key]=!0,_a))}),{}),this.unconfirmedToggles.ALL=!0,confirmToggleCallback=this.getToggleConfirmCallback("ALL",callback),delete this.unconfirmedToggles[labelKey]}return function(topLeagues){if(void 0===topLeagues&&(topLeagues={}),Object.keys(topLeagues).map((function(topLeagueId){"boolean"!=typeof topLeagues[topLeagueId]&&(topLeagues[topLeagueId]=!0)})),elementSelector){var e=document.querySelectorAll(CSS.escape(elementSelector))[elementIndex];_this.tooltipObj.hide(e,event)}var isTop=_this.isTopByStorage(labelKey,isTopByTournamentType);if(isTop?_this.remove(labelKey,dataKey,topLeagues,confirmToggleCallback):_this.add(labelKey,dataKey,topLeagues,confirmToggleCallback),_this.trackClick(labelKey,isTop?EventTrackerEventType.MY_LEAGUES_REMOVE:EventTrackerEventType.MY_LEAGUES_ADD),withoutToggleIcons||_this.reloadToggleIcons(labelKey),elementSelector&&_this.tooltipOnElementCanBeDisplayed(elementSelector)){var element=document.querySelectorAll(CSS.escape(elementSelector));if(element.length)_this.tooltipObj.show(element[elementIndex],event,!0)}}(topLeagues),!0},MyLeaguesImpl.prototype.getDefaultTopLeaguesBySportId=function(sportId){return this.defaultTopLeagues.filter((function(labelKey){return labelKey.match(new RegExp("^".concat(sportId,"_.*")))}))},MyLeaguesImpl.prototype.add=function(labelKey,dataKey,topLeagues,confirmToggleCallback){var _this=this,toggleRollbackCallback=this.getToggleRollbackCallback(labelKey,!0),confirmCallback=function(){_this.runCallback(MyLeaguesAction.ADD),confirmToggleCallback()};0!==Object.keys(topLeagues).length?(topLeagues[labelKey]=!0,topLeagues.used=!0,this.lsid.storeData(topLeagues,dataKey,confirmCallback,this.createCallbackGroup([toggleRollbackCallback,confirmToggleCallback]))):this.lsid.storeData(!0,"".concat(dataKey,".").concat(labelKey),confirmCallback,this.createCallbackGroup([toggleRollbackCallback,confirmToggleCallback]))},MyLeaguesImpl.prototype.remove=function(labelKey,dataKey,topLeagues,confirmToggleCallback){var _this=this,toggleRollbackCallback=this.getToggleRollbackCallback(labelKey),confirmCallback=function(){_this.runCallback(MyLeaguesAction.REMOVE),confirmToggleCallback()};0!==Object.keys(topLeagues).length?(delete topLeagues[labelKey],topLeagues.used=!0,this.lsid.storeData(topLeagues,dataKey,confirmCallback,this.createCallbackGroup([toggleRollbackCallback,confirmToggleCallback]))):this.lsid.removeData("".concat(dataKey,".").concat(labelKey),confirmCallback,this.createCallbackGroup([toggleRollbackCallback,confirmToggleCallback]))},MyLeaguesImpl.prototype.tooltipOnElementCanBeDisplayed=function(elementSelector){if(!elementSelector)return!1;for(var parentSelector in this.parentSelectorsForTooltip){var isAllowed=this.parentSelectorsForTooltip[parentSelector],element=document.querySelector(CSS.escape(elementSelector));if(element)if(null!==element.closest(parentSelector))return isAllowed}return!1},MyLeaguesImpl.prototype.delegateTooltips=function(){var toggleButtonClassSelector=".".concat(this.tooltipDelegationClass),tooltipObject=this.tooltipObj;document.body.addEventListener("mouseenter",(function(e){e.target instanceof Element&&e.target.matches(toggleButtonClassSelector)&&tooltipObject.show(e.target,e,!0)}),!0),document.body.addEventListener("mouseleave",(function(e){e.target instanceof Element&&e.target.matches(toggleButtonClassSelector)&&tooltipObject.hide(e.target,e)}),!0)},MyLeaguesImpl.prototype.trackClick=function(labelKey,event){var _a=MyLeagues_read(Array.from(labelKey.split("_")),3),participantId=(_a[0],_a[1],_a[2]);EventTracker.trackEvent({event,"event-name":participantId,"event-sport":this.utilEnvironment.getSport()})},MyLeaguesImpl.prototype.createSelectorFromEvent=function(event,skippedClasses){var e_2,_a;if(void 0===skippedClasses&&(skippedClasses=[]),null==event||!Object.keys(event).length)return"";for(var path=function(){var path=[],node=event.target;do{node&&(path.push(node),"body"===(node=node.parentNode).nodeName.toLowerCase()&&(path.push(node),node=null))}while(node);return path}(),elements=[],index=0;index<path.length;index++){var element=path[index],elementName=element.nodeName.toLowerCase(),elementSelector="".concat(elementName),elementId=element.id;elementId&&(elementSelector+="#".concat(elementId));var elementClasses=[],classListItems=Array.from(element.classList);try{for(var classListItems_1=(e_2=void 0,MyLeagues_values(classListItems)),classListItems_1_1=classListItems_1.next();!classListItems_1_1.done;classListItems_1_1=classListItems_1.next()){var elementClass=classListItems_1_1.value;Array.from(skippedClasses).includes(elementClass)||elementClasses.push(elementClass)}}catch(e_2_1){e_2={error:e_2_1}}finally{try{classListItems_1_1&&!classListItems_1_1.done&&(_a=classListItems_1.return)&&_a.call(classListItems_1)}finally{if(e_2)throw e_2.error}}if(elementClasses.length&&(elementSelector+=".".concat(elementClasses.join("."))),elementSelector&&elements.unshift(elementSelector),"body"===elementName)break}return elements.join(" ")},MyLeaguesImpl.prototype.getIndexFromSelectorAndEvent=function(selector,event){if(!selector||!event)return 0;var end,index,element=document.querySelectorAll(CSS.escape(selector));for(index=0,end=Math.max(0,element.length-1);index>=end;index--){if(element[index]===event.currentTarget)break}return index},MyLeaguesImpl}();!function(LiveTableSettingsNotificationType){LiveTableSettingsNotificationType.SETTING_SHOW_WITH_SOUND="yessound",LiveTableSettingsNotificationType.SETTING_SHOW_WITHOUT_SOUND="yessilent",LiveTableSettingsNotificationType.SETTING_NOT_SHOW="no"}(LiveTableSettingsNotificationType||(LiveTableSettingsNotificationType={}));var CricketTypesList,LiveTableSettings_values=function(o){var s="function"==typeof Symbol&&Symbol.iterator,m=s&&o[s],i=0;if(m)return m.call(o);if(o&&"number"==typeof o.length)return{next:function(){return o&&i>=o.length&&(o=void 0),{value:o&&o[i++],done:!o}}};throw new TypeError(s?"Object is not iterable.":"Symbol.iterator is not defined.")},LiveTableSettings_read=function(o,n){var m="function"==typeof Symbol&&o[Symbol.iterator];if(!m)return o;var r,e,i=m.call(o),ar=[];try{for(;(void 0===n||n-- >0)&&!(r=i.next()).done;)ar.push(r.value)}catch(error){e={error}}finally{try{r&&!r.done&&(m=i.return)&&m.call(i)}finally{if(e)throw e.error}}return ar},LiveTableSettingsImpl=function(){function LiveTableSettingsImpl(){this.defConf={sortByTime:!1,mygamesGroups:!1,mygamesNotifications:LiveTableSettingsNotificationType.SETTING_SHOW_WITHOUT_SOUND},this.conf={},this.sortByTime=!1,this.mygamesGroups=!1,this.disableRedrawUserSettingsGetter=function(){return!1},this.categoryGetter=function(){return 0},this.redrawReactTimeoutId=null,this.sortFsData=function(){},this.settingsStorage=null}return LiveTableSettingsImpl.prototype.init=function(disableRedrawUserSettingsGetter,categoryGetter,sortFsData){this.disableRedrawUserSettingsGetter=disableRedrawUserSettingsGetter,this.categoryGetter=categoryGetter,this.sortFsData=sortFsData,this.settingsStorage=cjs.Api.settingsStorage,this.loadUserSettings()},LiveTableSettingsImpl.prototype.loadUserSettings=function(){this.restoreDefaults()},LiveTableSettingsImpl.prototype.loadSettingsFromObject=function(object){var e_1,_a;try{for(var _b=LiveTableSettings_values(Object.entries(object)),_c=_b.next();!_c.done;_c=_b.next()){var _d=LiveTableSettings_read(_c.value,2),key=_d[0],value=_d[1];switch(key){case"sortByTime":this.sortByTime=value;break;case"mygamesGroups":this.mygamesGroups=value;break;default:this.conf[key]=value}}}catch(e_1_1){e_1={error:e_1_1}}finally{try{_c&&!_c.done&&(_a=_b.return)&&_a.call(_b)}finally{if(e_1)throw e_1.error}}},LiveTableSettingsImpl.prototype.restoreDefaults=function(){var _a;this.loadSettingsFromObject(this.defConf);var localSettings=(null===(_a=this.settingsStorage)||void 0===_a?void 0:_a.restoreDefaultsFromStorage())||null;localSettings&&this.loadSettingsFromObject(localSettings)},LiveTableSettingsImpl.prototype.redrawLivescore=function(redrawFromOutside){var _this=this;if(void 0===redrawFromOutside&&(redrawFromOutside=!1),null==redrawFromOutside&&(redrawFromOutside=!1),!this.disableRedrawUserSettingsGetter()){this.sortFsData();var doubleRender=!0;redrawFromOutside&&(doubleRender=!1),this.redrawReactTimeoutId&&clearTimeout(this.redrawReactTimeoutId),cjs.Api.loader.get("reactCalls").call((function(reactCalls){_this.redrawReactTimeoutId=setTimeout((function(){reactCalls.forceRedrawTabContent(_this.categoryGetter(),doubleRender),reactCalls.reloadStaticContent()}),100)}))}},LiveTableSettingsImpl.prototype.setSortByTime=function(value){var _a;if(null==value&&(value=!1),this.sortByTime!==value){var key="".concat("lsSettins",".").concat("sortByTime");null===(_a=this.settingsStorage)||void 0===_a||_a.write(key,value),this.sortByTime=value,this.redrawLivescore()}},LiveTableSettingsImpl.prototype.isSortByTime=function(){return this.sortByTime},LiveTableSettingsImpl.prototype.setMygamesGroups=function(value){var _a;if(null==value&&(value=!1),this.mygamesGroups!==value){var key="".concat("lsSettins",".").concat("mygamesGroups");null===(_a=this.settingsStorage)||void 0===_a||_a.write(key,value),this.mygamesGroups=value,this.redrawLivescore()}},LiveTableSettingsImpl.prototype.isMyGamesGroupsEnabled=function(){return this.mygamesGroups},LiveTableSettingsImpl.prototype.setMygamesNotifications=function(value){var _a;if(null==value&&(value=LiveTableSettingsNotificationType.SETTING_SHOW_WITHOUT_SOUND),this.conf.mygamesNotifications!==value){var key="".concat("lsSettins",".mygamesNotifications");null===(_a=this.settingsStorage)||void 0===_a||_a.write(key,value),this.conf.mygamesNotifications=value,this.redrawLivescore()}},LiveTableSettingsImpl.prototype.getMyGamesNotifications=function(){return this.conf.mygamesNotifications?this.conf.mygamesNotifications:LiveTableSettingsNotificationType.SETTING_SHOW_WITHOUT_SOUND},LiveTableSettingsImpl}();!function(CricketTypesList){CricketTypesList[CricketTypesList.TEST=5149866]="TEST",CricketTypesList[CricketTypesList.ODI=5149867]="ODI",CricketTypesList[CricketTypesList.T20=5149868]="T20"}(CricketTypesList||(CricketTypesList={}));var SportNameList,CounterTime=function(){function CounterTime(currentTimestamp,reversedSportTime,gameTime){this._currentTimestamp=currentTimestamp,this._reversedSportTime=reversedSportTime,this._gameTime=gameTime}return CounterTime.prototype.getTime=function(eventItem){var _a,_b,_c,_d;if(!eventItem.isLive())return null;if(Number(eventItem.getGameTime())>0&&this._gameTime.hasStageWithTime(eventItem.getStage())){var gameTimeValue=eventItem.getGameTime(),gameTime=this._reversedSportTime.getTime(gameTimeValue,eventItem.getSportId(),eventItem.getStage(),eventItem.getDataStageTime());return gameTime<0?null:gameTime}if([SportList_SportList.SOCCER,SportList_SportList.BANDY].includes(eventItem.getSportId())){var conf=((_a={})[EventStageList_EventStageList.FIRST_HALF]={start:0,break:0},_a[EventStageList_EventStageList.SECOND_HALF]={start:45,break:15},_a[EventStageList_EventStageList.EXTRA_TIME]={start:90,break:30},_a);if((stage=eventItem.getStage())in conf)return this._computeGameTimeForStageWithBreaks(eventItem,conf[stage].start,conf[stage].break)}if([SportList_SportList.RUGBY_UNION,SportList_SportList.RUGBY_LEAGUE].includes(eventItem.getSportId())){conf=void 0;if(CounterTime._is7Rugby(eventItem)?((_b={})[EventStageList_EventStageList.FIRST_HALF]={start:0,break:0},_b[EventStageList_EventStageList.SECOND_HALF]={start:7,break:2},conf=_b):((_c={})[EventStageList_EventStageList.FIRST_HALF]={start:0,break:0},_c[EventStageList_EventStageList.SECOND_HALF]={start:40,break:10},conf=_c),(stage=eventItem.getStage())in conf)return this._computeGameTimeForStageWithBreaks(eventItem,conf[stage].start,conf[stage].break)}if(eventItem.getSportId()===SportList_SportList.AUSSIE_RULES){var stage;conf=((_d={})[EventStageList_EventStageList.FIRST_QUARTER]={start:0,break:0},_d[EventStageList_EventStageList.SECOND_QUARTER]={start:0,break:15},_d[EventStageList_EventStageList.THIRD_QUARTER]={start:0,break:15},_d[EventStageList_EventStageList.FOURTH_QUARTER]={start:0,break:15},_d[EventStageList_EventStageList.EXTRA_TIME]={start:0,break:15},_d);if((stage=eventItem.getStage())in conf)return this._computeGameTimeForStageWithBreaks(eventItem,conf[stage].start,conf[stage].break)}return null},CounterTime.prototype._computeGameTime=function(startTimestamp){var differenceInMinutes=(this._currentTimestamp-startTimestamp)/60;return differenceInMinutes<0?0:differenceInMinutes},CounterTime.prototype._computeGameTimeFromStartTime=function(startTimeTimestamp,stageStartTime,substractBreakTimes){void 0===stageStartTime&&(stageStartTime=0),void 0===substractBreakTimes&&(substractBreakTimes=0);var differenceInMinutesFromMatchStart=this._computeGameTime(startTimeTimestamp);return(differenceInMinutesFromMatchStart-=substractBreakTimes)<stageStartTime?stageStartTime:differenceInMinutesFromMatchStart},CounterTime.prototype._computeGameTimeForStageWithBreaks=function(eventItem,stageStart,breakTime){return 0!=eventItem.getStageStartUTime()?stageStart+this._computeGameTime(eventItem.getStageStartUTime())+1:this._computeGameTimeFromStartTime(eventItem.getStartTime(),stageStart,breakTime)},CounterTime._is7Rugby=function(eventItem){try{return 1==eventItem.getLeague().getIs7Rugby()}catch(err){return!1}},CounterTime}(),getSnookerFrameValue=function(homeResult,awayResult){return String((Number(homeResult)||0)+(Number(awayResult)||0)+1)};!function(SportNameList){SportNameList.UNKNOWN="",SportNameList.SOCCER="soccer",SportNameList.TENNIS="tennis",SportNameList.BASKETBALL="basketball",SportNameList.HOCKEY="hockey",SportNameList.AMERICAN_FOOTBALL="american-football",SportNameList.BASEBALL="baseball",SportNameList.HANDBALL="handball",SportNameList.RUGBY_UNION="rugby-union",SportNameList.FLOORBALL="floorball",SportNameList.BANDY="bandy",SportNameList.FUTSAL="futsal",SportNameList.VOLLEYBALL="volleyball",SportNameList.CRICKET="cricket",SportNameList.DARTS="darts",SportNameList.SNOOKER="snooker",SportNameList.BOXING="boxing",SportNameList.BEACH_VOLLEYBALL="beach-volleyball",SportNameList.AUSSIE_RULES="aussie-rules",SportNameList.RUGBY_LEAGUE="rugby-league",SportNameList.BADMINTON="badminton",SportNameList.WATER_POLO="water-polo",SportNameList.GOLF="golf",SportNameList.FIELD_HOCKEY="field-hockey",SportNameList.TABLE_TENNIS="table-tennis",SportNameList.BEACH_SOCCER="beach-soccer",SportNameList.MMA="mma",SportNameList.NETBALL="netball",SportNameList.PESAPALLO="pesapallo",SportNameList.MOTORSPORT="motorsport",SportNameList.MOTORSPORT_AUTO_RACING="motorsport-auto-racing",SportNameList.MOTORSPORT_MOTO_RACING="motorsport-moto-racing",SportNameList.MOTORSPORT_DAKAR_RACING="motorsport-dakar-racing",SportNameList.MOTORSPORT_SPEEDWAY_RACING="motorsport-speedway-racing",SportNameList.MOTORSPORT_WRC_RACING="motorsport-wrc-racing",SportNameList.CYCLING="cycling",SportNameList.HORSE_RACING="horse-racing",SportNameList.ESPORTS="esports",SportNameList.WINTER_SPORTS="winter-sports",SportNameList.WINTER_SPORTS_SKI_JUMPING="winter-sports-ski-jumping",SportNameList.WINTER_SPORTS_ALPINE_SKIING="winter-sports-alpine-skiing",SportNameList.WINTER_SPORTS_CROSS_COUNTRY="winter-sports-cross-country",SportNameList.WINTER_SPORTS_BIATHLON="winter-sports-biathlon",SportNameList.KABADDI="kabaddi"}(SportNameList||(SportNameList={}));var BroadcastChannelTypeList,CounterHandlerImpl=function(){function CounterHandlerImpl(utilNumber,utilTrans,utilDate,Helper_Darts,Helper_GameTime,reversedSportTime){this.reversedSportTime=reversedSportTime,this._utilTrans=utilTrans,this._utilNumber=utilNumber,this._utilDate=utilDate,this._helperDarts=Helper_Darts,this._helperGameTime=Helper_GameTime}return CounterHandlerImpl.prototype.getAussieRulesSportTime=function(eventItem,counterTime){return!(Number(eventItem.getGameTime())>0)&&Number(counterTime)>20?"".concat(20,"+"):String(null!=counterTime?counterTime:"")},CounterHandlerImpl.prototype.getFirstHalfDuration=function(eventItem){switch(eventItem.getSportId()){case SportList_SportList.RUGBY_UNION:case SportList_SportList.RUGBY_LEAGUE:return eventItem.getLeague().getIs7Rugby()?7:40;default:return 45}},CounterHandlerImpl.prototype.getSecondHalfDuration=function(eventItem){switch(eventItem.getSportId()){case SportList_SportList.RUGBY_UNION:case SportList_SportList.RUGBY_LEAGUE:return eventItem.getLeague().getIs7Rugby()?14:80;default:return 90}},CounterHandlerImpl.prototype.getSportTimeForSportsWithCountedGameTime=function(eventItem,counterTime){var sportTime=Number(counterTime),sportTimeText=String(null!=counterTime?counterTime:""),firstHalf=this.getFirstHalfDuration(eventItem),secondHalf=this.getSecondHalfDuration(eventItem);switch(eventItem.getStage()){case EventStageList_EventStageList.FIRST_HALF:return sportTime>firstHalf?"".concat(firstHalf,"+"):sportTimeText;case EventStageList_EventStageList.SECOND_HALF:return sportTime>secondHalf?"".concat(secondHalf,"+"):sportTimeText;case EventStageList_EventStageList.EXTRA_TIME:return[SportList_SportList.SOCCER,SportList_SportList.BANDY].includes(eventItem.getSportId())&&sportTime>120?"".concat(120,"+"):sportTimeText;default:return sportTimeText}},CounterHandlerImpl.prototype.getMinutesDiff=function(eventItem,counterTime){var sportTime=Number(counterTime),firstHalf=this.getFirstHalfDuration(eventItem),secondHalf=this.getSecondHalfDuration(eventItem);switch(eventItem.getStage()){case EventStageList_EventStageList.FIRST_HALF:return sportTime>firstHalf?sportTime-firstHalf:0;case EventStageList_EventStageList.SECOND_HALF:return sportTime>secondHalf?sportTime-secondHalf:0;case EventStageList_EventStageList.EXTRA_TIME:return sportTime>120?sportTime-120:0;default:return 0}},CounterHandlerImpl.prototype.getSoccerSportTime=function(eventItem,counterTime){var sportTime=this.getSportTimeForSportsWithCountedGameTime(eventItem,counterTime),minutesDiff=this.getMinutesDiff(eventItem,counterTime);return eventItem.hasLiveCentre()&&minutesDiff>0&&[EventStageList_EventStageList.LIVE,EventStageList_EventStageList.FIRST_HALF,EventStageList_EventStageList.SECOND_HALF].includes(eventItem.getStage())?"".concat(sportTime).concat(minutesDiff):sportTime},CounterHandlerImpl.prototype.getCounterTime=function(eventItem){if(!this._helperGameTime.hasStageWithTime(eventItem.getStage()))return null;var counterTime=new CounterTime(this._utilDate.getTimestamp(),this.reversedSportTime,new GameTimeImpl).getTime(eventItem);return null!==counterTime?this._utilNumber.toNumber(Math.floor(counterTime)):null},CounterHandlerImpl.prototype.getSportTime=function(eventItem){var counterTime=this.getCounterTime(eventItem);switch(eventItem.getSportId()){case SportList_SportList.SOCCER:return this.getSoccerSportTime(eventItem,counterTime);case SportList_SportList.AUSSIE_RULES:return this.getAussieRulesSportTime(eventItem,counterTime);case SportList_SportList.BANDY:case SportList_SportList.RUGBY_LEAGUE:case SportList_SportList.RUGBY_UNION:return this.getSportTimeForSportsWithCountedGameTime(eventItem,counterTime);default:return String(counterTime||"")}},CounterHandlerImpl.prototype.getTranslatedStageBySport=function(eventItem,sportTranslations){var _a;if(eventItem.getSportId()===SportList_SportList.CRICKET&&[CricketTypesList.ODI,CricketTypesList.T20].includes(eventItem.getCricketGameTypeId())&&eventItem.hasService()&&eventItem.isFirstInning()){var participant3Char=eventItem.hasHomeService()?eventItem.getAway3CharName():eventItem.getHome3CharName();return this._utilTrans.translate("TRANS_CRICKET_MATCH_STATUS_IFRAME_3CHARINN",[participant3Char])}return(null===(_a=sportTranslations[function(sportId){switch(sportId){case SportList_SportList.SOCCER:return SportNameList.SOCCER;case SportList_SportList.TENNIS:return SportNameList.TENNIS;case SportList_SportList.BASKETBALL:return SportNameList.BASKETBALL;case SportList_SportList.HOCKEY:return SportNameList.HOCKEY;case SportList_SportList.AMERICAN_FOOTBALL:return SportNameList.AMERICAN_FOOTBALL;case SportList_SportList.BASEBALL:return SportNameList.BASEBALL;case SportList_SportList.HANDBALL:return SportNameList.HANDBALL;case SportList_SportList.RUGBY_UNION:return SportNameList.RUGBY_UNION;case SportList_SportList.FLOORBALL:return SportNameList.FLOORBALL;case SportList_SportList.BANDY:return SportNameList.BANDY;case SportList_SportList.FUTSAL:return SportNameList.FUTSAL;case SportList_SportList.VOLLEYBALL:return SportNameList.VOLLEYBALL;case SportList_SportList.CRICKET:return SportNameList.CRICKET;case SportList_SportList.DARTS:return SportNameList.DARTS;case SportList_SportList.SNOOKER:return SportNameList.SNOOKER;case SportList_SportList.BOXING:return SportNameList.BOXING;case SportList_SportList.BEACH_VOLLEYBALL:return SportNameList.BEACH_VOLLEYBALL;case SportList_SportList.AUSSIE_RULES:return SportNameList.AUSSIE_RULES;case SportList_SportList.RUGBY_LEAGUE:return SportNameList.RUGBY_LEAGUE;case SportList_SportList.BADMINTON:return SportNameList.BADMINTON;case SportList_SportList.WATER_POLO:return SportNameList.WATER_POLO;case SportList_SportList.GOLF:return SportNameList.GOLF;case SportList_SportList.FIELD_HOCKEY:return SportNameList.FIELD_HOCKEY;case SportList_SportList.TABLE_TENNIS:return SportNameList.TABLE_TENNIS;case SportList_SportList.BEACH_SOCCER:return SportNameList.BEACH_SOCCER;case SportList_SportList.MMA:return SportNameList.MMA;case SportList_SportList.NETBALL:return SportNameList.NETBALL;case SportList_SportList.PESAPALLO:return SportNameList.PESAPALLO;case SportList_SportList.MOTORSPORT:return SportNameList.MOTORSPORT;case SportList_SportList.MOTORSPORT_AUTO_RACING:return SportNameList.MOTORSPORT_AUTO_RACING;case SportList_SportList.MOTORSPORT_MOTO_RACING:return SportNameList.MOTORSPORT_MOTO_RACING;case SportList_SportList.CYCLING:return SportNameList.CYCLING;case SportList_SportList.HORSE_RACING:return SportNameList.HORSE_RACING;case SportList_SportList.ESPORTS:return SportNameList.ESPORTS;case SportList_SportList.WINTER_SPORTS:return SportNameList.WINTER_SPORTS;case SportList_SportList.WINTER_SPORTS_SKI_JUMPING:return SportNameList.WINTER_SPORTS_SKI_JUMPING;case SportList_SportList.WINTER_SPORTS_ALPINE_SKIING:return SportNameList.WINTER_SPORTS_ALPINE_SKIING;case SportList_SportList.WINTER_SPORTS_CROSS_COUNTRY:return SportNameList.WINTER_SPORTS_CROSS_COUNTRY;case SportList_SportList.WINTER_SPORTS_BIATHLON:return SportNameList.WINTER_SPORTS_BIATHLON;case SportList_SportList.KABADDI:return SportNameList.KABADDI;default:return SportNameList.UNKNOWN}}(eventItem.getSportId())])||void 0===_a?void 0:_a[eventItem.getStage()])||""},CounterHandlerImpl.prototype.getStageWithSportTime=function(eventItem,sportTranslations){var sportTime=this.getSportTime(eventItem),translatedStage=this.getTranslatedStageBySport(eventItem,sportTranslations),showStageInTimer=eventItem.getSportId()!==SportList_SportList.SOCCER||this._helperGameTime.isExtraTime(eventItem.getStage());return sportTime?(showStageInTimer?"".concat(translatedStage,"<br/>&nbsp;"):"")+sportTime+this._helperGameTime.getBlink(eventItem)+this.getSnookerFrameText(eventItem):eventItem.isDarts()?this._helperDarts.getStatus(translatedStage,eventItem.getStageType(),eventItem.getStatsResultsResultHome()||"",eventItem.getStatsResultsResultAway()||"",eventItem.isPlayingOnSets()):eventItem.getSportId()===SportList_SportList.SNOOKER?translatedStage+this.getSnookerFrameText(eventItem):translatedStage},CounterHandlerImpl.prototype.getSnookerFrameText=function(eventItem){return eventItem.getSportId()!==SportList_SportList.SNOOKER||eventItem.getStage()!==EventStageList_EventStageList.LIVE?"":"<br/>".concat((trans=this._utilTrans,homeResult=eventItem.getHomeScore(),awayResult=eventItem.getAwayScore(),trans.translate("TRANS_SNOOKER_FRAME_NUMBER",[getSnookerFrameValue(homeResult,awayResult)])));var trans,homeResult,awayResult},CounterHandlerImpl}(),UpcomingDrawItem_extends=function(){var _extendStatics=function(d,b){return _extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)Object.prototype.hasOwnProperty.call(b,p)&&(d[p]=b[p])},_extendStatics(d,b)};return function(d,b){if("function"!=typeof b&&null!==b)throw new TypeError("Class extends value "+String(b)+" is not a constructor or null");function __(){this.constructor=d}_extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}(),UpcomingDrawItemImpl=function(_super){function UpcomingDrawItemImpl(){var _this=_super.call(this)||this;return _this.eventStartTimes=[],_this}return UpcomingDrawItem_extends(UpcomingDrawItemImpl,_super),UpcomingDrawItemImpl.prototype.getSortKey=function(){return this.getTournamentStageId+"_"+(99-this.getLevel())},UpcomingDrawItemImpl.prototype.getEventsStartTime=function(){return this.eventStartTimes},UpcomingDrawItemImpl.prototype.addEventStartTime=function(value){this.getEventsStartTime().push(value)},UpcomingDrawItemImpl.prototype.getRoundName=function(){return this.getValue("UN")},UpcomingDrawItemImpl.prototype.getLevel=function(){return this.getValue("UL")},UpcomingDrawItemImpl.prototype.getTournamentStageId=function(){return this.getValue("ZC")},UpcomingDrawItemImpl.prototype.isFinal=function(){return!!this.getValue("UF")},UpcomingDrawItemImpl}(ItemImpl),hasHighlightProviderLiveStream=function(tvLiveStreaming){var highlightProviders=tvLiveStreaming.HP;return Boolean(null==highlightProviders?void 0:highlightProviders.length)};!function(BroadcastChannelTypeList){BroadcastChannelTypeList[BroadcastChannelTypeList.TV=1]="TV",BroadcastChannelTypeList[BroadcastChannelTypeList.BOOKMAKER=2]="BOOKMAKER",BroadcastChannelTypeList[BroadcastChannelTypeList.WWW=3]="WWW"}(BroadcastChannelTypeList||(BroadcastChannelTypeList={}));var BetslipValues,FsdsBetslipValues,FsdsLinkTypeValues,SourceTypeList,StatsDataTypeList,SuperTemplateList,parseData=function(dataToParse){if(!dataToParse)return null;try{return JSON.parse(dataToParse)}catch(e){return console.log("Error during data parsing: ",e),null}};!function(BetslipValues){BetslipValues[BetslipValues.OFF=0]="OFF",BetslipValues[BetslipValues.TYPE_BETSLIP=1]="TYPE_BETSLIP",BetslipValues[BetslipValues.TYPE_DEEPLINK=2]="TYPE_DEEPLINK"}(BetslipValues||(BetslipValues={})),function(FsdsBetslipValues){FsdsBetslipValues[FsdsBetslipValues.ON=1]="ON",FsdsBetslipValues[FsdsBetslipValues.OFF=2]="OFF"}(FsdsBetslipValues||(FsdsBetslipValues={})),function(FsdsLinkTypeValues){FsdsLinkTypeValues[FsdsLinkTypeValues.TYPE_BETSLIP=1]="TYPE_BETSLIP",FsdsLinkTypeValues[FsdsLinkTypeValues.TYPE_DEEPLINK=2]="TYPE_DEEPLINK"}(FsdsLinkTypeValues||(FsdsLinkTypeValues={})),function(SourceTypeList){SourceTypeList[SourceTypeList.UNKNOWN=-1]="UNKNOWN",SourceTypeList[SourceTypeList.NO=0]="NO",SourceTypeList[SourceTypeList.YES=1]="YES",SourceTypeList[SourceTypeList.FT_ONLY=2]="FT_ONLY"}(SourceTypeList||(SourceTypeList={})),function(StatsDataTypeList){StatsDataTypeList[StatsDataTypeList.NONE=-1]="NONE",StatsDataTypeList[StatsDataTypeList.RANK=1]="RANK",StatsDataTypeList[StatsDataTypeList.POINTS=2]="POINTS",StatsDataTypeList[StatsDataTypeList.JUMP_ROUND_1=3]="JUMP_ROUND_1",StatsDataTypeList[StatsDataTypeList.JUMP_ROUND_2=4]="JUMP_ROUND_2",StatsDataTypeList[StatsDataTypeList.TIME=5]="TIME",StatsDataTypeList[StatsDataTypeList.GAP=6]="GAP",StatsDataTypeList[StatsDataTypeList.EVENT_PARTICIPANT_SORT_KEY=7]="EVENT_PARTICIPANT_SORT_KEY",StatsDataTypeList[StatsDataTypeList.STOP_REASON=8]="STOP_REASON",StatsDataTypeList[StatsDataTypeList.PENALTY_LAP=9]="PENALTY_LAP",StatsDataTypeList[StatsDataTypeList.MISSED_SHOT=10]="MISSED_SHOT",StatsDataTypeList[StatsDataTypeList.STOP_EVENT_STAGE=11]="STOP_EVENT_STAGE",StatsDataTypeList[StatsDataTypeList.POINTS_ROUND_1=12]="POINTS_ROUND_1",StatsDataTypeList[StatsDataTypeList.POINTS_ROUND_2=13]="POINTS_ROUND_2",StatsDataTypeList[StatsDataTypeList.TIME_ROUND_1=14]="TIME_ROUND_1",StatsDataTypeList[StatsDataTypeList.TIME_ROUND_2=15]="TIME_ROUND_2",StatsDataTypeList[StatsDataTypeList.STOP_REASON_ROUND_1=16]="STOP_REASON_ROUND_1",StatsDataTypeList[StatsDataTypeList.STOP_REASON_ROUND_2=17]="STOP_REASON_ROUND_2",StatsDataTypeList[StatsDataTypeList.ON_TRACK=18]="ON_TRACK",StatsDataTypeList[StatsDataTypeList.STOP_REASON_TEXT=19]="STOP_REASON_TEXT",StatsDataTypeList[StatsDataTypeList.LAPS_DISTANCE=20]="LAPS_DISTANCE",StatsDataTypeList[StatsDataTypeList.JUMP_COUNT=21]="JUMP_COUNT",StatsDataTypeList[StatsDataTypeList.RIDES=22]="RIDES",StatsDataTypeList[StatsDataTypeList.WINS=23]="WINS",StatsDataTypeList[StatsDataTypeList.ROUND_1=24]="ROUND_1",StatsDataTypeList[StatsDataTypeList.ROUND_2=25]="ROUND_2",StatsDataTypeList[StatsDataTypeList.ROUND_3=26]="ROUND_3",StatsDataTypeList[StatsDataTypeList.ROUND_4=27]="ROUND_4",StatsDataTypeList[StatsDataTypeList.ROUND_5=28]="ROUND_5",StatsDataTypeList[StatsDataTypeList.ROUND_6=29]="ROUND_6",StatsDataTypeList[StatsDataTypeList.ROUND_7=30]="ROUND_7",StatsDataTypeList[StatsDataTypeList.ROUND_8=31]="ROUND_8",StatsDataTypeList[StatsDataTypeList.ROUND_9=32]="ROUND_9",StatsDataTypeList[StatsDataTypeList.ROUND_10=33]="ROUND_10",StatsDataTypeList[StatsDataTypeList.ROUND_11=34]="ROUND_11",StatsDataTypeList[StatsDataTypeList.ROUND_12=35]="ROUND_12",StatsDataTypeList[StatsDataTypeList.ROUND_13=36]="ROUND_13",StatsDataTypeList[StatsDataTypeList.ROUND_14=37]="ROUND_14",StatsDataTypeList[StatsDataTypeList.ROUND_15=38]="ROUND_15",StatsDataTypeList[StatsDataTypeList.ROUND_16=39]="ROUND_16",StatsDataTypeList[StatsDataTypeList.ROUND_17=40]="ROUND_17",StatsDataTypeList[StatsDataTypeList.ROUND_18=41]="ROUND_18",StatsDataTypeList[StatsDataTypeList.ROUND_19=42]="ROUND_19",StatsDataTypeList[StatsDataTypeList.ROUND_20=43]="ROUND_20",StatsDataTypeList[StatsDataTypeList.SEMIFINAL_1=44]="SEMIFINAL_1",StatsDataTypeList[StatsDataTypeList.SEMIFINAL_2=45]="SEMIFINAL_2",StatsDataTypeList[StatsDataTypeList.FINAL_ROUND=46]="FINAL_ROUND",StatsDataTypeList[StatsDataTypeList.LAPS=47]="LAPS",StatsDataTypeList[StatsDataTypeList.GRID=48]="GRID",StatsDataTypeList[StatsDataTypeList.PITSTOPS=49]="PITSTOPS",StatsDataTypeList[StatsDataTypeList.DARTS_180S=50]="DARTS_180S",StatsDataTypeList[StatsDataTypeList.DARTS_140_PLUS=51]="DARTS_140_PLUS",StatsDataTypeList[StatsDataTypeList.DARTS_100_PLUS=52]="DARTS_100_PLUS",StatsDataTypeList[StatsDataTypeList.DARTS_CHECKOUTS=53]="DARTS_CHECKOUTS",StatsDataTypeList[StatsDataTypeList.DARTS_CHECKOUTS_MAX=54]="DARTS_CHECKOUTS_MAX",StatsDataTypeList[StatsDataTypeList.DARTS_AVERAGES=55]="DARTS_AVERAGES",StatsDataTypeList[StatsDataTypeList.DARTS_LEG_WON=56]="DARTS_LEG_WON",StatsDataTypeList[StatsDataTypeList.LEG=57]="LEG",StatsDataTypeList[StatsDataTypeList.ROUND=58]="ROUND",StatsDataTypeList[StatsDataTypeList.PREV_POINTS=59]="PREV_POINTS",StatsDataTypeList[StatsDataTypeList.CURRENT_POINTS=60]="CURRENT_POINTS",StatsDataTypeList[StatsDataTypeList.OPPONENT_POINTS=61]="OPPONENT_POINTS",StatsDataTypeList[StatsDataTypeList.RESULT=62]="RESULT",StatsDataTypeList[StatsDataTypeList.LEG_RESULT=63]="LEG_RESULT",StatsDataTypeList[StatsDataTypeList.IS_PLAYING=64]="IS_PLAYING",StatsDataTypeList[StatsDataTypeList.CURRENT_LEG_RESULT=65]="CURRENT_LEG_RESULT",StatsDataTypeList[StatsDataTypeList.RUN_RATE=66]="RUN_RATE",StatsDataTypeList[StatsDataTypeList.STOP_REASON_TITLE=67]="STOP_REASON_TITLE",StatsDataTypeList[StatsDataTypeList.PAR=68]="PAR",StatsDataTypeList[StatsDataTypeList.HOLES_PLAYED=69]="HOLES_PLAYED",StatsDataTypeList[StatsDataTypeList.TODAY=70]="TODAY"}(StatsDataTypeList||(StatsDataTypeList={})),function(SuperTemplateList){SuperTemplateList[SuperTemplateList.WRC=6576]="WRC",SuperTemplateList[SuperTemplateList.SPEEDWAY=6578]="SPEEDWAY",SuperTemplateList[SuperTemplateList.DAKAR=7771]="DAKAR"}(SuperTemplateList||(SuperTemplateList={}));var SoundType,EventItem_extends=function(){var _extendStatics=function(d,b){return _extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)Object.prototype.hasOwnProperty.call(b,p)&&(d[p]=b[p])},_extendStatics(d,b)};return function(d,b){if("function"!=typeof b&&null!==b)throw new TypeError("Class extends value "+String(b)+" is not a constructor or null");function __(){this.constructor=d}_extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}(),EventItemImpl=function(_super){function EventItemImpl(utilEnviroment,utilSport,utilDate,utilPage,helperClickableBookmaker,sortKeyGeneratorBuilder,dataLeagueHolderProxy){var _this=_super.call(this)||this;return _this.utilEnviroment=utilEnviroment,_this.utilSport=utilSport,_this.utilDate=utilDate,_this.utilPage=utilPage,_this.helperClickableBookmaker=helperClickableBookmaker,_this.sortKeyGeneratorBuilder=sortKeyGeneratorBuilder,_this.dataLeagueHolderProxy=dataLeagueHolderProxy,_this.leagueItem=null,_this}return EventItem_extends(EventItemImpl,_super),EventItemImpl.prototype.reinit=function(dataObject){_super.prototype.reinit.call(this,dataObject),this.leagueItem=null},EventItemImpl.prototype.getSortKey=function(){var leagueItem=this.getLeague(),sportId=this.getSportId(),sortKeyStr=this.sortKeyGeneratorBuilder.setLeagueItem(leagueItem).setEndUtime(this.getEndTime()).setStartUtime(this.getStartTime()).setSportId(sportId).setEventStageType(this.getStageType()).setIsStatsResults(this.isStatsResults()).setStatsResultsSortKey(parseInt(this.getStatsResultsSortKey()||"")).setStatsSortKey(this.getStatsSortKey()).setParticipantStatus(this.getParticipantStatus()).setHomeScorePart(this.getHomeScorePart(5)).setRank(parseInt(this.getRank()||"")).setGolfHoleResult(this.getParticipantHoleInfo()||"").setHomeName(this.getHomeName()).setAwayName(this.getAwayName()).build().generate();return this.setValue("sort_key_str",sortKeyStr),sortKeyStr},EventItemImpl.prototype.getLeague=function(){return this.leagueItem||this.getLeagueByLeagueHolder()},EventItemImpl.prototype.setLeague=function(value){this.leagueItem=value},EventItemImpl.prototype.getLeagueId=function(){return this.getValue("labl_id")},EventItemImpl.prototype.getSportId=function(){return parseInt(this.getValue("sport_id"))},EventItemImpl.prototype.getSportName=function(){return this.getValue("sport")},EventItemImpl.prototype.getStageType=function(){return parseInt(this.getValue("AB"))},EventItemImpl.prototype.isMotorSport=function(){return this.utilSport.inGroup(this.getSportId(),SportList_SportList.MOTORSPORT)},EventItemImpl.prototype.isCycling=function(){return this.getSportId()===SportList_SportList.CYCLING},EventItemImpl.prototype.isDarts=function(){return this.getSportId()===SportList_SportList.DARTS},EventItemImpl.prototype.isGolf=function(){return this.getSportId()===SportList_SportList.GOLF},EventItemImpl.prototype.isWinterSport=function(){return this.utilSport.inGroup(this.getSportId(),SportList_SportList.WINTER_SPORTS)},EventItemImpl.prototype.isTotallyFinished=function(){return this.getValue("DZ")===EventStageTypeList.FINISHED&&!this.isInterrupted()&&!this.isAfterDay()||!this.getValue("DZ")&&this.isFinished()&&!this.isInterrupted()&&!this.isAfterDay()},EventItemImpl.prototype.getStage=function(){return parseInt(this.getValue("AC"))},EventItemImpl.prototype.isScheduled=function(){return this.getStageType()===EventStageTypeList.SCHEDULED},EventItemImpl.prototype.isLive=function(){return this.getStageType()===EventStageTypeList.LIVE},EventItemImpl.prototype.isResultEnabled=function(){var resultEnabled=this.isLive()||this.isFinished()&&!this.isPostponed()&&!this.isCanceled()||this.isToFinish();return resultEnabled?!this.isEventWithoutScoreAndNotRetired():resultEnabled},EventItemImpl.prototype.isFinished=function(){return this.getStageType()===EventStageTypeList.FINISHED},EventItemImpl.prototype.isDelayed=function(){return this.getStage()===EventStageList_EventStageList.DELAYED},EventItemImpl.prototype.isEventStageFinished=function(){return this.getStage()===EventStageList_EventStageList.FINISHED},EventItemImpl.prototype.isToFinish=function(){return this.getStage()===EventStageList_EventStageList.TO_FINISH},EventItemImpl.prototype.isInterrupted=function(){return this.getStage()===EventStageList_EventStageList.INTERRUPTED},EventItemImpl.prototype.isCanceled=function(){return this.getStage()===EventStageList_EventStageList.CANCELED},EventItemImpl.prototype.isPending=function(){return this.getStage()===EventStageList_EventStageList.PENDING},EventItemImpl.prototype.isPostponed=function(){return this.getStage()===EventStageList_EventStageList.POSTPONED},EventItemImpl.prototype.isAfterDay=function(){return[EventStageList_EventStageList.AFTER_DAY1,EventStageList_EventStageList.AFTER_DAY2,EventStageList_EventStageList.AFTER_DAY3,EventStageList_EventStageList.AFTER_DAY4,EventStageList_EventStageList.AFTER_DAY5].includes(this.getStage())},EventItemImpl.prototype.isFirstInning=function(){return this.getStage()===EventStageList_EventStageList.FIRST_INNING},EventItemImpl.prototype.isSecondInning=function(){return this.getStage()===EventStageList_EventStageList.SECOND_INNING},EventItemImpl.prototype.getHomeScorePart=function(part){switch(part){case 1:return this.getValue("BA");case 2:return this.getValue("BC");case 3:return this.getValue("BE");case 4:return this.getValue("BG");case 5:return this.getValue("BI");case 6:return this.getValue("BK");case 7:return this.getValue("BM");case 8:return this.getValue("BO");case 9:return this.getValue("BQ")}return""},EventItemImpl.prototype.getAwayScorePart=function(part){switch(part){case 1:return this.getValue("BB");case 2:return this.getValue("BD");case 3:return this.getValue("BF");case 4:return this.getValue("BH");case 5:return this.getValue("BJ");case 6:return this.getValue("BL");case 7:return this.getValue("BN");case 8:return this.getValue("BP");case 9:return this.getValue("BR")}return""},EventItemImpl.prototype.getHomeTiebreakPart=function(part){switch(part){case 1:return this.getValue("DA","");case 2:return this.getValue("DC","");case 3:return this.getValue("DE","");case 4:return this.getValue("DG","");case 5:return this.getValue("DI","")}return""},EventItemImpl.prototype.getAwayTiebreakPart=function(part){switch(part){case 1:return this.getValue("DB","");case 2:return this.getValue("DD","");case 3:return this.getValue("DF","");case 4:return this.getValue("DH","");case 5:return this.getValue("DJ","")}return""},EventItemImpl.prototype.getHomeGamesInLastSet=function(){return this.getGamesInLastSet(0)},EventItemImpl.prototype.getAwayGamesInLastSet=function(){return this.getGamesInLastSet(1)},EventItemImpl.prototype.getGamesInLastSet=function(side){for(var result="",i=9;i>.1;i--){var awayScorePart=0===side?this.getHomeScorePart(i):this.getAwayScorePart(i);if(!isNaN(parseInt(awayScorePart,10))){result=awayScorePart;break}}return result},EventItemImpl.prototype.getStartTime=function(){return parseInt(this.getValue("AD",0))},EventItemImpl.prototype.getEventStartUTime=function(){return parseInt(this.getValue("ADE",0))},EventItemImpl.prototype.getStartUTimeDate=function(){return this.utilDate.timestamp2date(this.utilEnviroment.dateFormat(),this.getStartTime(),this.utilEnviroment.getGmtOffset()())},EventItemImpl.prototype.getEndTime=function(){return parseInt(this.getValue("AP",0))},EventItemImpl.prototype.getStageStartUTime=function(){return parseInt(this.getValue("AO",0))},EventItemImpl.prototype.getPar=function(){return""!==this.getHomeScore()?parseInt(this.getHomeScore())>0&&!this.getLeague().isStableford()?"+"+this.getHomeScore():this.getHomeScore():"-"},EventItemImpl.prototype.getHomeScore=function(){return this.getValue("AG")},EventItemImpl.prototype.getAwayScore=function(){return this.getValue("AH")},EventItemImpl.prototype.getFullTimeScore=function(index){var score,stage,fullTimeScore=this.getValue(index,null);return score=fullTimeScore,stage=this.getStage(),null!==score&&""!==score&&[EventStageList_EventStageList.EXTRA_TIME,EventStageList_EventStageList.FIRST_EXTRA_TIME,EventStageList_EventStageList.SECOND_EXTRA_TIME,EventStageList_EventStageList.AFTER_EXTRA_TIME,EventStageList_EventStageList.PENALTIES,EventStageList_EventStageList.AFTER_PENALTIES].includes(stage)?String(fullTimeScore):""},EventItemImpl.prototype.getHomeFullTimeScore=function(){return this.getFullTimeScore("AT")},EventItemImpl.prototype.getAwayFullTimeScore=function(){return this.getFullTimeScore("AU")},EventItemImpl.prototype.getHomeGameScore=function(){return this.getValue("WA")},EventItemImpl.prototype.getAwayGameScore=function(){return this.getValue("WB")},EventItemImpl.prototype.getHomeHitsScore=function(){return this.getValue("WF")},EventItemImpl.prototype.getAwayHitsScore=function(){return this.getValue("WG")},EventItemImpl.prototype.getHomeErrorsScore=function(){return this.getValue("WH")},EventItemImpl.prototype.getAwayErrorsScore=function(){return this.getValue("WI")},EventItemImpl.prototype.getHomeExtraScore=function(){return this.getValue("BS")},EventItemImpl.prototype.getAwayExtraScore=function(){return this.getValue("BT")},EventItemImpl.prototype.getHomePesapalloFirstHalfScore=function(){return this.getValue("BS")},EventItemImpl.prototype.getAwayPesapalloFirstHalfScore=function(){return this.getValue("BT")},EventItemImpl.prototype.getHomePesapalloSecondHalfScore=function(){return this.getValue("BU")},EventItemImpl.prototype.getAwayPesapalloSecondHalfScore=function(){return this.getValue("BV")},EventItemImpl.prototype.getHomePesapalloPenaltiesScore=function(){return this.getValue("FA")},EventItemImpl.prototype.getAwayPesapalloPenaltiesScore=function(){return this.getValue("FB")},EventItemImpl.prototype.getHomeMartialArtsFinished=function(){return this.getValue("IA")},EventItemImpl.prototype.getAwayMartialArtsFinished=function(){return this.getValue("IB")},EventItemImpl.prototype.getHomeMartialArtsFinishedSub=function(){return this.getValue("IE")},EventItemImpl.prototype.getAwayMartialArtsFinishedSub=function(){return this.getValue("IF")},EventItemImpl.prototype.getHomeMartialArtsFinishedRound=function(){return this.getValue("IC")},EventItemImpl.prototype.getAwayMartialArtsFinishedRound=function(){return this.getValue("ID")},EventItemImpl.prototype.getService=function(){return parseInt(this.getValue("WC"))},EventItemImpl.prototype.hasService=function(){return[1,2].includes(this.getService())},EventItemImpl.prototype.hasHomeService=function(){return 1===this.getService()},EventItemImpl.prototype.hasAwayService=function(){return 2===this.getService()},EventItemImpl.prototype.getHomeName=function(){return this.getValue("AE")},EventItemImpl.prototype.getHomeFirstName=function(){return String(this.getValue("FH",""))},EventItemImpl.prototype.getHomeSecondName=function(){return String(this.getValue("FJ",""))},EventItemImpl.prototype.getHomeLogo=function(){return this.getValue("OA")},EventItemImpl.prototype.getAwayName=function(){return this.getValue("AF")},EventItemImpl.prototype.getAwayFirstName=function(){return this.getValue("FK")},EventItemImpl.prototype.getAwaySecondName=function(){return this.getValue("FL")},EventItemImpl.prototype.getAwayLogo=function(){return this.getValue("OB")},EventItemImpl.prototype.getHomeRedCardCount=function(){return this.getValue("AJ")},EventItemImpl.prototype.getAwayRedCardCount=function(){return this.getValue("AK")},EventItemImpl.prototype.getWinner=function(){return parseInt(this.getValue("AS"))},EventItemImpl.prototype.getFtWinner=function(){return parseInt(this.getValue("AZ"))},EventItemImpl.prototype.hasLiveBettingByBookmaker=function(bookmakerId){var geoIp=this.utilEnviroment.getGlobalGeoIp(),geoIpIsoSubdivisionCode=this.utilEnviroment.getGeoIpIsoSubdivisionCode0();if(!this.helperClickableBookmaker.isClickable(geoIp,geoIpIsoSubdivisionCode))return!1;var bookmakersWithLiveInOffer=[],settings=this.getValue("MW");return null!=settings&&(bookmakersWithLiveInOffer="string"==typeof settings?settings.split("|").map((function(bookmaker){return parseInt(bookmaker)})):[parseInt(settings)]),bookmakersWithLiveInOffer.includes(bookmakerId)},EventItemImpl.prototype.hasLiveCentre=function(){return this.getValue("AW")>0},EventItemImpl.prototype.getPrematchBetslipValue=function(){return this.getValue("MG",BetslipValues.OFF)},EventItemImpl.prototype.isMarkedAsLive=function(){return"y"===this.getValue("AI")},EventItemImpl.prototype.isHomeWinner=function(){return 1===this.getWinner()},EventItemImpl.prototype.isAwayWinner=function(){return 2===this.getWinner()},EventItemImpl.prototype.getHomeDrawWinner=function(){return parseInt(this.getValue("BY"))},EventItemImpl.prototype.getAwayDrawWinner=function(){return parseInt(this.getValue("BZ"))},EventItemImpl.prototype.isDraw=function(){return 0===this.getWinner()},EventItemImpl.prototype.isEventWithoutScoreAndNotRetired=function(){return!("0"!==this.getHomeScore()&&""!==this.getHomeScore()||"0"!==this.getAwayScore()&&""!==this.getAwayScore()||this.isDraw()||this.getStage()===EventStageList_EventStageList.RETIRED)},EventItemImpl.prototype.getRank=function(){return this.getValue("WS")},EventItemImpl.prototype.getParticipantStatus=function(){return this.getValue("WT")},EventItemImpl.prototype.getParticipantStatusSubType=function(){return this.getValue("VX")},EventItemImpl.prototype.getParticipantHoleInfo=function(){return this.getValue("GH")},EventItemImpl.prototype.getParToday=function(){return this.getValue("GI")},EventItemImpl.prototype.getGolfHolesPlayed=function(){return this.getValue("GS")},EventItemImpl.prototype.getGolfFinalResult=function(){return this.getValue("GR")},EventItemImpl.prototype.isGolfNational=function(){return 1===this.getValue("GN")},EventItemImpl.prototype.getHomeParticipantCountryId=function(){return parseInt(this.getValue("CA",0))},EventItemImpl.prototype.getHomeSecondParticipantCountryId=function(){return parseInt(this.getValue("GA",0))},EventItemImpl.prototype.getAwayParticipantCountryId=function(){return parseInt(this.getValue("CB",0))},EventItemImpl.prototype.getAwaySecondParticipantCountryId=function(){return parseInt(this.getValue("GB",0))},EventItemImpl.prototype.getHomeParticipantCountryName=function(){return String(this.getValue("FU",""))},EventItemImpl.prototype.getHomeSecondParticipantCountryName=function(){return String(this.getValue("FW",""))},EventItemImpl.prototype.getAwayParticipantCountryName=function(){return String(this.getValue("FV",""))},EventItemImpl.prototype.getAwaySecondParticipantCountryName=function(){return String(this.getValue("FX",""))},EventItemImpl.prototype.getLapTime=function(){return this.getValue("ND")},EventItemImpl.prototype.getGap=function(){return this.getValue("NG")},EventItemImpl.prototype.getLapsDistance=function(){return String(this.getValue("NH",""))},EventItemImpl.prototype.getRankIsTied=function(){return this.getValue("WW")>0},EventItemImpl.prototype.isParticipantLive=function(){return 1===this.getValue("WZ")},EventItemImpl.prototype.wasParticipantLive=function(){return!(!this.isFinished()||!this.isEventStageFinished())||(this.getSportId()===SportList_SportList.GOLF&&""!==this.getHomeScorePart(5)||0===this.getValue("WZ"))},EventItemImpl.prototype.getGameTime=function(){return this.getValue("BX","")},EventItemImpl.prototype.getRound=function(){return this.getValue("ER","")},EventItemImpl.prototype.getCyclingJersey=function(){return this.getValue("WY")},EventItemImpl.prototype.getDetailId=function(){return this.getId().split(/_/)[2].substr(0,8)},EventItemImpl.prototype.isOddPublished=function(oddIndex){return!new RegExp(oddIndex).test(this.getValue("XX",""))},EventItemImpl.prototype.getLiveSentence=function(){return this.getValue("LS")},EventItemImpl.prototype.getStatsSortKey=function(){var value=this.getValue("NI");return null!=value?parseInt(value):value},EventItemImpl.prototype.getCurrentDistance=function(){return this.getValue("NJ")},EventItemImpl.prototype.getDistance=function(){return this.getValue("NK")},EventItemImpl.prototype.getGrid=function(){return String(this.getValue("NE",""))},EventItemImpl.prototype.getLaps=function(){return String(this.getValue("NC",""))},EventItemImpl.prototype.getTeamName=function(){return this.getValue("NA")},EventItemImpl.prototype.getTeam3CharName=function(){return String(this.getValue("NB",""))},EventItemImpl.prototype.getPitstops=function(){return String(this.getValue("NF",""))},EventItemImpl.prototype.getWeight=function(){return this.getValue("NL")},EventItemImpl.prototype.getStartingPrice=function(){return this.getValue("NM")},EventItemImpl.prototype.getAge=function(){return this.getValue("NN")},EventItemImpl.prototype.getDataStageTime=function(){return this.getValue("CK")},EventItemImpl.prototype.getStageSortKey=function(){return this.getValue("SX","")},EventItemImpl.prototype.getCountryName=function(){return this.getValue("CC")},EventItemImpl.prototype.getEachWayHandicap=function(){return this.getValue("XI")},EventItemImpl.prototype.getOriginalId=function(){return this.getValue("original_id")},EventItemImpl.prototype.getTvLiveStreaming=function(){return this.getValue("AL")},EventItemImpl.prototype.getHome3CharName=function(){return this.getValue("WM")},EventItemImpl.prototype.getAway3CharName=function(){return this.getValue("WN")},EventItemImpl.prototype.hasBroadcast=function(allowedBookmakers,allowedTvs){var _a,broadcastData=null!==(_a=parseData(this.getValue("AL")))&&void 0!==_a?_a:{};return function(tvLiveStreaming,allowedBookmakerIds){var _a;return!!hasHighlightProviderLiveStream(tvLiveStreaming)||(null!==(_a=tvLiveStreaming[BroadcastChannelTypeList.BOOKMAKER])&&void 0!==_a?_a:[]).some((function(bookmakerItem){return allowedBookmakerIds.includes(Number(bookmakerItem.BI))}))}(broadcastData,allowedBookmakers)||function(tvLiveStreaming,allowedTVIds){var _a;return(null!==(_a=tvLiveStreaming[BroadcastChannelTypeList.TV])&&void 0!==_a?_a:[]).some((function(tvItem){return allowedTVIds.includes(Number(tvItem.TVI))}))}(broadcastData,allowedTvs)||Boolean(broadcastData[BroadcastChannelTypeList.WWW])},EventItemImpl.prototype.getDisabledBroadcastsData=function(){return this.getValue("BGS")},EventItemImpl.prototype.hasHighlightProviderLiveStream=function(){var _a,broadcastData=null!==(_a=parseData(this.getValue("AL")))&&void 0!==_a?_a:{};return hasHighlightProviderLiveStream(broadcastData)},EventItemImpl.prototype.isStatsResults=function(){var sports=SportList_SportList,isWinterSport=this.utilSport.inGroup(this.getSportId(),sports.WINTER_SPORTS),isSpeedway=!1;this.utilSport.inGroup(this.getSportId(),sports.MOTORSPORT)&&(isSpeedway=this.getLeague().getSuperTemplateId()===SuperTemplateList.SPEEDWAY);return isWinterSport||isSpeedway},EventItemImpl.prototype.getStatsResultsRank=function(){var value=this.getStatsResults(StatsDataTypeList.RANK);return null!=value?parseInt(value):value},EventItemImpl.prototype.getStatsResultsJumpRound1=function(){var value=this.getStatsResults(StatsDataTypeList.JUMP_ROUND_1);return null!=value?value+" m":""},EventItemImpl.prototype.getStatsResultsJumpRound2=function(){var value=this.getStatsResults(StatsDataTypeList.JUMP_ROUND_2);return null!=value?value+" m":""},EventItemImpl.prototype.getStatsResultsJumpCount=function(){return String(this.getStatsResults(StatsDataTypeList.JUMP_COUNT,""))},EventItemImpl.prototype.getStatsResultsPointsRound1=function(){return this.getStatsResults(StatsDataTypeList.POINTS_ROUND_1)},EventItemImpl.prototype.getStatsResultsPointsRound2=function(){return this.getStatsResults(StatsDataTypeList.POINTS_ROUND_2)},EventItemImpl.prototype.getStatsResultsPoints=function(){return String(this.getStatsResults(StatsDataTypeList.POINTS,""))},EventItemImpl.prototype.getStatsResultsTime=function(){return this.getStatsResults(StatsDataTypeList.TIME)},EventItemImpl.prototype.getStatsResultsTimeRound1=function(){return this.getStatsResults(StatsDataTypeList.TIME_ROUND_1)},EventItemImpl.prototype.getStatsResultsTimeRound2=function(){return this.getStatsResults(StatsDataTypeList.TIME_ROUND_2)},EventItemImpl.prototype.getStatsResultsGap=function(){return this.getStatsResults(StatsDataTypeList.GAP)},EventItemImpl.prototype.getStatsResultsSortKey=function(){return this.getStatsResults(StatsDataTypeList.EVENT_PARTICIPANT_SORT_KEY)},EventItemImpl.prototype.getStatsResultsPenaltyLap=function(){return this.getStatsResults(StatsDataTypeList.PENALTY_LAP)},EventItemImpl.prototype.getStatsResultsMissedShot=function(){return this.getStatsResults(StatsDataTypeList.MISSED_SHOT)},EventItemImpl.prototype.getStatsResultsStopReason=function(typeId){null==typeId&&(typeId=StatsDataTypeList.STOP_REASON);var value=this.getStatsResults(typeId);return value&&(value=parseInt(value)),value===EventIncidentTypeList.CUT_OFF&&this.utilSport.inGroup(this.getSportId(),SportList_SportList.WINTER_SPORTS)?null:value},EventItemImpl.prototype.getStatsResultsStopReasonRound1=function(){return this.getStatsResultsStopReason(StatsDataTypeList.STOP_REASON_ROUND_1)},EventItemImpl.prototype.getStatsResultsStopReasonRound2=function(){return this.getStatsResultsStopReason(StatsDataTypeList.STOP_REASON_ROUND_2)},EventItemImpl.prototype.isStatsResultsCutOff=function(){var value=this.getStatsResults(StatsDataTypeList.STOP_REASON);return!!value&&parseInt(value)===EventIncidentTypeList.CUT_OFF},EventItemImpl.prototype.getStatsResultsOnTrack=function(){var value=this.getStatsResults(StatsDataTypeList.ON_TRACK);return!!value&&1===parseInt(value)},EventItemImpl.prototype.getStatsResultsLapDistance=function(){return this.getStatsResults(StatsDataTypeList.LAPS_DISTANCE)},EventItemImpl.prototype.isNationalTeam=function(){return 1===this.getValue("GN")},EventItemImpl.prototype.getStatsResultsRides=function(){return String(this.getStatsResults(StatsDataTypeList.RIDES,""))},EventItemImpl.prototype.getStatsResultsWins=function(){return String(this.getStatsResults(StatsDataTypeList.WINS,""))},EventItemImpl.prototype.getCricketGameTypeId=function(){var value=this.getValue("WX");return null!=value?parseInt(value):value},EventItemImpl.prototype.isCricketTypeTest=function(){return this.getCricketGameTypeId()===CricketTypesList.TEST},EventItemImpl.prototype.isCricketTypeOdi=function(){return this.getCricketGameTypeId()===CricketTypesList.ODI},EventItemImpl.prototype.isCricketTypeT20=function(){return this.getCricketGameTypeId()===CricketTypesList.T20},EventItemImpl.prototype.getBatsman=function(){return this.getValue("WJ")},EventItemImpl.prototype.getBowler=function(){return this.getValue("WK")},EventItemImpl.prototype.getHomeRunRate=function(){return this.getValue("RU")},EventItemImpl.prototype.getAwayRunRate=function(){return this.getValue("RV")},EventItemImpl.prototype.getRecentOvers=function(){return this.getValue("WQ")},EventItemImpl.prototype.getVisibleRunRate=function(){return this.getValue("RW")},EventItemImpl.prototype.getHomeOversFirstInning=function(){return this.getValue("DO")},EventItemImpl.prototype.getAwayOversFirstinning=function(){return this.getValue("DP")},EventItemImpl.prototype.hasMatchComments=function(){return this.getValue("HMC")},EventItemImpl.prototype.isPlayingOnSets=function(){return 1===this.getValue("WL")},EventItemImpl.prototype.getStatsResultsCurrentPointsHome=function(){return this.getStatsResults(StatsDataTypeList.CURRENT_POINTS,null,!0)},EventItemImpl.prototype.getStatsResultsCurrentPointsAway=function(){return this.getStatsResults(StatsDataTypeList.CURRENT_POINTS,null,!1)},EventItemImpl.prototype.getStatsResultsCurrentLegsHome=function(){return this.getStatsResults(StatsDataTypeList.CURRENT_LEG_RESULT,null,!0)},EventItemImpl.prototype.getStatsResultsCurrentLegsAway=function(){return this.getStatsResults(StatsDataTypeList.CURRENT_LEG_RESULT,null,!1)},EventItemImpl.prototype.getStatsResultsResultHome=function(){return this.getStatsResults(StatsDataTypeList.RESULT,null,!0)},EventItemImpl.prototype.getStatsResultsResultAway=function(){return this.getStatsResults(StatsDataTypeList.RESULT,null,!1)},EventItemImpl.prototype.getStatsResultsIsPlayingHome=function(){return this.getStatsResults(StatsDataTypeList.IS_PLAYING,null,!0)},EventItemImpl.prototype.getStatsResultsIsPlayingAway=function(){return this.getStatsResults(StatsDataTypeList.IS_PLAYING,null,!1)},EventItemImpl.prototype.homeIsPlaying=function(){return"1"===this.getStatsResultsIsPlayingHome()},EventItemImpl.prototype.awayIsPlaying=function(){return"1"===this.getStatsResultsIsPlayingAway()},EventItemImpl.prototype.getMainBookmakerId=function(){return this.getValue("ODA")},EventItemImpl.prototype.hasPreview=function(){return this.isScheduled()&&this.hasMatchComments()&&cjs.Api.config.get("app","match_comments","enable")},EventItemImpl.prototype.hasFinalResultOnly=function(){var sourceTypeOfGame=this.getValue("BW");return sourceTypeOfGame===SourceTypeList.FT_ONLY||sourceTypeOfGame===SourceTypeList.UNKNOWN&&this.getLeague().getValue("ZF")===String(SourceTypeList.FT_ONLY)},EventItemImpl.prototype.isUnverifiedSource=function(){var sourceTypeOfGame=this.getValue("BW");return sourceTypeOfGame===SourceTypeList.YES||sourceTypeOfGame===SourceTypeList.UNKNOWN&&this.getLeague().getValue("ZF")===String(SourceTypeList.YES)},EventItemImpl.prototype.isSwappedParticipants=function(){return this.getValue("WE")>0},EventItemImpl.prototype.hasLineps=function(){return this.getValue("AX")>0},EventItemImpl.prototype.getInfoNotice=function(){return this.getValue("AM")},EventItemImpl.prototype.getBestOfFrames=function(){return String(this.getValue("WD",""))},EventItemImpl.prototype.getHomePitcher=function(){return this.getValue("WO")},EventItemImpl.prototype.getAwayPitcher=function(){return this.getValue("WP")},EventItemImpl.prototype.getAudioComments=function(){return this.getValue("QQ")},EventItemImpl.prototype.getHomeParticipantIds=function(){return this.getValue("PX","")},EventItemImpl.prototype.getAwayParticipantIds=function(){return this.getValue("PY","")},EventItemImpl.prototype.getHomeGoalUnderReview=function(){return parseInt(this.getValue("GRA",0))},EventItemImpl.prototype.getAwayGoalUnderReview=function(){return parseInt(this.getValue("GRB",0))},EventItemImpl.prototype.isMultidayEvent=function(todayMidnight){return!!this.getEndTime()&&(this.getStartTime()<=todayMidnight&&this.getEndTime()>=todayMidnight)},EventItemImpl.prototype.createDefaultMatchItem=function(sportId,sportName,sportScorePartList){var _a,matchItem={AG:"0",AH:"0",AI:"n",AJ:0,AK:0,AL:"",AM:"",AN:"n",AO:0,AP:0,AR:0,AS:0,AT:"",AU:"",AV:"",AW:"",AX:0,AY:"",AZ:"",BA:"",BB:""};matchItem.BW=SourceTypeList.UNKNOWN,matchItem.BY=0,matchItem.BZ=0,matchItem.CA=0,matchItem.CB=0,matchItem.XA=0,matchItem.XC=0,matchItem.YA=0,matchItem.YC=0,matchItem.XX="",matchItem.SCA=0,matchItem.SCB=0,matchItem.WE=0,matchItem.EA=[0,0],matchItem.EB=[0,0],matchItem.EC=[0,0],matchItem.ED=[0,0];var sportOddsTypeList=cjs.Api.constantsManager.getSportOddsTypeList();if("1x2"===String(null!==(_a=sportOddsTypeList[sportId])&&void 0!==_a?_a:"")&&(matchItem.XB=0,matchItem.YB=0),sportId!==SportList_SportList.SOCCER){var sportScore=sportScorePartList[sportName];sportScore>1&&(matchItem.BC="",matchItem.BD=""),sportScore>2&&(matchItem.BE="",matchItem.BF=""),sportScore>3&&(matchItem.BG="",matchItem.BH=""),sportScore>4&&(matchItem.BI="",matchItem.BJ=""),sportScore>5&&(matchItem.BK="",matchItem.BL=""),sportScore>6&&(matchItem.BM="",matchItem.BO="",matchItem.BQ="",matchItem.BS="",matchItem.BU="",matchItem.FA="",matchItem.BN="",matchItem.BP="",matchItem.BR="",matchItem.BT="",matchItem.BV="",matchItem.FB=""),-1!==[SportList_SportList.HOCKEY,SportList_SportList.BASKETBALL,SportList_SportList.AMERICAN_FOOTBALL,SportList_SportList.FUTSAL].indexOf(sportId)&&(matchItem.BX=""),-1!==[SportList_SportList.AMERICAN_FOOTBALL,SportList_SportList.BASEBALL,SportList_SportList.CRICKET,SportList_SportList.DARTS,SportList_SportList.TENNIS].indexOf(sportId)&&(matchItem.WC=0,sportId===SportList_SportList.DARTS?matchItem.WL=0:sportId===SportList_SportList.BASEBALL?(matchItem.WF="",matchItem.WG="",matchItem.WH="",matchItem.WI=""):sportId===SportList_SportList.TENNIS&&(matchItem.DA="",matchItem.DB="",matchItem.DC="",matchItem.DD="",matchItem.DE="",matchItem.DF="",matchItem.DG="",matchItem.DH="",matchItem.WA="",matchItem.WB="")),-1!==[SportList_SportList.DARTS,SportList_SportList.SNOOKER].indexOf(sportId)&&(matchItem.WD=0,matchItem.AG="-",matchItem.AH="-"),sportId===SportList_SportList.GOLF&&(matchItem.AG="",matchItem.WT=0,matchItem.BA="",matchItem.BC="",matchItem.BE="",matchItem.BG="",matchItem.BI="",matchItem.GR="",matchItem.WS="")}return matchItem},EventItemImpl.prototype.getLeagueByLeagueHolder=function(){if(!this.dataLeagueHolderProxy)return new LeagueItemImpl;var leagueHolderByLeagueId=this.dataLeagueHolderProxy.findLeagueHolderByLeagueId(this.getLeagueId());return leagueHolderByLeagueId?leagueHolderByLeagueId.getLeague(this.getLeagueId()):new LeagueItemImpl},EventItemImpl}(ItemImpl),NotificationWrapperImpl=function(){function NotificationWrapperImpl(data,gameSubject,push){this.data=data,this.gameSubject=gameSubject,this.push=push}return NotificationWrapperImpl.prototype.getData=function(){return this.data},NotificationWrapperImpl.prototype.getGameSubject=function(){return this.gameSubject},NotificationWrapperImpl.prototype.getPush=function(){return this.push},NotificationWrapperImpl}(),NotificationWrapperFactory=function(){function NotificationWrapperFactory(){}return NotificationWrapperFactory.prototype.get=function(data,push,gameSubject){return new NotificationWrapperImpl(data,gameSubject,push)},NotificationWrapperFactory}(),ClientStorage_read=function(o,n){var m="function"==typeof Symbol&&o[Symbol.iterator];if(!m)return o;var r,e,i=m.call(o),ar=[];try{for(;(void 0===n||n-- >0)&&!(r=i.next()).done;)ar.push(r.value)}catch(error){e={error}}finally{try{r&&!r.done&&(m=i.return)&&m.call(i)}finally{if(e)throw e.error}}return ar},KEY_TTL="data_ttl",ClientStorage=function(){function ClientStorage(){}return ClientStorage.get=function(key){if(ClientStorage.isValidKey(key)){var data=window.localStorage.getItem(key);if(data){var validTo=ClientStorage.getValidToForLocalStorage(key);return ClientStorage.isValid(validTo)||0===validTo?data:null}}return null},ClientStorage.store=function(key,value,ttl){void 0===ttl&&(ttl=0),ClientStorage.isValidKey(key)&&(ClientStorage.storeValidToForLocalStorage(key,ttl),window.localStorage.setItem(key,value))},ClientStorage.drop=function(key){ClientStorage.isValidKey(key)&&(ClientStorage.deleteValidToForLocalStorage(key),window.localStorage.removeItem(key))},ClientStorage.getSession=function(key){if(ClientStorage.isValidKey(key)){var validTo=ClientStorage.getValidToForSession(key);return ClientStorage.isValid(validTo)||0===validTo?window.sessionStorage.getItem(key):null}return null},ClientStorage.storeSession=function(key,value,ttl){void 0===ttl&&(ttl=0),ClientStorage.isValidKey(key)&&(ClientStorage.storeValidToForSession(key,ttl),window.sessionStorage.setItem(key,value))},ClientStorage.deleteSession=function(key){ClientStorage.isValidKey(key)&&(ClientStorage.deleteValidToForSession(key),window.sessionStorage.removeItem(key))},ClientStorage.getCookie=function(key){if(document.cookie.split(";").filter((function(item){return item.trim().startsWith("".concat(key,"="))})).length){var r=new RegExp("(?:(?:^|.*;\\s*)"+key+"\\s*\\=\\s*([^;]*).*$)|^.*$");return document.cookie.replace(r,"$1")}return null},ClientStorage.storeCookie=function(key,value,ttl,path){void 0===ttl&&(ttl=31536e3),void 0===path&&(path=""),""===value&&(ttl=-86400);var expiresAttribute=ClientStorage.getExpiresDate(ttl),pathAttribute=ClientStorage.getPath(path);document.cookie="".concat(key,"=").concat(escape(value),";").concat(expiresAttribute).concat(pathAttribute)},ClientStorage.deleteCookie=function(key){ClientStorage.storeCookie(key,"")},ClientStorage.migrate=function(){var dataFromStorage=window.localStorage.getItem("paths-migrated-from-cookies")||"",pathname=window.location.pathname.replace(/\\/g,"/").replace(/\/[^/]*$/,"")||"/",path="<".concat(pathname,">");dataFromStorage.includes(path)||(document.cookie.split(";").filter((function(item){if(item){var _a=ClientStorage_read(item.split("="),2),key=_a[0],value=_a[1];window.localStorage.setItem(key.trim(),value)}})),window.localStorage.setItem("paths-migrated-from-cookies",dataFromStorage+path))},ClientStorage.isValidKey=function(key){return key!==KEY_TTL},ClientStorage.storeValidToForLocalStorage=function(key,ttl){ClientStorage.storeValidTo(key,ttl,window.localStorage)},ClientStorage.storeValidToForSession=function(key,ttl){ClientStorage.storeValidTo(key,ttl,window.sessionStorage)},ClientStorage.storeValidTo=function(key,ttl,storage){var _a;if(ttl){var storageTimestampsData=storage.getItem(KEY_TTL)||"{}",timestamp=ClientStorage.getTimestampNow();try{var timestampsData=JSON.parse(storageTimestampsData);timestampsData[key]=timestamp+ttl,storage.setItem(KEY_TTL,JSON.stringify(timestampsData))}catch(e){storage.setItem(KEY_TTL,JSON.stringify(((_a={})[key]=timestamp+ttl,_a)))}}},ClientStorage.deleteValidToForLocalStorage=function(key){ClientStorage.deleteValidTo(key,window.localStorage)},ClientStorage.deleteValidToForSession=function(key){ClientStorage.deleteValidTo(key,window.sessionStorage)},ClientStorage.deleteValidTo=function(key,storage){var storageTimestampsData=storage.getItem(KEY_TTL);if(storageTimestampsData)try{var timestampsData=JSON.parse(storageTimestampsData);delete timestampsData[key],storage.setItem(KEY_TTL,JSON.stringify(timestampsData))}catch(e){storage.setItem(KEY_TTL,"{}")}},ClientStorage.getValidToForLocalStorage=function(key){return ClientStorage.getValidTo(key,window.localStorage)},ClientStorage.getValidToForSession=function(key){return ClientStorage.getValidTo(key,window.sessionStorage)},ClientStorage.getValidTo=function(key,storage){var storageTimestampsData=storage.getItem(KEY_TTL);if(storageTimestampsData)try{var timestampsData=JSON.parse(storageTimestampsData);return timestampsData[key]?timestampsData[key]:0}catch(e){return 0}return 0},ClientStorage.isValid=function(timestamp){return timestamp>=ClientStorage.getTimestampNow()},ClientStorage.getTimestampNow=function(){return Math.round(Date.now()/1e3)},ClientStorage.getExpiresDate=function(ttl){if(ttl){var date=new Date;return date.setTime(date.getTime()+1e3*ttl),"expires=".concat(date.toUTCString(),";")}return""},ClientStorage.getPath=function(path){return path?"path=".concat(path):""},ClientStorage}();!function(SoundType){SoundType.finished="finished",SoundType.correction="correction",SoundType.scoreIncremented="score-incremented",SoundType.tennisGame="tennis-game"}(SoundType||(SoundType={}));!function(){function SoundPlayerImpl(soundManager,baseUrlGetter,userAgent,soundPlayValidator,soundSportConfig){var _this=this;this._soundManagerLoaded=!1,this._silencePath="_fs/%s/silence.%s",this._storageKey="livesport_disable_sounds",this._iDeviceLoadSoundManagerDelay=2500,this._iDeviceLoopInterval=1e3,this._sounds=null,this._silenceSound=null,this._remainingPlays={},this._initializing=!1,this._postponedPlays=[],this._gameSoundsPlayed={},this._iQueue=[],this._isILoopRunning=!1,this._soundManager=soundManager,this._baseUrlGetter=baseUrlGetter,this._soundPlayValidator=soundPlayValidator,this._soundSportConfig=soundSportConfig,this._isSafari=this._getIsSafari(userAgent),this._isIDevice=this._getisIDevice(userAgent)||this._isSafari,this._disabled=this._isIDevice||"1"==ClientStorage.get(this._storageKey),this._initialSounds={commonCheers:"_fs/%s/common-cheers.%s",commonCorrection:"_fs/%s/common-correction.%s",commonEndOfGame:"_fs/%s/common-end-of-game.%s",soccerCardRed:"_fs/%s/soccer-card-red.%s",tennisGame:"_fs/%s/tennis-game.%s",tennisGameSet:"_fs/%s/tennis-game-set.%s",tennisGameSetMatch:"_fs/%s/tennis-game-set-match.%s"},this._isIDevice&&setTimeout((function(){_this._loadSoundManager()}),this._iDeviceLoadSoundManagerDelay)}SoundPlayerImpl.prototype.setSoundPlayValidator=function(soundPlayValidator){this._soundPlayValidator=soundPlayValidator},SoundPlayerImpl.prototype.isEnabled=function(){return!this._disabled},SoundPlayerImpl.prototype.isDisabled=function(){return this._disabled},SoundPlayerImpl.prototype.toggle=function(){this._disabled=!this._disabled,this._disabled&&this._soundManagerLoaded&&this._soundManager.stopAll();var isDisabled=this._disabled?"1":"0";ClientStorage.store(this._storageKey,isDisabled),this._isIDevice&&(this._disabled||this._isILoopRunning||this._startILoop())},SoundPlayerImpl.prototype.play=function(eventId,soundType,fromILoop,fromNotification){var _this=this;if(void 0===fromILoop&&(fromILoop=!1),void 0===fromNotification&&(fromNotification=!1),this._disabled)return!1;if(fromNotification){if(!this._soundPlayValidator.isSoundPlayAllowedFromNotification(eventId,fromNotification))return!1}else if(!this._soundPlayValidator.isSoundPlayAllowed(eventId))return!1;if(!this._soundTypeCanBePlayedBasedOnHistory(eventId,soundType))return!1;if(!this._soundManagerLoaded&&(this._postponedPlays.push({eventId,soundType}),!this._initializing))return this._initializing=!0,this._loadSoundManager((function(){for(_this._initializing=!1;_this._postponedPlays.length>0;){var _a=_this._postponedPlays.shift(),eventId_1=_a.eventId,soundType_1=_a.soundType;_this.play(eventId_1,soundType_1,fromILoop,fromNotification)}})),!1;var sportIdentForEvent=fromNotification||this._soundPlayValidator.getSportIdentForEvent(eventId),soundId=this._getSoundIdFromConfig(sportIdentForEvent,soundType);return!(!soundId||!this._sounds)&&(soundId in this._sounds&&(this._isIDevice&&!fromILoop?(this._iQueue.push([eventId,soundType,!0,fromNotification]),!0):(this._gameSoundsPlayed[eventId].push(soundType),this._remainingPlays[soundId]+=1,this._playNext(soundId))))},SoundPlayerImpl.prototype._getSoundIdFromConfig=function(sportIdentForEvent,soundType){return this._soundSportConfig[sportIdentForEvent]&&this._soundSportConfig[sportIdentForEvent][soundType]?this._soundSportConfig[sportIdentForEvent][soundType]:null},SoundPlayerImpl.prototype.gameUpdateFinished=function(eventId){delete this._gameSoundsPlayed[eventId]},SoundPlayerImpl.prototype._playNext=function(soundId,forcePlay){void 0===forcePlay&&(forcePlay=!1);var remaining=this._remainingPlays[soundId];return 0!=remaining&&(!this._sounds||1!=remaining&&!forcePlay||(this._sounds[soundId].play(),!0))},SoundPlayerImpl.prototype._loadSoundManager=function(callback){var _this=this;this._soundManagerLoaded=!0,this._soundManager.audioFormats&&(this._soundManager.audioFormats.mp3.required=!1),this._soundManager.setup({url:this._baseUrlGetter()+"/res/sound/soundmanager2",debugMode:!1,preferFlash:!1,onready:function(){var format=_this._soundManager.canPlayMIME("audio/ogg")?"ogg":"mp3";_this._sounds=Object.keys(_this._initialSounds).reduce((function(result,key){_this._remainingPlays[key]=0;var soundPlayer,path=_this._initialSounds[key];return result[key]=_this._soundManager.createSound({id:key,url:"/res/sound/".concat(path).replace(/%s/g,format),onfinish:(soundPlayer=_this,function(){soundPlayer._remainingPlays[this.id]-=1,soundPlayer._playNext(this.id,!0)})}),result}),{}),_this._isIDevice&&(_this._silenceSound=_this._soundManager.createSound({id:"silence",url:"/res/sound/".concat(_this._silencePath).replace(/%s/g,format)})),callback&&callback()}})},SoundPlayerImpl.prototype._soundTypeCanBePlayedBasedOnHistory=function(eventId,soundType){eventId in this._gameSoundsPlayed||(this._gameSoundsPlayed[eventId]=[]);var previousSoundTypesForEvent=this._gameSoundsPlayed[eventId];switch(soundType){case SoundType.scoreIncremented:return!previousSoundTypesForEvent.includes(SoundType.finished);case SoundType.tennisGame:return![SoundType.finished,SoundType.scoreIncremented].every((function(value){return previousSoundTypesForEvent.includes(value)}))}return!0},SoundPlayerImpl.prototype._getIsSafari=function(userAgent){var safariResult=/(safari)/i.exec(userAgent),chromeResult=/chrome/i.exec(userAgent),safari=null!=safariResult&&safariResult.length>0,chrome=null!=chromeResult&&chromeResult.length>0;return safari&&!chrome},SoundPlayerImpl.prototype._getisIDevice=function(userAgent){var ios=/(iPod|iPhone|iPad)/i.exec(userAgent);return null!=ios&&ios.length>0},SoundPlayerImpl.prototype._startILoop=function(){var _a,_this=this;this._isILoopRunning=!0,null===(_a=this._silenceSound)||void 0===_a||_a.play(),setInterval((function(){for(var args;args=_this._iQueue.shift();)_this.play.apply(_this,args)}),this._iDeviceLoopInterval)}}();var MyGames_awaiter=function(thisArg,_arguments,P,generator){return new(P||(P=Promise))((function(resolve,reject){function fulfilled(value){try{step(generator.next(value))}catch(e){reject(e)}}function rejected(value){try{step(generator.throw(value))}catch(e){reject(e)}}function step(result){var value;result.done?resolve(result.value):(value=result.value,value instanceof P?value:new P((function(resolve){resolve(value)}))).then(fulfilled,rejected)}step((generator=generator.apply(thisArg,_arguments||[])).next())}))},MyGames_generator=function(thisArg,body){var f,y,t,g,_={label:0,sent:function(){if(1&t[0])throw t[1];return t[1]},trys:[],ops:[]};return g={next:verb(0),throw:verb(1),return:verb(2)},"function"==typeof Symbol&&(g[Symbol.iterator]=function(){return this}),g;function verb(n){return function(v){return function(op){if(f)throw new TypeError("Generator is already executing.");for(;g&&(g=0,op[0]&&(_=0)),_;)try{if(f=1,y&&(t=2&op[0]?y.return:op[0]?y.throw||((t=y.return)&&t.call(y),0):y.next)&&!(t=t.call(y,op[1])).done)return t;switch(y=0,t&&(op=[2&op[0],t.value]),op[0]){case 0:case 1:t=op;break;case 4:return _.label++,{value:op[1],done:!1};case 5:_.label++,y=op[1],op=[0];continue;case 7:op=_.ops.pop(),_.trys.pop();continue;default:if(!(t=_.trys,(t=t.length>0&&t[t.length-1])||6!==op[0]&&2!==op[0])){_=0;continue}if(3===op[0]&&(!t||op[1]>t[0]&&op[1]<t[3])){_.label=op[1];break}if(6===op[0]&&_.label<t[1]){_.label=t[1],t=op;break}if(t&&_.label<t[2]){_.label=t[2],_.ops.push(op);break}t[2]&&_.ops.pop(),_.trys.pop();continue}op=body.call(thisArg,_)}catch(e){op=[6,e],y=0}finally{f=t=0}if(5&op[0])throw op[1];return{value:op[0]?op[1]:void 0,done:!0}}([n,v])}}},MyGames_read=function(o,n){var m="function"==typeof Symbol&&o[Symbol.iterator];if(!m)return o;var r,e,i=m.call(o),ar=[];try{for(;(void 0===n||n-- >0)&&!(r=i.next()).done;)ar.push(r.value)}catch(error){e={error}}finally{try{r&&!r.done&&(m=i.return)&&m.call(i)}finally{if(e)throw e.error}}return ar},MyGames_values=function(o){var s="function"==typeof Symbol&&Symbol.iterator,m=s&&o[s],i=0;if(m)return m.call(o);if(o&&"number"==typeof o.length)return{next:function(){return o&&i>=o.length&&(o=void 0),{value:o&&o[i++],done:!o}}};throw new TypeError(s?"Object is not iterable.":"Symbol.iterator is not defined.")},STATUS_FINISHED="Finished.",STATUS_GOAL="Goal!",MyGamesNotificationFactory=function(){function MyGamesNotificationFactory(){}return MyGamesNotificationFactory.prototype.make=function(utilEnvironment,utilUrl,utilTrans,utilSport,settingsStorage){return new MyGamesNotificationImpl(utilEnvironment,utilUrl,utilTrans,utilSport,settingsStorage)},MyGamesNotificationFactory}(),MyGamesNotificationImpl=function(){function MyGamesNotificationImpl(utilEnvironment,utilUrl,utilTrans,utilSport,settingsStorage){var _this=this;this.utilEnvironment=utilEnvironment,this.utilUrl=utilUrl,this.utilTrans=utilTrans,this.utilSport=utilSport,this.settingsStorage=settingsStorage,this.notifications={},this.notificationCounter=1,this.userSettings=null,this.timeoutId=null,window.addEventListener("resize",(function(){return _this.show()}))}return MyGamesNotificationImpl.prototype.addNotification=function(notification){return MyGames_awaiter(this,void 0,Promise,(function(){var _a,newNotification,generated,nId,newNotificationElement,closeButton,elem,_this=this;return MyGames_generator(this,(function(_b){switch(_b.label){case 0:return _a=this,[4,this.settingsStorage.read("lsSettins")];case 1:return _a.userSettings=_b.sent(),this.areNotificationsEnabled()?(this.startTimeout(),(newNotification=this.parseData(notification))?(this.notifications[newNotification.id]=newNotification,generated=this.generateHtml(newNotification),document.body.append(generated),this.recalculatedLeftAttributes(),this.show(),nId="game-notification-".concat(newNotification.id),(newNotificationElement=document.getElementById(nId))&&(EventTracker.trackEvent({event:EventTrackerEventType.MY_GAMES_NOTIFICATION,"event-value":newNotification["game-id"],"event-name":"hidden"===document.visibilityState?"inactive":"active"}),newNotificationElement.addEventListener("click",(function(){_this.utilEnvironment.detailOpen(newNotification["game-id"],void 0,!1),EventTracker.trackEvent({event:EventTrackerEventType.NOTIFICATION_CLICK,"event-name":"notification_click",sportName:_this.utilEnvironment.getSport(),eventValue:newNotification["game-id"]})})),(closeButton=newNotificationElement.querySelector(".close"))&&closeButton.addEventListener("click",(function(event){EventTracker.trackEvent({event:EventTrackerEventType.NOTIFICATION_CLOSE,"event-name":"notification_close",sportName:_this.utilEnvironment.getSport(),eventValue:newNotification["game-id"]}),event.stopPropagation(),fadeOut(newNotificationElement,(function(){var _a;null===(_a=newNotificationElement.parentNode)||void 0===_a||_a.removeChild(newNotificationElement),delete _this.notifications[newNotification.id],_this.recalculatedLeftAttributes(),_this.show()}))}))),document.getElementById("feed_planter")&&(elem=document.querySelector(".game-notification"))&&(elem.style.marginBottom="200px"),[2]):[2]):[2]}}))}))},MyGamesNotificationImpl.prototype.startTimeout=function(){var _this=this;this.timeoutId&&clearTimeout(this.timeoutId);this.timeoutId=setTimeout((function(){Object.keys(_this.notifications).length&&_this.startTimeout();var _loop_1=function(id){var notification=_this.notifications[id];if(Date.now()>=notification.timestamp+18e4){var nId="game-notification-".concat(notification.id),element_1=document.getElementById(nId);element_1&&fadeOut(element_1,(function(){var _a;null===(_a=element_1.parentNode)||void 0===_a||_a.removeChild(element_1),delete _this.notifications[notification.id],_this.recalculatedLeftAttributes(),_this.show()}))}};for(var id in _this.notifications)_loop_1(id)}),1e3)},MyGamesNotificationImpl.prototype.parseData=function(notificationWrapper){try{var data=JSON.parse(notificationWrapper.getData()),subscriptionInfo=notificationWrapper.getPush().getSubscriptionInfo(),subjectParts=notificationWrapper.getGameSubject().split("_"),id=subjectParts[subjectParts.length-1],imageUrl=this.utilEnvironment.getBaseImageDataUrl().replace(this.utilUrl.getLocationOrigin(),""),notificationTimestamp=data[12];if(subscriptionInfo[id].timestamp>1e3*notificationTimestamp)return null;var gid="g_"+subscriptionInfo[id].sportId+"_"+id,notification={id:this.notificationCounter,text:data[0],label:"".concat(data[1]," - ").concat(data[2]),score:MyGamesNotificationImpl.parseScore(data[3],data[4],parseInt(subscriptionInfo[id].sportId)),"logo-home":data[9]&&data[5]<=2?"url('"+imageUrl+data[9]+"')":"none","logo-away":data[11]&&data[5]<=2?"url('"+imageUrl+data[11]+"')":"none","game-id":gid,"image-width":1===data[10]?"24px":"30px","image-height":(data[10],"30px"),"url-home":data[6],"url-away":data[7],"url-season":data[8],timestamp:Date.now(),hidden:!0};return this.playMelody(gid,data[0],parseInt(subscriptionInfo[id].sportId)),this.notificationCounter++,notification}catch(e){return null}},MyGamesNotificationImpl.parseScore=function(score,sideId,sportId){if(!score)return"-";var _a=MyGames_read(score.split(":"),2),homeScore=_a[0],awayScore=_a[1];return[SportList_SportList.BOXING,SportList_SportList.MMA].includes(sportId)?'<span class="gameNotification__score--bold ">'.concat(homeScore,"</span>"):1===sideId?'<span class="gameNotification__change change">'.concat(homeScore,"</span> - ").concat(awayScore):2===sideId?"".concat(homeScore,' - <span class="gameNotification__change change">').concat(awayScore,"</span>"):"".concat(homeScore," - ").concat(awayScore)},MyGamesNotificationImpl.prototype.generateHtml=function(notification){var currentBoxId="game-notification-"+notification.id,backgroundSize="".concat(notification["image-width"]," ").concat(notification["image-height"]),title=this.utilTrans.translate("TRANS_CLICK_FOR_MATCH_DETAIL")||"",html=document.createElement("div");return html.id=currentBoxId,html.title=title,html.classList.add("gameNotification","game-notification"),html.style.display="none",html.innerHTML='\n\t\t<div class="gameNotification__content notification-content">\n\t\t\t<div class="gameNotification__id game-id" style="display:none">'.concat(notification["game-id"],'</div>\n\t\t\t<div class="gameNotification__time timestamp" style="display:none">').concat(notification.timestamp,'</div>\n\t\t\t<div class="gameNotification__label label">').concat(notification.label,'</div>\n\t\t\t<div class="gameNotification__logo gameNotification__homeLogo logo-home notification-logo" style="background-image: ').concat(notification["logo-home"],"; width: ").concat(notification["image-width"],"; height: ").concat(notification["image-height"],"; background-size: ").concat(backgroundSize,'"></div>\n\t\t\t<div class="gameNotification__logo gameNotification__awayLogo logo-away notification-logo" style="background-image: ').concat(notification["logo-away"],"; width: ").concat(notification["image-width"],"; height: ").concat(notification["image-height"],"; background-size: ").concat(backgroundSize,'"></div>\n\t\t\t<div class="gameNotification__score score">').concat(notification.score,'</div>\n\t\t\t<div class="gameNotification__text text">').concat(notification.text,'</div>\n\t\t\t<div class="gameNotification__homeUrl url-home" style="display:none">').concat(notification["url-home"],'</div>\n\t\t\t<div class="gameNotification__awayUrl url-away" style="display:none">').concat(notification["url-away"],'</div>\n\t\t\t<div class="gameNotification__season url-season" style="display:none">').concat(notification["url-season"],'</div>\n\t\t\t<div class="gameNotification__close close" title=""></div>\n\t\t\t</div>'),html},MyGamesNotificationImpl.prototype.playMelody=function(gameId,actionType,sportId){var _this=this;if(this.userSettings&&"yessilent"!==this.userSettings.mygamesNotifications){var soundMelody="";if([STATUS_FINISHED,this.utilTrans.translate("TRANS_NOTIFICATION_MESSAGE_MATCH_FINISHED")].includes(actionType))soundMelody=SoundType.finished;else if([STATUS_GOAL,this.utilTrans.translate("TRANS_NOTIFICATION_MESSAGE_GOAL")].includes(actionType))soundMelody=SoundType.scoreIncremented;else{if(![this.utilTrans.translate("TRANS_NOTIFICATION_MESSAGE_CORRECTION"),this.utilTrans.translate("TRANS_NOTIFICATION_MESSAGE_CORRECTION_INCIDENT_COACH_CHALLENGE"),this.utilTrans.translate("TRANS_NOTIFICATION_MESSAGE_CORRECTION_INCIDENT_FOUL"),this.utilTrans.translate("TRANS_NOTIFICATION_MESSAGE_CORRECTION_INCIDENT_HANDBALL"),this.utilTrans.translate("TRANS_NOTIFICATION_MESSAGE_CORRECTION_INCIDENT_OFFSIDE"),this.utilTrans.translate("TRANS_NOTIFICATION_MESSAGE_CORRECTION_INCIDENT_VIDEO_REVIEW"),this.utilTrans.translate("TRANS_NOTIFICATION_MESSAGE_CORRECTION_INCIDENT_VIDEO_REVIEW_FOUL"),this.utilTrans.translate("TRANS_NOTIFICATION_MESSAGE_CORRECTION_INCIDENT_VIDEO_REVIEW_OFFSIDE"),this.utilTrans.translate("TRANS_NOTIFICATION_MESSAGE_CORRECTION_INCIDENT_VIDEO_REVIEW_HANDBALL")].some((function(correctionString){return actionType.includes(correctionString)})))return;soundMelody=SoundType.correction}cjs.Api.loader.get("soundPlayer").call((function(soundPlayer){soundPlayer.play(gameId,soundMelody,!1,_this.utilSport.getOriginalNameFromId(sportId))}))}},MyGamesNotificationImpl.prototype.recalculatedLeftAttributes=function(){var tempIndex=1,length=Object.keys(this.notifications).length;for(var id in this.notifications){var left=MyGamesNotificationImpl.calculateLeft(length,tempIndex,262,8);tempIndex++;var gameNotificationElement=document.getElementById("game-notification-".concat(id));gameNotificationElement&&(gameNotificationElement.style.left="".concat(left,"px"))}},MyGamesNotificationImpl.prototype.show=function(){var maximumNotifications=this.getMaximumNotificationCount(8,262),queue=this.getQueue(this.notifications,maximumNotifications);queue.showIds&&queue.showIds.forEach((function(id){var element=document.getElementById(id);element&&(element.style.display="block")})),queue.hideIds&&queue.hideIds.forEach((function(id){var element=document.getElementById(id);element&&(element.style.display="none")})),queue.fadeInIds.length&&queue.fadeInIds.forEach((function(id){var el,element=document.getElementById(id);element&&((el=element).style.opacity="0",el.style.display="block",function fade(){var val=parseFloat(el.style.opacity);(val+=.1)>1||(el.style.opacity=String(val),requestAnimationFrame(fade))}())}))},MyGamesNotificationImpl.prototype.getWindowWidth=function(){return parseFloat(getComputedStyle(document.body,null).width.replace("px",""))},MyGamesNotificationImpl.prototype.getMaximumNotificationCount=function(boxDistance,boxWidth){var count=Math.floor((this.getWindowWidth()-boxDistance)/(boxWidth+boxDistance));return count>0?count:0},MyGamesNotificationImpl.prototype.getQueue=function(notifications,maximumNotifications){var e_1,_a,showIds=[],hideIds=[],fadeInIds=[],anyShowed=!1,totalShowed=0;try{for(var _b=MyGames_values(Array.from(Object.keys(notifications).reverse())),_c=_b.next();!_c.done;_c=_b.next()){var id=_c.value,notification=notifications[id],nId="game-notification-".concat(id);!anyShowed&&notification.hidden&&totalShowed<maximumNotifications?(fadeInIds.push(nId),notification.hidden=!1):notification.hidden&&totalShowed<maximumNotifications?(showIds.push(nId),notification.hidden=!1):!notification.hidden&&totalShowed>=maximumNotifications&&(hideIds.push(nId),notification.hidden=!0),notification.hidden||(anyShowed=!0,totalShowed++)}}catch(e_1_1){e_1={error:e_1_1}}finally{try{_c&&!_c.done&&(_a=_b.return)&&_a.call(_b)}finally{if(e_1)throw e_1.error}}return{showIds,hideIds,fadeInIds}},MyGamesNotificationImpl.calculateLeft=function(length,index,boxWidth,boxDistance){return length*(boxWidth+boxDistance)-index*(boxWidth+boxDistance)},MyGamesNotificationImpl.prototype.areNotificationsEnabled=function(){var _a,isResponsive=this.utilEnvironment.isResponsive(),hasAllowedNotifications="no"!==(null===(_a=this.userSettings)||void 0===_a?void 0:_a.mygamesNotifications)||!1;return!isResponsive&&hasAllowedNotifications},MyGamesNotificationImpl}();function fadeOut(el,callback){el.style.opacity="1",function fade(){el.style.opacity=String(Number(el.style.opacity)-.1),Number(el.style.opacity)<0?(el.style.display="none",callback&&callback()):requestAnimationFrame(fade)}()}var ScopeList,HolderImpl=function(){function HolderImpl(){this.container={},this.reinit()}return HolderImpl.prototype.reinit=function(newContainer){void 0===newContainer&&(newContainer={}),null==newContainer&&(newContainer={}),this.container=newContainer},HolderImpl.prototype.getAllContainerIds=function(){return Object.keys(this.container)},HolderImpl.prototype.getOrCreateNewItem=function(id){return null==this.container[id]&&(this.container[id]=new ItemImpl,this.container[id].setId(id)),this.container[id]},HolderImpl.prototype.getItem=function(id){if(!this.hasItem(id))throw new Error("Item ".concat(id," not found"));return this.container[id]},HolderImpl.prototype.setItem=function(id,item){this.container[id]=item},HolderImpl.prototype.hasItem=function(id){return null!=this.container[id]},HolderImpl.prototype.hasData=function(){for(var waste in this.container)return!0;return!1},HolderImpl.prototype.removeItem=function(id){delete this.container[id]},HolderImpl.prototype.getReferences=function(){var refs={};for(var id in this.container)refs[id]=this.container[id];return refs},HolderImpl.prototype.addItemsFromRawObject=function(rawObject,replaceItemIfExists){void 0===replaceItemIfExists&&(replaceItemIfExists=!1),null==replaceItemIfExists&&(replaceItemIfExists=!1);var result=[];for(var id in rawObject){var data=rawObject[id];if(replaceItemIfExists||!this.hasItem(id)){var newData={};for(var key in data){var value=data[key];newData[key]=value}var item=this.getOrCreateNewItem(id);result.push(item.reinit(newData))}}},HolderImpl}(),LeagueHolder_extends=function(){var _extendStatics=function(d,b){return _extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)Object.prototype.hasOwnProperty.call(b,p)&&(d[p]=b[p])},_extendStatics(d,b)};return function(d,b){if("function"!=typeof b&&null!==b)throw new TypeError("Class extends value "+String(b)+" is not a constructor or null");function __(){this.constructor=d}_extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}(),LeagueHolderImpl=function(_super){function LeagueHolderImpl(){return _super.call(this)||this}return LeagueHolder_extends(LeagueHolderImpl,_super),LeagueHolderImpl.prototype.reinit=function(newContainer){void 0===newContainer&&(newContainer={}),_super.prototype.reinit.call(this,newContainer)},LeagueHolderImpl.prototype.getOrCreateNewItem=function(id){return null==this.container[id]&&(this.container[id]=new LeagueItemImpl,this.container[id].setId(id)),this.container[id]},LeagueHolderImpl.prototype.getItem=function(id){if(!this.hasItem(id))throw new Error("LeagueItem ".concat(id," not found"));return this.container[id]},LeagueHolderImpl.prototype.setItem=function(id,item){this.container[id]=item},LeagueHolderImpl.prototype.getReferences=function(){var refs={};for(var id in this.container)refs[id]=this.container[id];return refs},LeagueHolderImpl.prototype.getOrCreateNewLeague=function(id){return this.getOrCreateNewItem(id)},LeagueHolderImpl.prototype.getLeague=function(id){return this.getItem(id)},LeagueHolderImpl.prototype.hasLeague=function(id){return this.hasItem(id)},LeagueHolderImpl.prototype.removeLeague=function(id){this.removeItem(id)},LeagueHolderImpl}(HolderImpl),ParticipantItem_extends=function(){var _extendStatics=function(d,b){return _extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)Object.prototype.hasOwnProperty.call(b,p)&&(d[p]=b[p])},_extendStatics(d,b)};return function(d,b){if("function"!=typeof b&&null!==b)throw new TypeError("Class extends value "+String(b)+" is not a constructor or null");function __(){this.constructor=d}_extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}(),ParticipantItemImpl=function(_super){function ParticipantItemImpl(utilString){var _this=_super.call(this)||this;return _this.eventIds={},_this.utilString=utilString,_this.clearEventIds(),_this.deleted=!1,_this}return ParticipantItem_extends(ParticipantItemImpl,_super),ParticipantItemImpl.prototype.reinit=function(dataObject){_super.prototype.reinit.call(this,dataObject),this.clearEventIds(),this.deleted=!1},ParticipantItemImpl.prototype.addEventId=function(eventId){this.eventIds[eventId]=1},ParticipantItemImpl.prototype.clearEventIds=function(){this.eventIds={}},ParticipantItemImpl.prototype.getEventIds=function(){return this.eventIds},ParticipantItemImpl.prototype.getShortName=function(){return this.getValue(1)},ParticipantItemImpl.prototype.getCountryName=function(){return this.getValue(2,"")},ParticipantItemImpl.prototype.getMobileImage=function(){return this.getValue(3)},ParticipantItemImpl.prototype.getSportId=function(){var value=this.getValue(4,"").split(";");return 1===(value=value.map((function(val){return!val||isNaN(val)?0:parseInt(val)}))).length?value[0]:value},ParticipantItemImpl.prototype.getCountryId=function(){var value=this.getValue(5,"").split(";");return 1===(value=value.map((function(val){return!val||isNaN(val)?0:parseInt(val)}))).length?value[0]:value},ParticipantItemImpl.prototype.getUrl=function(){return this.getValue(6)},ParticipantItemImpl.prototype.getTableImage=function(){return this.getValue(7)},ParticipantItemImpl.prototype.getTeamName=function(){return this.getValue(14)},ParticipantItemImpl.prototype.getTitle=function(){return this.utilString.toUpper(this.getCountryName())+": "+this.getShortName()},ParticipantItemImpl.prototype.setDeleted=function(value){this.deleted=value},ParticipantItemImpl.prototype.isDeleted=function(){return this.deleted},ParticipantItemImpl}(ItemImpl),ParticipantHolder_extends=function(){var _extendStatics=function(d,b){return _extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)Object.prototype.hasOwnProperty.call(b,p)&&(d[p]=b[p])},_extendStatics(d,b)};return function(d,b){if("function"!=typeof b&&null!==b)throw new TypeError("Class extends value "+String(b)+" is not a constructor or null");function __(){this.constructor=d}_extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}(),ParticipantHolderImpl=function(_super){function ParticipantHolderImpl(utilString){var _this=_super.call(this)||this;return _this.utilString=utilString,_this}return ParticipantHolder_extends(ParticipantHolderImpl,_super),ParticipantHolderImpl.prototype.reinit=function(newContainer){void 0===newContainer&&(newContainer={}),_super.prototype.reinit.call(this,newContainer)},ParticipantHolderImpl.prototype.getOrCreateNewItem=function(id){return null==this.container[id]&&(this.container[id]=new ParticipantItemImpl(this.utilString),this.container[id].setId(id)),this.container[id]},ParticipantHolderImpl.prototype.getItem=function(id){if(!this.hasItem(id))throw new Error("ParticipantItem ".concat(id," not found"));return this.container[id]},ParticipantHolderImpl.prototype.setItem=function(id,item){this.container[id]=item},ParticipantHolderImpl.prototype.getReferences=function(){var refs={};for(var id in this.container)refs[id]=this.container[id];return refs},ParticipantHolderImpl.prototype.getOrCreateNewParticipant=function(id){return this.getOrCreateNewItem(id)},ParticipantHolderImpl.prototype.getParticipant=function(id){return this.getItem(id)},ParticipantHolderImpl.prototype.hasParticipant=function(id){return this.hasItem(id)},ParticipantHolderImpl.prototype.removeParticipant=function(id){this.removeItem(id)},ParticipantHolderImpl}(HolderImpl),EventHolder_extends=function(){var _extendStatics=function(d,b){return _extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)Object.prototype.hasOwnProperty.call(b,p)&&(d[p]=b[p])},_extendStatics(d,b)};return function(d,b){if("function"!=typeof b&&null!==b)throw new TypeError("Class extends value "+String(b)+" is not a constructor or null");function __(){this.constructor=d}_extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}(),EventHolderImpl=function(_super){function EventHolderImpl(utilEnviroment,utilSport,utilDate,utilPage,helperClickableBookmaker,sortKeyGeneratorBuilder,dataLeagueHolderProxy){var _this=_super.call(this)||this;return _this.utilEnviroment=utilEnviroment,_this.utilSport=utilSport,_this.utilDate=utilDate,_this.utilPage=utilPage,_this.helperClickableBookmaker=helperClickableBookmaker,_this.sortKeyGeneratorBuilder=sortKeyGeneratorBuilder,_this.dataLeagueHolderProxy=dataLeagueHolderProxy,_this}return EventHolder_extends(EventHolderImpl,_super),EventHolderImpl.prototype.reinit=function(newContainer){void 0===newContainer&&(newContainer={}),_super.prototype.reinit.call(this,newContainer)},EventHolderImpl.prototype.getOrCreateNewItem=function(id){return null==this.container[id]&&(this.container[id]=new EventItemImpl(this.utilEnviroment,this.utilSport,this.utilDate,this.utilPage,this.helperClickableBookmaker,this.sortKeyGeneratorBuilder,this.dataLeagueHolderProxy),this.container[id].setId(id)),this.container[id]},EventHolderImpl.prototype.getItem=function(id){if(!this.hasItem(id))throw new Error("EventItem ".concat(id," not found"));return this.container[id]},EventHolderImpl.prototype.setItem=function(id,item){this.container[id]=item},EventHolderImpl.prototype.getReferences=function(){var refs={};for(var id in this.container)refs[id]=this.container[id];return refs},EventHolderImpl.prototype.getOrCreateNewEvent=function(id){return this.getOrCreateNewItem(id)},EventHolderImpl.prototype.getEvent=function(id){return this.getItem(id)},EventHolderImpl.prototype.hasEvent=function(id){return this.hasItem(id)},EventHolderImpl.prototype.removeEvent=function(id){this.removeItem(id)},EventHolderImpl}(HolderImpl),Handler_values=function(o){var s="function"==typeof Symbol&&Symbol.iterator,m=s&&o[s],i=0;if(m)return m.call(o);if(o&&"number"==typeof o.length)return{next:function(){return o&&i>=o.length&&(o=void 0),{value:o&&o[i++],done:!o}}};throw new TypeError(s?"Object is not iterable.":"Symbol.iterator is not defined.")},HandlerImpl=function(){function HandlerImpl(utilString,dataHolder){this.utilString=utilString,this.sortKeysBuffer={},this.ids=[],this.setIds([]),this.dataHolder=dataHolder,this.resetIds()}return HandlerImpl.prototype.getDataHolder=function(){return this.dataHolder},HandlerImpl.prototype.sort=function(compareFunction){var _this=this;if(null==compareFunction&&(compareFunction=this.defaultCompareFunction),"function"==typeof compareFunction){var ids=this.getIds().map((function(o){return{id:o,sortKey:_this.getItem(o).getSortKey()}}));this.sortKeysBuffer={},ids.sort((function(a,b){return compareFunction.apply(_this,[a,b])})),this.sortKeysBuffer={},this.setIds(ids.map((function(o){return o.id})))}},HandlerImpl.prototype.filter=function(filterFunction){var e_1,_a;if("function"==typeof filterFunction){var ids=this.getIds(),newIds=[],index=0;try{for(var _b=Handler_values(Array.from(ids)),_c=_b.next();!_c.done;_c=_b.next()){var id=_c.value;!0===filterFunction.apply(this,[index,id])&&newIds.push(id),index++}}catch(e_1_1){e_1={error:e_1_1}}finally{try{_c&&!_c.done&&(_a=_b.return)&&_a.call(_b)}finally{if(e_1)throw e_1.error}}this.setIds(newIds)}},HandlerImpl.prototype.limit=function(count,offset){void 0===offset&&(offset=0),null==offset&&(offset=0);var newIds=this.getIds().slice(offset,offset+count);return this.setIds(newIds)},HandlerImpl.prototype.count=function(){return this.ids.length},HandlerImpl.prototype.each=function(callbackFunction){var e_2,_a;if("function"!=typeof callbackFunction)return!1;var ids=this.getIds(),index=0;try{for(var _b=Handler_values(Array.from(ids)),_c=_b.next();!_c.done;_c=_b.next()){var id=_c.value,ret=callbackFunction.apply(this,[index,id]);if(index++,!1===ret)break}}catch(e_2_1){e_2={error:e_2_1}}finally{try{_c&&!_c.done&&(_a=_b.return)&&_a.call(_b)}finally{if(e_2)throw e_2.error}}return!0},HandlerImpl.prototype.setIds=function(ids){this.ids=ids},HandlerImpl.prototype.getIds=function(){return this.ids},HandlerImpl.prototype.resetIds=function(){this.setIds(this.dataHolder.getAllContainerIds())},HandlerImpl.prototype.getItem=function(id){return this.getDataHolder().getItem(id)},HandlerImpl.prototype.defaultCompareFunction=function(idA,idB){var hasAccentsForLanguage=this.utilString.hasAccentsForLanguage(),sortKeyA=idA.sortKey,sortKeyB=idB.sortKey;return hasAccentsForLanguage?(null==this.sortKeysBuffer[idA.id]&&(this.sortKeysBuffer[idA.id]=sortKeyA,hasAccentsForLanguage&&(this.sortKeysBuffer[idA.id]=this.utilString.replaceAccents(this.sortKeysBuffer[idA.id]),this.sortKeysBuffer[idA.id]=this.sortKeysBuffer[idA.id].replace(/[a-z]/g,(function(letter){return letter.toUpperCase()})))),null==this.sortKeysBuffer[idB.id]&&(this.sortKeysBuffer[idB.id]=sortKeyB,hasAccentsForLanguage&&(this.sortKeysBuffer[idB.id]=this.utilString.replaceAccents(this.sortKeysBuffer[idB.id]),this.sortKeysBuffer[idB.id]=this.sortKeysBuffer[idB.id].replace(/[a-z]/g,(function(letter){return letter.toUpperCase()})))),this.utilString.fastCompare(this.sortKeysBuffer[idA.id],this.sortKeysBuffer[idB.id])):this.utilString.compare(sortKeyA,sortKeyB)},HandlerImpl}(),EventHandler_extends=function(){var _extendStatics=function(d,b){return _extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)Object.prototype.hasOwnProperty.call(b,p)&&(d[p]=b[p])},_extendStatics(d,b)};return function(d,b){if("function"!=typeof b&&null!==b)throw new TypeError("Class extends value "+String(b)+" is not a constructor or null");function __(){this.constructor=d}_extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}(),EventHandlerImpl=function(_super){function EventHandlerImpl(utilString,dataHolder){return _super.call(this,utilString,dataHolder)||this}return EventHandler_extends(EventHandlerImpl,_super),EventHandlerImpl.prototype.getDataHolder=function(){return this.dataHolder},EventHandlerImpl.prototype.getItem=function(id){return this.getDataHolder().getItem(id)},EventHandlerImpl}(HandlerImpl),LeagueHandler_extends=function(){var _extendStatics=function(d,b){return _extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)Object.prototype.hasOwnProperty.call(b,p)&&(d[p]=b[p])},_extendStatics(d,b)};return function(d,b){if("function"!=typeof b&&null!==b)throw new TypeError("Class extends value "+String(b)+" is not a constructor or null");function __(){this.constructor=d}_extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}(),LeagueHandlerImpl=function(_super){function LeagueHandlerImpl(utilString,dataHolder){return _super.call(this,utilString,dataHolder)||this}return LeagueHandler_extends(LeagueHandlerImpl,_super),LeagueHandlerImpl.prototype.getDataHolder=function(){return this.dataHolder},LeagueHandlerImpl.prototype.getItem=function(id){return this.getDataHolder().getItem(id)},LeagueHandlerImpl}(HandlerImpl);!function(ScopeList){ScopeList.SCOPE_DEFAULT="default",ScopeList.SCOPE_ARCHIVE="archive",ScopeList.SCOPE_TEMPORARY="temporary",ScopeList.SCOPE_MY_GAMES="mygames"}(ScopeList||(ScopeList={}));var SubCategoryList,HolderProxyImpl=function(){function HolderProxyImpl(){this.scopeName=ScopeList.SCOPE_DEFAULT,this.dataHolders={},this.dataHandlers={},this.setScope(ScopeList.SCOPE_DEFAULT)}return HolderProxyImpl.prototype.setScope=function(scopeName){this.scopeName=scopeName},HolderProxyImpl.prototype.getScope=function(){return this.scopeName},HolderProxyImpl.prototype.setDataHolders=function(dataHolders){this.dataHolders=dataHolders},HolderProxyImpl.prototype.setDataHandlers=function(dataHandlers){this.dataHandlers=dataHandlers},HolderProxyImpl.prototype.getHolder=function(){if(null!=this.dataHolders[this.scopeName])return this.dataHolders[this.scopeName];throw new Error("Holder for scope ".concat(this.scopeName," not found"))},HolderProxyImpl.prototype.getHandler=function(){if(null!=this.dataHandlers[this.scopeName])return this.dataHandlers[this.scopeName];throw new Error("Handler for scope ".concat(this.scopeName," not found"))},HolderProxyImpl.prototype.eachHolder=function(callbackFunction){if("function"==typeof callbackFunction)for(var scopeName in this.dataHolders){if(!1===callbackFunction(scopeName,this.dataHolders[scopeName]))break}},HolderProxyImpl.prototype.eachHandler=function(callbackFunction){if("function"==typeof callbackFunction)for(var scopeName in this.dataHandlers){if(!1===callbackFunction(scopeName,this.dataHandlers[scopeName]))break}},HolderProxyImpl.prototype.findScopeByItemId=function(itemId){var _this=this,retScope=!1;return this.getHolder().hasItem(itemId)?this.scopeName:(this.eachHolder((function(scope,holder){if(scope!==_this.scopeName)return holder.hasItem(itemId)?(retScope=scope,!1):void 0})),retScope)},HolderProxyImpl.prototype.findHolderByItemId=function(itemId){var scope=this.findScopeByItemId(itemId);return!1!==scope&&this.dataHolders[scope]},HolderProxyImpl.prototype.getItemValue=function(itemId,index){var holder=this.findHolderByItemId(itemId);return!1===holder?null:holder.getItem(itemId).getValue(index)},HolderProxyImpl}(),EventHolderProxy_extends=function(){var _extendStatics=function(d,b){return _extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)Object.prototype.hasOwnProperty.call(b,p)&&(d[p]=b[p])},_extendStatics(d,b)};return function(d,b){if("function"!=typeof b&&null!==b)throw new TypeError("Class extends value "+String(b)+" is not a constructor or null");function __(){this.constructor=d}_extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}(),EventHolderProxyImpl=function(_super){function EventHolderProxyImpl(){return null!==_super&&_super.apply(this,arguments)||this}return EventHolderProxy_extends(EventHolderProxyImpl,_super),EventHolderProxyImpl.prototype.setDataHolders=function(dataHolders){this.dataHolders=dataHolders},EventHolderProxyImpl.prototype.setDataHandlers=function(dataHandlers){this.dataHandlers=dataHandlers},EventHolderProxyImpl.prototype.getHolder=function(){if(null!=this.dataHolders[this.scopeName])return this.dataHolders[this.scopeName];throw new Error("EventHolder for scope ".concat(this.scopeName," not found"))},EventHolderProxyImpl.prototype.getHandler=function(){if(null!=this.dataHandlers[this.scopeName])return this.dataHandlers[this.scopeName];throw new Error("EventHandler for scope ".concat(this.scopeName," not found"))},EventHolderProxyImpl.prototype.findHolderByItemId=function(itemId){var scope=this.findScopeByItemId(itemId);return!1!==scope&&this.dataHolders[scope]},EventHolderProxyImpl.prototype.findHandlerByItemId=function(itemId){var scope=this.findScopeByItemId(itemId);return!1!==scope&&null!=this.dataHandlers[scope]&&this.dataHandlers[scope]},EventHolderProxyImpl.prototype.getEventHolder=function(){return this.getHolder()},EventHolderProxyImpl.prototype.getEventHandler=function(){return this.getHandler()},EventHolderProxyImpl.prototype.findEventHolderByEventId=function(eventId){return this.findHolderByItemId(eventId)},EventHolderProxyImpl.prototype.getEventValue=function(eventId,index){return this.getItemValue(eventId,index)},EventHolderProxyImpl}(HolderProxyImpl),LeagueHolderProxy_extends=function(){var _extendStatics=function(d,b){return _extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)Object.prototype.hasOwnProperty.call(b,p)&&(d[p]=b[p])},_extendStatics(d,b)};return function(d,b){if("function"!=typeof b&&null!==b)throw new TypeError("Class extends value "+String(b)+" is not a constructor or null");function __(){this.constructor=d}_extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}(),LeagueHolderProxyImpl=function(_super){function LeagueHolderProxyImpl(){return null!==_super&&_super.apply(this,arguments)||this}return LeagueHolderProxy_extends(LeagueHolderProxyImpl,_super),LeagueHolderProxyImpl.prototype.setDataHolders=function(dataHolders){this.dataHolders=dataHolders},LeagueHolderProxyImpl.prototype.setDataHandlers=function(dataHandlers){this.dataHandlers=dataHandlers},LeagueHolderProxyImpl.prototype.getHolder=function(){if(null!=this.dataHolders[this.scopeName])return this.dataHolders[this.scopeName];throw new Error("LeagueHolder for scope ".concat(this.scopeName," not found"))},LeagueHolderProxyImpl.prototype.getHandler=function(){if(null!=this.dataHandlers[this.scopeName])return this.dataHandlers[this.scopeName];throw new Error("LeagueHandler for scope ".concat(this.scopeName," not found"))},LeagueHolderProxyImpl.prototype.findHolderByItemId=function(itemId){var scope=this.findScopeByItemId(itemId);return!1!==scope&&this.dataHolders[scope]},LeagueHolderProxyImpl.prototype.getLeagueHolder=function(){return this.getHolder()},LeagueHolderProxyImpl.prototype.getLeagueHandler=function(){return this.getHandler()},LeagueHolderProxyImpl.prototype.findLeagueHolderByLeagueId=function(leagueId){return this.findHolderByItemId(leagueId)},LeagueHolderProxyImpl.prototype.getLeagueValue=function(leagueId,index){return this.getItemValue(leagueId,index)},LeagueHolderProxyImpl}(HolderProxyImpl);!function(SubCategoryList){SubCategoryList[SubCategoryList.ODDS_MATCHES=1]="ODDS_MATCHES",SubCategoryList[SubCategoryList.ODDS_PREMATCH=2]="ODDS_PREMATCH",SubCategoryList[SubCategoryList.ODDS_LIVE=3]="ODDS_LIVE"}(SubCategoryList||(SubCategoryList={}));var FeedTypeList,Full=function(){function Full(sportId,utilEnvironment,utilSport,utilDate,utilPage){this.sportId=sportId,this.utilEnvironment=utilEnvironment,this.utilSport=utilSport,this.utilDate=utilDate,this.utilPage=utilPage}return Full.prototype.get=function(){var _a,url="f_%SPORT_ID%_%SUDATE%_%TIMEZONE_HOUR%_%LOCAL_LANGUAGE%_%PROJECT_TYPE_ID%";this.utilPage.isMixed()&&0===this.sportId?url="fm_%SUDATE%_%TIMEZONE_HOUR%_%LOCAL_LANGUAGE%_%PROJECT_TYPE_ID%":this.utilSport.isGroupSport(this.sportId)&&(url="fp_%SPORT_ID%_%SUDATE%_%TIMEZONE_HOUR%_%LOCAL_LANGUAGE%_%PROJECT_TYPE_ID%");var headers={};return cjs.geoIP||(headers["X-GeoIP"]=1),0===this.utilDate.getTimestamp()&&(headers["X-utime"]=1),{context:"full_%SPORT_ID%_%SUDATE%",url,headers,beforeCallback:function(){cjs.full_loaded=!1},completeCallback:null===(_a=this.utilEnvironment.getUpdater())||void 0===_a?void 0:_a.response_full}},Full}(),Empty=function(){function Empty(){}return Empty.prototype.get=function(){return{}},Empty}(),Repair=function(){function Repair(utilEnvironment){this.utilEnvironment=utilEnvironment}return Repair.prototype.get=function(){var _a;return{url:"r_%SPORT_ID%_%PROJECT_TYPE_ID%",beforeCallback:function(){cjs.repair_loaded=!1},completeCallback:null===(_a=this.utilEnvironment.getUpdater())||void 0===_a?void 0:_a.response_update,context:"repair_%SPORT_ID%"}},Repair}(),Frepair_extends=function(){var _extendStatics=function(d,b){return _extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)Object.prototype.hasOwnProperty.call(b,p)&&(d[p]=b[p])},_extendStatics(d,b)};return function(d,b){if("function"!=typeof b&&null!==b)throw new TypeError("Class extends value "+String(b)+" is not a constructor or null");function __(){this.constructor=d}_extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}(),Frepair=function(_super){function Frepair(){return null!==_super&&_super.apply(this,arguments)||this}return Frepair_extends(Frepair,_super),Frepair.prototype.get=function(){var data=_super.prototype.get.call(this);return data.context="frepair_%SPORT_ID%",data},Frepair}(Repair),Update=function(){function Update(utilEnvironment,feedConfig){this.utilEnvironment=utilEnvironment,this.feedConfig=feedConfig}return Update.prototype.get=function(){var _a,headers={};return this.feedConfig.benchmarkRequest&&(headers["X-BenchmarkRequest"]=1),{url:"u_%SPORT_ID%_%PROJECT_TYPE_ID%",completeCallback:null===(_a=this.utilEnvironment.getUpdater())||void 0===_a?void 0:_a.response_update,context:"update_%SPORT_ID%",headers}},Update}(),UpdateLocal=function(){function UpdateLocal(){}return UpdateLocal.prototype.get=function(){return{url:"ul_%SPORT_ID%_%PROJECT_ID%",completeCallback:function(){},context:"update_local_%SPORT_ID%"}},UpdateLocal}(),Sys=function(){function Sys(utilEnvironment){this.utilEnvironment=utilEnvironment}return Sys.prototype.get=function(){var _a;return{url:"sys_%PROJECT_TYPE_ID%",completeCallback:null===(_a=this.utilEnvironment.getUpdater())||void 0===_a?void 0:_a.response_sys}},Sys}();!function(FeedTypeList){FeedTypeList.FULL="full",FeedTypeList.UPDATE="update",FeedTypeList.UPDATE_LOCAL="updateLocal",FeedTypeList.UPDATE_MY_GAMES="updateMyGames",FeedTypeList.REPAIR="repair",FeedTypeList.FREPAIR="frepair",FeedTypeList.SYS="sys",FeedTypeList.COUNTRY="country",FeedTypeList.SERIES="series",FeedTypeList.ODDS="odds",FeedTypeList.FULL_ODDS="full-odds",FeedTypeList.UPDATED_ODDS="updated-odds",FeedTypeList.TOURNAMENT="tournament",FeedTypeList.TOURNAMENT_RESULTS="tournament-results",FeedTypeList.TOURNAMENT_FIXTURES="tournament-fixtures",FeedTypeList.TOURNAMENT_ODDS="tournament-odds",FeedTypeList.PARTICIPANT="participant",FeedTypeList.PARTICIPANT_RESULTS="participant-results",FeedTypeList.PARTICIPANT_FIXTURES="participant-fixtures",FeedTypeList.PARTICIPANT_NEWSFEED="participant-newsfeed",FeedTypeList.PARTICIPANT_ODDS="participant-odds",FeedTypeList.UNKNOWN="unknown"}(FeedTypeList||(FeedTypeList={}));var PageTypesList,Country=function(){function Country(utilEnvironment,utilDate){this.utilEnvironment=utilEnvironment,this.utilDate=utilDate}return Country.prototype.get=function(){var _a,headers={};return cjs.geoIP||(headers["X-GeoIP"]=1),0===this.utilDate.getTimestamp()&&(headers["X-utime"]=1),{headers,url:"c_%SPORT_ID%_%COUNTRY_ID%_%TIMEZONE_HOUR%_%LOCAL_LANGUAGE%_%COUNTRY_TOURNAMENT_ORDER%_%PROJECT_TYPE_ID%",beforeCallback:function(){cjs.full_loaded=!1},completeCallback:null===(_a=this.utilEnvironment.getUpdater())||void 0===_a?void 0:_a.response_full}},Country}(),Tournament=function(){function Tournament(sportId,utilEnvironment,utilSport,utilDate){this.sportId=sportId,this.utilEnvironment=utilEnvironment,this.utilSport=utilSport,this.utilDate=utilDate}return Tournament.prototype.get=function(){var _a,_this=this,url="t_%SPORT_ID%_%COUNTRY_ID%_%TOURNAMENT_ID%_%TIMEZONE_HOUR%_%LOCAL_LANGUAGE%_%COUNTRY_TOURNAMENT_ORDER%_%PROJECT_TYPE_ID%",beforeCallback=function(){cjs.full_loaded=!1};cjs.Api.config.get("app","tournament_pages","enable")&&(url="t_%SPORT_ID%_%COUNTRY_ID%_%TOURNAMENT_ID%_%TIMEZONE_HOUR%_%LOCAL_LANGUAGE%_%PROJECT_TYPE_ID%",beforeCallback=function(){cjs.full_loaded=!1;var updater=_this.utilEnvironment.getUpdater();_this.utilSport.inGroup(_this.sportId,SportList_SportList.MOTORSPORT)&&updater?updater.country_tournament_order_fin=!0:updater&&(updater.country_tournament_order_fin=!1)});var headers={};return cjs.geoIP||(headers["X-GeoIP"]=1),0===this.utilDate.getTimestamp()&&(headers["X-utime"]=1),{headers,url,beforeCallback,completeCallback:null===(_a=this.utilEnvironment.getUpdater())||void 0===_a?void 0:_a.response_full}},Tournament}(),Participant=function(){function Participant(sportId,feedConfig,utilEnvironment,utilDate){this.sportId=sportId,this.feedConfig=feedConfig,this.utilEnvironment=utilEnvironment,this.utilDate=utilDate}return Participant.prototype.get=function(){var _a,_this=this,participantId=(this.feedConfig?this.feedConfig.participantId:void 0)||"",url="p_%SPORT_ID%_%COUNTRY_ID%_".concat(participantId,"_%TIMEZONE_HOUR%_%LOCAL_LANGUAGE%_%PROJECT_TYPE_ID%"),headers={};return cjs.geoIP||(headers["X-GeoIP"]=1),0===this.utilDate.getTimestamp()&&(headers["X-utime"]=1),{headers,url,beforeCallback:function(){cjs.full_loaded=!1;var updater=_this.utilEnvironment.getUpdater();updater&&(updater.country_tournament_order_fin=!1)},completeCallback:null===(_a=this.utilEnvironment.getUpdater())||void 0===_a?void 0:_a.response_full}},Participant}(),Series=function(){function Series(sportId,feedConfig,utilEnvironment,utilDate){this.sportId=sportId,this.feedConfig=feedConfig,this.utilEnvironment=utilEnvironment,this.utilDate=utilDate}return Series.prototype.get=function(){var _a,_this=this,seriesId=(this.feedConfig?this.feedConfig.seriesId:void 0)||"",url="s_%SPORT_ID%_".concat(seriesId,"_%TIMEZONE_HOUR%_%LOCAL_LANGUAGE%_%PROJECT_TYPE_ID%"),headers={};return cjs.geoIP||(headers["X-GeoIP"]=1),0===this.utilDate.getTimestamp()&&(headers["X-utime"]=1),{headers,url,beforeCallback:function(){cjs.full_loaded=!1;var updater=_this.utilEnvironment.getUpdater();updater&&(updater.country_tournament_order_fin=!1)},completeCallback:null===(_a=this.utilEnvironment.getUpdater())||void 0===_a?void 0:_a.response_full}},Series}(),Odds=function(){function Odds(sportId,utilEnvironment,utilPage){this.sportId=sportId,this.utilEnvironment=utilEnvironment,this.utilPage=utilPage}return Odds.prototype.get=function(){var _a,url="fo_%SPORT_ID%_%SUDATE%_%TIMEZONE_HOUR%_%LOCAL_LANGUAGE%_%PROJECT_TYPE_ID%_%IS_LIVE_ODDS%";return this.utilPage.isMixed()&&0===this.sportId&&(url="mo_%SUDATE%_%TIMEZONE_HOUR%_%LOCAL_LANGUAGE%_%PROJECT_TYPE_ID%_%IS_LIVE_ODDS%"),{context:"odds_%SPORT_ID%",url,completeCallback:null===(_a=this.utilEnvironment.getUpdater())||void 0===_a?void 0:_a.response_odds}},Odds}(),FullOdds=function(){function FullOdds(sportId,utilEnvironment,utilPage){this.sportId=sportId,this.utilEnvironment=utilEnvironment,this.utilPage=utilPage}return FullOdds.prototype.get=function(){var _a,url="fo_%SPORT_ID%_%SUDATE%_%TIMEZONE_HOUR%_%LOCAL_LANGUAGE%_%PROJECT_TYPE_ID%_%IS_LIVE_ODDS%";return this.utilPage.isMixed()&&0===this.sportId&&(url="mo_%SUDATE%_%TIMEZONE_HOUR%_%LOCAL_LANGUAGE%_%PROJECT_TYPE_ID%_%IS_LIVE_ODDS%"),{url,completeCallback:null===(_a=this.utilEnvironment.getUpdater())||void 0===_a?void 0:_a.response_load_odds}},FullOdds}(),UpdatedOdds=function(){function UpdatedOdds(sportId,utilEnvironment,utilPage){this.sportId=sportId,this.utilEnvironment=utilEnvironment,this.utilPage=utilPage}return UpdatedOdds.prototype.get=function(){var _a,url="uo_%SPORT_ID%_%IS_LIVE_ODDS%";return this.utilPage.isMixed()&&0===this.sportId&&(url="uo_m_%IS_LIVE_ODDS%"),{url,completeCallback:null===(_a=this.utilEnvironment.getUpdater())||void 0===_a?void 0:_a.response_updated_odds}},UpdatedOdds}(),TournamentOdds=function(){function TournamentOdds(utilEnvironment){this.utilEnvironment=utilEnvironment}return TournamentOdds.prototype.get=function(){var _a;return{url:"to_%SPORT_ID%_%COUNTRY_ID%_%TOURNAMENT_ID%_%TIMEZONE_HOUR%_%LOCAL_LANGUAGE%_%COUNTRY_TOURNAMENT_ORDER%_%PROJECT_TYPE_ID%",completeCallback:null===(_a=this.utilEnvironment.getUpdater())||void 0===_a?void 0:_a.response_load_odds}},TournamentOdds}(),ParticipantOdds=function(){function ParticipantOdds(utilEnvironment,feedConfig){this.utilEnvironment=utilEnvironment,this.feedConfig=feedConfig}return ParticipantOdds.prototype.get=function(){var _a,participantId=(this.feedConfig?this.feedConfig.participantId:void 0)||"";return{url:"po_%SPORT_ID%_%COUNTRY_ID%_".concat(participantId,"_%TIMEZONE_HOUR%_%LOCAL_LANGUAGE%_%PROJECT_TYPE_ID%"),completeCallback:null===(_a=this.utilEnvironment.getUpdater())||void 0===_a?void 0:_a.response_load_odds}},ParticipantOdds}(),ParticipantNewsfeed=function(){function ParticipantNewsfeed(feedConfig){this.feedConfig=feedConfig}return ParticipantNewsfeed.prototype.get=function(){var _this=this,participantId=(this.feedConfig?this.feedConfig.participantId:void 0)||"";return{url:"pnf_".concat(participantId),completeCallback:function(){return _this.feedConfig.callback}}},ParticipantNewsfeed}(),TournamentFixtures=function(){function TournamentFixtures(utilEnvironment,feedConfig){this.utilEnvironment=utilEnvironment,this.feedConfig=feedConfig}return TournamentFixtures.prototype.get=function(){var seasonId=(this.feedConfig?this.feedConfig.seasonId:void 0)||"",dataPart=(this.feedConfig?this.feedConfig.dataPart:void 0)||"";return{context:"tournament-fixtures_%SPORT_ID%",url:"tf_%SPORT_ID%_%COUNTRY_ID%_%TOURNAMENT_ID%_".concat(seasonId,"_").concat(dataPart,"_%TIMEZONE_HOUR%_%LOCAL_LANGUAGE%_%PROJECT_TYPE_ID%")}},TournamentFixtures}(),TournamentResults=function(){function TournamentResults(utilEnvironment,feedConfig){this.utilEnvironment=utilEnvironment,this.feedConfig=feedConfig}return TournamentResults.prototype.get=function(){var seasonId=(this.feedConfig?this.feedConfig.seasonId:void 0)||"",dataPart=(this.feedConfig?this.feedConfig.dataPart:void 0)||"";return{context:"tournament-fixtures_%SPORT_ID%",url:"tr_%SPORT_ID%_%COUNTRY_ID%_%TOURNAMENT_ID%_".concat(seasonId,"_").concat(dataPart,"_%TIMEZONE_HOUR%_%LOCAL_LANGUAGE%_%PROJECT_TYPE_ID%")}},TournamentResults}(),ParticipantFixtures=function(){function ParticipantFixtures(utilEnvironment,feedConfig){this.utilEnvironment=utilEnvironment,this.feedConfig=feedConfig}return ParticipantFixtures.prototype.get=function(){var participantId=(this.feedConfig?this.feedConfig.participantId:void 0)||"",dataPart=(this.feedConfig?this.feedConfig.dataPart:void 0)||"",tennisType=(this.feedConfig?this.feedConfig.tennisType:void 0)||"";return{context:"participant-fixtures"+tennisType,url:"pf_%SPORT_ID%_%COUNTRY_ID%_".concat(participantId,"_").concat(dataPart,"_%TIMEZONE_HOUR%_%LOCAL_LANGUAGE%_%PROJECT_TYPE_ID%").concat(tennisType)}},ParticipantFixtures}(),ParticipantResults=function(){function ParticipantResults(utilEnvironment,feedConfig){this.utilEnvironment=utilEnvironment,this.feedConfig=feedConfig}return ParticipantResults.prototype.get=function(){var participantId=(this.feedConfig?this.feedConfig.participantId:void 0)||"",dataPart=(this.feedConfig?this.feedConfig.dataPart:void 0)||"",tennisType=(this.feedConfig?this.feedConfig.tennisType:void 0)||"";return{context:"participant-results"+tennisType,url:"pr_%SPORT_ID%_%COUNTRY_ID%_".concat(participantId,"_").concat(dataPart,"_%TIMEZONE_HOUR%_%LOCAL_LANGUAGE%_%PROJECT_TYPE_ID%").concat(tennisType)}},ParticipantResults}(),DataFactory=function(){function DataFactory(utilEnvironment,utilSport,utilDate,utilPage){this.utilEnvironment=utilEnvironment,this.utilSport=utilSport,this.utilDate=utilDate,this.utilPage=utilPage}return DataFactory.prototype.create=function(feedName,sportId,feedConfig){switch(feedName){case FeedTypeList.FULL:return new Full(sportId,this.utilEnvironment,this.utilSport,this.utilDate,this.utilPage);case FeedTypeList.UPDATE:return new Update(this.utilEnvironment,feedConfig);case FeedTypeList.UPDATE_LOCAL:return new UpdateLocal;case FeedTypeList.REPAIR:return new Repair(this.utilEnvironment);case FeedTypeList.FREPAIR:return new Frepair(this.utilEnvironment);case FeedTypeList.SYS:return new Sys(this.utilEnvironment);case FeedTypeList.COUNTRY:return new Country(this.utilEnvironment,this.utilDate);case FeedTypeList.SERIES:return new Series(sportId,feedConfig,this.utilEnvironment,this.utilDate);case FeedTypeList.ODDS:return new Odds(sportId,this.utilEnvironment,this.utilPage);case FeedTypeList.FULL_ODDS:return new FullOdds(sportId,this.utilEnvironment,this.utilPage);case FeedTypeList.UPDATED_ODDS:return new UpdatedOdds(sportId,this.utilEnvironment,this.utilPage);case FeedTypeList.TOURNAMENT_ODDS:return new TournamentOdds(this.utilEnvironment);case FeedTypeList.TOURNAMENT:return new Tournament(sportId,this.utilEnvironment,this.utilSport,this.utilDate);case FeedTypeList.TOURNAMENT_FIXTURES:return new TournamentFixtures(this.utilEnvironment,feedConfig);case FeedTypeList.TOURNAMENT_RESULTS:return new TournamentResults(this.utilEnvironment,feedConfig);case FeedTypeList.PARTICIPANT:return new Participant(sportId,feedConfig,this.utilEnvironment,this.utilDate);case FeedTypeList.PARTICIPANT_ODDS:return new ParticipantOdds(this.utilEnvironment,feedConfig);case FeedTypeList.PARTICIPANT_FIXTURES:return new ParticipantFixtures(this.utilEnvironment,feedConfig);case FeedTypeList.PARTICIPANT_RESULTS:return new ParticipantResults(this.utilEnvironment,feedConfig);case FeedTypeList.PARTICIPANT_NEWSFEED:return new ParticipantNewsfeed(feedConfig);default:return new Empty}},DataFactory}(),RequestImpl=function(){function RequestImpl(utilEnviroment,utilSport,utilDate,utilPage){this.utilEnviroment=utilEnviroment,this.utilSport=utilSport,this.utilDate=utilDate,this.utilPage=utilPage,this.activeRequests={}}return RequestImpl.prototype.execute=function(action,sportId,responseCallback,feedConfig,errorCallback){var feedData=this.getFeedData(action,sportId,void 0,feedConfig);return!!feedData&&(responseCallback&&(feedData.completeCallback=responseCallback),this.abortActiveRequest(feedData.context),"function"==typeof feedData.beforeCallback&&feedData.beforeCallback(),this.activeRequests[feedData.context]=this.utilEnviroment.createAjaxFeedObject(feedData.url,(function(status,headers,content,triggerType,customHeaders){return feedData.completeCallback&&feedData.completeCallback(status,headers,content,triggerType,customHeaders)}),action),errorCallback&&this.activeRequests[feedData.context].setErrorCallback(errorCallback),this.activeRequests[feedData.context].update(feedData.headers),!0)},RequestImpl.prototype.getFeedData=function(feedName,sportId,day,feedConfig){sportId=null!=sportId?sportId:this.utilEnviroment.getSportId();var data=new DataFactory(this.utilEnviroment,this.utilSport,this.utilDate,this.utilPage).create(feedName,sportId,null!=feedConfig?feedConfig:{}).get();if(!Object.keys(data).length)return!1;var feedData={context:feedName,headers:{},feedName,url:""};for(var dataType in data)switch(data.hasOwnProperty(dataType)&&(feedData[dataType]=data[dataType]),dataType){case"url":case"context":feedData[dataType]=this.replaceTags(String(feedData[dataType]),sportId,null!=day?day:this.utilEnviroment.getSudate())}return null!=feedData.headers&&0===Object.keys(feedData.headers).length&&(feedData.headers={}),feedData},RequestImpl.prototype.abortActiveRequest=function(context){this.activeRequests[context]&&(this.activeRequests[context].getUpdating()&&this.activeRequests[context].abort(),delete this.activeRequests[context])},RequestImpl.prototype.replaceTags=function(str,sportId,day){var _this=this,replacements={"%LOCAL_LANGUAGE%":function(){return cjs.Api.config.get("app","lang","web")||""},"%LOCAL_LANGUAGE_ID%":function(){return cjs.Api.config.get("app","lang","dc")||""},"%SUDATE%":function(){return String(day)},"%PROJECT_TYPE_ID%":function(){return String(_this.utilEnviroment.getProjectTypeId())},"%PROJECT_ID%":function(){return String(_this.utilEnviroment.getProjectId())},"%TIMEZONE_HOUR%":function(){return String(cjs.Api.timezone.getHour())},"%SPORT_ID%":function(){return String(sportId)},"%IS_LIVE_ODDS%":function(){return String(_this.utilEnviroment.getSubCategory()==SubCategoryList.ODDS_LIVE?1:0)},"%COUNTRY_ID%":function(){var _a;return String((null===(_a=_this.utilEnviroment.getUpdater())||void 0===_a?void 0:_a.country_id)||"")},"%TOURNAMENT_ID%":function(){var _a;return String((null===(_a=_this.utilEnviroment.getUpdater())||void 0===_a?void 0:_a.tournament_id)||"")},"%COUNTRY_TOURNAMENT_ORDER%":function(){var _a;return(null===(_a=_this.utilEnviroment.getUpdater())||void 0===_a?void 0:_a.country_tournament_order_fin)?"y":"n"}},r=new RegExp(Object.keys(replacements).join("|"),"g");return str.replace(r,(function(key){return replacements[key]()}))},RequestImpl}(),FeedLoaderImpl=function(){function FeedLoaderImpl(utilEnviroment){this.utilEnviroment=utilEnviroment,this.feeds={},this.feedsLoaded=0,this.filterCallback=function(){return!0},this.beforeCallback=null,this.afterCallback=null,this.reset()}return FeedLoaderImpl.prototype.reset=function(){this.abortActiveRequests(),this.feeds={},this.feedsLoaded=0,this.filterCallback=function(){return!0},this.beforeCallback=null,this.afterCallback=null},FeedLoaderImpl.prototype.addIntoQueue=function(feedRequest){return!(!feedRequest||this.feeds[feedRequest.context])&&(this.feeds[feedRequest.context]=feedRequest,!0)},FeedLoaderImpl.prototype.setBeforeCallback=function(callback){this.beforeCallback=callback},FeedLoaderImpl.prototype.setAfterCallback=function(callback){this.afterCallback=callback},FeedLoaderImpl.prototype.abortActiveRequests=function(){var _a;for(var context in this.feeds)null===(_a=this.feeds[context].ajaxObject)||void 0===_a||_a.abort();this.feedsLoaded=0},FeedLoaderImpl.prototype.downloadAndExecuteFeeds=function(){this.abortActiveRequests();var feedCount=0;for(var context in this.feeds)this.downloadFeed(context),feedCount++;0===feedCount&&("function"==typeof this.beforeCallback&&this.beforeCallback(),"function"==typeof this.afterCallback&&this.afterCallback())},FeedLoaderImpl.prototype.executeCompleteCallback=function(feedName){if(this.feeds[feedName]&&this.feedsLoaded===Object.keys(this.feeds).length){var feedData=this.feeds[feedName];feedData.beforeCallback&&feedData.beforeCallback();var responseData=feedData.responseData;feedData.completeCallback&&responseData&&feedData.completeCallback(responseData.responseStatus,responseData.responseHeaders,responseData.responseContent,responseData.responseTriggerType,responseData.responseCustomHeaders)}},FeedLoaderImpl.prototype.executeFilterCallback=function(callback){this.filterCallback=callback},FeedLoaderImpl.prototype.downloadFeed=function(feedName){var _a,_this=this,feedData=this.feeds[feedName];"function"==typeof feedData.beforeCallback&&feedData.beforeCallback(),this.feeds[feedName].ajaxObject=this.utilEnviroment.createAjaxFeedObject(feedData.url,(function(responseStatus,responseHeaders,responseContent,responseTriggerType,responseCustomHeaders){return _this.responseCallback(feedName,responseStatus,responseHeaders,responseContent,responseTriggerType,responseCustomHeaders)}),feedData.feedName,(function(){return _this.feedsLoaded++})),null===(_a=this.feeds[feedName].ajaxObject)||void 0===_a||_a.update(feedData.headers)},FeedLoaderImpl.prototype.responseCallback=function(feedContext,responseStatus,responseHeaders,responseContent,responseTriggerType,responseCustomHeaders){this.feeds[feedContext].responseData={responseStatus,responseHeaders,responseContent,responseTriggerType,responseCustomHeaders},this.feedsLoaded++,this.feedsLoaded===Object.keys(this.feeds).length&&this.executeAllCallbacks()},FeedLoaderImpl.prototype.executeAllCallbacks=function(){for(var context in"function"==typeof this.beforeCallback&&this.beforeCallback(),this.feeds)this.filterCallback(context)&&this.executeCompleteCallback(context);"function"==typeof this.afterCallback&&this.afterCallback()},FeedLoaderImpl}(),banner_handler=__webpack_require__(3321),LocalUpdateImpl=function(){function LocalUpdateImpl(utilEnviroment){this.utilEnviroment=utilEnviroment,this.syncTime=0,this.lastSyncTime=0}return LocalUpdateImpl.prototype.setSyncTime=function(timestamp){this.syncTime=timestamp},LocalUpdateImpl.prototype.update=function(action,updateAction){var _this=this;if(![FeedTypeList.UPDATE,FeedTypeList.UPDATE_MY_GAMES].includes(action))return!1;if(this.syncTime>this.lastSyncTime){var sportId=action===FeedTypeList.UPDATE_MY_GAMES?0:this.utilEnviroment.getSportId()||0;return this.utilEnviroment.getFeedRequestObject().execute(FeedTypeList.UPDATE_LOCAL,sportId,(function(status,headers,content,triggerType){_this.response(content,triggerType,updateAction)})),this.lastSyncTime=this.syncTime,!0}return!1},LocalUpdateImpl.prototype.response=function(content,triggerType,updateAction){this.utilEnviroment.parse(content,!0,!1,triggerType),updateAction(triggerType)},LocalUpdateImpl}();!function(PageTypesList){PageTypesList.PAGE_TYPE_CATEGORY="category_page",PageTypesList.PAGE_TYPE_COMMON="common_page",PageTypesList.PAGE_TYPE_MIXED="mixed_page",PageTypesList.PAGE_TYPE_PLAYER="player_page",PageTypesList.PAGE_TYPE_RANKING="ranking_page",PageTypesList.PAGE_TYPE_SERIES="series_page",PageTypesList.PAGE_TYPE_SPORT="sport_page",PageTypesList.PAGE_TYPE_TEAM="team_page",PageTypesList.PAGE_TYPE_TOURNAMENT="tournament_page",PageTypesList.PAGE_TYPE_DRAW="draw_page",PageTypesList.PAGE_TYPE_MYFS="myfs_page",PageTypesList.PAGE_TYPE_UNKNOWN="unknown"}(PageTypesList||(PageTypesList={}));var ABTestingVariant,MyGamesHelperImpl=function(){function MyGamesHelperImpl(loginClient,getGmtOffsetFunc,utilEnvironment){this.loginClient=loginClient,this.getGmtOffsetFunc=getGmtOffsetFunc,this.utilEnvironment=utilEnvironment}return MyGamesHelperImpl.prototype.getFutureDays=function(){return cjs.Api.config.get("app","mygames","future_days")||0},MyGamesHelperImpl.prototype.getPastDays=function(){return cjs.Api.config.get("app","mygames","past_days")||0},MyGamesHelperImpl.prototype.isOk=function(matchDay,matchStatusType){return matchDay>0&&matchStatusType===EventStageTypeList.SCHEDULED||matchDay<0&&matchStatusType===EventStageTypeList.FINISHED?1:0},MyGamesHelperImpl.prototype.getExpireDate=function(){var local_date=new Date;return Date.UTC(local_date.getFullYear(),local_date.getMonth(),local_date.getDate(),0,0,0)/1e3+this.getGmtOffsetFunc()+86400},MyGamesHelperImpl.prototype.isMyGameDataValid=function(myGameData){return(new Date).getTime()/1e3+this.getGmtOffsetFunc()<(myGameData.m_expire_date||0)},MyGamesHelperImpl.prototype.getStorageTimestamp=function(){return this.isSyncBetweenTabsAllowed()?parseInt(ClientStorage.get("fsdc_my_local_ts")||"0"):0},MyGamesHelperImpl.prototype.getMatchDay=function(matchDay){return(null!=matchDay?matchDay.length:void 0)?matchDay.includes(0)?0:1===matchDay.length||matchDay[0]>0?matchDay[0]:matchDay[matchDay.length-1]:-9999},MyGamesHelperImpl.prototype.isSyncBetweenTabsAllowed=function(){return!(null!=this.loginClient?this.loginClient.loggedIn():void 0)},MyGamesHelperImpl.prototype.redrawLivescore=function(category,sortFsData,localStorageSyncCb){"function"==typeof localStorageSyncCb&&localStorageSyncCb(),sortFsData(),this.callReactUpdates(category,!0)},MyGamesHelperImpl.prototype.syncWithLsId=function(myGamesData,noduelLabelData,getMatchDayFunc){var _a,_b,_c,_d,_e,_f,_g,_h,_j,_k,_l,data,gameIndex,lablIndex;if(null!=this.loginClient?this.loginClient.loggedIn():void 0){var lsidMygamesData=null===(_a=this.loginClient)||void 0===_a?void 0:_a.getData("mygames"),lsiddata=null!=(null!=lsidMygamesData?lsidMygamesData.data:void 0)&&null!=lsidMygamesData&&null!==(_b=lsidMygamesData.data)&&void 0!==_b?_b:{},lsidNoduelLablData=null!=(null!=lsidMygamesData?lsidMygamesData.noduel:void 0)&&null!==(_c=lsidMygamesData.noduel)&&void 0!==_c?_c:{};for(lablIndex in noduelLabelData)data=noduelLabelData[lablIndex],lsidNoduelLablData.hasOwnProperty(lablIndex)||delete noduelLabelData[lablIndex];for(lablIndex in lsidNoduelLablData)if(data=lsidNoduelLablData[lablIndex],noduelLabelData.hasOwnProperty(lablIndex))noduelLabelData[lablIndex].mgGroup=data.MG;else{var sportId=parseInt(lablIndex.replace(new RegExp("([0-9]+)_[a-zA-Z0-9]{8,16}"),"$1"));noduelLabelData[lablIndex]={sport_id:sportId,labl_id:null!==(_d=data.labl_id)&&void 0!==_d?_d:"",m_day:this.getMatchDay(getMatchDayFunc(null!==(_e=data.AD)&&void 0!==_e?_e:0,null!==(_f=data.AP)&&void 0!==_f?_f:0)),m_ok:0,AD:null!==(_g=data.AD)&&void 0!==_g?_g:0,AP:null!==(_h=data.AP)&&void 0!==_h?_h:0,AB:0,noDuel:this.isNoDuel(sportId,data),mgGroup:data.MG}}for(gameIndex in myGamesData)data=myGamesData[gameIndex],(null==lsiddata?void 0:lsiddata.hasOwnProperty(gameIndex))||delete myGamesData[gameIndex];for(gameIndex in lsiddata)if(data=lsiddata[gameIndex],myGamesData.hasOwnProperty(gameIndex))myGamesData[gameIndex].mgGroup=data.MG;else{sportId=parseInt(gameIndex.replace(new RegExp("g_([0-9]+)_[a-zA-Z0-9]{8,16}"),"$1"));myGamesData[gameIndex]={sport_id:sportId,labl_id:null!==(_j=data.labl_id)&&void 0!==_j?_j:"",m_day:0,m_ok:0,AD:null!==(_k=data.AD)&&void 0!==_k?_k:0,AP:null!==(_l=data.AP)&&void 0!==_l?_l:0,AB:0,noDuel:this.isNoDuel(sportId,data),mgGroup:data.MG}}}},MyGamesHelperImpl.prototype.remoteStoreChanges=function(container,noDuelTournamentsData,getCountOnly){var _a,_b,_c,_d,_e,data,gameIndex,labelIndex,dataToStore;null==getCountOnly&&(getCountOnly=!1);var count=0,lsidMygames=null===(_a=this.loginClient)||void 0===_a?void 0:_a.getData("mygames"),lsidMygamesData=null!=(null!=lsidMygames?lsidMygames.data:void 0)?null!=lsidMygames?lsidMygames.data:void 0:{},lsidNoduelLablData=null!=(null!=lsidMygames?lsidMygames.noduel:void 0)?lsidMygames.noduel:{};for(labelIndex in noDuelTournamentsData)data=noDuelTournamentsData[labelIndex],lsidNoduelLablData.hasOwnProperty(labelIndex)&&(lsidNoduelLablData[labelIndex].MG||0)===(data.mgGroup||0)||(count++,getCountOnly||(dataToStore={AD:data.AD},data.AP&&(dataToStore.AP=data.AP),data.mgGroup&&(dataToStore.MG=data.mgGroup),null===(_b=this.loginClient)||void 0===_b||_b.storeData(dataToStore,"mygames.noduel."+labelIndex,(function(){}),(function(){}))));for(labelIndex in lsidNoduelLablData)data=lsidNoduelLablData[labelIndex],noDuelTournamentsData.hasOwnProperty(labelIndex)||(count++,getCountOnly||null===(_c=this.loginClient)||void 0===_c||_c.removeData("mygames.noduel."+labelIndex,(function(){}),(function(){})));for(gameIndex in container)data=container[gameIndex],lsidMygamesData.hasOwnProperty(gameIndex)&&(lsidMygamesData[gameIndex].MG||0)===(data.mgGroup||0)||(count++,getCountOnly||(dataToStore={AD:data.AD},null!=data.mgGroup&&(dataToStore.MG=data.mgGroup),data.AP&&(dataToStore.AP=data.AP),dataToStore.is_duel=this.isDuel(data.sport_id,data),null===(_d=this.loginClient)||void 0===_d||_d.storeData(dataToStore,"mygames.data."+gameIndex,(function(){}),(function(){}))));for(gameIndex in lsidMygamesData)data=lsidMygamesData[gameIndex],container.hasOwnProperty(gameIndex)||(count++,getCountOnly||null===(_e=this.loginClient)||void 0===_e||_e.removeData("mygames.data."+gameIndex,(function(){}),(function(){})));return count},MyGamesHelperImpl.prototype.remoteStore=function(container,noDuelTournamentsData){var _a,_b,changes=this.remoteStoreChanges(container,noDuelTournamentsData,!0);if(0!==changes)if(changes>1){var data=void 0,dataToStore={};for(var gameIndex in container)data=container[gameIndex],dataToStore.data||(dataToStore.data={}),dataToStore.data[gameIndex]={AD:data.AD},data.AP&&(dataToStore.data[gameIndex].AP=data.AP),null!=data.mgGroup&&(dataToStore.data[gameIndex].MG=data.mgGroup),dataToStore.data[gameIndex].is_duel=this.isDuel(data.sport_id,data);for(var labelIndex in noDuelTournamentsData)data=noDuelTournamentsData[labelIndex],dataToStore.noduel||(dataToStore.noduel={}),dataToStore.noduel[labelIndex]={AD:data.AD},data.AP&&(dataToStore.noduel[labelIndex].AP=data.AP),null!=data.mgGroup&&(dataToStore.noduel[labelIndex].MG=data.mgGroup);dataToStore.noduel||dataToStore.data?null===(_a=this.loginClient)||void 0===_a||_a.storeMergedData(dataToStore,"mygames",(function(){}),(function(){})):null===(_b=this.loginClient)||void 0===_b||_b.removeData("mygames",(function(){}),(function(){}))}else this.remoteStoreChanges(container,noDuelTournamentsData)},MyGamesHelperImpl.prototype.saveStats=function(projectId,leagueItem,eventId){var fsStatsEnable=cjs.Api.config.get("app","fs_stats","enable")||!1,fsStatsUrlMygames=cjs.Api.config.get("app","fs_stats","url","mygames")||"";if(!0===fsStatsEnable&&fsStatsUrlMygames&&leagueItem){var dataToSend={sport_id:String(leagueItem.getSportId()),project_id:String(projectId),tournament_stage_id:leagueItem.getTournamentStageId()};eventId&&(dataToSend.event_id=eventId),fetch("".concat(location.protocol,"//").concat(fsStatsUrlMygames,"?").concat(new URLSearchParams(dataToSend).toString()))}},MyGamesHelperImpl.prototype.leagueHasMatches=function(labelId,myGamesData){for(var fsDataIndex in myGamesData){if(myGamesData[fsDataIndex].labl_id===labelId)return!0}return!1},MyGamesHelperImpl.prototype.cleanLabelId=function(lablId){return lablId.replace(/(.*)-.*/,"$1")},MyGamesHelperImpl.prototype.callReactUpdates=function(category,reloadContent){void 0===reloadContent&&(reloadContent=!1),cjs.Api.loader.get("reactCalls").call((function(reactCalls){reactCalls.reloadMyGamesTabCounter(),reloadContent&&(reactCalls.forceRedrawTabContent(category),reactCalls.reloadStaticContent()),cjs.Api.loader.get("myTeams").call((function(mt){return mt.callReactUpdates()}))}))},MyGamesHelperImpl.prototype.isDuel=function(sportId,data){var isNoDuelSport=this.utilEnvironment.isNoDuelSport(sportId);return isNoDuelSport&&!data.noDuel?1:isNoDuelSport?0:1},MyGamesHelperImpl.prototype.isNoDuel=function(sportId,data){var isNoDuelSport=this.utilEnvironment.isNoDuelSport(sportId);return(!isNoDuelSport||!("is_duel"in data)||1!==parseInt(data.is_duel))&&isNoDuelSport},MyGamesHelperImpl}(),get=__webpack_require__(63),MyGames_assign=function(){return MyGames_assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t},MyGames_assign.apply(this,arguments)},MyGames_MyGames_values=function(o){var s="function"==typeof Symbol&&Symbol.iterator,m=s&&o[s],i=0;if(m)return m.call(o);if(o&&"number"==typeof o.length)return{next:function(){return o&&i>=o.length&&(o=void 0),{value:o&&o[i++],done:!o}}};throw new TypeError(s?"Object is not iterable.":"Symbol.iterator is not defined.")},MyGames_MyGames_read=function(o,n){var m="function"==typeof Symbol&&o[Symbol.iterator];if(!m)return o;var r,e,i=m.call(o),ar=[];try{for(;(void 0===n||n-- >0)&&!(r=i.next()).done;)ar.push(r.value)}catch(error){e={error}}finally{try{r&&!r.done&&(m=i.return)&&m.call(i)}finally{if(e)throw e.error}}return ar},MyGames_spreadArray=function(to,from,pack){if(pack||2===arguments.length)for(var ar,i=0,l=from.length;i<l;i++)!ar&&i in from||(ar||(ar=Array.prototype.slice.call(from,0,i)),ar[i]=from[i]);return to.concat(ar||Array.prototype.slice.call(from))},MyGamesImpl=function(){function MyGamesImpl(dataItemsContainer,loginClient,sportList,dayGetter,getMatchDayFunc,projectId,eventsUpdatedStartTimeGetter,dic,categoryGetter,sortFsData,pushUpdateSubscription,getGmtOffsetFunc){this.dataItemsContainer=dataItemsContainer,this.loginClient=loginClient,this.sportList=sportList,this.dayGetter=dayGetter,this.getMatchDayFunc=getMatchDayFunc,this.projectId=projectId,this.eventsUpdatedStartTimeGetter=eventsUpdatedStartTimeGetter,this.dic=dic,this.categoryGetter=categoryGetter,this.sortFsData=sortFsData,this.pushUpdateSubscription=pushUpdateSubscription,this.container={},this.labelsData={},this.noDuelTournamentsData={},this.loaded=!1,this.count=0,this.sportsIds=[],this.expired={},this.lastStorageUpdated=0,this.syncTimeoutId=null,this.changeCallbacks=[],this.myGamesHelper=new MyGamesHelperImpl(loginClient,getGmtOffsetFunc,dic.get("utilEnviroment")),this.myGamesHelper.getStorageTimestamp()||this.setStorageTimestamp()}return MyGamesImpl.prototype.getContainer=function(){return this.container},MyGamesImpl.prototype.addChangeCallback=function(changeCallback){this.changeCallbacks.push(changeCallback)},MyGamesImpl.prototype.canBeGameAdded=function(eventId){var event=this.dataItemsContainer.getEvent(eventId);return!!event&&this.canBeAdded(event.getStartTime(),event.getEndTime())},MyGamesImpl.prototype.canBeAdded=function(startTime,endTime){return this.canBeAddedByDay(this.getMatchDayFunc(startTime,endTime))},MyGamesImpl.prototype.canBeAddedByDay=function(days){if(!(null!=days?days.length:void 0))return!1;if(days.includes(0))return!0;var futureDays=this.myGamesHelper.getFutureDays(),pastDays=this.myGamesHelper.getPastDays();if(1===days.length)return days[0]<=futureDays&&days[0]>=-pastDays;var day1=days[0],day2=days[days.length-1];return day1<=futureDays&&day1>=-pastDays||day2<=futureDays&&day2>=-pastDays},MyGamesImpl.prototype.addToContainerAndSaveStats=function(eventId,withoutSavingStatsAndIncrementingCount){if(void 0===withoutSavingStatsAndIncrementingCount&&(withoutSavingStatsAndIncrementingCount=!1),this.loaded||this.load(),!this.canBeGameAdded(eventId)||this.count>=cjs.Api.config.get("app","mygames","maximum_count"))return!1;if(this.container[eventId])return!0;var event=this.dataItemsContainer.getEvent(eventId),league=this.dataItemsContainer.getLeagueByEventId(eventId),noDuel=!!league&&(cjs.noDuelSports.includes(league.getSportId())&&!league.getIsDuelEvenThoughSportGenerallyIsnt()),leagueId=(null==league?void 0:league.getId())||"",matchDay=this.myGamesHelper.getMatchDay(this.getMatchDayFunc(event.getStartTime(),event.getEndTime()));return this.container[eventId]={sport_id:event.getSportId(),labl_id:leagueId,m_day:matchDay,m_ok:this.myGamesHelper.isOk(matchDay,event.getStageType()),m_expire_date:this.myGamesHelper.getExpireDate(),AD:event.getStartTime(),AP:event.getEndTime(),AB:event.getStageType(),noDuel,mgGroup:"0"},0!==matchDay&&this.addLabel(leagueId),withoutSavingStatsAndIncrementingCount||(this.myGamesHelper.saveStats(this.projectId,this.dataItemsContainer.getLeagueByEventId(eventId),event.getOriginalId().substring(0,8)),this.count++),!0},MyGamesImpl.prototype.storeDataAndRedraw=function(isSuccessful){var category=this.categoryGetter();isSuccessful&&this.store(!0),this.reloadStorageIfSyncNeeded()?this.myGamesHelper.redrawLivescore(category,this.sortFsData,this.localStorageSyncCb):this.myGamesHelper.callReactUpdates(category)},MyGamesImpl.prototype.add=function(eventId,onlyAddToContainer){void 0===onlyAddToContainer&&(onlyAddToContainer=!1);var successfullyAdded=this.addToContainerAndSaveStats(eventId,onlyAddToContainer);return onlyAddToContainer||this.storeDataAndRedraw(successfullyAdded),successfullyAdded},MyGamesImpl.prototype.multipleAdd=function(eventIds,onlyAddToContainer){var _this=this;void 0===onlyAddToContainer&&(onlyAddToContainer=!1);var successfullyAdded=!1;return eventIds.forEach((function(eventId){successfullyAdded=_this.addToContainerAndSaveStats(eventId)||successfullyAdded})),onlyAddToContainer||this.storeDataAndRedraw(successfullyAdded),successfullyAdded},MyGamesImpl.prototype.isGameFromTournament=function(eventId){var league=this.dataItemsContainer.getLeagueByEventId(eventId);return!!league&&this.isAddedWholeTournament(league.getId())},MyGamesImpl.prototype.isAddedWholeTournament=function(leagueId){return null!=this.noDuelTournamentsData[leagueId]},MyGamesImpl.prototype.getMatchDayForTournament=function(leagueId){return!!this.isAddedWholeTournament(leagueId)&&this.myGamesHelper.getMatchDay(this.getMatchDayFunc(this.noDuelTournamentsData[leagueId].AD||0,this.noDuelTournamentsData[leagueId].AP||void 0))},MyGamesImpl.prototype.addNoduelTournament=function(leagueId){var _this=this,redrawLivescore=this.reloadStorageIfSyncNeeded(),addedPlayers=0,maxAddedPlayers=cjs.Api.config.get("app","noduel_events","mygames")||0,first=!0;this.dataItemsContainer.getEventsForNoDuelTournaments().forEach((function(eventItem){var league=_this.dataItemsContainer.getLeagueByEventId(eventItem.getId());if(leagueId===(null==league?void 0:league.getId())){if(first){first=!1;var matchDay=_this.myGamesHelper.getMatchDay(_this.getMatchDayFunc(eventItem.getStartTime(),eventItem.getEndTime()));_this.noDuelTournamentsData[leagueId]={sport_id:eventItem.getSportId(),labl_id:(null==league?void 0:league.getId())||"",m_day:matchDay,m_ok:0===matchDay?0:1,m_expire_date:_this.myGamesHelper.getExpireDate(),AD:eventItem.getStartTime(),AP:eventItem.getEndTime(),AB:eventItem.getStageType()}}return addedPlayers<maxAddedPlayers&&(addedPlayers++,_this.addToContainerAndSaveStats(eventItem.getId(),!0))}})),this.myGamesHelper.saveStats(this.projectId,this.dataItemsContainer.getLeagueItem(leagueId)),this.count++,this.store(!0),redrawLivescore&&this.myGamesHelper.redrawLivescore(this.categoryGetter(),this.sortFsData,this.localStorageSyncCb)},MyGamesImpl.prototype.removeAllEvents=function(leagueId){var redrawLivescore=this.reloadStorageIfSyncNeeded();for(var fsDataIndex in this.loaded||this.load(),this.container){leagueId===this.container[fsDataIndex].labl_id&&(null!=this.container[fsDataIndex]&&delete this.container[fsDataIndex])}null!=this.noDuelTournamentsData[leagueId]&&(delete this.noDuelTournamentsData[leagueId],this.count--),this.store(!0),redrawLivescore&&this.myGamesHelper.redrawLivescore(this.categoryGetter(),this.sortFsData,this.localStorageSyncCb)},MyGamesImpl.prototype.getCount=function(){this.loaded||this.load();var count=0,noduelTournaments={};for(var fsLablIndex in this.noDuelTournamentsData)noduelTournaments[fsLablIndex]=1;var projectSportList=Object.values(cjs.Api.config.get("app","sport_list")||{});for(var fsDataIndex in this.container){var data=this.container[fsDataIndex];data.labl_id&&this.isAddedWholeTournament(data.labl_id)||(data.noDuel&&data.labl_id?noduelTournaments[data.labl_id]=1:projectSportList.includes(data.sport_id)&&count++)}return count+Object.values(noduelTournaments).length},MyGamesImpl.prototype.getSportIds=function(){var e_1,_a;this.sportsIds=[],this.loaded||this.load();try{for(var _b=MyGames_MyGames_values([this.container,this.noDuelTournamentsData]),_c=_b.next();!_c.done;_c=_b.next()){var dataContainer=_c.value;for(var dataIndex in dataContainer){var myGameSportId=dataContainer[dataIndex].sport_id;this.sportList.hasOwnProperty(myGameSportId)&&(this.sportsIds.includes(myGameSportId)||this.sportsIds.push(myGameSportId))}}}catch(e_1_1){e_1={error:e_1_1}}finally{try{_c&&!_c.done&&(_a=_b.return)&&_a.call(_b)}finally{if(e_1)throw e_1.error}}return this.sportsIds},MyGamesImpl.prototype.check=function(eventId){if(this.loaded||this.load(),null!=this.container[eventId])return!0;var league=this.dataItemsContainer.getLeagueByEventId(eventId);if(!league)return!1;var leagueId=league.getId();return null!=this.noDuelTournamentsData[leagueId]&&0===this.noDuelTournamentsData[leagueId].m_day},MyGamesImpl.prototype.removeFromContainer=function(eventId,eventMyGroupsKey){if(this.loaded||this.load(),!this.container[eventId])return!1;var containerEventGroupKeysArray=String((0,get.default)(this.container[eventId],"mgGroup","")).split(",");return containerEventGroupKeysArray.includes(String(eventMyGroupsKey))&&containerEventGroupKeysArray.length>1?this.container[eventId].mgGroup=containerEventGroupKeysArray.filter((function(x){return x!==String(eventMyGroupsKey)})).join(","):(delete this.container[eventId],this.count--),!0},MyGamesImpl.prototype.remove=function(eventId,eventMyGroupsKey){var successfullyRemoved=this.removeFromContainer(eventId,eventMyGroupsKey);return this.storeDataAndRedraw(successfullyRemoved),successfullyRemoved},MyGamesImpl.prototype.multipleRemove=function(eventIds){var _this=this,successfullyRemoved=!1;return eventIds.forEach((function(eventId){successfullyRemoved=_this.removeFromContainer(eventId)||successfullyRemoved})),this.storeDataAndRedraw(successfullyRemoved),successfullyRemoved},MyGamesImpl.prototype.toggle=function(eventId,eventMyGroupsKey){this.loaded||this.load();var ret=Boolean(eventId&&this.container[eventId])?this.remove(eventId,eventMyGroupsKey):this.add(eventId);return this.pushUpdateSubscription(),ret},MyGamesImpl.prototype.toggleLeague=function(myGameLeague){this.loaded||this.load();var eventIds=MyGames_spreadArray([],MyGames_MyGames_read(myGameLeague.eventIds),!1).filter((function(eventId){var _a;return!(null===(_a=myGameLeague.eventIdsWithMyTeams)||void 0===_a?void 0:_a.includes(eventId))}));myGameLeague.isChecked?this.multipleRemove(eventIds):this.multipleAdd(eventIds),this.pushUpdateSubscription()},MyGamesImpl.prototype.load=function(update,disableLsidSync){var lablId,matchDay,myGames,_this=this;void 0===disableLsidSync&&(disableLsidSync=!1),this.loaded=!0;var myGamesStr=ClientStorage.get("fsdc_my_local"),lablStr=ClientStorage.get("fsdc_my_local_labl"),noduelTournamentsStr=ClientStorage.get("fsdc_my_local_noduel");this.container={},this.labelsData={},this.noDuelTournamentsData={},this.count=0;var lablCount=0,lablCountAdded=0,count=0,changed=!1;try{myGames=myGamesStr?JSON.parse(myGamesStr):{}}catch(error){return}var noDuelTournaments={};if(null!==noduelTournamentsStr)try{noDuelTournaments=JSON.parse(noduelTournamentsStr)}catch(error){}for(var fsDataIndex in noDuelTournaments||(noDuelTournaments={}),disableLsidSync||this.myGamesHelper.syncWithLsId(myGames,noDuelTournaments,this.getMatchDayFunc),myGames){var fsData=myGames[fsDataIndex];fsData.labl_id&&(fsData.labl_id=this.myGamesHelper.cleanLabelId(fsData.labl_id))}var noDuelTournamentsDataObject,_noDuelTournaments={};for(lablId in noDuelTournaments)noDuelTournamentsDataObject=noDuelTournaments[lablId],_noDuelTournaments[this.myGamesHelper.cleanLabelId(lablId)]=noDuelTournamentsDataObject;noDuelTournaments=_noDuelTournaments;var updateNoduelTournamentMatches=!1;for(var labelIndex in noDuelTournaments){var labelData=noDuelTournaments[labelIndex];if(count++,this.canBeAdded(labelData.AD||0,labelData.AP||0)){this.count++,matchDay=this.myGamesHelper.getMatchDay(this.getMatchDayFunc(labelData.AD||0,labelData.AP||void 0));var lastMatchDay=labelData.m_day;matchDay!==lastMatchDay&&(labelData.m_day=matchDay,labelData.m_ok=0===matchDay||lastMatchDay>0&&matchDay<0?0:1,changed=!0),1===labelData.m_ok&&(this.myGamesHelper.leagueHasMatches(labelIndex,myGames)||(labelData.m_ok=0),0===labelData.m_ok&&(changed=!0)),0!==matchDay&&0===labelData.m_ok&&(updateNoduelTournamentMatches=!0),this.noDuelTournamentsData[labelIndex]=MyGames_assign({},labelData)}else changed=!0}var hasMygames=!1;for(var myGame in myGames){hasMygames=!0;break}if(hasMygames||changed||updateNoduelTournamentMatches){var labl={};if(null!==lablStr)try{for(var labIndex in labl=JSON.parse(lablStr))lablCount++}catch(error){labl={}}var dataObject,_labl={};for(lablId in labl)dataObject=labl[lablId],_labl[this.myGamesHelper.cleanLabelId(lablId)]=dataObject;if(labl=_labl,update=!(!update||!this.canBeAddedByDay([this.dayGetter()])),Object.entries(myGames).forEach((function(_a){var _b=MyGames_MyGames_read(_a,2),hash=_b[0],myGameData=_b[1];if(null==_this.noDuelTournamentsData[myGameData.labl_id]&&count++,"g_"===hash.substr(0,2)&&myGameData.AD){myGameData.AP||(myGameData.AP=0);var eventUpdatedStartTime=_this.eventsUpdatedStartTimeGetter()[hash];if(null==eventUpdatedStartTime||eventUpdatedStartTime.start_time===myGameData.AD&&eventUpdatedStartTime.end_time===myGameData.AP||(myGameData={sport_id:myGameData.sport_id,labl_id:myGameData.labl_id,m_day:_this.myGamesHelper.getMatchDay(_this.getMatchDayFunc(eventUpdatedStartTime.start_time,eventUpdatedStartTime.end_time||void 0)),m_ok:0,m_expire_date:_this.myGamesHelper.getExpireDate(),AD:eventUpdatedStartTime.start_time,AP:eventUpdatedStartTime.end_time||0,AB:myGameData.AB,noDuel:myGameData.noDuel,mgGroup:myGameData.mgGroup},changed=!0),_this.canBeAdded(myGameData.AD,myGameData.AP||0)&&(matchDay=_this.myGamesHelper.getMatchDay(_this.getMatchDayFunc(myGameData.AD,myGameData.AP)),null==_this.noDuelTournamentsData[myGameData.labl_id]||0!==_this.noDuelTournamentsData[myGameData.labl_id].m_ok)){matchDay>0?matchDay!==myGameData.m_day&&(myGameData.m_day=matchDay,changed=!0):0===matchDay&&myGameData.m_day>0?(myGameData={sport_id:myGameData.sport_id,labl_id:myGameData.labl_id,m_day:0,m_ok:0,m_expire_date:myGameData.m_expire_date,AD:myGameData.AD,AP:myGameData.AP,AB:myGameData.AB,noDuel:myGameData.noDuel,mgGroup:myGameData.mgGroup},changed=!0):matchDay<0&&myGameData.m_day>=0?(myGameData.m_day=matchDay,myGameData.m_ok=0,changed=!0):matchDay<0&&matchDay!==myGameData.m_day&&(myGameData.m_day=matchDay,changed=!0);var added=_this.addLabel(myGameData.labl_id,labl);if(myGameData.m_ok&&(1===added&&lablCountAdded++,-1===added&&(myGameData.m_ok=0,changed=!0)),_this.container[hash]=MyGames_assign({},myGameData),null==_this.noDuelTournamentsData[myGameData.labl_id]&&_this.count++,update){var event=_this.dataItemsContainer.getEvent(hash);if(event){var league=_this.dataItemsContainer.getLeagueByEventId(event.getId()),mDay=_this.myGamesHelper.getMatchDay(_this.getMatchDayFunc(event.getStartTime(),event.getEndTime()));_this.container[hash]={sport_id:event.getSportId(),labl_id:(null==league?void 0:league.getId())||"",m_day:mDay,m_ok:_this.myGamesHelper.isOk(mDay,event.getStageType()),m_expire_date:myGameData.m_expire_date,AD:event.getStartTime(),AP:event.getEndTime(),AB:event.getStageType(),noDuel:myGameData.noDuel,mgGroup:myGameData.mgGroup},changed=!0,0!==mDay&&_this.addLabel((null==league?void 0:league.getId())||""),null!=_this.expired[hash]&&(_this.container[hash].m_expire_date=_this.myGamesHelper.getExpireDate(),delete _this.expired[hash])}}}}})),updateNoduelTournamentMatches){var addedPlayers_1={},maxAddedPlayers_1=cjs.Api.config.get("app","noduel_events","mygames"),events=this.dataItemsContainer.getEventsForNoDuelTournaments();for(var labelId in events.forEach((function(eventItem){var leagueItem=_this.dataItemsContainer.getLeagueByEventId(eventItem.getId());if(leagueItem){var labelId=leagueItem.getId();null!=_this.noDuelTournamentsData[labelId]&&0!==_this.noDuelTournamentsData[labelId].m_day&&1!==_this.noDuelTournamentsData[labelId].m_ok&&(null==addedPlayers_1[labelId]&&(addedPlayers_1[labelId]=0),addedPlayers_1[labelId]++,1===addedPlayers_1[labelId]&&(_this.noDuelTournamentsData[labelId].AD=eventItem.getStartTime(),_this.noDuelTournamentsData[labelId].AP=eventItem.getEndTime(),_this.noDuelTournamentsData[labelId].m_expire_date=_this.myGamesHelper.getExpireDate()),addedPlayers_1[labelId]>maxAddedPlayers_1||(_this.container[eventItem.getId()]={sport_id:eventItem.getSportId(),labl_id:labelId,m_day:_this.myGamesHelper.getMatchDay(_this.getMatchDayFunc(eventItem.getStartTime(),eventItem.getEndTime())),m_ok:1,m_expire_date:_this.myGamesHelper.getExpireDate(),AD:eventItem.getStartTime(),AP:eventItem.getEndTime(),AB:eventItem.getStageType(),noDuel:!0,mgGroup:"0"},_this.addLabel(labelId),changed=!0))}})),addedPlayers_1){addedPlayers_1[labelId]&&(this.noDuelTournamentsData[labelId].m_ok=1)}}update||lablCountAdded===lablCount||(changed=!0),this.count!==count&&this.changeCallbacks.forEach((function(callback){return"function"==typeof callback?callback():void 0})),(this.count!==count||changed)&&this.store()}},MyGamesImpl.prototype.getData=function(){this.loaded||this.load();var ret={};return Object.entries(this.container).forEach((function(_a){var _b=MyGames_MyGames_read(_a,2),hash=_b[0],myGameDataObject=_b[1];1===myGameDataObject.m_ok&&(ret[hash]=MyGames_assign({},myGameDataObject))})),ret},MyGamesImpl.prototype.getLabels=function(){return this.loaded||this.load(),this.labelsData},MyGamesImpl.prototype.getNeededFeeds=function(today){var _this=this;this.loaded||this.load();var _ret=[],_keys=[],neededFeeds=function(dataContainer){return Object.entries(dataContainer).forEach((function(_a){var left,_b=MyGames_MyGames_read(_a,2),hash=_b[0],myGameData=_b[1];if(_this.myGamesHelper.isMyGameDataValid(myGameData)||(_this.expired[hash]=!0),1===today){if(0!==myGameData.m_day)return}else if(0===myGameData.m_day)return;var sportId=null!=(left=_this.dic.get("util_sport").getParentSport(myGameData.sport_id))?left:myGameData.sport_id,key=sportId+"|"+myGameData.m_day;_keys.includes(key)||(_ret.push({sport_id:sportId,day:myGameData.m_day}),_keys.push(key))})),!0};return neededFeeds(this.container),neededFeeds(this.noDuelTournamentsData),_ret},MyGamesImpl.prototype.store=function(updateStorageTimestamp){void 0===updateStorageTimestamp&&(updateStorageTimestamp=!1),this.sportsIds=[],this.myGamesHelper.remoteStore(this.container,this.noDuelTournamentsData);var fsDataToStore=JSON.stringify(this.container);this.removeUnusedLabels();var fsLablToStore=JSON.stringify(this.labelsData),fsLablNoduelTournamentsToStore=JSON.stringify(this.noDuelTournamentsData);ClientStorage.get("fsdc_my_local")===fsDataToStore&&ClientStorage.get("fsdc_my_local_labl")===fsLablToStore&&ClientStorage.get("fsdc_my_local_noduel")===fsLablNoduelTournamentsToStore||(ClientStorage.store("fsdc_my_local",fsDataToStore,172800),ClientStorage.store("fsdc_my_local_labl",fsLablToStore,172800),ClientStorage.store("fsdc_my_local_noduel",fsLablNoduelTournamentsToStore,172800),updateStorageTimestamp&&this.setStorageTimestamp(),this.changeCallbacks.forEach((function(callback){return"function"==typeof callback?callback():void 0})))},MyGamesImpl.prototype.addGamesToGroup=function(eventIds,groupKey,disableStore){var e_2,_a,_b;null==disableStore&&(disableStore=!1);var groupKeyStr=groupKey.toString(),count=0;try{for(var _c=MyGames_MyGames_values(Array.from(eventIds)),_d=_c.next();!_d.done;_d=_c.next()){var fsDataId=_d.value;if(null!=this.container[fsDataId]&&!this.isGameFromTournament(fsDataId)){null!=this.container[fsDataId].mgGroup&&""!==this.container[fsDataId].mgGroup||(this.container[fsDataId].mgGroup="0");var groups=(null===(_b=this.container[fsDataId].mgGroup)||void 0===_b?void 0:_b.toString().split(","))||[];-1===groups.indexOf(groupKeyStr)&&(groups.push(groupKeyStr),this.container[fsDataId].mgGroup=groups.join(",")),count++}}}catch(e_2_1){e_2={error:e_2_1}}finally{try{_d&&!_d.done&&(_a=_c.return)&&_a.call(_c)}finally{if(e_2)throw e_2.error}}count&&!disableStore&&this.store(!0)},MyGamesImpl.prototype.removeGamesFromGroup=function(eventIds,groupKey){var e_3,_a,_b,groupKeyStr=groupKey.toString(),count=0;try{for(var _c=MyGames_MyGames_values(Array.from(eventIds)),_d=_c.next();!_d.done;_d=_c.next()){var fsDataId=_d.value;if(null!=this.container[fsDataId]&&!this.isGameFromTournament(fsDataId)){if(null!=this.container[fsDataId].mgGroup&&""!==this.container[fsDataId].mgGroup){var groups=(null===(_b=this.container[fsDataId].mgGroup)||void 0===_b?void 0:_b.toString().split(","))||[],pos=groups.indexOf(groupKeyStr);-1!==pos&&(groups.splice(pos,1),this.container[fsDataId].mgGroup=groups.join(","))}count++}}}catch(e_3_1){e_3={error:e_3_1}}finally{try{_d&&!_d.done&&(_a=_c.return)&&_a.call(_c)}finally{if(e_3)throw e_3.error}}count&&this.store(!0)},MyGamesImpl.prototype.removeLabelFromGroup=function(leagueId,groupKey){var _a,groupKeyStr=groupKey.toString();if(null!=this.noDuelTournamentsData[leagueId]&&null!=this.noDuelTournamentsData[leagueId].mgGroup&&""!==this.noDuelTournamentsData[leagueId].mgGroup){var groups=(null===(_a=this.noDuelTournamentsData[leagueId].mgGroup)||void 0===_a?void 0:_a.toString().split(","))||[],pos=groups.indexOf(groupKeyStr);if(-1!==pos)return groups.splice(pos,1),this.noDuelTournamentsData[leagueId].mgGroup=groups.join(","),this.store(!0)}},MyGamesImpl.prototype.getGameGroup=function(eventId){if(this.isGameFromTournament(eventId)){var league=this.dataItemsContainer.getLeagueByEventId(eventId);return this.getLabelGroup((null==league?void 0:league.getId())||"")}return null==this.container[eventId]?"0":this.container[eventId].mgGroup||"0"},MyGamesImpl.prototype.getGamesGroups=function(eventIds){var e_4,_a,e_5,_b,ret={};try{for(var _c=MyGames_MyGames_values(Array.from(eventIds)),_d=_c.next();!_d.done;_d=_c.next()){var fsDataId=_d.value,groups=void 0;if(this.isGameFromTournament(fsDataId)){var league=this.dataItemsContainer.getLeagueByEventId(fsDataId);if(!league)continue;groups=this.noDuelTournamentsData[league.getId()].mgGroup||"0"}else{if(null==this.container[fsDataId])continue;groups=this.container[fsDataId].mgGroup||"0"}try{for(var _e=(e_5=void 0,MyGames_MyGames_values(Array.from(groups.toString().split(",")))),_f=_e.next();!_f.done;_f=_e.next()){var group=_f.value,groupNumber=parseInt(group);null==ret[groupNumber]&&(ret[groupNumber]=[]),ret[groupNumber].push(fsDataId)}}catch(e_5_1){e_5={error:e_5_1}}finally{try{_f&&!_f.done&&(_b=_e.return)&&_b.call(_e)}finally{if(e_5)throw e_5.error}}}}catch(e_4_1){e_4={error:e_4_1}}finally{try{_d&&!_d.done&&(_a=_c.return)&&_a.call(_c)}finally{if(e_4)throw e_4.error}}return ret},MyGamesImpl.prototype.getLabelGroup=function(leagueId){return null==this.noDuelTournamentsData[leagueId]?"0":this.noDuelTournamentsData[leagueId].mgGroup||"0"},MyGamesImpl.prototype.getLabelGroups=function(leagueId){var e_6,_a,_b;if(!this.noDuelTournamentsData[leagueId])return{};if(!(null!=this.noDuelTournamentsData[leagueId]?this.noDuelTournamentsData[leagueId].mgGroup:void 0))return{0:[leagueId]};var ret={},groups=Array.from((null===(_b=this.noDuelTournamentsData[leagueId].mgGroup)||void 0===_b?void 0:_b.toString().split(","))||[]);try{for(var groups_1=MyGames_MyGames_values(groups),groups_1_1=groups_1.next();!groups_1_1.done;groups_1_1=groups_1.next()){var group=groups_1_1.value;ret[parseInt(group)]=[leagueId]}}catch(e_6_1){e_6={error:e_6_1}}finally{try{groups_1_1&&!groups_1_1.done&&(_a=groups_1.return)&&_a.call(groups_1)}finally{if(e_6)throw e_6.error}}return ret},MyGamesImpl.prototype.addLabelToGroup=function(leagueId,groupKey,disableStore){null==disableStore&&(disableStore=!1);var groupKeyStr=groupKey.toString();if(this.isAddedWholeTournament(leagueId)){var groupsArray=(this.noDuelTournamentsData[leagueId].mgGroup||"0").toString().split(",");return-1===groupsArray.indexOf(groupKeyStr)&&(groupsArray.push(groupKeyStr),this.noDuelTournamentsData[leagueId].mgGroup=groupsArray.join(",")),disableStore?void 0:this.store(!0)}},MyGamesImpl.prototype.drop=function(){return this.container={},this.labelsData={},this.noDuelTournamentsData={},this.store()},MyGamesImpl.prototype.isFromMyFs=function(){return this.dic.get("util_page").getPageType()===PageTypesList.PAGE_TYPE_MYFS},MyGamesImpl.prototype.isMyFsGroupsChecked=function(){return!1},MyGamesImpl.prototype.startStorageSyncTimer=function(timeout){var _this=this;null==timeout&&(timeout=500),this.myGamesHelper.isSyncBetweenTabsAllowed()&&(this.syncTimeoutId&&clearTimeout(this.syncTimeoutId),this.syncTimeoutId=setTimeout(function(timeout){return function(){return _this.reloadStorageIfSyncNeeded(),_this.startStorageSyncTimer(timeout)}}(timeout),timeout))},MyGamesImpl.prototype.registerLocalStorageSyncCB=function(localStorageSyncCb){this.localStorageSyncCb=localStorageSyncCb},MyGamesImpl.prototype.isGameInGroups=function(eventId){return!1},MyGamesImpl.prototype.isInMyTeams=function(eventId){return!1},MyGamesImpl.prototype.setDataItemsContainer=function(dataItemsContainer){this.dataItemsContainer=dataItemsContainer},MyGamesImpl.prototype.setStorageTimestamp=function(){this.lastStorageUpdated=0,this.myGamesHelper.isSyncBetweenTabsAllowed()&&(this.lastStorageUpdated=(new Date).getTime(),ClientStorage.store("fsdc_my_local_ts",this.lastStorageUpdated,172800))},MyGamesImpl.prototype.addLabel=function(labelIndex,labelData){if(labelData)return labelData.hasOwnProperty(labelIndex)?this.labelsData.hasOwnProperty(labelIndex)?0:(this.labelsData[labelIndex]=MyGames_assign({},labelData[labelIndex]),1):-1;var league=this.dataItemsContainer.getLeagueItem(labelIndex);return league&&league.getTournamentName()?this.labelsData.hasOwnProperty(labelIndex)?0:(this.labelsData[labelIndex]=this.dataItemsContainer.getDataObjectOfLeague(league),1):-1},MyGamesImpl.prototype.reloadStorageIfSyncNeeded=function(){if(!this.myGamesHelper.isSyncBetweenTabsAllowed())return!1;var storageTimestamp=this.myGamesHelper.getStorageTimestamp();return this.lastStorageUpdated!==storageTimestamp&&(this.lastStorageUpdated=storageTimestamp,this.load(!1,!0),(null!=this.loginClient?this.loginClient.loggedIn():void 0)&&this.myGamesHelper.remoteStore(this.container,this.noDuelTournamentsData),!0)},MyGamesImpl.prototype.removeUnusedLabels=function(){var labelId,usedLabels={};for(var gameId in this.container){var gameData=this.container[gameId];gameData.labl_id&&(usedLabels[gameData.labl_id]=1)}for(labelId in this.noDuelTournamentsData)usedLabels[labelId]=1;for(labelId in this.labelsData)null==usedLabels[labelId]&&delete this.labelsData[labelId]},MyGamesImpl}(),Options_DISPLAY_GROUPS="displayGroups",myGames_MyGames_values=(function(){function OptionImpl(key,label,checked){this.key=key,this.label=label,this.checked=checked}OptionImpl.prototype.getKey=function(){return this.key},OptionImpl.prototype.getLabel=function(){return this.label},OptionImpl.prototype.isChecked=function(){return this.checked}}(),function(o){var s="function"==typeof Symbol&&Symbol.iterator,m=s&&o[s],i=0;if(m)return m.call(o);if(o&&"number"==typeof o.length)return{next:function(){return o&&i>=o.length&&(o=void 0),{value:o&&o[i++],done:!o}}};throw new TypeError(s?"Object is not iterable.":"Symbol.iterator is not defined.")}),MyGames_MyGamesImpl=function(){function MyGamesImpl(myGames,myTeams,eventsCollectionHandler,observersProvider,dataItemsContainer){this.myGames=myGames,this.myTeams=myTeams,this.eventsCollectionHandler=eventsCollectionHandler,this.observersProvider=observersProvider,this.dataItemsContainer=dataItemsContainer,this.myGames.setDataItemsContainer(dataItemsContainer)}return MyGamesImpl.prototype.addGamesToGroup=function(eventIds,groupKey,disableStore){var _this=this,filteredEventIds=eventIds.filter((function(eventId){return!_this.isGameFromTournament(eventId)})),container=this.getContainer();this.myGames.multipleAdd(filteredEventIds,!0),filteredEventIds.forEach((function(eventId){var _a,_b,groups=null!==(_b=null===(_a=container[eventId].mgGroup)||void 0===_a?void 0:_a.toString().split(",").filter((function(possiblyEmpty){return possiblyEmpty})))&&void 0!==_b?_b:[];groups.includes(groupKey.toString())||groups.push(groupKey.toString()),container[eventId].mgGroup=groups.join(",")})),filteredEventIds.length&&!disableStore&&this.store(!0)},MyGamesImpl.prototype.canBeGameAdded=function(eventId){return this.myGames.canBeGameAdded(eventId)},MyGamesImpl.prototype.check=function(eventId){return void 0!==this.getContainer()[eventId]},MyGamesImpl.prototype.isMyFsGroupsChecked=function(){return!!this.observersProvider.getOptions().getValue().get(Options_DISPLAY_GROUPS)},MyGamesImpl.prototype.isInMyTeams=function(eventId){var e_1,_a;try{for(var _b=myGames_MyGames_values(Object.values(this.myTeams.getParticipantsEvents())),_c=_b.next();!_c.done;_c=_b.next()){if(_c.value.includes(eventId))return!0}}catch(e_1_1){e_1={error:e_1_1}}finally{try{_c&&!_c.done&&(_a=_b.return)&&_a.call(_b)}finally{if(e_1)throw e_1.error}}return!1},MyGamesImpl.prototype.isGameFromTournament=function(eventId){var league=this.dataItemsContainer.getLeagueByEventId(eventId);return!!league&&this.myGames.isAddedWholeTournament(league.getId())},MyGamesImpl.prototype.remove=function(eventId){return this.eventsCollectionHandler.remove(eventId),this.myGames.remove(eventId)},MyGamesImpl.prototype.toggle=function(eventId){return this.isInMyTeams(eventId)?(this.isGameInGroups(eventId)?(this.myGames.remove(eventId),this.eventsCollectionHandler.refresh()):this.addGamesToGroup([eventId],0),this.isGameInGroups(eventId)):this.remove(eventId)},MyGamesImpl.prototype.isGameInGroups=function(eventId){var _a,myGamesGroup=null===(_a=this.getContainer()[eventId])||void 0===_a?void 0:_a.mgGroup;return"string"==typeof myGamesGroup&&myGamesGroup.length>0},MyGamesImpl.prototype.isFromMyFs=function(){return!0},MyGamesImpl.prototype.startStorageSyncTimer=function(timeout){this.myGames.startStorageSyncTimer(timeout)},MyGamesImpl.prototype.add=function(eventId){return this.myGames.add(eventId)},MyGamesImpl.prototype.addChangeCallback=function(changeCallback){this.myGames.addChangeCallback(changeCallback)},MyGamesImpl.prototype.registerLocalStorageSyncCB=function(localStorageSyncCb){this.myGames.registerLocalStorageSyncCB(localStorageSyncCb)},MyGamesImpl.prototype.addLabelToGroup=function(leagueId,groupKey,disableStore){this.myGames.addLabelToGroup(leagueId,groupKey,disableStore)},MyGamesImpl.prototype.addNoduelTournament=function(leagueId){return this.myGames.addNoduelTournament(leagueId)},MyGamesImpl.prototype.canBeAdded=function(startTime,endTime){return this.myGames.canBeAdded(startTime,endTime)},MyGamesImpl.prototype.canBeAddedByDay=function(days){return this.myGames.canBeAddedByDay(days)},MyGamesImpl.prototype.getContainer=function(){return this.myGames.getContainer()},MyGamesImpl.prototype.getCount=function(){return this.myGames.getCount()},MyGamesImpl.prototype.getGameGroup=function(eventId){return this.myGames.getGameGroup(eventId)},MyGamesImpl.prototype.getGamesGroups=function(eventIds){return this.myGames.getGamesGroups(eventIds)},MyGamesImpl.prototype.getLabelGroup=function(leagueId){return this.myGames.getLabelGroup(leagueId)},MyGamesImpl.prototype.getLabelGroups=function(leagueId){return this.myGames.getLabelGroups(leagueId)},MyGamesImpl.prototype.getMatchDayForTournament=function(leagueId){return this.myGames.getMatchDayForTournament(leagueId)},MyGamesImpl.prototype.isAddedWholeTournament=function(leagueId){return this.myGames.isAddedWholeTournament(leagueId)},MyGamesImpl.prototype.removeAllEvents=function(leagueId){return this.myGames.removeAllEvents(leagueId)},MyGamesImpl.prototype.removeGamesFromGroup=function(eventIds,groupKey){this.myGames.removeGamesFromGroup(eventIds,groupKey)},MyGamesImpl.prototype.removeLabelFromGroup=function(leagueId,groupKey){this.myGames.removeLabelFromGroup(leagueId,groupKey)},MyGamesImpl.prototype.store=function(updateStorageTimestamp){this.myGames.store(updateStorageTimestamp)},MyGamesImpl.prototype.load=function(update,disableLsidSync){this.myGames.load(update,disableLsidSync)},MyGamesImpl.prototype.getSportIds=function(){return this.myGames.getSportIds()},MyGamesImpl.prototype.getData=function(){return this.myGames.getData()},MyGamesImpl.prototype.getLabels=function(){return this.myGames.getLabels()},MyGamesImpl.prototype.getNeededFeeds=function(today){return this.myGames.getNeededFeeds()},MyGamesImpl.prototype.drop=function(){this.myGames.drop()},MyGamesImpl.prototype.setDataItemsContainer=function(dataItemsContainer){this.myGames.setDataItemsContainer(dataItemsContainer)},MyGamesImpl.prototype.toggleLeague=function(myGameLeague){throw new Error("Toggle league: ".concat(myGameLeague.leagueId," for myFs not implemented!"))},MyGamesImpl.prototype.multipleAdd=function(eventIds,onlyAddToContainer){throw new Error("Multiple add of events: ".concat(eventIds.join(",")," for myFs not implemented!"))},MyGamesImpl.prototype.multipleRemove=function(eventIds){throw new Error("Multiple remove of events: ".concat(eventIds.join(",")," for myFs not implemented!"))},MyGamesImpl}(),MyGamesDataItemsContainerImpl=function(){function MyGamesDataItemsContainerImpl(eventsCollectionHandler){this.eventsCollectionHandler=eventsCollectionHandler}return MyGamesDataItemsContainerImpl.prototype.getLeagueItem=function(leagueId){var _a,event=Object.values(this.eventsCollectionHandler.getEventsCollection().getEvents()).find((function(event){return event.getLeagueId()===leagueId}));return null!==(_a=null==event?void 0:event.getOriginalData().getLeague())&&void 0!==_a?_a:null},MyGamesDataItemsContainerImpl.prototype.getEvent=function(eventId){return this.eventsCollectionHandler.getEventsCollection().getEvent(eventId)},MyGamesDataItemsContainerImpl.prototype.getLeagueByEventId=function(eventId){var _a,_b;return null!==(_b=null===(_a=this.getEvent(eventId))||void 0===_a?void 0:_a.getLeague())&&void 0!==_b?_b:null},MyGamesDataItemsContainerImpl.prototype.getDataObjectOfLeague=function(league){return league.getData(!0)},MyGamesDataItemsContainerImpl.prototype.getEventsForNoDuelTournaments=function(){throw new Error("Getting events for no-duel tournaments in myFs myGames data items container not implemented!")},MyGamesDataItemsContainerImpl}(),MyGamesDataItemsContainer_MyGamesDataItemsContainerImpl=function(){function MyGamesDataItemsContainerImpl(leagueHolderProxy,eventHolderProxy){this.leagueHolderProxy=leagueHolderProxy,this.eventHolderProxy=eventHolderProxy}return MyGamesDataItemsContainerImpl.prototype.getLeagueItem=function(leagueId){var leagueHolder=this.leagueHolderProxy.findLeagueHolderByLeagueId(leagueId);return leagueHolder?leagueHolder.getLeague(leagueId):null},MyGamesDataItemsContainerImpl.prototype.getEvent=function(eventId){var eventHolder=this.eventHolderProxy.findEventHolderByEventId(eventId);return eventHolder?eventHolder.getEvent(eventId):null},MyGamesDataItemsContainerImpl.prototype.getLeagueByEventId=function(eventId){var eventItem=this.getEvent(eventId);return eventItem?this.getLeagueItem(eventItem.getLeagueId()):null},MyGamesDataItemsContainerImpl.prototype.getDataObjectOfLeague=function(league){return league.getData(!0)},MyGamesDataItemsContainerImpl.prototype.getEventsForNoDuelTournaments=function(){var eventHandler=this.eventHolderProxy.getHandler();return eventHandler.getIds().map((function(id){return eventHandler.getItem(id)}))},MyGamesDataItemsContainerImpl}(),MyGamesDataItemsContainerFactoryImpl=function(){function MyGamesDataItemsContainerFactoryImpl(){}return MyGamesDataItemsContainerFactoryImpl.prototype.create=function(eventsCollectionHandler){return eventsCollectionHandler?new MyGamesDataItemsContainerImpl(eventsCollectionHandler):new MyGamesDataItemsContainer_MyGamesDataItemsContainerImpl(cjs.dic.get("dataLeagueHolderProxy"),cjs.dic.get("dataEventHolderProxy"))},MyGamesDataItemsContainerFactoryImpl}(),MyGamesFactoryImpl=function(){function MyGamesFactoryImpl(){}return MyGamesFactoryImpl.prototype.create=function(data){var myGamesDataItemsContainerFactory=new MyGamesDataItemsContainerFactoryImpl;return this.isDataForMyFs(data)?new MyGames_MyGamesImpl(data.myGames,data.myTeams,data.eventsCollectionHandler,data.observersProvider,myGamesDataItemsContainerFactory.create(data.eventsCollectionHandler)):new MyGamesImpl(myGamesDataItemsContainerFactory.create(),data.lsid,data.sportList,data.dayGetter,data.getMatchDayFunc,data.projectId,data.eventsUpdatedStartTimeGetter,data.dic,data.categoryGetter,data.sortFsData,data.pushUpdateSubscription,data.getGmtOffsetFunc)},MyGamesFactoryImpl.prototype.isDataForMyFs=function(toBeDetermined){return!!toBeDetermined.eventsCollectionHandler},MyGamesFactoryImpl}(),Trans_values=function(o){var s="function"==typeof Symbol&&Symbol.iterator,m=s&&o[s],i=0;if(m)return m.call(o);if(o&&"number"==typeof o.length)return{next:function(){return o&&i>=o.length&&(o=void 0),{value:o&&o[i++],done:!o}}};throw new TypeError(s?"Object is not iterable.":"Symbol.iterator is not defined.")},TransImpl=function(){function TransImpl(translates){this.translates=translates}return TransImpl.prototype.translate=function(key,args){void 0===args&&(args=[]);var translated=key;return key in this.translates&&(translated=this.createTranslate(this.translates[key],args)),translated},TransImpl.prototype.createTranslate=function(translated,args){var e_1,_a,_this=this;if(args&&args.length>0)try{for(var args_1=Trans_values(args),args_1_1=args_1.next();!args_1_1.done;args_1_1=args_1.next()){var arg=args_1_1.value;if("string"==typeof arg)translated=translated.replace(/%s/,arg);else if("object"==typeof arg){var _loop_1=function(argKey){var argValue=arg[argKey],placeholderMatch=void 0;argKey.startsWith("%s")?translated=translated.replace(new RegExp(argKey),argValue):(placeholderMatch=argKey.match(/^\[([a-zA-Z0-9_]*)\]$/))&&(translated=translated.replace(new RegExp("\\[".concat(placeholderMatch[1],"\\](.*)\\[\\/").concat(placeholderMatch[1],"\\]")),(function(match,p1){return _this.createTranslate(argValue,[p1])})))};for(var argKey in arg)_loop_1(argKey)}}}catch(e_1_1){e_1={error:e_1_1}}finally{try{args_1_1&&!args_1_1.done&&(_a=args_1.return)&&_a.call(args_1)}finally{if(e_1)throw e_1.error}}return translated},TransImpl}();!function(ABTestingVariant){ABTestingVariant.VARIANT_A="A",ABTestingVariant.VARIANT_B="B",ABTestingVariant.VARIANT_C="C",ABTestingVariant.VARIANT_D="D",ABTestingVariant.VARIANT_E="E",ABTestingVariant.VARIANT_F="F",ABTestingVariant.VARIANT_ORIGINAL="ORIGINAL",ABTestingVariant.VARIANT_UNKNOWN=""}(ABTestingVariant||(ABTestingVariant={}));var ExperimentsManager_extends=function(){var _extendStatics=function(d,b){return _extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)Object.prototype.hasOwnProperty.call(b,p)&&(d[p]=b[p])},_extendStatics(d,b)};return function(d,b){if("function"!=typeof b&&null!==b)throw new TypeError("Class extends value "+String(b)+" is not a constructor or null");function __(){this.constructor=d}_extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}(),ExperimentsManagerForCJS=function(_super){function ExperimentsManagerForCJS(utilEnvironment){var _this=_super.call(this,utilEnvironment.getLocalStorage())||this;return _this.utilEnvironment=utilEnvironment,_this}return ExperimentsManager_extends(ExperimentsManagerForCJS,_super),ExperimentsManagerForCJS}(function(){function ExperimentsManagerImpl(storage){this.storage=storage,this.experiments={},this.storage=storage}return ExperimentsManagerImpl.prototype.addExperiment=function(experimentId,variant){this.syncWithStorage(),this.experiments[experimentId]=variant,this.storage.setItem("ab_testing",JSON.stringify(this.experiments))},ExperimentsManagerImpl.prototype.getVariantById=function(experimentId){return this.syncWithStorage(),this.experiments[experimentId]||ABTestingVariant.VARIANT_UNKNOWN},ExperimentsManagerImpl.prototype.clearStorage=function(){this.storage.removeItem("ab_testing")},ExperimentsManagerImpl.prototype.syncWithStorage=function(){this.experiments=JSON.parse(this.storage.getItem("ab_testing")||"{}")},ExperimentsManagerImpl}()),BrowserImpl=function(){function BrowserImpl(){}return BrowserImpl.prototype.isAndroid=function(){return/android/i.test(navigator.userAgent)},BrowserImpl.prototype.isIos=function(){return/ipad|iphone|ipod/i.test(navigator.userAgent)},BrowserImpl.prototype.isMobile=function(){return window.browser.mobile||this.isAndroid()||this.isIos()||null!=window.orientation},BrowserImpl}(),DatesImpl=function(){function DatesImpl(usTimeFormat,utilEnviroment){this.serverAndClientTimeDiff=null,this._usTimeFormat=usTimeFormat,this._utilEnviroment=utilEnviroment}return DatesImpl.prototype.gmtOffsetGetter=function(){return this._utilEnviroment.getGmtOffset()()},DatesImpl.prototype.setServerTimestamp=function(timestamp){return null===this.serverAndClientTimeDiff&&(this.serverAndClientTimeDiff=this.getLocalUTime()-Math.floor(timestamp)),this},DatesImpl.prototype.getServerAndClientTimeDiff=function(){return this.serverAndClientTimeDiff||0},DatesImpl.prototype.getTimestamp=function(){return this.getLocalUTime()-this.getServerAndClientTimeDiff()},DatesImpl.prototype.createCalendarDate=function(date,index){void 0===index&&(index=0);var utime=this.getTimestamp()||date.getTime()/1e3;return date.setTime(1e3*(utime-60*date.getTimezoneOffset()-this._utilEnviroment.getGmtOffsetDiff())),date.setDate(date.getDate()+index),date},DatesImpl.prototype.fromUnixtimeToDatetime=function(yearFormat,titleOrText,selector){var _this=this,localGmtOffset=this._utilEnviroment.getGmtOffset()();document.querySelectorAll(selector).forEach((function(element){var timestamp="",data=[],firstPart="",secondPart="",dataMax=0;if("title"===titleOrText){var title=element.getAttribute("title");title&&((data=title.split("\n"))[0]&&(firstPart=data[0]),data[1]&&(secondPart=data[1]),timestamp=data[dataMax=data.length-1])}else timestamp=element.textContent||"";if(""!==timestamp){var format=_this.getFormat(yearFormat),startDateTimeStr=_this.timestamp2date(format,parseInt(timestamp),localGmtOffset);if("title"===titleOrText){var dataTmp=firstPart+"\n";2===dataMax&&(dataTmp+=secondPart+"\n"),element.setAttribute("title",dataTmp+startDateTimeStr)}else element.innerHTML=startDateTimeStr}}))},DatesImpl.prototype.getFormat=function(yearFormat){var format=this._usTimeFormat?"M d":"d.m.";switch(yearFormat){case"tv":format+=this._usTimeFormat?", g:i A":" G:i";break;case"short":format+=(this._usTimeFormat?", ":"")+"y";break;case"kickoff":format=this._usTimeFormat?"h:i A":"H:i";break;case"event":format+=this._usTimeFormat?", h:i A":" H:i"}return format},DatesImpl.prototype.getLocalUTime=function(){return Math.round((new Date).getTime()/1e3)},DatesImpl.prototype.timestamp2date=function(format,timestamp,offset){void 0===offset&&(offset=0);var time=new Date;timestamp||0==timestamp||(timestamp=Math.round((new Date).getTime()/1e3)),time.setTime(1e3*(timestamp+60*time.getTimezoneOffset()-offset));var _zerosPrepend=function(value,length){var _len;for(length||(length=2),_len=value.length;_len<length;)_len=(value="0"+value).length;return value},d=time.getDate(),m=time.getMonth()+1,y=time.getFullYear(),H=time.getHours(),i=time.getMinutes(),s=time.getSeconds(),w=time.getDay(),dateParts={d:_zerosPrepend(String(d)),j:d,F:["January","February","March","April","May","June","July","August","September","October","November","December"][m-1],m:_zerosPrepend(String(m)),M:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][m-1],n:m,y:String(y).slice(2),Y:y,g:H%12||12,G:H,h:_zerosPrepend(String(H%12||12)),H:_zerosPrepend(String(H)),i:_zerosPrepend(String(i)),s:_zerosPrepend(String(s)),a:H>11?"pm":"am",A:H>11?"PM":"AM",w};return format.replace(/[djFmMnyYgGhHisaAw]|"[^"]*"|'[^']*'/g,(function(substring){return substring in dateParts?dateParts[substring]:substring.slice(1,substring.length-1)}))},DatesImpl.prototype.formatBirthOrDeathDay=function(format,time){var timeZone=new Date(1e3*time),offset=this.isDaylightSavingTime(timeZone)?0:-3600;return this.timestamp2date(format,time,offset)},DatesImpl.prototype.getLastMidnight=function(){return this.getMidnight()},DatesImpl.prototype.getNextMidnight=function(){return this.getMidnight()+86400},DatesImpl.prototype.getMidnight=function(time){var now=new Date;time&&(now=new Date(1e3*time));var gmtOffset=this._utilEnviroment.getGmtOffset()(),localTimezoneOffsetSeconds=60*now.getTimezoneOffset();return now.setTime(1e3*(now.getTime()/1e3+localTimezoneOffsetSeconds-gmtOffset)),Date.UTC(now.getFullYear(),now.getMonth(),now.getDate(),0,0,0)/1e3+gmtOffset},DatesImpl.prototype.getNow=function(){return Math.floor((new Date).getTime()/1e3)},DatesImpl.prototype.getAge=function(birthday,dateOfDeath){var nowTs=dateOfDeath||this.getNow(),now=new Date(1e3*nowTs),birthDate=new Date(1e3*birthday),ageYears=now.getFullYear()-birthDate.getFullYear(),ageMonths=now.getMonth()-birthDate.getMonth();return(ageMonths<0||0===ageMonths&&now.getDate()<birthDate.getDate())&&ageYears--,ageYears},DatesImpl.prototype.isToday=function(){return 0===this._utilEnviroment.getSudate()},DatesImpl.prototype.isDaylightSavingTime=function(date){var currentOffset=date.getTimezoneOffset(),offsetInJanuary=new Date(date.getFullYear(),0,1).getTimezoneOffset(),offsetInJuly=new Date(date.getFullYear(),6,1).getTimezoneOffset();return Math.max(offsetInJanuary,offsetInJuly)>currentOffset},DatesImpl.prototype.getMatchDay=function(startTime,endTime){var gmtOffset=this._utilEnviroment.getGmtOffset()(),localDate=new Date;localDate.setTime(1e3*(this.getTimestamp()+60*localDate.getTimezoneOffset()-gmtOffset));var localDateStart=Date.UTC(localDate.getFullYear(),localDate.getMonth(),localDate.getDate(),0,0,0)/1e3+gmtOffset,_start=this._getDayDiff(startTime,localDateStart);if(!endTime)return[_start];var _end=this._getDayDiff(endTime,localDateStart),ret=[];if(_end>=_start)for(var i=_start;i<=_end;)ret.push(i),i++;return ret},DatesImpl.prototype._getDayDiff=function(time1,time2){var diffTime=(time1-time2)/86400;return Math.floor(diffTime)},DatesImpl}(),NumberImpl=function(){function NumberImpl(){}return NumberImpl.prototype.toNumber=function(value){var ret=Number(value);return isNaN(ret)&&(ret=0),ret},NumberImpl.prototype.format=function(value,thousandsSeparator){if(void 0===thousandsSeparator&&(thousandsSeparator=" "),"number"==typeof value&&isNaN(value)||"number"!=typeof value)return"";var neg=value<0;if((value=Math.abs(value))<1e3)return"".concat(value);var formattedRest,main=Math.floor(value/1e3),rest=value%1e3,formattedMain=this.format(main,thousandsSeparator);return formattedRest=String(rest).padStart(3,"0"),(neg?"-":"")+"".concat(formattedMain).concat(thousandsSeparator).concat(formattedRest)},NumberImpl.prototype.getRandomInt=function(min,max){return Math.floor(Math.random()*(max-min+1))+min},NumberImpl}(),PageImpl=function(){function PageImpl(){this._fullPage=!1,this._mixedFeed=!1,this._parentSportId=0,this._tournamentPage=!1,this._tournamentSubPage=!1,this._tournamentPagePassiveTable=!1,this._subPage=!1,this._pageType="",this._countryId=0,this._seriesEncodedId="",this._participantEncodedId=""}return PageImpl.prototype.setMixedFeed=function(value){this._mixedFeed=value},PageImpl.prototype.isMixed=function(){return this._mixedFeed},PageImpl.prototype.setParentSportId=function(value){this._parentSportId=value},PageImpl.prototype.isParent=function(){return this._parentSportId>0},PageImpl.prototype.setFullPage=function(value){this._fullPage=value},PageImpl.prototype.isFullPage=function(){return this._fullPage},PageImpl.prototype.setTournamentPage=function(value){this._tournamentPage=value},PageImpl.prototype.isTournamentPage=function(){return this._tournamentPage},PageImpl.prototype.setTournamentSubPage=function(value){this._tournamentSubPage=value},PageImpl.prototype.isTournamentSubPage=function(){return this._tournamentSubPage},PageImpl.prototype.setTournamentPagePassiveTable=function(value){this._tournamentPagePassiveTable=value},PageImpl.prototype.isTournamentPagePassiveTable=function(){return this._tournamentPagePassiveTable},PageImpl.prototype.setParticipantEncodedId=function(value){this._participantEncodedId=value},PageImpl.prototype.getParticipantEncodedId=function(){return this._participantEncodedId},PageImpl.prototype.isParticipantPage=function(){return""!==this._participantEncodedId},PageImpl.prototype.isParticipantPageSummary=function(){return this.isParticipantPage()&&!this.isSubPage()},PageImpl.prototype.isTeamPage=function(){return this.isParticipantPage()&&this.getPageType()===PageTypesList.PAGE_TYPE_TEAM},PageImpl.prototype.setSeriesEncodedId=function(value){this._seriesEncodedId=value},PageImpl.prototype.isSeriesPage=function(){return""!==this._seriesEncodedId},PageImpl.prototype.isSeasonPage=function(){return this.isTournamentPage()||this.isParticipantPage()||this.isSeriesPage()},PageImpl.prototype.setCountryId=function(value){this._countryId=value},PageImpl.prototype.getCountryId=function(){return this._countryId},PageImpl.prototype.isCountryPage=function(){return this._countryId>0&&!this.isSeasonPage()},PageImpl.prototype.setSubPage=function(value){this._subPage=value},PageImpl.prototype.isSubPage=function(){return this._subPage},PageImpl.prototype.setPageType=function(value){this._pageType=value},PageImpl.prototype.getPageType=function(){return this._pageType},PageImpl}(),Sport_values=function(o){var s="function"==typeof Symbol&&Symbol.iterator,m=s&&o[s],i=0;if(m)return m.call(o);if(o&&"number"==typeof o.length)return{next:function(){return o&&i>=o.length&&(o=void 0),{value:o&&o[i++],done:!o}}};throw new TypeError(s?"Object is not iterable.":"Symbol.iterator is not defined.")},SportImpl=function(){function SportImpl(utilEnviroment,utilString,utilTrans){this._utilConfig=cjs.Api.config,this._utilEnvironment=utilEnviroment,this._sportList=cjs.Api.constantsManager.getSports(),this._utilString=utilString,this._utilTrans=utilTrans}return SportImpl.prototype.getId=function(){var sportId=this._utilEnvironment.getSportId();if(sportId)return sportId;var sportName=this._utilEnvironment.getSport();if(sportId=this.getIdFromName(sportName))return sportId;var sportUrl=this._utilEnvironment.getSportUrl();if(sportUrl){var translatedSportName=this._utilString.trim(sportUrl,"/");if(sportId=this.getIdFromTranslatedName(translatedSportName))return sportId}return 0},SportImpl.prototype.getIdFromName=function(name){var sports=this._utilEnvironment.getSportList();return sports.hasOwnProperty(name)?sports[name]:0},SportImpl.prototype.getIdFromTranslatedName=function(name){var e_1,_a,urls=this._utilEnvironment.getSportUrlsById();try{for(var _b=Sport_values(Object.keys(urls)),_c=_b.next();!_c.done;_c=_b.next()){var key=_c.value,id=parseInt(key),urlName=name?name+"/":name;if(urls[id]==="/"+urlName)return id}}catch(e_1_1){e_1={error:e_1_1}}finally{try{_c&&!_c.done&&(_a=_b.return)&&_a.call(_b)}finally{if(e_1)throw e_1.error}}return 0},SportImpl.prototype.getTranslatedName=function(id,originalName){void 0===originalName&&(originalName="");var translations=this._utilEnvironment.getCompleteSportTranslations();return id&&!originalName&&(originalName=this.getOriginalNameFromId(id)),originalName&&translations.hasOwnProperty(originalName)&&translations[originalName].hasOwnProperty("name")?translations[originalName].name:""},SportImpl.prototype.getOriginalNameFromId=function(id){var sportList=this._utilEnvironment.getSportListById();return sportList.hasOwnProperty(id)?sportList[id]:SportNameList.UNKNOWN},SportImpl.prototype.getTranslatedUrlName=function(id){var urls=this._utilEnvironment.getSportUrlsById();return urls.hasOwnProperty(id)?this._utilString.trim(urls[id],"/"):""},SportImpl.prototype.getAllTranslatedSports=function(){var e_2,_a,allTranslatedSports={};try{for(var _b=Sport_values(Object.values(this._getSportsProvider())),_c=_b.next();!_c.done;_c=_b.next()){var sportId=_c.value;allTranslatedSports[sportId]=this.getTranslatedName(sportId)}}catch(e_2_1){e_2={error:e_2_1}}finally{try{_c&&!_c.done&&(_a=_b.return)&&_a.call(_b)}finally{if(e_2)throw e_2.error}}return allTranslatedSports},SportImpl.prototype._getSportsProvider=function(){var valuesFromSportList=Object.values(this._sportList),keysFromSportList=Object.keys(this._sportList),onlySportsList={};for(var val in valuesFromSportList)isNaN(valuesFromSportList[parseInt(val)])||(onlySportsList[keysFromSportList[val]]=valuesFromSportList[parseInt(val)]);return onlySportsList},SportImpl.prototype.getParentSport=function(id){var parentSports=this._utilEnvironment.getParentSports();return parentSports.hasOwnProperty(id)?parentSports[id]:null},SportImpl.prototype.inGroup=function(id,parentId){return id===parentId||this.getParentSport(id)===parentId},SportImpl.prototype.isGroupSport=function(id){var e_3,_a,parentSports=this._utilEnvironment.getParentSports();try{for(var _b=Sport_values(Object.keys(parentSports)),_c=_b.next();!_c.done;_c=_b.next()){var key=_c.value;if(parentSports[parseInt(key)]===id)return!0}}catch(e_3_1){e_3={error:e_3_1}}finally{try{_c&&!_c.done&&(_a=_b.return)&&_a.call(_b)}finally{if(e_3)throw e_3.error}}return!1},SportImpl.prototype.isMeetingSport=function(id){return id===this._sportList.HORSE_RACING||this.inGroup(id,this._sportList.WINTER_SPORTS)},SportImpl.prototype.isStageSport=function(id){return id===this._sportList.CYCLING||(this.isMeetingSport(id)||this.inGroup(id,this._sportList.MOTORSPORT)||this.inGroup(id,this._sportList.WINTER_SPORTS))},SportImpl.prototype.isRacingSport=function(id){return-1!=[this._sportList.CYCLING,this._sportList.HORSE_RACING].indexOf(id)||(this.inGroup(id,this._sportList.MOTORSPORT)||this.inGroup(id,this._sportList.WINTER_SPORTS))},SportImpl.prototype.isMotorSport=function(id){return this.inGroup(id,this._sportList.MOTORSPORT)},SportImpl.prototype.isServingSport=function(id){return-1!==[this._sportList.AMERICAN_FOOTBALL,this._sportList.TENNIS,this._sportList.BADMINTON,this._sportList.CRICKET,this._sportList.BASEBALL,this._sportList.PESAPALLO,this._sportList.DARTS].indexOf(id)},SportImpl.prototype.isCategorySport=function(id){return-1!=this._utilEnvironment.getCategorySports().indexOf(id)},SportImpl.prototype.getMainSport=function(id){var parentSportId=this.getParentSport(id);return parentSportId||id},SportImpl.prototype.getSportIdsInParentSport=function(id){var e_4,_a,sportIds=[],parentSports=this._utilEnvironment.getParentSports();try{for(var _b=Sport_values(Object.keys(parentSports)),_c=_b.next();!_c.done;_c=_b.next()){var childSportIdString=_c.value,childSportId=parseInt(childSportIdString);parentSports[childSportId]===id&&sportIds.push(childSportId)}}catch(e_4_1){e_4={error:e_4_1}}finally{try{_c&&!_c.done&&(_a=_b.return)&&_a.call(_b)}finally{if(e_4)throw e_4.error}}return sportIds},SportImpl.prototype.getRacingSportShortLapsLabel=function(id){var label="";return this.inGroup(id,this._sportList.MOTORSPORT)?label=this._utilTrans.translate("TRANS_MOTORSPORT_LAP_SHORT"):this.inGroup(id,this._sportList.WINTER_SPORTS)&&(label=this._utilTrans.translate("TRANS_WINTER_SPORTS_LAP_SHORT")),label},SportImpl.prototype.hasCategoryPage=function(id){return-1!==this._utilConfig.get("app","has_category_page").indexOf(id)},SportImpl.prototype.getSportCategoryId=function(leagueItem){if(this.inGroup(leagueItem.getSportId(),this._sportList.MOTORSPORT)){var sortKey=leagueItem.getSortKey();return parseInt(sortKey.substr(2,sortKey.indexOf(".")-2))}return 0},SportImpl.prototype.isGolf=function(sportId){return sportId===this._sportList.GOLF},SportImpl.prototype.hasDisabledDetail=function(sportId){return-1!==this._utilConfig.get("app","sports_without_detail").indexOf(sportId)},SportImpl.prototype.getConstant=function(id){var originalName=this.getOriginalNameFromId(id);return originalName?("_"+originalName.replace(/-/g,"_")).toUpperCase():""},SportImpl}(),Url_values=function(o){var s="function"==typeof Symbol&&Symbol.iterator,m=s&&o[s],i=0;if(m)return m.call(o);if(o&&"number"==typeof o.length)return{next:function(){return o&&i>=o.length&&(o=void 0),{value:o&&o[i++],done:!o}}};throw new TypeError(s?"Object is not iterable.":"Symbol.iterator is not defined.")},UrlImpl=function(){function UrlImpl(utilEnviroment){this._utilConfig=cjs.Api.config,this._utilEnvironment=utilEnviroment,this._regexHashPart=new RegExp("(.+)#(.+)")}return UrlImpl.prototype.getLocationOrigin=function(){return window.location.origin},UrlImpl.prototype.addQueryStringParameter=function(inputUrl,inputParams){var e_1,_a,url,parsedSuccessfully=!1;try{url=new URL(inputUrl),parsedSuccessfully=!0}catch(e){url=new URL("http://dummy.url")}var outputUrl,urlParams=new URLSearchParams(url.search.slice(1));try{for(var _b=Url_values(Object.keys(inputParams)),_c=_b.next();!_c.done;_c=_b.next()){var key=_c.value,paramToUrl=String(inputParams[key]);urlParams.set(key,paramToUrl)}}catch(e_1_1){e_1={error:e_1_1}}finally{try{_c&&!_c.done&&(_a=_b.return)&&_a.call(_b)}finally{if(e_1)throw e_1.error}}var outputUrlParams=urlParams.toString();if(parsedSuccessfully)outputUrl=url.origin+url.port+url.pathname+(outputUrlParams?"?"+outputUrlParams:"")+url.hash;else{var paramsDelimiter=inputUrl.includes("?")?"&":"?",outputUrlParamsWithDelimiter=outputUrlParams?paramsDelimiter+outputUrlParams:"";outputUrl=inputUrl+outputUrlParamsWithDelimiter,inputUrl.match(this._regexHashPart)&&(outputUrl=inputUrl.replace(this._regexHashPart,"$1"+outputUrlParamsWithDelimiter+"#$2"))}return outputUrl},UrlImpl.prototype.getPathname=function(){return window.location.pathname},UrlImpl.prototype.getBaseImageData=function(withLocationOrigin){void 0===withLocationOrigin&&(withLocationOrigin=!1);var baseImageDataUrl=this._utilEnvironment.getBaseImageDataUrl();return withLocationOrigin?baseImageDataUrl:baseImageDataUrl.replace(this.getLocationOrigin(),"")},UrlImpl.prototype.getEmptyTeamLogo=function(){return this.getBaseImageData().replace("/image/data","")+this._utilConfig.get("app","empty_logo_small_path","logo_team")},UrlImpl.prototype.getEmptyLogoByType=function(type){var config=this._utilConfig.get("app","empty_logo_path"),img=config["face_".concat(type.replace("e","a"))]||config.logo_team;return"".concat(this.getBaseImageData().replace("/image/data","")).concat(img)},UrlImpl.prototype.createBookmakerLink=function(inputParams,bookmakerId){var bookmakerLink=this._utilEnvironment.getBookmakerLink()+String(bookmakerId)+"/";return this.addQueryStringParameter(bookmakerLink,inputParams)},UrlImpl}(),Dic_extends=function(){var _extendStatics=function(d,b){return _extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)Object.prototype.hasOwnProperty.call(b,p)&&(d[p]=b[p])},_extendStatics(d,b)};return function(d,b){if("function"!=typeof b&&null!==b)throw new TypeError("Class extends value "+String(b)+" is not a constructor or null");function __(){this.constructor=d}_extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}(),Dic_values=function(o){var s="function"==typeof Symbol&&Symbol.iterator,m=s&&o[s],i=0;if(m)return m.call(o);if(o&&"number"==typeof o.length)return{next:function(){return o&&i>=o.length&&(o=void 0),{value:o&&o[i++],done:!o}}};throw new TypeError(s?"Object is not iterable.":"Symbol.iterator is not defined.")},Dic_read=function(o,n){var m="function"==typeof Symbol&&o[Symbol.iterator];if(!m)return o;var r,e,i=m.call(o),ar=[];try{for(;(void 0===n||n-- >0)&&!(r=i.next()).done;)ar.push(r.value)}catch(error){e={error}}finally{try{r&&!r.done&&(m=i.return)&&m.call(i)}finally{if(e)throw e.error}}return ar},Dic_spreadArray=function(to,from,pack){if(pack||2===arguments.length)for(var ar,i=0,l=from.length;i<l;i++)!ar&&i in from||(ar||(ar=Array.prototype.slice.call(from,0,i)),ar[i]=from[i]);return to.concat(ar||Array.prototype.slice.call(from))},SERVICE_TYPE_CLASS=1,SERVICE_TYPE_SINGLETON=2,DicImpl=function(){function DicImpl(){this.alias2Service={},this.services={};this.regexp=new RegExp(/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/,"gm")}return DicImpl.prototype.resetContainer=function(){this.alias2Service={},this.services={}},DicImpl.prototype.registerClass=function(name,classFunction,aliases,allowOverride){void 0===aliases&&(aliases=[]),void 0===allowOverride&&(allowOverride=!1),this.registerService(SERVICE_TYPE_CLASS,name,classFunction,aliases,allowOverride)},DicImpl.prototype.registerSingleton=function(name,classFunction,aliases,allowOverride){void 0===aliases&&(aliases=[]),void 0===allowOverride&&(allowOverride=!1),this.registerService(SERVICE_TYPE_SINGLETON,name,classFunction,aliases,allowOverride)},DicImpl.prototype.registerGetter=function(name,object,aliases,allowOverride){void 0===aliases&&(aliases=[]),void 0===allowOverride&&(allowOverride=!1),this.registerService(3,name,object,aliases,allowOverride)},DicImpl.prototype.get=function(name){return name=this.getRealServiceName(name),this.services[name].instance||(this.services[name].instance=this.createInstance(name)),this.services[name].instance},DicImpl.prototype.getNewInstance=function(serviceName,overrideOld){return void 0===overrideOld&&(overrideOld=!1),serviceName=this.getRealServiceName(serviceName),overrideOld?(this.services[serviceName].instance=null,this.get(serviceName)):this.createInstance(serviceName)},DicImpl.prototype.getClass=function(name){name=this.getRealServiceName(name);var service=this.services[name]||null;if(!service||service.type!==SERVICE_TYPE_CLASS)throw"Service is not defined as class";return this.getDependencyInjectedClass(service)},DicImpl.prototype.exists=function(name){return null!=this.alias2Service[name]},DicImpl.prototype.registerService=function(type,name,invoke,aliases,allowOverride){var e_1,_a;if(this.services[name]={arguments:[],name,funcName:"",instance:null,invoke,type,dependencyInjectedClass:null},[SERVICE_TYPE_CLASS,SERVICE_TYPE_SINGLETON].includes(type)){var parsedFunction=this.parseFunctionArguments(invoke);this.services[name].funcName=parsedFunction.funcName,this.services[name].arguments=parsedFunction.funcArgs}this.checkServiceOverride(name,allowOverride),this.alias2Service[name]=name;try{for(var _b=Dic_values(Array.from(aliases)),_c=_b.next();!_c.done;_c=_b.next()){var alias=_c.value;this.checkServiceOverride(alias,allowOverride),this.alias2Service[alias]=name}}catch(e_1_1){e_1={error:e_1_1}}finally{try{_c&&!_c.done&&(_a=_b.return)&&_a.call(_b)}finally{if(e_1)throw e_1.error}}if([SERVICE_TYPE_CLASS,SERVICE_TYPE_SINGLETON].includes(type)){var err=this.checkCyclicDependencies(name,this.services[name].arguments);if(err)throw err="".concat(this.getDependencyInfo(name)," => ").concat(err),"Cyclic dependencies found: ".concat(err)}},DicImpl.prototype.parseFunctionArguments=function(func){var funcNoComments=func.toString().replace(this.regexp,""),firstBracket=funcNoComments.indexOf("("),funcArgs=funcNoComments.slice(firstBracket+1,funcNoComments.indexOf(")")).match(/([^\s,]+)/g);return{funcName:funcNoComments.substring(9,firstBracket),funcArgs:funcArgs||[]}},DicImpl.prototype.createInstance=function(name){var service=this.services[name]||null;if(service)switch(service.type){case 3:return service.invoke;case SERVICE_TYPE_SINGLETON:return this.invokeSingleton(name);case SERVICE_TYPE_CLASS:return this.createNewObject(name)}throw"Invalid service type"},DicImpl.prototype.invokeSingleton=function(serviceName){var _a,service=this.services[serviceName]||null;if(!(null===(_a=null==service?void 0:service.invoke)||void 0===_a?void 0:_a.apply))throw"Can`t invoke singleton function";var dependencies=this.resolveDependencies(serviceName);return service.invoke.apply(null,dependencies)},DicImpl.prototype.createNewObject=function(serviceName){var service=this.services[serviceName]||null;if(null==(null!==service?service.invoke:void 0))throw"Can't create new object";return new(this.getDependencyInjectedClass(service))},DicImpl.prototype.getDependencyInjectedClass=function(service){if(!service.dependencyInjectedClass){var dependenciesGetter_1=(that=this,function(serviceName){return that.resolveDependencies(serviceName)}),Wrap=function(_super){function Wrap(){var _this=_super.apply(this,Dic_spreadArray([],Dic_read(dependenciesGetter_1(service.name)),!1))||this;return _this._className=service.funcName,_this}return Dic_extends(Wrap,_super),Wrap}(service.invoke);service.dependencyInjectedClass=Wrap}var that;return service.dependencyInjectedClass},DicImpl.prototype.resolveDependencies=function(name){var _this=this,service=this.services[name]||null;return service&&null===service.arguments?[]:Array.from(service.arguments).map((function(argument){return _this.get(argument)}))},DicImpl.prototype.getRealServiceName=function(name){if(this.alias2Service[name])return this.alias2Service[name];throw"Service (".concat(name,") not found")},DicImpl.prototype.getDependencyInfo=function(name){if(!this.alias2Service[name])return"";var info=name;name=this.getRealServiceName(name);var service=this.services[name]||null,additionalInfo="";return service&&[SERVICE_TYPE_CLASS,SERVICE_TYPE_SINGLETON].includes(service.type)&&service.funcName&&(additionalInfo="[func: ".concat(service.funcName,"]")),"".concat(info,"(@").concat(name).concat(additionalInfo,")")},DicImpl.prototype.checkCyclicDependencies=function(serviceName,dependencies){var e_2,_a;serviceName=this.getRealServiceName(serviceName);try{for(var _b=Dic_values(Array.from(dependencies)),_c=_b.next();!_c.done;_c=_b.next()){var dependency=_c.value;if(!this.alias2Service[dependency])return"";var realDependencyServiceName=this.getRealServiceName(dependency);if(realDependencyServiceName===serviceName)return this.getDependencyInfo(dependency);var dependencyService=this.services[realDependencyServiceName],err=this.checkCyclicDependencies(serviceName,dependencyService.arguments);if(err)return"".concat(this.getDependencyInfo(dependency)," => ").concat(err)}}catch(e_2_1){e_2={error:e_2_1}}finally{try{_c&&!_c.done&&(_a=_b.return)&&_a.call(_b)}finally{if(e_2)throw e_2.error}}return""},DicImpl.prototype.checkServiceOverride=function(serviceName,allowOverride){if(this.alias2Service[serviceName]&&!allowOverride)throw"Trying to override service: "+serviceName},DicImpl}(),AjaxFetchObject_assign=function(){return AjaxFetchObject_assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t},AjaxFetchObject_assign.apply(this,arguments)},AJAX_STATUS_CODE_OK=200,AJAX_STATUS_CODE_NOT_MODIFIED=304,AJAX_STATUS_CODE_NO_CONTENT=204,AJAX_STATUS_CODE_WIN_ERROR=1223,AJAX_STATUS_CODE_CANCELED=0,AjaxFetchObjectImpl=function(){function AjaxFetchObjectImpl(url,feedFetcher,callbackFunction,action,updateFeedHash304Getter,errorReporter,maxRequestAttemptsExceeded){void 0===callbackFunction&&(callbackFunction=""),void 0===action&&(action=""),void 0===updateFeedHash304Getter&&(updateFeedHash304Getter=null),void 0===errorReporter&&(errorReporter=null),this.url=url,this.feedFetcher=feedFetcher,this.callbackFunction=callbackFunction,this.action=action,this.updateFeedHash304Getter=updateFeedHash304Getter,this.errorReporter=errorReporter,this.maxRequestAttemptsExceeded=maxRequestAttemptsExceeded,this.updating=!1,this.aborting=!1,this.activeRequest=null,this.requestAttempts=0,this.sendRequestTrigger=null,this.errorCallback=null,this.afterCallback=null,this.requestAttempts=0,this.sendRequestTrigger=null,this.abortController=new AbortController}return AjaxFetchObjectImpl.prototype.abort=function(){this.updating&&(this.updating=!1,this.aborting=!0,this.activeRequest&&this.abortController.abort(),this.activeRequest=null)},AjaxFetchObjectImpl.prototype.setErrorCallback=function(errorCallback){this.errorCallback=errorCallback},AjaxFetchObjectImpl.prototype.setAfterCallback=function(afterCallback){this.afterCallback=afterCallback},AjaxFetchObjectImpl.prototype.update=function(headers){var _this=this;if(this.updating)return!1;if(this.activeRequest=null,this.updating=new Date,"update"===this.action&&this.updateFeedHash304Getter){var updateFeedHash304=this.updateFeedHash304Getter();updateFeedHash304&&(headers=AjaxFetchObject_assign(AjaxFetchObject_assign({},headers),{"X-Signature":updateFeedHash304}))}return this.sendRequestTrigger=function(){if(_this.requestAttempts++<=3){var cb=function(){_this.activeRequest=_this.feedFetcher.fetch(_this.url,{headers,signal:_this.abortController.signal}).then((function(response){_this.updating=!1;var isOk=!1;_this.aborting||(isOk=_this.ajaxResponse(response)),isOk&&(_this.activeRequest=null,_this.requestAttempts=0)})).catch((function(){"function"==typeof _this.errorCallback&&_this.activeRequest&&_this.errorCallback(),"function"==typeof _this.sendRequestTrigger&&_this.sendRequestTrigger()}))},timeout=250*(_this.requestAttempts-1);return timeout?setTimeout(cb,timeout):cb(),!1}return _this.maxRequestAttemptsExceeded(),!0},this.sendRequestTrigger()},AjaxFetchObjectImpl.prototype.getUpdating=function(){return this.updating},AjaxFetchObjectImpl.prototype.ajaxResponse=function(response){if(!response||![AJAX_STATUS_CODE_OK,AJAX_STATUS_CODE_NOT_MODIFIED,AJAX_STATUS_CODE_NO_CONTENT,AJAX_STATUS_CODE_WIN_ERROR,AJAX_STATUS_CODE_CANCELED].includes(response.getStatus())){var triggerStatus=!1;return this.sendRequestTrigger&&(triggerStatus=this.sendRequestTrigger())&&"function"==typeof this.errorCallback&&this.activeRequest&&this.errorCallback(),triggerStatus}try{var allResponseHeaders=response.getProperties().headers,customHeaders=AjaxFetchObject_assign({Date:allResponseHeaders.get("Date")},response.getProperties().geoIp.getAsGlobalHeaders()),headersAreEmpty=0===Array.from(allResponseHeaders.values()).length;window.CommCore.parse_custom_headers(customHeaders),"function"==typeof this.afterCallback&&this.afterCallback(),"function"==typeof this.callbackFunction&&this.callbackFunction(response.getStatus(),headersAreEmpty,response.getBody(),this.action,customHeaders)}catch(e){var msg="Ajax response error [".concat(this.action,"] [").concat(this.url,"] [").concat(response.getBody(),"]");this.errorReporter&&this.errorReporter(msg,e)}return this.activeRequest=null,this.updating=!1,!0},AjaxFetchObjectImpl}(),EnvironmentImpl=function(){function EnvironmentImpl(){}return EnvironmentImpl.prototype.open=function(url){window.open(url)},EnvironmentImpl.prototype.detailOpen=function(id,tabName,checkHolder,parentId){void 0===tabName&&(tabName=""),void 0===checkHolder&&(checkHolder=!0),void 0===parentId&&(parentId=""),cjs.Api.loader.get("detail/opener").call({eventId:id,tabName,checkHolder,parentId})},EnvironmentImpl.prototype.detailOpenWithEventId=function(eventId,tabName){void 0===tabName&&(tabName=""),cjs.Api.loader.get("detail/opener/eventId").call({eventId,tabName})},EnvironmentImpl.prototype.bookmakerOpen=function(link,bookmakerId,betslip){return window.bookmaker_open(link,bookmakerId,betslip)},EnvironmentImpl.prototype.statsOpen=function(tournamentId,tournamentStageId,sportId,statsType){return window.stats_open(tournamentId,tournamentStageId,sportId,statsType)},EnvironmentImpl.prototype.getGmtOffset=function(){return cjs.Api.timezone.getGmtOffset.bind(cjs.Api.timezone)},EnvironmentImpl.prototype.getGmtOffsetDiff=function(){return cjs.Api.timezone.getGmtOffsetDiff()},EnvironmentImpl.prototype.hourFormat=function(){return cjs.hourFormat},EnvironmentImpl.prototype.dateFormat=function(){return cjs.dateFormat},EnvironmentImpl.prototype.dateTimeFormat=function(){return cjs.dateTimeFormat},EnvironmentImpl.prototype.fullDateShortFormat=function(){return cjs.fullDateShortFormat},EnvironmentImpl.prototype.fullDateTimeFormat=function(){return cjs.fullDateTimeFormat},EnvironmentImpl.prototype.getTimezone=function(){return cjs.Api.timezone.getActualTimezone()},EnvironmentImpl.prototype.getUserAgent=function(){return navigator.userAgent||""},EnvironmentImpl.prototype.getLocation=function(){return location},EnvironmentImpl.prototype.getConfig=function(){return cjs._config},EnvironmentImpl.prototype.getTranslates=function(){return cjs._translates},EnvironmentImpl.prototype.getSport=function(){return window.sport},EnvironmentImpl.prototype.getSportId=function(){return window.sport_id},EnvironmentImpl.prototype.getSportUrl=function(){return window.sport_url},EnvironmentImpl.prototype.getPageTab=function(){return cjs.pageTab||""},EnvironmentImpl.prototype.getSportUrlsById=function(){return window.SPORT_URL_BY_ID},EnvironmentImpl.prototype.getSportListById=function(){return window.SPORT_LIST_BY_ID},EnvironmentImpl.prototype.getSportList=function(){return window.SPORT_LIST},EnvironmentImpl.prototype.getSportScorePartList=function(){return window.SPORT_SCORE_PART_LIST},EnvironmentImpl.prototype.getParentSports=function(){return cjs.parentSports||{}},EnvironmentImpl.prototype.getGeoIp=function(callback){cjs.Api.loader.get("geoIpResolver").call(callback)},EnvironmentImpl.prototype.getGeoIpIsoSubdivisionCode0=function(){return cjs.geoIPIsoSubdivisionCode0},EnvironmentImpl.prototype.getGlobalGeoIp=function(){return cjs.geoIP},EnvironmentImpl.prototype.getBaseUrl=function(){return window.base_url_protocol},EnvironmentImpl.prototype.getBaseImageDataUrl=function(){return window.base_image_data_url},EnvironmentImpl.prototype.getSuperTemplateDefinition=function(){return cjs.superTemplateDefinition},EnvironmentImpl.prototype.getCompleteSportTranslations=function(forceShortVersion){return forceShortVersion||this.isResponsive()?window.TXT_SPORT_MOBILE:window.TXT_SPORT},EnvironmentImpl.prototype.getSudate=function(){return window.sudate},EnvironmentImpl.prototype.getUpdater=function(){return window.updater},EnvironmentImpl.prototype.getSentences=function(){return window.sentences},EnvironmentImpl.prototype.getSentencesParts=function(){return window.sentences_parts},EnvironmentImpl.prototype.getCategory=function(){return window.category},EnvironmentImpl.prototype.getSubCategory=function(){return window.sub_category},EnvironmentImpl.prototype.getHasOddsBetslip=function(){return window.odds_betslip},EnvironmentImpl.prototype.getFeedRequestObject=function(){return window.initFeedRequest(),cjs.feedRequest},EnvironmentImpl.prototype.getMyLeaguesObject=function(){return cjs.myLeagues},EnvironmentImpl.prototype.getMyGamesObject=function(){return cjs.mygames},EnvironmentImpl.prototype.getTooltipObject=function(){return window.tt||(window.tt=new tooltip),window.tt},EnvironmentImpl.prototype.getProjectTypeId=function(){return window.project_type_id},EnvironmentImpl.prototype.getProjectId=function(){return window.project_id},EnvironmentImpl.prototype.getOddsBettingTypes=function(){return window.odds_betting_types},EnvironmentImpl.prototype.createAjaxFeedObject=function(url,completeCallback,action,maxRequestAttemptsExceeded){return void 0===maxRequestAttemptsExceeded&&(maxRequestAttemptsExceeded=function(){}),new AjaxFetchObjectImpl(url,cjs.dic.get("Feed_FetcherWithPropertiesResolvingResponse"),completeCallback,action,(function(){return window.u_304}),cjs.dev?function(msg,exception){return cjs.dev.reportError(msg,exception,!1)}:void 0,maxRequestAttemptsExceeded)},EnvironmentImpl.prototype.getParserConfig=function(){return{JS_ROW_END:window.JS_ROW_END,JS_CELL_END:window.JS_CELL_END,JS_INDEX:window.JS_INDEX}},EnvironmentImpl.prototype.getLux=function(){return window.LUX},EnvironmentImpl.prototype.getBookmakerLink=function(){return window.bookmaker_link},EnvironmentImpl.prototype.getWaypoint=function(){return window.Waypoint},EnvironmentImpl.prototype.getAllowedTvs=function(){return cjs.allowedTvs},EnvironmentImpl.prototype.getEventStageTrans=function(){return window.event_stage_trans||[]},EnvironmentImpl.prototype.getCalendarConfig=function(){return window.calendar},EnvironmentImpl.prototype.getSetCalendarDate=function(){return window.set_calendar_date},EnvironmentImpl.prototype.isNoDuelSport=function(sportId){return cjs.noDuelSports.includes(sportId)},EnvironmentImpl.prototype.getOddsFormatList=function(){return window.ODDS_FORMAT_LIST},EnvironmentImpl.prototype.getOddsFormat=function(){return window.get_odds_format()},EnvironmentImpl.prototype.getSpreadTrans=function(){return window.getSpreadTrans()},EnvironmentImpl.prototype.parse=function(fsInput,update,odds,action){return window.parse(fsInput,update,odds,action)},EnvironmentImpl.prototype.reSortDetailTable=function(el,colIndex){return window.ts_resortTable(el,colIndex)},EnvironmentImpl.prototype.getLiveTableSettings=function(){return cjs.liveTableSettings},EnvironmentImpl.prototype.isResponsive=function(isMobile){var _a,_b,_c,_d,config=this.getConfig(),breakpoint=(isMobile?null===(_b=null===(_a=config.app)||void 0===_a?void 0:_a.responsive)||void 0===_b?void 0:_b.breakpoint_mobile:null===(_d=null===(_c=config.app)||void 0===_c?void 0:_c.responsive)||void 0===_d?void 0:_d.breakpoint)||0;return window.innerWidth<breakpoint},EnvironmentImpl.prototype.getSportReversedList=function(){return null!=window.SPORT_REVERSED_TIME_LIST?window.SPORT_REVERSED_TIME_LIST:{}},EnvironmentImpl.prototype.getFullDateFormat=function(){return cjs.fullDateFormat},EnvironmentImpl.prototype.getCategorySports=function(){return cjs.categorySports},EnvironmentImpl.prototype.changeTzCallback=function(){return window.change_tz_callback()},EnvironmentImpl.prototype.refreshIframe=function(){return window.refresh_iframe()},EnvironmentImpl.prototype.setServiceStatus=function(serviceStatus,forceReload){return window.set_service_status(serviceStatus,forceReload)},EnvironmentImpl.prototype.setAjaxSyncMultiplier=function(ajaxMultiplier){return window.setAjaxSyncMultiplier(ajaxMultiplier)},EnvironmentImpl.prototype.getLsLoginClient=function(){return cjs.dic.get("LsidClientFactory").getInstance()},EnvironmentImpl.prototype.getLocalLsidClient=function(){return cjs.Api.localLsid},EnvironmentImpl.prototype.getLocalStorage=function(){return window.localStorage},EnvironmentImpl.prototype.getDisabledVideoHighlightGeoIps=function(){return window.disabledVideoHighlightGeoIps},EnvironmentImpl.prototype.getParticipant=function(){return window.participant},EnvironmentImpl.prototype.getEventParticipantEncodedId=function(){return window.eventParticipantEncodedId},EnvironmentImpl.prototype.getTournamentStageEncodedId=function(){return window.tournamentStageEncodedId},EnvironmentImpl.prototype.getParticipantLogos=function(){return window.participantLogos||[]},EnvironmentImpl.prototype.displayBanners=function(){return window.display_banners()},EnvironmentImpl.prototype.getNotificationPermission=function(){var _a;return null===(_a=window.Notification)||void 0===_a?void 0:_a.permission},EnvironmentImpl.prototype.sortDataInDataHandlers=function(){window.sort_fs_data()},EnvironmentImpl.prototype.getInitialFeeds=function(){return cjs.initialFeeds||[]},EnvironmentImpl}(),LsidTransitionDriver=function(){function LsidTransitionDriver(lsidStateMachine){this.lsidStateMachine=lsidStateMachine}return LsidTransitionDriver.prototype.getCurrentState=function(){return this.lsidStateMachine.getTransitionObservable().getValue()},LsidTransitionDriver.prototype.transitionAllowed=function(){return this.getCurrentState().canUserCancel()},LsidTransitionDriver}();function operate(init){return function(source){if(function(source){return isFunction_isFunction(null==source?void 0:source.lift)}(source))return source.lift((function(liftedSource){try{return init(liftedSource,this)}catch(err){this.error(err)}}));throw new TypeError("Unable to lift unknown Observable type")}}function createOperatorSubscriber(destination,onNext,onComplete,onError,onFinalize){return new OperatorSubscriber(destination,onNext,onComplete,onError,onFinalize)}var OperatorSubscriber=function(_super){function OperatorSubscriber(destination,onNext,onComplete,onError,onFinalize,shouldUnsubscribe){var _this=_super.call(this,destination)||this;return _this.onFinalize=onFinalize,_this.shouldUnsubscribe=shouldUnsubscribe,_this._next=onNext?function(value){try{onNext(value)}catch(err){destination.error(err)}}:_super.prototype._next,_this._error=onError?function(err){try{onError(err)}catch(err){destination.error(err)}finally{this.unsubscribe()}}:_super.prototype._error,_this._complete=onComplete?function(){try{onComplete()}catch(err){destination.error(err)}finally{this.unsubscribe()}}:_super.prototype._complete,_this}return tslib_es6_extends(OperatorSubscriber,_super),OperatorSubscriber.prototype.unsubscribe=function(){var _a;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){var closed_1=this.closed;_super.prototype.unsubscribe.call(this),!closed_1&&(null===(_a=this.onFinalize)||void 0===_a||_a.call(this))}},OperatorSubscriber}(Subscriber);var BehaviorSubject_BehaviorSubject=function(_super){function BehaviorSubject(_value){var _this=_super.call(this)||this;return _this._value=_value,_this}return tslib_es6_extends(BehaviorSubject,_super),Object.defineProperty(BehaviorSubject.prototype,"value",{get:function(){return this.getValue()},enumerable:!1,configurable:!0}),BehaviorSubject.prototype._subscribe=function(subscriber){var subscription=_super.prototype._subscribe.call(this,subscriber);return!subscription.closed&&subscriber.next(this._value),subscription},BehaviorSubject.prototype.getValue=function(){var hasError=this.hasError,thrownError=this.thrownError,_value=this._value;if(hasError)throw thrownError;return this._throwIfClosed(),_value},BehaviorSubject.prototype.next=function(value){_super.prototype.next.call(this,this._value=value)},BehaviorSubject}(Subject_Subject);function map(project,thisArg){return operate((function(source,subscriber){var index=0;source.subscribe(createOperatorSubscriber(subscriber,(function(value){subscriber.next(project.call(thisArg,value,index++))})))}))}function distinctUntilChanged(comparator,keySelector){return void 0===keySelector&&(keySelector=identity),comparator=null!=comparator?comparator:defaultCompare,operate((function(source,subscriber){var previousKey,first=!0;source.subscribe(createOperatorSubscriber(subscriber,(function(value){var currentKey=keySelector(value);!first&&comparator(previousKey,currentKey)||(first=!1,previousKey=currentKey,subscriber.next(value))})))}))}function defaultCompare(a,b){return a===b}var ActiveWindowOrMenuWindowList,ActiveWindowOrMenuImpl=function(){function ActiveWindowOrMenuImpl(){this.rendererObservable=new BehaviorSubject_BehaviorSubject(null)}return ActiveWindowOrMenuImpl.prototype.activate=function(window){this.rendererObservable.next(window||null)},ActiveWindowOrMenuImpl.prototype.getObservable=function(ofWindow){return ofWindow?this.rendererObservable.pipe(map((function(selectedWindow){return selectedWindow===ofWindow})),distinctUntilChanged()):this.rendererObservable},ActiveWindowOrMenuImpl}();!function(ActiveWindowOrMenuWindowList){ActiveWindowOrMenuWindowList.VERTICAL_MENU="verticalMenu",ActiveWindowOrMenuWindowList.LANGBOX="langBox",ActiveWindowOrMenuWindowList.SEARCH="search",ActiveWindowOrMenuWindowList.SETTINGS="settings",ActiveWindowOrMenuWindowList.NOTIFICATIONS_SETTINGS="notificationsSettings",ActiveWindowOrMenuWindowList.LSID_LOGGED_IN_INTERFACE="loggedIn",ActiveWindowOrMenuWindowList.LSID="logginClient",ActiveWindowOrMenuWindowList.REGISTRATION_PROMPT="registrationPrompt",ActiveWindowOrMenuWindowList.LANGBOX_SETUP="langBoxSetup"}(ActiveWindowOrMenuWindowList||(ActiveWindowOrMenuWindowList={}));var ActiveWindowOrMenuLsidCoupled_extends=function(){var _extendStatics=function(d,b){return _extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)Object.prototype.hasOwnProperty.call(b,p)&&(d[p]=b[p])},_extendStatics(d,b)};return function(d,b){if("function"!=typeof b&&null!==b)throw new TypeError("Class extends value "+String(b)+" is not a constructor or null");function __(){this.constructor=d}_extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}(),ActiveWindowOrMenuLsidCoupled_assign=function(){return ActiveWindowOrMenuLsidCoupled_assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t},ActiveWindowOrMenuLsidCoupled_assign.apply(this,arguments)},ActiveWindowOrMenuLsidCoupled_read=function(o,n){var m="function"==typeof Symbol&&o[Symbol.iterator];if(!m)return o;var r,e,i=m.call(o),ar=[];try{for(;(void 0===n||n-- >0)&&!(r=i.next()).done;)ar.push(r.value)}catch(error){e={error}}finally{try{r&&!r.done&&(m=i.return)&&m.call(i)}finally{if(e)throw e.error}}return ar},ActiveWindowOrMenuLsidCoupled=function(_super){function ActiveWindowOrMenuLsidCoupled(){var _this=null!==_super&&_super.apply(this,arguments)||this;return _this.transitionDrivers={},_this}return ActiveWindowOrMenuLsidCoupled_extends(ActiveWindowOrMenuLsidCoupled,_super),ActiveWindowOrMenuLsidCoupled.prototype.addLsidStateMachineCoupling=function(lsidStateMachine){var _a,_this=this;this.transitionDrivers=ActiveWindowOrMenuLsidCoupled_assign(ActiveWindowOrMenuLsidCoupled_assign({},this.transitionDrivers),((_a={})[ActiveWindowOrMenuWindowList.LSID]=new LsidTransitionDriver(lsidStateMachine),_a)),lsidStateMachine.getTransitionObservable().subscribe((function(state){state.idleRenderer()?_this.getCurrentlyDisplayedWindow()===ActiveWindowOrMenuWindowList.LSID&&_super.prototype.activate.call(_this):_this.activate(ActiveWindowOrMenuWindowList.LSID)})),this.getObservable(ActiveWindowOrMenuWindowList.LSID).pipe(operate((function(source,subscriber){var prev,hasPrev=!1;source.subscribe(createOperatorSubscriber(subscriber,(function(value){var p=prev;prev=value,hasPrev&&subscriber.next([p,value]),hasPrev=!0})))}))).subscribe((function(_a){var _b=ActiveWindowOrMenuLsidCoupled_read(_a,2),before=_b[0],after=_b[1];if(before&&!after){var currentLsidState=lsidStateMachine.getTransitionObservable().getValue();currentLsidState.canUserCancel()&&currentLsidState.cancel()}}))},ActiveWindowOrMenuLsidCoupled.prototype.getCurrentlyDisplayedWindow=function(){return this.rendererObservable.getValue()},ActiveWindowOrMenuLsidCoupled.prototype.getTransitionDriver=function(){var currentWindow=this.getCurrentlyDisplayedWindow();return currentWindow?this.transitionDrivers[currentWindow]:void 0},ActiveWindowOrMenuLsidCoupled.prototype.transitionAllowed=function(){var transitionDriver=this.getTransitionDriver();return!transitionDriver||transitionDriver.transitionAllowed()},ActiveWindowOrMenuLsidCoupled.prototype.activate=function(window){this.transitionAllowed()&&_super.prototype.activate.call(this,window)},ActiveWindowOrMenuLsidCoupled}(ActiveWindowOrMenuImpl),SysFeedNameComposer=function(){function SysFeedNameComposer(projectTypeId){this.projectTypeId=projectTypeId}return SysFeedNameComposer.prototype.getSysFeed=function(){return"sys_".concat(this.projectTypeId)},SysFeedNameComposer}();var FeedNameComposerImpl=function(){function FeedNameComposerImpl(sysFeedNameComposer,eventIdEncoded,lang,projectTypeId,timezone){this.sysFeedNameComposer=sysFeedNameComposer,this.eventId=eventIdEncoded,this.lang=lang,this.projectTypeId=projectTypeId,this.timezone=timezone}return FeedNameComposerImpl.prototype.getGeoIpFeed=function(){return"f_"},FeedNameComposerImpl.prototype.getSysFeed=function(){return this.sysFeedNameComposer.getSysFeed()},FeedNameComposerImpl.prototype.getGameFeed=function(){return"g_".concat(this.projectTypeId,"_").concat(this.eventId)},FeedNameComposerImpl.prototype.getSummaryTab=function(){return"d_su_".concat(this.eventId,"_").concat(this.lang,"_").concat(this.projectTypeId)},FeedNameComposerImpl.prototype.getH2hTab=function(){return"df_hh_".concat(this.projectTypeId,"_").concat(this.eventId)},FeedNameComposerImpl.prototype.getOddsTab=function(){return"d_od_".concat(this.eventId,"_").concat(this.lang,"_").concat(this.projectTypeId,"_eu")},FeedNameComposerImpl.prototype.getOddsFeed=function(eventId){return"df_od_".concat(this.projectTypeId,"_").concat(null!=eventId?eventId:this.eventId)},FeedNameComposerImpl.prototype.getLineupsTab=function(){return"df_li_".concat(this.projectTypeId,"_").concat(this.eventId)},FeedNameComposerImpl.prototype.getPlayerStatsTab=function(){return"df_psn_".concat(this.projectTypeId,"_").concat(this.eventId)},FeedNameComposerImpl.prototype.getPlayerStatsPreviewTab=function(){return"df_psp_".concat(this.projectTypeId,"_").concat(this.eventId)},FeedNameComposerImpl.prototype.getNewsTab=function(){return"df_nf_".concat(this.projectTypeId,"_").concat(this.eventId)},FeedNameComposerImpl.prototype.getFallOfWicketsTab=function(){return"df_fow_".concat(this.projectTypeId,"_").concat(this.eventId)},FeedNameComposerImpl.prototype.getOversTab=function(){return"df_bbb_".concat(this.projectTypeId,"_").concat(this.eventId)},FeedNameComposerImpl.prototype.getMatchHistoryFeed=function(){return"df_mh_".concat(this.projectTypeId,"_").concat(this.eventId)},FeedNameComposerImpl.prototype.getLiveCommentarySummaryTab=function(){return"df_lcp_".concat(this.projectTypeId,"_").concat(this.eventId)},FeedNameComposerImpl.prototype.getCommonFeed=function(){return"dc_".concat(this.projectTypeId,"_").concat(this.eventId)},FeedNameComposerImpl.prototype.getSummaryHorizontalFeed=function(){return"df_sur_".concat(this.projectTypeId,"_").concat(this.eventId)},FeedNameComposerImpl.prototype.getCurrentDartsLegFeed=function(){return"df_mhsn_".concat(this.projectTypeId,"_").concat(this.eventId)},FeedNameComposerImpl.prototype.getCurrentTennisGameFeed=function(){return"df_mhs_".concat(this.projectTypeId,"_").concat(this.eventId)},FeedNameComposerImpl.prototype.getSummaryVerticalFeed=function(){return"df_sui_".concat(this.projectTypeId,"_").concat(this.eventId)},FeedNameComposerImpl.prototype.getPrematchOddsFeed=function(eventParticipantId){return void 0===eventParticipantId&&(eventParticipantId=""),"df_dos_".concat(this.projectTypeId,"_").concat(this.eventId,"_").concat(eventParticipantId)},FeedNameComposerImpl.prototype.getPrematchOddsLiveFeed=function(bookmakerId){return"df_lod2_".concat(bookmakerId,"_").concat(this.eventId)},FeedNameComposerImpl.prototype.getPrematchOddsLivePush=function(bookmakerId){return"lod2_".concat(bookmakerId,"_").concat(this.eventId)},FeedNameComposerImpl.prototype.getVideoHighlightFeed=function(){return"df_hi_".concat(this.projectTypeId,"_").concat(this.eventId)},FeedNameComposerImpl.prototype.getPhotoreportFeed=function(){return"df_hip_".concat(this.projectTypeId,"_").concat(this.eventId)},FeedNameComposerImpl.prototype.getStatisticsFeed=function(){return"df_st_".concat(this.projectTypeId,"_").concat(this.eventId)},FeedNameComposerImpl.prototype.getScratchesFeed=function(){return"df_scr_".concat(this.projectTypeId,"_").concat(this.eventId)},FeedNameComposerImpl.prototype.getParticipantFeed=function(participantId,$page){return void 0===$page&&($page="0"),"pl_".concat(this.timezone.getHour(),"_").concat(participantId,"_").concat($page)},FeedNameComposerImpl.prototype.getParticipantEventDataFeed=function(participantId){return"pe_".concat(this.projectTypeId,"_").concat(this.timezone.getHour(),"_").concat(participantId,"_x")},FeedNameComposerImpl.prototype.getRepairFeed=function(sportId){return void 0===sportId&&(sportId=0),"r_".concat(sportId,"_").concat(this.projectTypeId)},FeedNameComposerImpl.prototype.getMatchOddsPreviewFeed=function(sportId){return"mop_".concat(this.projectTypeId,"_").concat(sportId)},FeedNameComposerImpl.prototype.getMatchCommentPreviewFeed=function(){return"df_mc_".concat(this.projectTypeId,"_").concat(this.eventId)},FeedNameComposerImpl.prototype.getCricketLiveCommentaryFeed=function(){return"df_lcn_".concat(this.projectTypeId,"_").concat(this.eventId)},FeedNameComposerImpl.prototype.getDartsMatchHistoryFeed=function(){return"df_mhn_".concat(this.projectTypeId,"_").concat(this.eventId)},FeedNameComposerImpl.prototype.getSoccerLiveCommentaryOldFeed=function(){return"df_lc_".concat(this.projectTypeId,"_").concat(this.eventId)},FeedNameComposerImpl.prototype.getSoccerLiveCommentaryOldPreviewFeed=function(){return"df_lcpo_".concat(this.projectTypeId,"_").concat(this.eventId)},FeedNameComposerImpl.prototype.getMyFsNewsFeed=function(participantId,count){return"mynf_".concat(participantId,"_").concat(count)},FeedNameComposerImpl.prototype.getPushServiceFeed=function(){return"service"},FeedNameComposerImpl.prototype.getBaseballPitchersFeed=function(){return"df_pi_".concat(this.projectTypeId,"_").concat(this.eventId)},FeedNameComposerImpl.prototype.getDartsStatisticsFeed=function(){return"df_stn_".concat(this.projectTypeId,"_").concat(this.eventId)},FeedNameComposerImpl.prototype.getDartsStatisticsOnSummaryFeed=function(){return"df_stp_".concat(this.projectTypeId,"_").concat(this.eventId)},FeedNameComposerImpl.prototype.getParticipantEventListFeed=function(participantId){return"pel_".concat(this.timezone.getHour(),"_").concat(participantId)},FeedNameComposerImpl.prototype.getMatchReportFeed=function(){return"df_mr_".concat(this.projectTypeId,"_").concat(this.eventId)},FeedNameComposerImpl.prototype.getDuelGolfSummaryFeed=function(){return"df_sur_".concat(this.projectTypeId,"_").concat(this.eventId)},FeedNameComposerImpl.prototype.getRankingLiveFeed=function(rankingId,page){return"ral_".concat(rankingId,"_").concat(page)},FeedNameComposerImpl.prototype.getRankingFeed=function(rankingId,page){return"ran_".concat(rankingId,"_").concat(page)},FeedNameComposerImpl.prototype.getTeamTransfersFeed=function(participantId,type,pageNumber){return"tetr_".concat(participantId,"_").concat(type,"_").concat(pageNumber)},FeedNameComposerImpl.prototype.getParticipantNews=function(participantId){return"pnf_".concat(participantId)},FeedNameComposerImpl.prototype.getEventChannelsFeed=function(){return"tv_deu_".concat(this.eventId)},FeedNameComposerImpl.prototype.getNewsListFeed=function(sportPageId,homePageId,sportId){return void 0===sportId&&(sportId=0),"nl_".concat(sportId,"_").concat(sportId?sportPageId:homePageId)},FeedNameComposerImpl}(),FeedFetcherAbstract_assign=function(){return FeedFetcherAbstract_assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t},FeedFetcherAbstract_assign.apply(this,arguments)},FeedFetcherResponse=function(){function FeedFetcherResponse(body,status){this.body=body,this.status=status}return FeedFetcherResponse.prototype.getBody=function(){return this.body},FeedFetcherResponse.prototype.getStatus=function(){return this.status},FeedFetcherResponse.prototype.getProperties=function(){},FeedFetcherResponse}(),FeedFetcherAbstract=function(){function FeedFetcherAbstract(projectId,feedSignature,fetchFunction,urlPrefix,feedResolver,utilDate,pathPrefix,locationOrigin){void 0===pathPrefix&&(pathPrefix="/x/feed/");var _this=this;this.projectId=projectId,this.feedSignature=feedSignature,this.fetchFunction=fetchFunction,this.urlPrefix=urlPrefix,this.feedResolver=feedResolver,this.utilDate=utilDate,this.pathPrefix=pathPrefix,this.locationOrigin=locationOrigin,this.resolveLocationOrigin=function(){if(_this.locationOrigin)return _this.locationOrigin;var lastGeoIp=ClientStorage.get("last_geoip");return function(_a,projectId,urlPrefix,geoIp){var countries=_a.countries,enabled=_a.enabled,_b=_a.urls,local=_b.local,global=_b.global;return enabled?geoIp&&countries.includes(geoIp)?"".concat(local,"/").concat(projectId):"".concat(global,"/").concat(projectId):location.origin.replace("//www.","//d.").replace("//m.","//d.")+urlPrefix}(_this.feedResolver,_this.projectId,_this.urlPrefix,lastGeoIp)},this.setServerTime=function(response){var _a,serverTime=new Date(response.headers.get("date")||"").getTime();isNaN(serverTime)||null===(_a=_this.utilDate)||void 0===_a||_a.setServerTimestamp(Math.floor(serverTime/1e3))}}return FeedFetcherAbstract.prototype.getUrl=function(feed){return this.resolveLocationOrigin()+this.pathPrefix+feed},FeedFetcherAbstract.prototype.fetch=function(feed,options){var _this=this,signatureHeader={"x-fsign":this.feedSignature};return this.fetchFunction(this.getUrl(feed),FeedFetcherAbstract_assign(FeedFetcherAbstract_assign({},options),{headers:FeedFetcherAbstract_assign(FeedFetcherAbstract_assign({},options&&options.headers||{}),signatureHeader)})).then((function(response){return _this.storeGeoIpFromResponse(response),_this.resolveFetchedData(response)}))},FeedFetcherAbstract.prototype.storeGeoIpFromResponse=function(response){var geoIpCountryCode=response.headers.get("x-geoip2-country-code");geoIpCountryCode&&ClientStorage.store("last_geoip",geoIpCountryCode)},FeedFetcherAbstract}(),FeedFetcherWithStatus_extends=function(){var _extendStatics=function(d,b){return _extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)Object.prototype.hasOwnProperty.call(b,p)&&(d[p]=b[p])},_extendStatics(d,b)};return function(d,b){if("function"!=typeof b&&null!==b)throw new TypeError("Class extends value "+String(b)+" is not a constructor or null");function __(){this.constructor=d}_extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}(),FeedFetcherWithStatus_awaiter=function(thisArg,_arguments,P,generator){return new(P||(P=Promise))((function(resolve,reject){function fulfilled(value){try{step(generator.next(value))}catch(e){reject(e)}}function rejected(value){try{step(generator.throw(value))}catch(e){reject(e)}}function step(result){var value;result.done?resolve(result.value):(value=result.value,value instanceof P?value:new P((function(resolve){resolve(value)}))).then(fulfilled,rejected)}step((generator=generator.apply(thisArg,_arguments||[])).next())}))},FeedFetcherWithStatus_generator=function(thisArg,body){var f,y,t,g,_={label:0,sent:function(){if(1&t[0])throw t[1];return t[1]},trys:[],ops:[]};return g={next:verb(0),throw:verb(1),return:verb(2)},"function"==typeof Symbol&&(g[Symbol.iterator]=function(){return this}),g;function verb(n){return function(v){return function(op){if(f)throw new TypeError("Generator is already executing.");for(;g&&(g=0,op[0]&&(_=0)),_;)try{if(f=1,y&&(t=2&op[0]?y.return:op[0]?y.throw||((t=y.return)&&t.call(y),0):y.next)&&!(t=t.call(y,op[1])).done)return t;switch(y=0,t&&(op=[2&op[0],t.value]),op[0]){case 0:case 1:t=op;break;case 4:return _.label++,{value:op[1],done:!1};case 5:_.label++,y=op[1],op=[0];continue;case 7:op=_.ops.pop(),_.trys.pop();continue;default:if(!(t=_.trys,(t=t.length>0&&t[t.length-1])||6!==op[0]&&2!==op[0])){_=0;continue}if(3===op[0]&&(!t||op[1]>t[0]&&op[1]<t[3])){_.label=op[1];break}if(6===op[0]&&_.label<t[1]){_.label=t[1],t=op;break}if(t&&_.label<t[2]){_.label=t[2],_.ops.push(op);break}t[2]&&_.ops.pop(),_.trys.pop();continue}op=body.call(thisArg,_)}catch(e){op=[6,e],y=0}finally{f=t=0}if(5&op[0])throw op[1];return{value:op[0]?op[1]:void 0,done:!0}}([n,v])}}};var FeedFetcherWithStatus=function(_super){function FeedFetcherWithStatus(projectId,feedSignature,fetchFunction,urlPrefix,feedResolver,utilDate,pathPrefix,locationOrigin){var _this=_super.call(this,projectId,feedSignature,fetchFunction,urlPrefix,feedResolver,utilDate,pathPrefix,locationOrigin)||this;return _this.resolveFetchedData=function(response){return FeedFetcherWithStatus_awaiter(_this,void 0,Promise,(function(){var _a;return FeedFetcherWithStatus_generator(this,(function(_b){switch(_b.label){case 0:return this.setServerTime(response),_a=FeedFetcherResponse.bind,[4,response.text()];case 1:return[2,new(_a.apply(FeedFetcherResponse,[void 0,_b.sent(),response.status]))]}}))}))},_this}return FeedFetcherWithStatus_extends(FeedFetcherWithStatus,_super),FeedFetcherWithStatus}(FeedFetcherAbstract),GeoIpStorageImpl=function(){function GeoIpStorageImpl(){this.globalGeoIp=null,this.geoIpCityName=null,this.geoIpSubdivisionName0=null,this.geoIpSubdivisionCode0=null,this.geoIpIsoSubdivisionCode0=null,this.geoIpSubdivisionName1=null}return GeoIpStorageImpl.prototype.getGlobalGeoIp=function(){return this.globalGeoIp},GeoIpStorageImpl.prototype.getGeoIpCityName=function(){return this.geoIpCityName},GeoIpStorageImpl.prototype.getGeoIpSubdivisionName0=function(){return this.geoIpSubdivisionName0},GeoIpStorageImpl.prototype.getGeoIpSubdivisionCode0=function(){return this.geoIpSubdivisionCode0},GeoIpStorageImpl.prototype.getGeoIpIsoSubdivisionCode0=function(){return this.geoIpIsoSubdivisionCode0},GeoIpStorageImpl.prototype.getGeoIpSubdivisionName1=function(){return this.geoIpSubdivisionName1},GeoIpStorageImpl.prototype.getGeoIpWithSubdivision=function(){var _a,_b;return this.getGlobalGeoIp()&&this.getGeoIpIsoSubdivisionCode0()?"".concat(null!==(_a=this.getGlobalGeoIp())&&void 0!==_a?_a:"",":").concat(null!==(_b=this.getGeoIpIsoSubdivisionCode0())&&void 0!==_b?_b:""):"default"},GeoIpStorageImpl.prototype.getAsGlobalHeaders=function(){var _a,_b,_c,_d,_e,_f;return{"X-Geoip2-Country-Code":null!==(_a=this.getGlobalGeoIp())&&void 0!==_a?_a:void 0,"X-Geoip2-City-Name":null!==(_b=this.getGeoIpCityName())&&void 0!==_b?_b:void 0,"X-Geoip2-Subdivision-Name-0":null!==(_c=this.getGeoIpSubdivisionName0())&&void 0!==_c?_c:void 0,"X-Geoip2-Subdivision-Code-0":null!==(_d=this.getGeoIpSubdivisionCode0())&&void 0!==_d?_d:void 0,"X-Geoip2-ISO-Subdivision-Code-0":null!==(_e=this.getGeoIpIsoSubdivisionCode0())&&void 0!==_e?_e:void 0,"X-Geoip2-Subdivision-Name-1":null!==(_f=this.getGeoIpSubdivisionName1())&&void 0!==_f?_f:void 0}},GeoIpStorageImpl.prototype.setGlobalGeoIp=function(value){value&&(this.globalGeoIp=value)},GeoIpStorageImpl.prototype.setGeoIpCityName=function(value){value&&(this.geoIpCityName=value)},GeoIpStorageImpl.prototype.setGeoIpSubdivisionName0=function(value){value&&(this.geoIpSubdivisionName0=value)},GeoIpStorageImpl.prototype.setGeoIpSubdivisionCode0=function(value){value&&(this.geoIpSubdivisionCode0=value)},GeoIpStorageImpl.prototype.setGeoIpIsoSubdivisionCode0=function(value){value&&(this.geoIpIsoSubdivisionCode0=value.replace("-",""))},GeoIpStorageImpl.prototype.setGeoIpSubdivisionName1=function(value){value&&(this.geoIpSubdivisionName1=value)},GeoIpStorageImpl}();__webpack_require__(7294);function documentVisible(){return"visible"===document.visibilityState}function deviceOnline(){return navigator.onLine}function retry(promiseFactory,retryCount,interval){return void 0===retryCount&&(retryCount=1/0),void 0===interval&&(interval=3e3),new Promise((function(resolve,reject){promiseFactory().then(resolve).catch((function(error){setTimeout((function(){retryCount<=1?reject(error):retry(promiseFactory,retryCount-1,interval).then(resolve,reject)}),interval)}))}))}function controllableRetry(promiseFactory,cancelObservable,paused,retryCount,interval){void 0===retryCount&&(retryCount=1/0),void 0===interval&&(interval=3e3);var canceledWhileWaiting=!1,canceledWhileWaitingSubscription=cancelObservable.subscribe((function(){return canceledWhileWaiting=!0}));return new Promise((function(resolve,reject){promiseFactory().then(resolve).catch((function(error){var cleanupRoutine=function(){clearInterval(intervalId),canceledWhileWaitingSubscription.unsubscribe(),cancelSubscription.unsubscribe()},rejectRoutine=function(){cleanupRoutine(),reject(error)},cancelSubscription=cancelObservable.subscribe(rejectRoutine),intervalId=setInterval((function(){retryCount<=1||canceledWhileWaiting?rejectRoutine():paused.getValue()||(cleanupRoutine(),controllableRetry(promiseFactory,cancelObservable,paused,retryCount-1,interval).then(resolve,reject))}),interval)}))}))}var fetchRetryWrapper=function(fetch,retryCount,interval){return function(input,init){return function(promiseFactory,retryCount,interval){var getPaused=function(){return!(deviceOnline()&&documentVisible())},pausedObservable=new BehaviorSubject_BehaviorSubject(getPaused()),pauseShouldChange=function(){return pausedObservable.next(getPaused())};document.addEventListener("visibilitychange",pauseShouldChange),window.addEventListener("online",pauseShouldChange),window.addEventListener("offline",pauseShouldChange);var cleanup=function(){document.removeEventListener("visibilitychange",pauseShouldChange),window.removeEventListener("online",pauseShouldChange),window.removeEventListener("offline",pauseShouldChange)};return controllableRetry(promiseFactory,new Observable_Observable,pausedObservable,retryCount,interval).then((function(data){return cleanup(),data})).catch((function(error){throw cleanup(),error}))}((function(){return fetch(input,init)}),retryCount,interval)}},FeedFetcherWithPropertiesResolving_extends=function(){var _extendStatics=function(d,b){return _extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)Object.prototype.hasOwnProperty.call(b,p)&&(d[p]=b[p])},_extendStatics(d,b)};return function(d,b){if("function"!=typeof b&&null!==b)throw new TypeError("Class extends value "+String(b)+" is not a constructor or null");function __(){this.constructor=d}_extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}(),FeedFetcherWithPropertiesResolving_awaiter=function(thisArg,_arguments,P,generator){return new(P||(P=Promise))((function(resolve,reject){function fulfilled(value){try{step(generator.next(value))}catch(e){reject(e)}}function rejected(value){try{step(generator.throw(value))}catch(e){reject(e)}}function step(result){var value;result.done?resolve(result.value):(value=result.value,value instanceof P?value:new P((function(resolve){resolve(value)}))).then(fulfilled,rejected)}step((generator=generator.apply(thisArg,_arguments||[])).next())}))},FeedFetcherWithPropertiesResolving_generator=function(thisArg,body){var f,y,t,g,_={label:0,sent:function(){if(1&t[0])throw t[1];return t[1]},trys:[],ops:[]};return g={next:verb(0),throw:verb(1),return:verb(2)},"function"==typeof Symbol&&(g[Symbol.iterator]=function(){return this}),g;function verb(n){return function(v){return function(op){if(f)throw new TypeError("Generator is already executing.");for(;g&&(g=0,op[0]&&(_=0)),_;)try{if(f=1,y&&(t=2&op[0]?y.return:op[0]?y.throw||((t=y.return)&&t.call(y),0):y.next)&&!(t=t.call(y,op[1])).done)return t;switch(y=0,t&&(op=[2&op[0],t.value]),op[0]){case 0:case 1:t=op;break;case 4:return _.label++,{value:op[1],done:!1};case 5:_.label++,y=op[1],op=[0];continue;case 7:op=_.ops.pop(),_.trys.pop();continue;default:if(!(t=_.trys,(t=t.length>0&&t[t.length-1])||6!==op[0]&&2!==op[0])){_=0;continue}if(3===op[0]&&(!t||op[1]>t[0]&&op[1]<t[3])){_.label=op[1];break}if(6===op[0]&&_.label<t[1]){_.label=t[1],t=op;break}if(t&&_.label<t[2]){_.label=t[2],_.ops.push(op);break}t[2]&&_.ops.pop(),_.trys.pop();continue}op=body.call(thisArg,_)}catch(e){op=[6,e],y=0}finally{f=t=0}if(5&op[0])throw op[1];return{value:op[0]?op[1]:void 0,done:!0}}([n,v])}}};var FeedFetcherWithPropertiesResolvingResponse=function(_super){function FeedFetcherWithPropertiesResolvingResponse(body,status,properties){var _this=_super.call(this,body,status)||this;return _this.properties=properties,_this}return FeedFetcherWithPropertiesResolving_extends(FeedFetcherWithPropertiesResolvingResponse,_super),FeedFetcherWithPropertiesResolvingResponse.prototype.getProperties=function(){return this.properties},FeedFetcherWithPropertiesResolvingResponse}(FeedFetcherResponse),FeedFetcherWithPropertiesResolving=function(_super){function FeedFetcherWithPropertiesResolving(projectId,feedSignature,fetchFunction,urlPrefix,geoIpStorage,feedResolver,utilDate){var _this=_super.call(this,projectId,feedSignature,fetchFunction,urlPrefix,feedResolver,utilDate)||this;return _this.geoIpStorage=geoIpStorage,_this}return FeedFetcherWithPropertiesResolving_extends(FeedFetcherWithPropertiesResolving,_super),FeedFetcherWithPropertiesResolving.prototype.resolveFetchedData=function(response){return FeedFetcherWithPropertiesResolving_awaiter(this,void 0,Promise,(function(){var _a;return FeedFetcherWithPropertiesResolving_generator(this,(function(_b){switch(_b.label){case 0:return this.setServerTime(response),this.geoIpStorage.setGlobalGeoIp(response.headers.get("x-geoip2-country-code")),this.geoIpStorage.setGeoIpCityName(response.headers.get("x-geoip2-city-name")),this.geoIpStorage.setGeoIpSubdivisionName0(response.headers.get("x-geoip2-subdivision-name-0")),this.geoIpStorage.setGeoIpSubdivisionCode0(response.headers.get("x-geoip2-subdivision-code-0")),this.geoIpStorage.setGeoIpIsoSubdivisionCode0(response.headers.get("x-geoip2-iso-subdivision-code-0")),this.geoIpStorage.setGeoIpSubdivisionName1(response.headers.get("x-geoip2-subdivision-name-1")),_a=FeedFetcherWithPropertiesResolvingResponse.bind,[4,response.text()];case 1:return[2,new(_a.apply(FeedFetcherWithPropertiesResolvingResponse,[void 0,_b.sent(),response.status,{geoIp:this.geoIpStorage,headers:response.headers}]))]}}))}))},FeedFetcherWithPropertiesResolving}(FeedFetcherAbstract),GeoIpResolver_awaiter=function(thisArg,_arguments,P,generator){return new(P||(P=Promise))((function(resolve,reject){function fulfilled(value){try{step(generator.next(value))}catch(e){reject(e)}}function rejected(value){try{step(generator.throw(value))}catch(e){reject(e)}}function step(result){var value;result.done?resolve(result.value):(value=result.value,value instanceof P?value:new P((function(resolve){resolve(value)}))).then(fulfilled,rejected)}step((generator=generator.apply(thisArg,_arguments||[])).next())}))},GeoIpResolver_generator=function(thisArg,body){var f,y,t,g,_={label:0,sent:function(){if(1&t[0])throw t[1];return t[1]},trys:[],ops:[]};return g={next:verb(0),throw:verb(1),return:verb(2)},"function"==typeof Symbol&&(g[Symbol.iterator]=function(){return this}),g;function verb(n){return function(v){return function(op){if(f)throw new TypeError("Generator is already executing.");for(;g&&(g=0,op[0]&&(_=0)),_;)try{if(f=1,y&&(t=2&op[0]?y.return:op[0]?y.throw||((t=y.return)&&t.call(y),0):y.next)&&!(t=t.call(y,op[1])).done)return t;switch(y=0,t&&(op=[2&op[0],t.value]),op[0]){case 0:case 1:t=op;break;case 4:return _.label++,{value:op[1],done:!1};case 5:_.label++,y=op[1],op=[0];continue;case 7:op=_.ops.pop(),_.trys.pop();continue;default:if(!(t=_.trys,(t=t.length>0&&t[t.length-1])||6!==op[0]&&2!==op[0])){_=0;continue}if(3===op[0]&&(!t||op[1]>t[0]&&op[1]<t[3])){_.label=op[1];break}if(6===op[0]&&_.label<t[1]){_.label=t[1],t=op;break}if(t&&_.label<t[2]){_.label=t[2],_.ops.push(op);break}t[2]&&_.ops.pop(),_.trys.pop();continue}op=body.call(thisArg,_)}catch(e){op=[6,e],y=0}finally{f=t=0}if(5&op[0])throw op[1];return{value:op[0]?op[1]:void 0,done:!0}}([n,v])}}};var GeoIpResolverImpl=function(){function GeoIpResolverImpl(geoIpStorage,fetcher,geoIpFeed){this.geoIpStorage=geoIpStorage,this.fetcher=fetcher,this.geoIpFeed=geoIpFeed,this.thePromise=null}return GeoIpResolverImpl.prototype.getGeoIp=function(){return GeoIpResolver_awaiter(this,void 0,Promise,(function(){var _this=this;return GeoIpResolver_generator(this,(function(_a){switch(_a.label){case 0:return this.isGeoIpLoaded()?[3,2]:[4,this.loadGeoIp()];case 1:_a.sent(),_a.label=2;case 2:return[2,new Promise((function(resolve){resolve(_this.geoIpStorage)}))]}}))}))},GeoIpResolverImpl.prototype.isGeoIpLoaded=function(){return!!this.geoIpStorage.getGlobalGeoIp()},GeoIpResolverImpl.prototype.loadGeoIp=function(){return this.thePromise||(this.thePromise=this.fetcher.fetch(this.geoIpFeed,{headers:{"x-geoip":"1"}})),this.thePromise},GeoIpResolverImpl}(),isArrayLike=function(x){return x&&"number"==typeof x.length&&"function"!=typeof x};function isPromise(value){return isFunction_isFunction(null==value?void 0:value.then)}function isInteropObservable(input){return isFunction_isFunction(input[observable])}function isAsyncIterable(obj){return Symbol.asyncIterator&&isFunction_isFunction(null==obj?void 0:obj[Symbol.asyncIterator])}function createInvalidObservableTypeError(input){return new TypeError("You provided "+(null!==input&&"object"==typeof input?"an invalid object":"'"+input+"'")+" where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.")}var iterator_iterator="function"==typeof Symbol&&Symbol.iterator?Symbol.iterator:"@@iterator";function isIterable(input){return isFunction_isFunction(null==input?void 0:input[iterator_iterator])}function readableStreamLikeToAsyncGenerator(readableStream){return __asyncGenerator(this,arguments,(function(){var reader,_a,value;return tslib_es6_generator(this,(function(_b){switch(_b.label){case 0:reader=readableStream.getReader(),_b.label=1;case 1:_b.trys.push([1,,9,10]),_b.label=2;case 2:return[4,__await(reader.read())];case 3:return _a=_b.sent(),value=_a.value,_a.done?[4,__await(void 0)]:[3,5];case 4:return[2,_b.sent()];case 5:return[4,__await(value)];case 6:return[4,_b.sent()];case 7:return _b.sent(),[3,2];case 8:return[3,10];case 9:return reader.releaseLock(),[7];case 10:return[2]}}))}))}function isReadableStreamLike(obj){return isFunction_isFunction(null==obj?void 0:obj.getReader)}function innerFrom(input){if(input instanceof Observable_Observable)return input;if(null!=input){if(isInteropObservable(input))return obj=input,new Observable_Observable((function(subscriber){var obs=obj[observable]();if(isFunction_isFunction(obs.subscribe))return obs.subscribe(subscriber);throw new TypeError("Provided object does not correctly implement Symbol.observable")}));if(isArrayLike(input))return array=input,new Observable_Observable((function(subscriber){for(var i=0;i<array.length&&!subscriber.closed;i++)subscriber.next(array[i]);subscriber.complete()}));if(isPromise(input))return promise=input,new Observable_Observable((function(subscriber){promise.then((function(value){subscriber.closed||(subscriber.next(value),subscriber.complete())}),(function(err){return subscriber.error(err)})).then(null,reportUnhandledError)}));if(isAsyncIterable(input))return fromAsyncIterable(input);if(isIterable(input))return iterable=input,new Observable_Observable((function(subscriber){var e_1,_a;try{for(var iterable_1=__values(iterable),iterable_1_1=iterable_1.next();!iterable_1_1.done;iterable_1_1=iterable_1.next()){var value=iterable_1_1.value;if(subscriber.next(value),subscriber.closed)return}}catch(e_1_1){e_1={error:e_1_1}}finally{try{iterable_1_1&&!iterable_1_1.done&&(_a=iterable_1.return)&&_a.call(iterable_1)}finally{if(e_1)throw e_1.error}}subscriber.complete()}));if(isReadableStreamLike(input))return fromAsyncIterable(readableStreamLikeToAsyncGenerator(input))}var iterable,promise,array,obj;throw createInvalidObservableTypeError(input)}function fromAsyncIterable(asyncIterable){return new Observable_Observable((function(subscriber){(function(asyncIterable,subscriber){var asyncIterable_1,asyncIterable_1_1,e_2,_a;return tslib_es6_awaiter(this,void 0,void 0,(function(){var value,e_2_1;return tslib_es6_generator(this,(function(_b){switch(_b.label){case 0:_b.trys.push([0,5,6,11]),asyncIterable_1=__asyncValues(asyncIterable),_b.label=1;case 1:return[4,asyncIterable_1.next()];case 2:if((asyncIterable_1_1=_b.sent()).done)return[3,4];if(value=asyncIterable_1_1.value,subscriber.next(value),subscriber.closed)return[2];_b.label=3;case 3:return[3,1];case 4:return[3,11];case 5:return e_2_1=_b.sent(),e_2={error:e_2_1},[3,11];case 6:return _b.trys.push([6,,9,10]),asyncIterable_1_1&&!asyncIterable_1_1.done&&(_a=asyncIterable_1.return)?[4,_a.call(asyncIterable_1)]:[3,8];case 7:_b.sent(),_b.label=8;case 8:return[3,10];case 9:if(e_2)throw e_2.error;return[7];case 10:return[7];case 11:return subscriber.complete(),[2]}}))}))})(asyncIterable,subscriber).catch((function(err){return subscriber.error(err)}))}))}function executeSchedule(parentSubscription,scheduler,work,delay,repeat){void 0===delay&&(delay=0),void 0===repeat&&(repeat=!1);var scheduleSubscription=scheduler.schedule((function(){work(),repeat?parentSubscription.add(this.schedule(null,delay)):this.unsubscribe()}),delay);if(parentSubscription.add(scheduleSubscription),!repeat)return scheduleSubscription}function mergeMap(project,resultSelector,concurrent){return void 0===concurrent&&(concurrent=1/0),isFunction_isFunction(resultSelector)?mergeMap((function(a,i){return map((function(b,ii){return resultSelector(a,b,i,ii)}))(innerFrom(project(a,i)))}),concurrent):("number"==typeof resultSelector&&(concurrent=resultSelector),operate((function(source,subscriber){return function(source,subscriber,project,concurrent,onBeforeNext,expand,innerSubScheduler,additionalFinalizer){var buffer=[],active=0,index=0,isComplete=!1,checkComplete=function(){!isComplete||buffer.length||active||subscriber.complete()},outerNext=function(value){return active<concurrent?doInnerSub(value):buffer.push(value)},doInnerSub=function(value){expand&&subscriber.next(value),active++;var innerComplete=!1;innerFrom(project(value,index++)).subscribe(createOperatorSubscriber(subscriber,(function(innerValue){null==onBeforeNext||onBeforeNext(innerValue),expand?outerNext(innerValue):subscriber.next(innerValue)}),(function(){innerComplete=!0}),void 0,(function(){if(innerComplete)try{active--;for(var _loop_1=function(){var bufferedValue=buffer.shift();innerSubScheduler?executeSchedule(subscriber,innerSubScheduler,(function(){return doInnerSub(bufferedValue)})):doInnerSub(bufferedValue)};buffer.length&&active<concurrent;)_loop_1();checkComplete()}catch(err){subscriber.error(err)}})))};return source.subscribe(createOperatorSubscriber(subscriber,outerNext,(function(){isComplete=!0,checkComplete()}))),function(){null==additionalFinalizer||additionalFinalizer()}}(source,subscriber,project,concurrent)})))}function mergeAll(concurrent){return void 0===concurrent&&(concurrent=1/0),mergeMap(identity,concurrent)}var EMPTY=new Observable_Observable((function(subscriber){return subscriber.complete()}));function last(arr){return arr[arr.length-1]}function popScheduler(args){return(value=last(args))&&isFunction_isFunction(value.schedule)?args.pop():void 0;var value}function observeOn(scheduler,delay){return void 0===delay&&(delay=0),operate((function(source,subscriber){source.subscribe(createOperatorSubscriber(subscriber,(function(value){return executeSchedule(subscriber,scheduler,(function(){return subscriber.next(value)}),delay)}),(function(){return executeSchedule(subscriber,scheduler,(function(){return subscriber.complete()}),delay)}),(function(err){return executeSchedule(subscriber,scheduler,(function(){return subscriber.error(err)}),delay)})))}))}function subscribeOn(scheduler,delay){return void 0===delay&&(delay=0),operate((function(source,subscriber){subscriber.add(scheduler.schedule((function(){return source.subscribe(subscriber)}),delay))}))}function scheduleAsyncIterable(input,scheduler){if(!input)throw new Error("Iterable cannot be null");return new Observable_Observable((function(subscriber){executeSchedule(subscriber,scheduler,(function(){var iterator=input[Symbol.asyncIterator]();executeSchedule(subscriber,scheduler,(function(){iterator.next().then((function(result){result.done?subscriber.complete():subscriber.next(result.value)}))}),0,!0)}))}))}function scheduled(input,scheduler){if(null!=input){if(isInteropObservable(input))return function(input,scheduler){return innerFrom(input).pipe(subscribeOn(scheduler),observeOn(scheduler))}(input,scheduler);if(isArrayLike(input))return function(input,scheduler){return new Observable_Observable((function(subscriber){var i=0;return scheduler.schedule((function(){i===input.length?subscriber.complete():(subscriber.next(input[i++]),subscriber.closed||this.schedule())}))}))}(input,scheduler);if(isPromise(input))return function(input,scheduler){return innerFrom(input).pipe(subscribeOn(scheduler),observeOn(scheduler))}(input,scheduler);if(isAsyncIterable(input))return scheduleAsyncIterable(input,scheduler);if(isIterable(input))return function(input,scheduler){return new Observable_Observable((function(subscriber){var iterator;return executeSchedule(subscriber,scheduler,(function(){iterator=input[iterator_iterator](),executeSchedule(subscriber,scheduler,(function(){var _a,value,done;try{value=(_a=iterator.next()).value,done=_a.done}catch(err){return void subscriber.error(err)}done?subscriber.complete():subscriber.next(value)}),0,!0)})),function(){return isFunction_isFunction(null==iterator?void 0:iterator.return)&&iterator.return()}}))}(input,scheduler);if(isReadableStreamLike(input))return function(input,scheduler){return scheduleAsyncIterable(readableStreamLikeToAsyncGenerator(input),scheduler)}(input,scheduler)}throw createInvalidObservableTypeError(input)}function from(input,scheduler){return scheduler?scheduled(input,scheduler):innerFrom(input)}function merge(){for(var args=[],_i=0;_i<arguments.length;_i++)args[_i]=arguments[_i];var scheduler=popScheduler(args),concurrent=function(args,defaultValue){return"number"==typeof last(args)?args.pop():defaultValue}(args,1/0),sources=args;return sources.length?1===sources.length?innerFrom(sources[0]):mergeAll(concurrent)(from(sources,scheduler)):EMPTY}function filter(predicate,thisArg){return operate((function(source,subscriber){var index=0;source.subscribe(createOperatorSubscriber(subscriber,(function(value){return predicate.call(thisArg,value,index++)&&subscriber.next(value)})))}))}function concat(){for(var args=[],_i=0;_i<arguments.length;_i++)args[_i]=arguments[_i];return mergeAll(1)(from(args,popScheduler(args)))}var ObjectManipulation_assign=function(){return ObjectManipulation_assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t},ObjectManipulation_assign.apply(this,arguments)},ObjectManipulation_rest=function(s,e){var t={};for(var p in s)Object.prototype.hasOwnProperty.call(s,p)&&e.indexOf(p)<0&&(t[p]=s[p]);if(null!=s&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(p=Object.getOwnPropertySymbols(s);i<p.length;i++)e.indexOf(p[i])<0&&Object.prototype.propertyIsEnumerable.call(s,p[i])&&(t[p[i]]=s[p[i]])}return t},ObjectManipulation_read=function(o,n){var m="function"==typeof Symbol&&o[Symbol.iterator];if(!m)return o;var r,e,i=m.call(o),ar=[];try{for(;(void 0===n||n-- >0)&&!(r=i.next()).done;)ar.push(r.value)}catch(error){e={error}}finally{try{r&&!r.done&&(m=i.return)&&m.call(i)}finally{if(e)throw e.error}}return ar};function getNestedKey(theObject,_a){var _b,_c=ObjectManipulation_read(_a),firstKey=_c[0],restOfKeys=_c.slice(1);if(!firstKey)return theObject;var nestedObject=null!==(_b=theObject[firstKey])&&void 0!==_b?_b:{};return restOfKeys.length?getNestedKey(nestedObject,restOfKeys):nestedObject}function hasNestedKey(theObject,_a){var _b=ObjectManipulation_read(_a),firstKey=_b[0],restOfKeys=_b.slice(1);if(!firstKey)throw new Error("Unexpected keys to read from");return 0===restOfKeys.length?void 0!==theObject[firstKey]:!!theObject[firstKey]&&hasNestedKey(theObject[firstKey],restOfKeys)}function insertIntoNestedKey(theObject,_a,dataToInsert){var _b,_c,_d=ObjectManipulation_read(_a),firstKey=_d[0],restOfKeys=_d.slice(1);if(!firstKey)throw new Error("Unexpected keys to insert into");return ObjectManipulation_assign(ObjectManipulation_assign({},theObject),((_b={})[firstKey]=restOfKeys.length?insertIntoNestedKey(null!==(_c=theObject[firstKey])&&void 0!==_c?_c:{},restOfKeys,dataToInsert):dataToInsert,_b))}function removeNestedKey(theObject,keys){var keysButTheLastOne=keys.slice(0,-1),keyToRemove=ObjectManipulation_read(keys.slice(-1),1)[0];if(!hasNestedKey(theObject,keys))return ObjectManipulation_assign({},theObject);var _b=getNestedKey(theObject,keysButTheLastOne),_c=keyToRemove,restOfTheObject=(_b[_c],ObjectManipulation_rest(_b,["symbol"==typeof _c?_c:_c+""]));return keysButTheLastOne.length?insertIntoNestedKey(theObject,keysButTheLastOne,restOfTheObject):restOfTheObject}var LoginClientStorageKeys=Object.freeze({KEY_INNER_DATA:"lsid_innerData",KEY_ID:"lsid_id",KEY_HASH:"lsid_hash",KEY_NAME:"lsid_name",KEY_EMAIL:"lsid_email",KEY_EMAIL_IS_VERIFIED:"lsid_emailIsVerified",KEY_PP_CONFIRMED:"lsid_ppConfirmed",KEY_TOU_CONFIRMED:"lsid_touConfirmed",KEY_PRIVATE_DATA:"lsid_privateData"}),ObservableLocalStorageClient_awaiter=function(thisArg,_arguments,P,generator){return new(P||(P=Promise))((function(resolve,reject){function fulfilled(value){try{step(generator.next(value))}catch(e){reject(e)}}function rejected(value){try{step(generator.throw(value))}catch(e){reject(e)}}function step(result){var value;result.done?resolve(result.value):(value=result.value,value instanceof P?value:new P((function(resolve){resolve(value)}))).then(fulfilled,rejected)}step((generator=generator.apply(thisArg,_arguments||[])).next())}))},ObservableLocalStorageClient_generator=function(thisArg,body){var f,y,t,g,_={label:0,sent:function(){if(1&t[0])throw t[1];return t[1]},trys:[],ops:[]};return g={next:verb(0),throw:verb(1),return:verb(2)},"function"==typeof Symbol&&(g[Symbol.iterator]=function(){return this}),g;function verb(n){return function(v){return function(op){if(f)throw new TypeError("Generator is already executing.");for(;g&&(g=0,op[0]&&(_=0)),_;)try{if(f=1,y&&(t=2&op[0]?y.return:op[0]?y.throw||((t=y.return)&&t.call(y),0):y.next)&&!(t=t.call(y,op[1])).done)return t;switch(y=0,t&&(op=[2&op[0],t.value]),op[0]){case 0:case 1:t=op;break;case 4:return _.label++,{value:op[1],done:!1};case 5:_.label++,y=op[1],op=[0];continue;case 7:op=_.ops.pop(),_.trys.pop();continue;default:if(!(t=_.trys,(t=t.length>0&&t[t.length-1])||6!==op[0]&&2!==op[0])){_=0;continue}if(3===op[0]&&(!t||op[1]>t[0]&&op[1]<t[3])){_.label=op[1];break}if(6===op[0]&&_.label<t[1]){_.label=t[1],t=op;break}if(t&&_.label<t[2]){_.label=t[2],_.ops.push(op);break}t[2]&&_.ops.pop(),_.trys.pop();continue}op=body.call(thisArg,_)}catch(e){op=[6,e],y=0}finally{f=t=0}if(5&op[0])throw op[1];return{value:op[0]?op[1]:void 0,done:!0}}([n,v])}}},ObservableLocalStorageClient=function(){function ObservableLocalStorageClient(storage){var _this=this;this.storage=storage,this.subject=new Subject_Subject,this.updateForcingSubject=new Subject_Subject,this.changeHappendInContextOfAnotherDocument=!1,window.addEventListener("storage",(function(event){event.key&&_this.anotherDocumentChange(event.key)}))}return ObservableLocalStorageClient.prototype.anotherDocumentChange=function(key){this.changeHappendInContextOfAnotherDocument=!0,this.subject.next(key)},ObservableLocalStorageClient.prototype.currentDocumentChange=function(key){this.changeHappendInContextOfAnotherDocument=!1,this.subject.next(key)},ObservableLocalStorageClient.prototype.get=function(key){return ObservableLocalStorageClient_awaiter(this,void 0,Promise,(function(){return ObservableLocalStorageClient_generator(this,(function(_a){return[2,this.storage.getItem(key)]}))}))},ObservableLocalStorageClient.prototype.put=function(key,val){return ObservableLocalStorageClient_awaiter(this,void 0,Promise,(function(){return ObservableLocalStorageClient_generator(this,(function(_a){return val!==this.storage.getItem(key)&&(this.storage.setItem(key,val),this.currentDocumentChange(key)),[2]}))}))},ObservableLocalStorageClient.prototype.delete=function(key){return ObservableLocalStorageClient_awaiter(this,void 0,Promise,(function(){return ObservableLocalStorageClient_generator(this,(function(_a){return this.storage.removeItem(key),this.currentDocumentChange(key),[2]}))}))},ObservableLocalStorageClient.prototype.getObservableByKey=function(keyInStorageToObserve){return this.subject.pipe(filter((function(emitedValue){return emitedValue===keyInStorageToObserve})))},ObservableLocalStorageClient.prototype.getDataByKeys=function(keyInDataToObserve){var _a;return void 0===keyInDataToObserve&&(keyInDataToObserve=[]),getNestedKey(JSON.parse(null!==(_a=this.storage.getItem(LoginClientStorageKeys.KEY_INNER_DATA))&&void 0!==_a?_a:"{}"),keyInDataToObserve)},ObservableLocalStorageClient.prototype.createDataObservable=function(key,keyInDataToObserve){var _this=this;void 0===keyInDataToObserve&&(keyInDataToObserve=[]);var count,dataChangedObservable=this.getObservableByKey(key).pipe(map((function(){return _this.getDataByKeys(keyInDataToObserve)})),function(){for(var values=[],_i=0;_i<arguments.length;_i++)values[_i]=arguments[_i];var scheduler=popScheduler(values);return operate((function(source,subscriber){(scheduler?concat(values,source,scheduler):concat(values,source)).subscribe(subscriber)}))}(this.getDataByKeys(keyInDataToObserve)),distinctUntilChanged((function(prev,current){return JSON.stringify(prev)===JSON.stringify(current)})),(count=1,filter((function(_,index){return count<=index}))),filter((function(){return _this.changeHappendInContextOfAnotherDocument})));return merge(dataChangedObservable,this.updateForcingSubject.pipe(filter((function(emitedValue){return emitedValue===key})),map((function(){return _this.getDataByKeys(keyInDataToObserve)}))))},ObservableLocalStorageClient.prototype.getInnerDataObservable=function(keyInDataToObserve){return void 0===keyInDataToObserve&&(keyInDataToObserve=[]),this.createDataObservable(LoginClientStorageKeys.KEY_INNER_DATA,keyInDataToObserve)},ObservableLocalStorageClient.prototype.getPrivateDataObservable=function(keyInDataToObserve){return void 0===keyInDataToObserve&&(keyInDataToObserve=[]),this.createDataObservable(LoginClientStorageKeys.KEY_PRIVATE_DATA,keyInDataToObserve)},ObservableLocalStorageClient.prototype.forceObservablesToEmit=function(key){this.updateForcingSubject.next(key)},ObservableLocalStorageClient}();function CatchPromise(errorHandler){return function(target,key,descriptor){var originalImplementation=descriptor.value;return descriptor.value=function(){for(var args=[],_i=0;_i<arguments.length;_i++)args[_i]=arguments[_i];return originalImplementation.apply(this,args).catch(errorHandler.bind(this))},descriptor}}var LsidClientErrorHandlingWrapper_decorate=function(decorators,target,key,desc){var d,c=arguments.length,r=c<3?target:null===desc?desc=Object.getOwnPropertyDescriptor(target,key):desc;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)(d=decorators[i])&&(r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r);return c>3&&r&&Object.defineProperty(target,key,r),r},LsidClientErrorHandlingWrapper_read=function(o,n){var m="function"==typeof Symbol&&o[Symbol.iterator];if(!m)return o;var r,e,i=m.call(o),ar=[];try{for(;(void 0===n||n-- >0)&&!(r=i.next()).done;)ar.push(r.value)}catch(error){e={error}}finally{try{r&&!r.done&&(m=i.return)&&m.call(i)}finally{if(e)throw e.error}}return ar},LsidClientErrorHandlingWrapper_spreadArray=function(to,from,pack){if(pack||2===arguments.length)for(var ar,i=0,l=from.length;i<l;i++)!ar&&i in from||(ar||(ar=Array.prototype.slice.call(from,0,i)),ar[i]=from[i]);return to.concat(ar||Array.prototype.slice.call(from))};function onErrorHandler(error){this.onError(error)}var LsidClientErrorHandlingWrapper=function(){function LsidClientErrorHandlingWrapper(lsidClient,onError){this.lsidClient=lsidClient,this.onError=onError}return LsidClientErrorHandlingWrapper.prototype.getData=function(){return this.lsidClient.getData()},LsidClientErrorHandlingWrapper.prototype.storeMergeData=function(){for(var _a,args=[],_i=0;_i<arguments.length;_i++)args[_i]=arguments[_i];return(_a=this.lsidClient).storeMergeData.apply(_a,LsidClientErrorHandlingWrapper_spreadArray([],LsidClientErrorHandlingWrapper_read(args),!1))},Object.defineProperty(LsidClientErrorHandlingWrapper.prototype,"config",{get:function(){return this.lsidClient.config},enumerable:!1,configurable:!0}),Object.defineProperty(LsidClientErrorHandlingWrapper.prototype,"profile",{get:function(){return this.lsidClient.profile},enumerable:!1,configurable:!0}),Object.defineProperty(LsidClientErrorHandlingWrapper.prototype,"storage",{get:function(){return this.lsidClient.storage},enumerable:!1,configurable:!0}),LsidClientErrorHandlingWrapper.prototype.changePassword=function(){for(var _a,args=[],_i=0;_i<arguments.length;_i++)args[_i]=arguments[_i];return(_a=this.lsidClient).changePassword.apply(_a,LsidClientErrorHandlingWrapper_spreadArray([],LsidClientErrorHandlingWrapper_read(args),!1))},LsidClientErrorHandlingWrapper.prototype.deleteAccount=function(){return this.lsidClient.deleteAccount()},LsidClientErrorHandlingWrapper.prototype.forgottenPassword=function(){for(var _a,args=[],_i=0;_i<arguments.length;_i++)args[_i]=arguments[_i];return(_a=this.lsidClient).forgottenPassword.apply(_a,LsidClientErrorHandlingWrapper_spreadArray([],LsidClientErrorHandlingWrapper_read(args),!1))},LsidClientErrorHandlingWrapper.prototype.captchaForgottenPassword=function(forgottenPasswordData){return this.lsidClient.captchaForgottenPassword(forgottenPasswordData)},LsidClientErrorHandlingWrapper.prototype.getTouDocumentByVersion=function(){for(var _a,args=[],_i=0;_i<arguments.length;_i++)args[_i]=arguments[_i];return(_a=this.lsidClient).getTouDocumentByVersion.apply(_a,LsidClientErrorHandlingWrapper_spreadArray([],LsidClientErrorHandlingWrapper_read(args),!1))},LsidClientErrorHandlingWrapper.prototype.getTouDocuments=function(){for(var _a,args=[],_i=0;_i<arguments.length;_i++)args[_i]=arguments[_i];return(_a=this.lsidClient).getTouDocuments.apply(_a,LsidClientErrorHandlingWrapper_spreadArray([],LsidClientErrorHandlingWrapper_read(args),!1))},LsidClientErrorHandlingWrapper.prototype.login=function(){for(var _a,args=[],_i=0;_i<arguments.length;_i++)args[_i]=arguments[_i];return(_a=this.lsidClient).login.apply(_a,LsidClientErrorHandlingWrapper_spreadArray([],LsidClientErrorHandlingWrapper_read(args),!1))},LsidClientErrorHandlingWrapper.prototype.loginUsingProvider=function(){for(var _a,args=[],_i=0;_i<arguments.length;_i++)args[_i]=arguments[_i];return(_a=this.lsidClient).loginUsingProvider.apply(_a,LsidClientErrorHandlingWrapper_spreadArray([],LsidClientErrorHandlingWrapper_read(args),!1))},LsidClientErrorHandlingWrapper.prototype.logout=function(){return this.lsidClient.logout()},LsidClientErrorHandlingWrapper.prototype.marketingApproval=function(){for(var _a,args=[],_i=0;_i<arguments.length;_i++)args[_i]=arguments[_i];return(_a=this.lsidClient).marketingApproval.apply(_a,LsidClientErrorHandlingWrapper_spreadArray([],LsidClientErrorHandlingWrapper_read(args),!1))},LsidClientErrorHandlingWrapper.prototype.myTerms=function(){return this.lsidClient.myTerms()},LsidClientErrorHandlingWrapper.prototype.registration=function(){for(var _a,args=[],_i=0;_i<arguments.length;_i++)args[_i]=arguments[_i];return(_a=this.lsidClient).registration.apply(_a,LsidClientErrorHandlingWrapper_spreadArray([],LsidClientErrorHandlingWrapper_read(args),!1))},LsidClientErrorHandlingWrapper.prototype.termsAgree=function(){return this.lsidClient.termsAgree()},LsidClientErrorHandlingWrapper.prototype.termsAgreements=function(){return this.lsidClient.termsAgreements()},LsidClientErrorHandlingWrapper.prototype.updateUser=function(){for(var _a,args=[],_i=0;_i<arguments.length;_i++)args[_i]=arguments[_i];return(_a=this.lsidClient).updateUser.apply(_a,LsidClientErrorHandlingWrapper_spreadArray([],LsidClientErrorHandlingWrapper_read(args),!1))},LsidClientErrorHandlingWrapper.prototype.verifyAccount=function(){for(var _a,args=[],_i=0;_i<arguments.length;_i++)args[_i]=arguments[_i];return(_a=this.lsidClient).verifyAccount.apply(_a,LsidClientErrorHandlingWrapper_spreadArray([],LsidClientErrorHandlingWrapper_read(args),!1))},LsidClientErrorHandlingWrapper_decorate([CatchPromise(onErrorHandler)],LsidClientErrorHandlingWrapper.prototype,"getData",null),LsidClientErrorHandlingWrapper_decorate([CatchPromise(onErrorHandler)],LsidClientErrorHandlingWrapper.prototype,"storeMergeData",null),LsidClientErrorHandlingWrapper}(),dist=__webpack_require__(543),dist_default=__webpack_require__.n(dist),getLsidClient_assign=function(){return getLsidClient_assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t},getLsidClient_assign.apply(this,arguments)},apiClientConfigDefaults={mode:dist.ApiClientMode.Production,timeout:3e4};var LsidClientFactory_awaiter=function(thisArg,_arguments,P,generator){return new(P||(P=Promise))((function(resolve,reject){function fulfilled(value){try{step(generator.next(value))}catch(e){reject(e)}}function rejected(value){try{step(generator.throw(value))}catch(e){reject(e)}}function step(result){var value;result.done?resolve(result.value):(value=result.value,value instanceof P?value:new P((function(resolve){resolve(value)}))).then(fulfilled,rejected)}step((generator=generator.apply(thisArg,_arguments||[])).next())}))},LsidClientFactory_generator=function(thisArg,body){var f,y,t,g,_={label:0,sent:function(){if(1&t[0])throw t[1];return t[1]},trys:[],ops:[]};return g={next:verb(0),throw:verb(1),return:verb(2)},"function"==typeof Symbol&&(g[Symbol.iterator]=function(){return this}),g;function verb(n){return function(v){return function(op){if(f)throw new TypeError("Generator is already executing.");for(;g&&(g=0,op[0]&&(_=0)),_;)try{if(f=1,y&&(t=2&op[0]?y.return:op[0]?y.throw||((t=y.return)&&t.call(y),0):y.next)&&!(t=t.call(y,op[1])).done)return t;switch(y=0,t&&(op=[2&op[0],t.value]),op[0]){case 0:case 1:t=op;break;case 4:return _.label++,{value:op[1],done:!1};case 5:_.label++,y=op[1],op=[0];continue;case 7:op=_.ops.pop(),_.trys.pop();continue;default:if(!(t=_.trys,(t=t.length>0&&t[t.length-1])||6!==op[0]&&2!==op[0])){_=0;continue}if(3===op[0]&&(!t||op[1]>t[0]&&op[1]<t[3])){_.label=op[1];break}if(6===op[0]&&_.label<t[1]){_.label=t[1],t=op;break}if(t&&_.label<t[2]){_.label=t[2],_.ops.push(op);break}t[2]&&_.ops.pop(),_.trys.pop();continue}op=body.call(thisArg,_)}catch(e){op=[6,e],y=0}finally{f=t=0}if(5&op[0])throw op[1];return{value:op[0]?op[1]:void 0,done:!0}}([n,v])}}},LsidClientFactory=function(){function LsidClientFactory(utilTrans){var trans,apiConfig,onErrorCallback,lsidClientConfig,localStorageClient,lsidApiClientConfig,lsidApiClientErrorMessages,lsidApiClient,lsidClient,_this=this;this.handleError=function(error){var isLoginMismatchError=error instanceof dist.LoginMissmatch||1001===error.code;cjs.Api.loader.get("lsidStateMachine").call((function(lsidStateMachine){return LsidClientFactory_awaiter(_this,void 0,void 0,(function(){var _a,ppConfirmed,touConfirmed;return LsidClientFactory_generator(this,(function(_b){switch(_b.label){case 0:return[4,lsidStateMachine.accountManager.getUser().getProfile()];case 1:return _a=_b.sent(),ppConfirmed=_a.ppConfirmed,touConfirmed=_a.touConfirmed,!isLoginMismatchError&&touConfirmed&&ppConfirmed||lsidStateMachine.logoutOnError(),[2]}}))}))}))},this.lsidClient=(trans=utilTrans,apiConfig={productionUrl:cjs.Api.config.get("app","user_functions","server"),namespace:cjs.Api.config.get("app","user_functions","namespace"),projectId:cjs.Api.config.get("app","project","id")},onErrorCallback=this.handleError,lsidClientConfig={storage:{storeKeys:{data:{storageKey:LoginClientStorageKeys.KEY_INNER_DATA,parser:dist.objectStorageParser}}}},localStorageClient=new ObservableLocalStorageClient(localStorage),lsidApiClientConfig=getLsidClient_assign(getLsidClient_assign({},apiClientConfigDefaults),apiConfig),lsidApiClientErrorMessages={loginMissmatch:trans.translate("TRANS_USER_ERROR_LOGIN_FAILED"),registrationNotConfirmed:trans.translate("TRANS_USER_ERROR_ACCOUNT_NOT_VERIFIED"),verificationFailed:trans.translate("TRANS_USER_ERROR_PASSWORD_INVALID"),invalidCaptcha:trans.translate("TRANS_USER_DIALOG_REGISTRATION_NOT_ROBOT_CONFIRMATION"),registrationAlreadyExists:trans.translate("TRANS_USER_ERROR_EMAIL_USED"),invalidRequestData:trans.translate("TRANS_USER_SERVER_ERROR"),technicalError:trans.translate("TRANS_USER_SERVER_ERROR")},lsidApiClient=new dist.LsidApiClient(fetch.bind(window),lsidApiClientConfig,lsidApiClientErrorMessages),lsidClient=new(dist_default())(lsidClientConfig,localStorageClient,lsidApiClient),new LsidClientErrorHandlingWrapper(lsidClient,onErrorCallback))}return LsidClientFactory.prototype.getInstance=function(){return this.lsidClient},LsidClientFactory}(),MyDataSynchronizer_awaiter=function(thisArg,_arguments,P,generator){return new(P||(P=Promise))((function(resolve,reject){function fulfilled(value){try{step(generator.next(value))}catch(e){reject(e)}}function rejected(value){try{step(generator.throw(value))}catch(e){reject(e)}}function step(result){var value;result.done?resolve(result.value):(value=result.value,value instanceof P?value:new P((function(resolve){resolve(value)}))).then(fulfilled,rejected)}step((generator=generator.apply(thisArg,_arguments||[])).next())}))},MyDataSynchronizer_generator=function(thisArg,body){var f,y,t,g,_={label:0,sent:function(){if(1&t[0])throw t[1];return t[1]},trys:[],ops:[]};return g={next:verb(0),throw:verb(1),return:verb(2)},"function"==typeof Symbol&&(g[Symbol.iterator]=function(){return this}),g;function verb(n){return function(v){return function(op){if(f)throw new TypeError("Generator is already executing.");for(;g&&(g=0,op[0]&&(_=0)),_;)try{if(f=1,y&&(t=2&op[0]?y.return:op[0]?y.throw||((t=y.return)&&t.call(y),0):y.next)&&!(t=t.call(y,op[1])).done)return t;switch(y=0,t&&(op=[2&op[0],t.value]),op[0]){case 0:case 1:t=op;break;case 4:return _.label++,{value:op[1],done:!1};case 5:_.label++,y=op[1],op=[0];continue;case 7:op=_.ops.pop(),_.trys.pop();continue;default:if(!(t=_.trys,(t=t.length>0&&t[t.length-1])||6!==op[0]&&2!==op[0])){_=0;continue}if(3===op[0]&&(!t||op[1]>t[0]&&op[1]<t[3])){_.label=op[1];break}if(6===op[0]&&_.label<t[1]){_.label=t[1],t=op;break}if(t&&_.label<t[2]){_.label=t[2],_.ops.push(op);break}t[2]&&_.ops.pop(),_.trys.pop();continue}op=body.call(thisArg,_)}catch(e){op=[6,e],y=0}finally{f=t=0}if(5&op[0])throw op[1];return{value:op[0]?op[1]:void 0,done:!0}}([n,v])}}},MyDataSynchronizer=function(){function MyDataSynchronizer(lsidClient,storage){this.lsidClient=lsidClient,this.storage=storage,this.timeoutId=null,this.intervalId=null,this.TIMESTAMP_STORAGE_KEY="lsid_dataAutosyncRequest",this.DATA_TIMEOUT_PERIOD=3e5,this.PERIODICAL_CHECK_INTERVAL=1e4,this.RETRY_INTERVAL=3e3,this.startSynchronizing()}return MyDataSynchronizer.prototype.getTimestamp=function(){return Number(this.storage.getItem(this.TIMESTAMP_STORAGE_KEY)||0)},MyDataSynchronizer.prototype.setTimestamp=function(){this.storage.setItem(this.TIMESTAMP_STORAGE_KEY,String(Date.now()))},MyDataSynchronizer.prototype.hasFreshData=function(){return this.getTimestamp()+this.DATA_TIMEOUT_PERIOD>Date.now()},MyDataSynchronizer.prototype.synchronize=function(){return MyDataSynchronizer_awaiter(this,void 0,Promise,(function(){var _this=this;return MyDataSynchronizer_generator(this,(function(_a){switch(_a.label){case 0:return this.hasFreshData()?[3,2]:(this.setTimestamp(),[4,retry((function(){return _this.lsidClient.getData()}),this.DATA_TIMEOUT_PERIOD/this.RETRY_INTERVAL-1,this.RETRY_INTERVAL)]);case 1:_a.sent(),_a.label=2;case 2:return[2]}}))}))},MyDataSynchronizer.prototype.startSynchronizing=function(){var _this=this;this.timeoutId=setTimeout((function(){_this.intervalId=setInterval((function(){return _this.synchronize()}),_this.PERIODICAL_CHECK_INTERVAL)}),Math.random()*this.PERIODICAL_CHECK_INTERVAL)},MyDataSynchronizer.prototype.stopSynchronizing=function(){this.timeoutId&&clearTimeout(this.timeoutId),this.intervalId&&clearInterval(this.intervalId),this.timeoutId=null,this.intervalId=null},MyDataSynchronizer}(),MyDataSynchronizerFactory=function(){function MyDataSynchronizerFactory(lsidClientFactory){this.myDataSynchronizer=new MyDataSynchronizer(lsidClientFactory.getInstance(),localStorage)}return MyDataSynchronizerFactory.prototype.getInstance=function(){return this.myDataSynchronizer},MyDataSynchronizerFactory}(),LsidClientToOldInterfaceConvertorBase_assign=function(){return LsidClientToOldInterfaceConvertorBase_assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t},LsidClientToOldInterfaceConvertorBase_assign.apply(this,arguments)},LsidClientToOldInterfaceConvertorBase_read=function(o,n){var m="function"==typeof Symbol&&o[Symbol.iterator];if(!m)return o;var r,e,i=m.call(o),ar=[];try{for(;(void 0===n||n-- >0)&&!(r=i.next()).done;)ar.push(r.value)}catch(error){e={error}}finally{try{r&&!r.done&&(m=i.return)&&m.call(i)}finally{if(e)throw e.error}}return ar},MemoizeJsonParse=function(){function MemoizeJsonParse(){this.lastParsedString=null}return MemoizeJsonParse.prototype.parse=function(data){return data!==this.lastParsedString&&(this.lastParsedString=data,this.lastOutputValue=JSON.parse(data)),this.lastOutputValue},MemoizeJsonParse}(),LsidClientToOldInterfaceConvertorBaseImpl=function(){function LsidClientToOldInterfaceConvertorBaseImpl(client,storage){this.client=client,this.storage=storage,this.dataFromStorageMemoizer=new MemoizeJsonParse}return LsidClientToOldInterfaceConvertorBaseImpl.prototype.getDataFromStorage=function(){var _a,stringifiedData=null!==(_a=this.storage.getItem(LoginClientStorageKeys.KEY_INNER_DATA))&&void 0!==_a?_a:"{}";return this.dataFromStorageMemoizer.parse(stringifiedData)},LsidClientToOldInterfaceConvertorBaseImpl.prototype.loggedIn=function(){return Boolean(this.storage.getItem(LoginClientStorageKeys.KEY_HASH)&&this.storage.getItem(LoginClientStorageKeys.KEY_ID))},LsidClientToOldInterfaceConvertorBaseImpl.prototype.getData=function(key){void 0===key&&(key="");var splitKeys=key.split("."),data=getNestedKey(this.getDataFromStorage(),splitKeys);return Object.keys(data).length?data:null},LsidClientToOldInterfaceConvertorBaseImpl.prototype.removeData=function(key,confirmCallback,failCallback){var splitKeys=key.split("."),newData=removeNestedKey(this.getDataFromStorage(),splitKeys),keysButTheLastOne=splitKeys.slice(0,-1);return this.client.storeMergeData({key:keysButTheLastOne.join("."),newData:getNestedKey(newData,keysButTheLastOne)}).then(confirmCallback).catch(failCallback),null},LsidClientToOldInterfaceConvertorBaseImpl.prototype.alterStoreDataParams=function(key,dataToMerge){var _a;if("object"==typeof dataToMerge)return[key,dataToMerge];var splitKeys=key.split("."),keysButTheLastOne=splitKeys.slice(0,-1),alteredDataToMerge=((_a={})[LsidClientToOldInterfaceConvertorBase_read(splitKeys.slice(-1),1)[0]]=dataToMerge,_a);return[keysButTheLastOne.join("."),alteredDataToMerge]},LsidClientToOldInterfaceConvertorBaseImpl.prototype.storeData=function(dataToMergeUnchanged,keyUnchanged,confirmCallback,failCallback){var _a=LsidClientToOldInterfaceConvertorBase_read(this.alterStoreDataParams(keyUnchanged,dataToMergeUnchanged),2),key=_a[0],dataToMerge=_a[1],splitKeys=key.split("."),newData=LsidClientToOldInterfaceConvertorBase_assign(LsidClientToOldInterfaceConvertorBase_assign({},getNestedKey(this.getDataFromStorage(),splitKeys)),dataToMerge);return this.client.storeMergeData({key,newData}).then(confirmCallback).catch(failCallback),null},LsidClientToOldInterfaceConvertorBaseImpl}(),MyGamesClient_extends=function(){var _extendStatics=function(d,b){return _extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)Object.prototype.hasOwnProperty.call(b,p)&&(d[p]=b[p])},_extendStatics(d,b)};return function(d,b){if("function"!=typeof b&&null!==b)throw new TypeError("Class extends value "+String(b)+" is not a constructor or null");function __(){this.constructor=d}_extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}(),MyGamesClientImpl=function(_super){function MyGamesClientImpl(){return null!==_super&&_super.apply(this,arguments)||this}return MyGamesClient_extends(MyGamesClientImpl,_super),MyGamesClientImpl.prototype.storeMergedData=function(newData,key,confirmCallback,failCallback){return this.client.storeMergeData({key,newData}).then(confirmCallback).catch(failCallback),!0},MyGamesClientImpl}(LsidClientToOldInterfaceConvertorBaseImpl),MyGamesClientFactory=function(){function MyGamesClientFactory(lsidClientFactory){this.lsidClientFactory=lsidClientFactory}return MyGamesClientFactory.prototype.create=function(){return new MyGamesClientImpl(this.lsidClientFactory.getInstance(),localStorage)},MyGamesClientFactory}(),MyLeaguesClient_extends=function(){var _extendStatics=function(d,b){return _extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)Object.prototype.hasOwnProperty.call(b,p)&&(d[p]=b[p])},_extendStatics(d,b)};return function(d,b){if("function"!=typeof b&&null!==b)throw new TypeError("Class extends value "+String(b)+" is not a constructor or null");function __(){this.constructor=d}_extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}(),MyLeaguesClient_read=function(o,n){var m="function"==typeof Symbol&&o[Symbol.iterator];if(!m)return o;var r,e,i=m.call(o),ar=[];try{for(;(void 0===n||n-- >0)&&!(r=i.next()).done;)ar.push(r.value)}catch(error){e={error}}finally{try{r&&!r.done&&(m=i.return)&&m.call(i)}finally{if(e)throw e.error}}return ar},MyLeaguesClient_spreadArray=function(to,from,pack){if(pack||2===arguments.length)for(var ar,i=0,l=from.length;i<l;i++)!ar&&i in from||(ar||(ar=Array.prototype.slice.call(from,0,i)),ar[i]=from[i]);return to.concat(ar||Array.prototype.slice.call(from))},MyLeaguesClientImpl=function(_super){function MyLeaguesClientImpl(){var _this=null!==_super&&_super.apply(this,arguments)||this;return _this.enabledFunctions=[],_this}return MyLeaguesClient_extends(MyLeaguesClientImpl,_super),MyLeaguesClientImpl.prototype.addDataKeyToLocalUsage=function(dataKey){this.enabledFunctions=MyLeaguesClient_spreadArray(MyLeaguesClient_spreadArray([],MyLeaguesClient_read(this.enabledFunctions),!1),[dataKey],!1)},MyLeaguesClientImpl.prototype.userFunctionsAreAvailable=function(dataKey){return this.enabledFunctions.includes(dataKey)},MyLeaguesClientImpl.prototype.showDialog=function(){throw new Error("MyLeaguesClientImpl does not implement showDialog method.")},MyLeaguesClientImpl.prototype.showTechnicalError=function(){throw new Error("MyLeaguesClientImpl does not implement showTechnicalError method.")},MyLeaguesClientImpl}(LsidClientToOldInterfaceConvertorBaseImpl),MyLeaguesClientFactory=function(){function MyLeaguesClientFactory(lsidClientFactory){this.lsidClientFactory=lsidClientFactory}return MyLeaguesClientFactory.prototype.create=function(){return new MyLeaguesClientImpl(this.lsidClientFactory.getInstance(),localStorage)},MyLeaguesClientFactory}(),ChangesHistoryEventItemImpl=function(){function ChangesHistoryEventItemImpl(){this.newValues={},this.historyValues={}}return ChangesHistoryEventItemImpl.prototype.getHistoryValue=function(feedIndex){return this.historyValues[feedIndex]},ChangesHistoryEventItemImpl.prototype.getHistoryValues=function(){return this.historyValues},ChangesHistoryEventItemImpl.prototype.getNewValue=function(feedIndex){return this.newValues[feedIndex]},ChangesHistoryEventItemImpl.prototype.hasNewValue=function(feedIndex){return void 0!==this.newValues[feedIndex]},ChangesHistoryEventItemImpl.prototype.setHistoryValue=function(feedIndex,value){this.historyValues[feedIndex]=value},ChangesHistoryEventItemImpl.prototype.setNewValue=function(feedIndex,value){this.newValues[feedIndex]=value},ChangesHistoryEventItemImpl.prototype.removeNewValues=function(){this.newValues={}},ChangesHistoryEventItemImpl}(),ChangesHistoryContainer_values=function(o){var s="function"==typeof Symbol&&Symbol.iterator,m=s&&o[s],i=0;if(m)return m.call(o);if(o&&"number"==typeof o.length)return{next:function(){return o&&i>=o.length&&(o=void 0),{value:o&&o[i++],done:!o}}};throw new TypeError(s?"Object is not iterable.":"Symbol.iterator is not defined.")},ChangesHistoryContainerImpl=function(){function ChangesHistoryContainerImpl(){this.changesHistoryEventItems={},this.changedEventIds=[]}return ChangesHistoryContainerImpl.prototype.setValueChange=function(id,feedIndex,newValue,oldValue){oldValue!==newValue&&(newValue=Array.isArray(newValue)?newValue.join("|"):newValue,this.changeHistoryEventItemExists(id)||(this.changesHistoryEventItems[id]=new ChangesHistoryEventItemImpl),this.changesHistoryEventItems[id].setNewValue(feedIndex,newValue),this.changedEventIds.includes(id)||this.changedEventIds.push(id),void 0===oldValue&&(oldValue=newValue),this.changesHistoryEventItems[id].setHistoryValue(feedIndex,oldValue))},ChangesHistoryContainerImpl.prototype.didValueChanged=function(id,feedIndex){return!!this.hasNewValue(id,feedIndex)&&this.isChangeOfValues(this.changesHistoryEventItems[id].getNewValue(feedIndex),this.changesHistoryEventItems[id].getHistoryValue(feedIndex))},ChangesHistoryContainerImpl.prototype.didValueDecrease=function(id,feedIndex){return!!this.hasNewValue(id,feedIndex)&&this.changesHistoryEventItems[id].getNewValue(feedIndex)<this.changesHistoryEventItems[id].getHistoryValue(feedIndex)},ChangesHistoryContainerImpl.prototype.getNewValue=function(id,feedIndex){return this.hasNewValue(id,feedIndex)?this.changesHistoryEventItems[id].getNewValue(feedIndex):null},ChangesHistoryContainerImpl.prototype.getHistoryValue=function(id,feedIndex){return this.hasNewValue(id,feedIndex)?this.changesHistoryEventItems[id].getHistoryValue(feedIndex):null},ChangesHistoryContainerImpl.prototype.getHistoryData=function(id){if(!this.changeHistoryEventItemExists(id))return{};var historyData=this.changesHistoryEventItems[id].getHistoryValues(),lastUpdate={};for(var index in historyData)lastUpdate[index]=!0;return historyData.lastUpdate=lastUpdate,historyData},ChangesHistoryContainerImpl.prototype.getChangedIds=function(){return this.changedEventIds},ChangesHistoryContainerImpl.prototype.removeNewData=function(id){var e_1,_a,_b;if(id)null===(_b=this.changesHistoryEventItems[id])||void 0===_b||_b.removeNewValues(),this.changedEventIds=this.changedEventIds.filter((function(item){return item!==id}));else{try{for(var _c=ChangesHistoryContainer_values(Object.keys(this.changesHistoryEventItems)),_d=_c.next();!_d.done;_d=_c.next()){var id_1=_d.value;this.changesHistoryEventItems[id_1].removeNewValues()}}catch(e_1_1){e_1={error:e_1_1}}finally{try{_d&&!_d.done&&(_a=_c.return)&&_a.call(_c)}finally{if(e_1)throw e_1.error}}this.changedEventIds=[]}},ChangesHistoryContainerImpl.prototype.hasNewValue=function(id,feedIndex){return this.changeHistoryEventItemExists(id)&&this.changesHistoryEventItems[id].hasNewValue(feedIndex)},ChangesHistoryContainerImpl.prototype.changeHistoryEventItemExists=function(id){return void 0!==this.changesHistoryEventItems[id]},ChangesHistoryContainerImpl.prototype.isChangeOfValues=function(newValue,historyValue){return("0"!==newValue||""!==historyValue)&&newValue!=historyValue},ChangesHistoryContainerImpl}(),UpdateManager_values=function(o){var s="function"==typeof Symbol&&Symbol.iterator,m=s&&o[s],i=0;if(m)return m.call(o);if(o&&"number"==typeof o.length)return{next:function(){return o&&i>=o.length&&(o=void 0),{value:o&&o[i++],done:!o}}};throw new TypeError(s?"Object is not iterable.":"Symbol.iterator is not defined.")},UpdateManagerImpl=function(){function UpdateManagerImpl(feedServiceLocalUpdate,dataEventHolderProxy,changesHistoryContainer,utilEnvironment,utilPage){var _this=this;this.feedServiceLocalUpdate=feedServiceLocalUpdate,this.dataEventHolderProxy=dataEventHolderProxy,this.changesHistoryContainer=changesHistoryContainer,this.utilEnvironment=utilEnvironment,this.utilPage=utilPage,this.update=function(action){_this.updateActions(),action&&_this.feedServiceLocalUpdate.update(_this.utilEnvironment.getCategory()===CategoryList.MY_GAMES?FeedTypeList.UPDATE_MY_GAMES:action,_this.update)}}return UpdateManagerImpl.prototype.removeEventLiveStatus=function(eventId){var _this=this,eventDataHolder=this.dataEventHolderProxy.findEventHolderByEventId(eventId);if(eventDataHolder){var eventItem=eventDataHolder.getEvent(eventId);if(eventItem.isMarkedAsLive()&&!eventItem.isLive()){eventItem.getValue("live_timer")&&(clearTimeout(eventItem.getValue("live_timer")),eventItem.removeValue("live_timer"));var timerId=setTimeout((function(){var category=_this.utilEnvironment.getCategory();eventItem.setValue("AI","n"),_this.changesHistoryContainer.setValueChange(eventId,"AI","n",void 0),_this.update(),category===CategoryList.LIVE&&cjs.Api.loader.get("reactCalls").call((function(reactCalls){reactCalls.reloadTabContent(category)})),eventItem.removeValue("live_timer")}),1e3*(cjs.Api.config.get("js","time_keep_match_live")||0));eventItem.setValue("live_timer",timerId)}}else console.log("Failed to remove live status on event id: ".concat(eventId," (not found in holders)"))},UpdateManagerImpl.prototype.isUpdatedPositionOrTime=function(eventItem){var eventId=eventItem.getId(),leagueItem=eventItem.getLeague(),updated=!1;if(leagueItem.getTournamentType()!==TournamentTypeList.SECONDARY||this.utilEnvironment.getMyLeaguesObject().isTop(leagueItem.getSportId(),leagueItem.getTournamentTemplateKey(),leagueItem.isTop())||this.utilPage.isCountryPage()||this.utilEnvironment.getCategory()===CategoryList.MY_GAMES){var startTimeChanged=this.changesHistoryContainer.hasNewValue(eventId,"AD"),orderChanged=this.changesHistoryContainer.hasNewValue(eventId,"WS")||this.changesHistoryContainer.hasNewValue(eventId,"NI")||this.changesHistoryContainer.hasNewValue(eventId,cjs.Api.statsResultsIndexGenerator.get(StatsDataTypeList.EVENT_PARTICIPANT_SORT_KEY));(startTimeChanged||leagueItem.isNoDuel()&&orderChanged)&&(updated=!0)}return updated},UpdateManagerImpl.prototype.updateLeaguesActions=function(leagueIds){leagueIds.length&&(this.utilEnvironment.sortDataInDataHandlers(),cjs.Api.loader.get("reactCalls").call((function(reactCalls){leagueIds.forEach((function(leagueId){reactCalls.reloadLeague(leagueId)}))})))},UpdateManagerImpl.prototype.removeEventLiveStatusIfUpdated=function(eventId){(this.changesHistoryContainer.hasNewValue(eventId,"AB")||this.changesHistoryContainer.didValueChanged(eventId,"AI"))&&this.removeEventLiveStatus(eventId)},UpdateManagerImpl.prototype.updateActions=function(){var e_1,_a,leaguesChangedIds=[],_loop_1=function(eventChangedId){var eventDataHolder=this_1.dataEventHolderProxy.findEventHolderByEventId(eventChangedId);if(!eventDataHolder)return console.log("Failed to use update actions on changed event id: ".concat(eventChangedId," (not found in holders)")),"continue";var eventItem=eventDataHolder.getEvent(eventChangedId);if(this_1.isUpdatedPositionOrTime(eventItem)){var leagueId=eventItem.getLeague().getId();leaguesChangedIds.includes(leagueId)||leaguesChangedIds.push(leagueId)}this_1.removeEventLiveStatusIfUpdated(eventChangedId),cjs.Api.loader.get("soundPlayerResolver").call((function(soundPlayerResolver){soundPlayerResolver.checkChangesAndPlaySound(eventItem)})),cjs.Api.loader.get("highlighter").call((function(highlighter){highlighter.highlight(eventItem)}))},this_1=this;try{for(var _b=UpdateManager_values(this.changesHistoryContainer.getChangedIds()),_c=_b.next();!_c.done;_c=_b.next()){_loop_1(_c.value)}}catch(e_1_1){e_1={error:e_1_1}}finally{try{_c&&!_c.done&&(_a=_b.return)&&_a.call(_b)}finally{if(e_1)throw e_1.error}}this.updateLeaguesActions(leaguesChangedIds)},UpdateManagerImpl}(),LegalAgeImpl=function(){function LegalAgeImpl(enabled,geoIps,userGeoIp){this.enabled=enabled,this.geoIps=geoIps,this.userGeoIp=userGeoIp}return LegalAgeImpl.prototype.mustBeConfirmed=function(){return this.enabled&&this.geoIps.includes(this.userGeoIp)},LegalAgeImpl.prototype.isConfirmed=function(){return!this.mustBeConfirmed()||"1"===window.localStorage.getItem("legal_age_confirmation")},LegalAgeImpl}();var LinkHandlerImpl=function(){function LinkHandlerImpl(config,loader){this.config=config,this.loader=loader}return LinkHandlerImpl.prototype.handleLegalAgeConfirmation=function(){var _this=this;this.loader.get("geoIpResolver").call((function(geoip){new LegalAgeImpl(_this.config.get("app","legal_age_confirmation","enabled"),_this.config.get("app","legal_age_confirmation","geoip"),geoip).isConfirmed()||document.querySelectorAll(".footer__gambleResponsiblyLink").forEach((function(el){return el.remove()}))}))},LinkHandlerImpl.prototype.handleMobiLink=function(){var _this=this;this.loader.get("geoIpResolver").call((function(geoip){var geoipRestriction=_this.config.get("mobi","geoip_restriction");if(!(null!==geoipRestriction&&(!geoip||-1!==geoipRestriction.indexOf(geoip)))){var mobiLinkElement=document.getElementById("mobi_version");mobiLinkElement&&mobiLinkElement.classList.remove("footer__alternatives--hidden")}}))},LinkHandlerImpl}(),SimplePersistentStorage_extends=function(){var _extendStatics=function(d,b){return _extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)Object.prototype.hasOwnProperty.call(b,p)&&(d[p]=b[p])},_extendStatics(d,b)};return function(d,b){if("function"!=typeof b&&null!==b)throw new TypeError("Class extends value "+String(b)+" is not a constructor or null");function __(){this.constructor=d}_extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}(),SimplePersistentStorage=function(_super){function SimplePersistentStorage(){return _super.call(this,localStorage)||this}return SimplePersistentStorage_extends(SimplePersistentStorage,_super),SimplePersistentStorage}(function(){function SimpleStorageImpl(storage){this.storage=storage}return SimpleStorageImpl.prototype.get=function(key){var storedJson=this.storage.getItem(key);if(!storedJson)return null;var _a=JSON.parse(storedJson),value=_a.value,validTo=_a.validTo;return validTo&&!this.checkValidTo(validTo)?(this.storage.removeItem(key),null):value},SimpleStorageImpl.prototype.store=function(key,value,ttl){return this.storage.setItem(key,JSON.stringify({value,validTo:ttl?Math.round(ttl)+this._getTimeStamp():void 0})),!0},SimpleStorageImpl.prototype._getTimeStamp=function(){return Math.round((new Date).getTime()/1e3)},SimpleStorageImpl.prototype.checkValidTo=function(validTo){return validTo>this._getTimeStamp()},SimpleStorageImpl}()),MobileBanners_awaiter=function(thisArg,_arguments,P,generator){return new(P||(P=Promise))((function(resolve,reject){function fulfilled(value){try{step(generator.next(value))}catch(e){reject(e)}}function rejected(value){try{step(generator.throw(value))}catch(e){reject(e)}}function step(result){var value;result.done?resolve(result.value):(value=result.value,value instanceof P?value:new P((function(resolve){resolve(value)}))).then(fulfilled,rejected)}step((generator=generator.apply(thisArg,_arguments||[])).next())}))},MobileBanners_generator=function(thisArg,body){var f,y,t,g,_={label:0,sent:function(){if(1&t[0])throw t[1];return t[1]},trys:[],ops:[]};return g={next:verb(0),throw:verb(1),return:verb(2)},"function"==typeof Symbol&&(g[Symbol.iterator]=function(){return this}),g;function verb(n){return function(v){return function(op){if(f)throw new TypeError("Generator is already executing.");for(;g&&(g=0,op[0]&&(_=0)),_;)try{if(f=1,y&&(t=2&op[0]?y.return:op[0]?y.throw||((t=y.return)&&t.call(y),0):y.next)&&!(t=t.call(y,op[1])).done)return t;switch(y=0,t&&(op=[2&op[0],t.value]),op[0]){case 0:case 1:t=op;break;case 4:return _.label++,{value:op[1],done:!1};case 5:_.label++,y=op[1],op=[0];continue;case 7:op=_.ops.pop(),_.trys.pop();continue;default:if(!(t=_.trys,(t=t.length>0&&t[t.length-1])||6!==op[0]&&2!==op[0])){_=0;continue}if(3===op[0]&&(!t||op[1]>t[0]&&op[1]<t[3])){_.label=op[1];break}if(6===op[0]&&_.label<t[1]){_.label=t[1],t=op;break}if(t&&_.label<t[2]){_.label=t[2],_.ops.push(op);break}t[2]&&_.ops.pop(),_.trys.pop();continue}op=body.call(thisArg,_)}catch(e){op=[6,e],y=0}finally{f=t=0}if(5&op[0])throw op[1];return{value:op[0]?op[1]:void 0,done:!0}}([n,v])}}};var MobileBanners=function(){function MobileBanners(mobileBannerCrates,isLegalAgeConfirmedCallback,clientStorage,onAdblockCallback){this.mobileBannerCrates=mobileBannerCrates,this.isLegalAgeConfirmedCallback=isLegalAgeConfirmedCallback,this.clientStorage=clientStorage,this.onAdblockCallback=onAdblockCallback}return MobileBanners.prototype.getBannerCrate=function(zone){return this.mobileBannerCrates[zone]||null},MobileBanners.prototype.getIsLegalAgeConfirmed=function(){return this.isLegalAgeConfirmedCallback},MobileBanners.prototype.getClientStorage=function(){return this.clientStorage},MobileBanners.prototype.getOnAdblockCallback=function(){return this.onAdblockCallback},MobileBanners}();window.cjs=window.cjs||{},window.cjs.constants=window.cjs.constants||{},window.cjs.constants.FEED=LegacyIndexFeedConstants,window.cjs.dev=coreDebugger.W,window.BannerHandler=banner_handler.BannerHandler,window.bannerReplacer=window.bannerReplacer||new banner_handler.BannerReplacer,window.EventTracker=EventTracker;var windowOrGlobal="undefined"!=typeof window&&null!==window?window:__webpack_require__.g;windowOrGlobal.cjs.dic=new DicImpl;var dic=windowOrGlobal.cjs.dic;dic.registerClass("Util_Environment",EnvironmentImpl,["util_enviroment","utilEnviroment","utilEnvironment"]),dic.registerClass("ActiveWindowOrMenu",ActiveWindowOrMenuLsidCoupled,["activeWindowOrMenu"]),dic.registerClass("Data_EventItem",EventItemImpl,["dataEventItem"]),dic.registerClass("Data_EventHolder",EventHolderImpl,["dataEventHolder"]),dic.registerClass("Data_EventHolderMygames",EventHolderImpl,["dataEventHolderMygames"]),dic.registerClass("Data_EventHolderTemporary",EventHolderImpl,["dataEventHolderTemporary"]),dic.registerClass("Data_EventHolderArchive",EventHolderImpl),dic.registerClass("Data_EventHolderFiltered",EventHolderImpl,["dataEventHolderFiltered"]),dic.registerSingleton("Data_EventHandler",(function(Data_EventHolder,utilString){return new EventHandlerImpl(utilString,Data_EventHolder)}),["dataEventHandler"]),dic.registerSingleton("Data_EventHandlerMygames",(function(Data_EventHolderMygames,utilString){return new EventHandlerImpl(utilString,Data_EventHolderMygames)})),dic.registerSingleton("Data_EventHandlerTemporary",(function(Data_EventHolderTemporary,utilString){return new EventHandlerImpl(utilString,Data_EventHolderTemporary)})),dic.registerSingleton("Data_EventHandlerArchive",(function(Data_EventHolderArchive,utilString){return new EventHandlerImpl(utilString,Data_EventHolderArchive)})),dic.registerSingleton("Data_EventHolderProxy",(function(Data_EventHolder,Data_EventHolderMygames,Data_EventHolderArchive,Data_EventHolderTemporary,Data_EventHandler,Data_EventHandlerMygames,Data_EventHandlerArchive,Data_EventHandlerTemporary){var holderProxy=new EventHolderProxyImpl,holders={};holders[ScopeList.SCOPE_DEFAULT]=Data_EventHolder,holders[ScopeList.SCOPE_ARCHIVE]=Data_EventHolderArchive,holders[ScopeList.SCOPE_MY_GAMES]=Data_EventHolderMygames,holders[ScopeList.SCOPE_TEMPORARY]=Data_EventHolderTemporary,holderProxy.setDataHolders(holders);var handlers={};return handlers[ScopeList.SCOPE_DEFAULT]=Data_EventHandler,handlers[ScopeList.SCOPE_ARCHIVE]=Data_EventHandlerArchive,handlers[ScopeList.SCOPE_MY_GAMES]=Data_EventHandlerMygames,handlers[ScopeList.SCOPE_TEMPORARY]=Data_EventHandlerTemporary,holderProxy.setDataHandlers(handlers),holderProxy}),["dataEventHolderProxy","dataEvent"]),dic.registerClass("Data_LeagueItem",LeagueItemImpl),dic.registerClass("Data_LeagueHolder",LeagueHolderImpl,["dataLeagueHolder"]),dic.registerClass("Data_LeagueHolderMygames",LeagueHolderImpl,["dataLeagueHolderMygames"]),dic.registerClass("Data_LeagueHolderTemporary",LeagueHolderImpl,["dataLeagueHolderTemporary"]),dic.registerClass("Data_LeagueHolderArchive",LeagueHolderImpl),dic.registerClass("Data_LeagueHolderFiltered",LeagueHolderImpl,["dataLeagueHolderFiltered"]),dic.registerSingleton("Data_LeagueHandler",(function(Data_LeagueHolder,utilString){return new LeagueHandlerImpl(utilString,Data_LeagueHolder)}),["dataLeagueHandler"]),dic.registerSingleton("Data_LeagueHandlerMygames",(function(Data_LeagueHolderMygames,utilString){return new LeagueHandlerImpl(utilString,Data_LeagueHolderMygames)})),dic.registerSingleton("Data_LeagueHandlerTemporary",(function(Data_LeagueHolderTemporary,utilString){return new LeagueHandlerImpl(utilString,Data_LeagueHolderTemporary)})),dic.registerSingleton("Data_LeagueHandlerArchive",(function(Data_LeagueHolderArchive,utilString){return new LeagueHandlerImpl(utilString,Data_LeagueHolderArchive)})),dic.registerSingleton("Data_LeagueHolderProxy",(function(Data_LeagueHolder,Data_LeagueHolderMygames,Data_LeagueHolderArchive,Data_LeagueHolderTemporary,Data_LeagueHandler,Data_LeagueHandlerMygames,Data_LeagueHandlerArchive,Data_LeagueHandlerTemporary){var holderProxy=new LeagueHolderProxyImpl,holders={};holders[ScopeList.SCOPE_DEFAULT]=Data_LeagueHolder,holders[ScopeList.SCOPE_ARCHIVE]=Data_LeagueHolderArchive,holders[ScopeList.SCOPE_MY_GAMES]=Data_LeagueHolderMygames,holders[ScopeList.SCOPE_TEMPORARY]=Data_LeagueHolderTemporary,holderProxy.setDataHolders(holders);var handlers={};return handlers[ScopeList.SCOPE_DEFAULT]=Data_LeagueHandler,handlers[ScopeList.SCOPE_ARCHIVE]=Data_LeagueHandlerArchive,handlers[ScopeList.SCOPE_MY_GAMES]=Data_LeagueHandlerMygames,handlers[ScopeList.SCOPE_TEMPORARY]=Data_LeagueHandlerTemporary,holderProxy.setDataHandlers(handlers),holderProxy}),["dataLeagueHolderProxy","dataLeague"]),dic.registerClass("Data_ParticipantHolder",ParticipantHolderImpl,["dataParticipantHolder"]),dic.registerClass("Data_UpcomingDrawItem",UpcomingDrawItemImpl),dic.registerClass("Helper_StatsResults",StatsResultsImpl),dic.registerClass("Helper_StatsResultsParser",StatsResultsParser),dic.registerClass("Helper_Darts",Darts),dic.registerClass("LsidClientFactory",LsidClientFactory,["lsidClientFactory"]),dic.registerClass("MyDataSynchronizerFactory",MyDataSynchronizerFactory),dic.registerClass("MyLeaguesClientFactory",MyLeaguesClientFactory),dic.registerClass("MyGamesClientFactory",MyGamesClientFactory),dic.registerClass("MyGamesFactory",MyGamesFactoryImpl),dic.registerClass("MyLeaguesFactory",MyLeaguesFactory),dic.registerClass("Helper_ScoresChanged",ScoresChanged),dic.registerClass("Helper_WinLose",WinLoseImpl),dic.registerClass("Page_ParticipantNoDuel",ParticipantNoDuelImpl),dic.registerClass("Helper_ReversedSportTime",ReversedSportTimeImpl,["reversedSportTime"]),dic.registerClass("Helper_GambleResponsibly",GambleResponsiblyImpl),dic.registerClass("Helper_ClickableBookmaker",ClickableBookmakerImpl,["helperClickableBookmaker"]),dic.registerClass("Helper_BookmakersDataStorage",BookmakersDataStorageImpl),dic.registerClass("Helper_GameTime",GameTimeImpl),dic.registerClass("Data_Event_SortKey_GeneratorBuilder",SortKeyGeneratorBuilder,["sortKeyGeneratorBuilder"]),dic.registerClass("Application",ApplicationImpl),dic.registerClass("Helper_MyGamesChecker",MyGamesCheckerImpl,["helperMyGamesChecker"]),dic.registerClass("LiveTable_Settings",LiveTableSettingsImpl,["liveTableSettings"]),dic.registerClass("util_CounterHandler",CounterHandlerImpl),dic.registerClass("NotificationBuilder",NotificationWrapperFactory),dic.registerClass("MyGamesNotificationFactory",MyGamesNotificationFactory),dic.registerClass("Feed_Request",RequestImpl),dic.registerClass("Feed_Loader",FeedLoaderImpl),dic.registerClass("Feed_Service_LocalUpdate",LocalUpdateImpl,["feedServiceLocalUpdate"]),dic.registerClass("ExperimentsManager",ExperimentsManagerForCJS),dic.registerClass("ChangesHistoryContainer",ChangesHistoryContainerImpl,["changesHistoryContainer"]),dic.registerClass("UpdateManager",UpdateManagerImpl,["updateManager"]),dic.registerSingleton("util_string",(function(){return new StringsImpl(cjs.Api.config.get("app","lang","charset"),cjs.Api.config.get("app","lang","web"))}),["utilString"]),dic.registerSingleton("util_date",(function(utilEnviroment){return new DatesImpl(cjs.Api.config.get("app","US_time_format"),utilEnviroment)}),["utilDate"]),dic.registerClass("util_browser",BrowserImpl,["utilBrowser"]),dic.registerSingleton("util_trans",(function(utilEnvironment){return new TransImpl(utilEnvironment.getTranslates())}),["utilTrans"]),dic.registerClass("util_number",NumberImpl,["utilNumber"]),dic.registerClass("util_page",PageImpl,["utilPage"]),dic.registerClass("util_sport",SportImpl,["utilSport"]),dic.registerClass("util_url",UrlImpl,["utilUrl"]),dic.registerSingleton("Feed_Fetcher",(function(utilDate){return new FeedFetcherWithStatus(cjs.Api.config.get("app","project","id"),cjs.Api.config.get("app","feed_sign")||"",window.fetch.bind(window),cjs.Api.config.get("app","url_prefix")||"",cjs.Api.config.get("app","feed_resolver"),utilDate)})),dic.registerSingleton("Feed_NameComposer",(function(){return new FeedNameComposerImpl(new SysFeedNameComposer(cjs.Api.config.get("app","project_type","id")),"",cjs.Api.config.get("app","lang","web"),cjs.Api.config.get("app","project_type","id"),cjs.Api.timezone)})),dic.registerSingleton("geoIpStorage",(function(){return new GeoIpStorageImpl})),dic.registerSingleton("Feed_FetcherWithPropertiesResolvingResponse",(function(geoIpStorage,utilDate){return new FeedFetcherWithPropertiesResolving(cjs.Api.config.get("app","project","id"),cjs.Api.config.get("app","feed_sign")||"",fetchRetryWrapper(window.fetch.bind(window)),cjs.Api.config.get("app","url_prefix")||"",geoIpStorage,cjs.Api.config.get("app","feed_resolver"),utilDate)})),dic.registerSingleton("geoIpResolver",(function(geoIpStorage,Feed_FetcherWithPropertiesResolvingResponse,Feed_NameComposer){return new GeoIpResolverImpl(geoIpStorage,Feed_FetcherWithPropertiesResolvingResponse,Feed_NameComposer.getGeoIpFeed())})),dic.registerSingleton("LinkHandler",(function(){return new LinkHandlerImpl(cjs.Api.config,cjs.Api.loader)})),dic.registerSingleton("mobileBanners",(function(){return geoIpResolver=cjs.dic.get("geoIpResolver"),legalAgeConfirmationEnabled=cjs.Api.config.get("app","legal_age_confirmation","enabled"),legalAgeConfirmationGeoIps=cjs.Api.config.get("app","legal_age_confirmation","geoip"),windowFromLiveDataServer=window,clientStorage=new SimplePersistentStorage,new MobileBanners((null===(_a=windowFromLiveDataServer.mobileBannerConfig)||void 0===_a?void 0:_a.bannerCrates)||{},(function(){var _a;return MobileBanners_awaiter(this,void 0,Promise,(function(){var geoIp,legalAge;return MobileBanners_generator(this,(function(_b){switch(_b.label){case 0:return[4,geoIpResolver.getGeoIp()];case 1:return geoIp=_b.sent(),[2,!(legalAge=new LegalAgeImpl(legalAgeConfirmationEnabled,legalAgeConfirmationGeoIps,null!==(_a=geoIp.getGlobalGeoIp())&&void 0!==_a?_a:"")).mustBeConfirmed()||legalAge.isConfirmed()]}}))}))}),clientStorage,(function(config){windowFromLiveDataServer.banners_backup_callbacks||(windowFromLiveDataServer.banners_backup_callbacks=[]),windowFromLiveDataServer.callAdblock(config.id,config.html,(function(callback){return windowFromLiveDataServer.banners_backup_callbacks.push(callback)}))}));var geoIpResolver,legalAgeConfirmationEnabled,legalAgeConfirmationGeoIps,_a,windowFromLiveDataServer,clientStorage}))})()})();var AdblockPlus = new function () {
    var usesABP;
    var isInProgress;
    var waitingCallbacks = [];
    this.detect = function (px, callback) {
        if (typeof usesABP !== 'undefined')
        {
            return callback(usesABP);
        }
        else
        {
            waitingCallbacks.push(callback);
            if (isInProgress) return;
        }

        isInProgress = true;
        var detected = false;

        var checksRemain = 2;
        var error1 = false;
        var error2 = false;
        if (typeof callback != "function") return;

        px += "?ch=*&rn=*";

        function beforeCheck(callback, timeout) {
            if (checksRemain === 0 || timeout > 1E3)
            {
                usesABP = checksRemain === 0 && detected;
                isInProgress = false;
                waitingCallbacks.forEach(function(cb) {
                    cb(usesABP);
                });
                waitingCallbacks = [];
            }
            else
                setTimeout(function () {
                    beforeCheck(callback, timeout * 2)
                }, timeout * 2);
        }

        function checkImages() {
            if (--checksRemain) {
                return;
            }
            detected = !error1 && error2;
        }

        var random = Math.random() * 11;
        var img1 = new Image;
        img1.onload = checkImages;
        img1.onerror =
            function () {
                error1 = true;
                checkImages()
            };
        img1.src = px.replace(/\*/, 1).replace(/\*/, random);
        var img2 = new Image;
        img2.onload = checkImages;
        img2.onerror = function () {
            error2 = true;
            checkImages();
        };
        img2.src = px.replace(/\*/, 2).replace(/\*/, random);
        beforeCheck(callback, 250);
    }
};
    reset_env();
    var ajax            = new Array();
    // runtime variables
    var prefered_sport_id;
    var matches;
    var sport            = null;
    var sport_id        = null;
    var country            = null;
    var tournament        = null;
    var participant        = null;
    var series        = null;
    cjs.pageTab = null;
    var updater            = null;
    var category        = 0;
    var sub_category = null;
    var page_is_initialized = false;
    var sudate            = 0; // selected day server utime (GMT)
    var tudate;
    var refresh_utime    = 0;
    var default_tz        = default_tz || null;
    var interval_live    = null;
    var bookmaker_link        = '/bookmaker/';
    var odds_betslip        =    false;
    var ODDS_FORMAT_LIST = {"eu":{"id":1,"ident":"eu","name_iframe":"TRANS_ODDS_FORMAT_IFRAME_EU","name_detail":"TRANS_ODDS_FORMAT_DETAIL_EU","name_title":"TRANS_ODDS_FORMAT_TITLE_EU","example":"1.50"},"uk":{"id":2,"ident":"uk","name_iframe":"TRANS_ODDS_FORMAT_IFRAME_UK","name_detail":"TRANS_ODDS_FORMAT_DETAIL_UK","name_title":"TRANS_ODDS_FORMAT_TITLE_UK","example":"1\/2"},"us":{"id":3,"ident":"us","name_iframe":"TRANS_ODDS_FORMAT_IFRAME_US","name_detail":"TRANS_ODDS_FORMAT_DETAIL_US","name_title":"TRANS_ODDS_FORMAT_TITLE_US","example":"-200"},"hk":{"id":4,"ident":"hk","name_iframe":"TRANS_ODDS_FORMAT_IFRAME_HK","name_detail":"TRANS_ODDS_FORMAT_DETAIL_HK","name_title":"TRANS_ODDS_FORMAT_TITLE_HK","example":"0.50"},"ma":{"id":5,"ident":"ma","name_iframe":"TRANS_ODDS_FORMAT_IFRAME_MA","name_detail":"TRANS_ODDS_FORMAT_DETAIL_MA","name_title":"TRANS_ODDS_FORMAT_TITLE_MA","example":"0.50"},"in":{"id":6,"ident":"in","name_iframe":"TRANS_ODDS_FORMAT_IFRAME_IN","name_detail":"TRANS_ODDS_FORMAT_DETAIL_IN","name_title":"TRANS_ODDS_FORMAT_TITLE_IN","example":"-2.00"}};
    var counter_duration_time = 60;
    var project_type_id = 1;
    var project_type_name    = '_fs';
    var locationOrigin = location.origin;
    if (typeof locationOrigin === "undefined")
    {
        locationOrigin = location.protocol + "//" + location.host;
    }
    var base_url_protocol = locationOrigin;
    var req_url = locationOrigin + '/x/' + 'req/';
    var u_304 = 'd41d8cd98f00b204e9800998ecf8427e';
    var default_odds_format   = 'eu';
    var service_status = 0;
    var ajax_updater = '';
    var swap = {};
    var odds_enable = false;
    var ff_data = '';
    var sys_interval_checker = null;
    var counter_update_interval = null;
    var calendar = {
        "buttons":{"prev_day":true,"next_day":true},
        "range":7    };
    // separators
    var JS_ROW_END        = '~';
    var JS_CELL_END        = '¬';
    var JS_INDEX        = '÷';
    // tooltip ident
    var tt = null;
    var xmt;
    var xmtpending = false;
    var componentRefresh = {};

    // push engine
    var mpe_delivery = 'a';

    var base_image_data_url = 'https://static.flashscore.com/res/image/' + 'data/';

    window.onerror = function (msg, url, line, column, error)
    {
        if (msg.substr(-cjs.dev._errorReportsReportedMark.length) == cjs.dev._errorReportsReportedMark)
        {
            return;
        }
        if (typeof column == 'undefined')
        {
            column = -1
        }
        if (typeof error == 'undefined')
        {
            error = null
        }
        cjs.dev.reportError("Caught unhandled exception: '" + msg + "' from " + url + ":" + line + ":" + column, error);
    };

    document.addEventListener("keyup", (e) => {
        if (e.altKey && e.ctrlKey && e.shiftKey && e.keyCode == 68)
        {
            cjs.dev.init(function(){ cjs.dev.debugWindow.show(); });
        }
    });

    clientStorage = cjs.Api.clientStorage;
    cjs.Api.ajaxSyncTime.init(cjs.Api.config.get("ajax", "sync_time") || {});
    cjs.Api.timezone.initTimezone(
        {
            timezoneList: cjs.Api.config.get("timezone", "list"),
            timezoneDstList: cjs.Api.config.get("timezone", "dst_list"),
            timezoneDefault: cjs.Api.config.get("app", "timezone", "default")
        },
        cjs.dic.get('util_date'),
        change_tz_callback
    );

    // iframe top lang box init variables
    var project_id = 0;

    // odds
    
    var odds_betting_types = {"1":1,"2":3,"3":3,"4":1,"5":3,"6":3,"7":1,"8":1,"9":1,"10":1,"11":1,"12":3,"18":3,"19":1,"13":3,"14":3,"15":3,"16":1,"17":3,"21":3,"22":1,"24":1,"25":3,"26":1,"28":3,"29":3,"30":1,"23":101,"31":101,"32":101,"33":101,"34":101,"35":16,"36":3,"37":101,"38":101,"39":101,"40":101,"41":101,"42":1};

    var SPORT_LIST                    = new Array();
    var SPORT_LIST_BY_ID            = {};
    var SPORT_URL_BY_ID            = [];
	SPORT_LIST['soccer'] = 1;
	SPORT_LIST_BY_ID['1'] = 'soccer';
	SPORT_URL_BY_ID['1'] = '/football/';
	SPORT_LIST['tennis'] = 2;
	SPORT_LIST_BY_ID['2'] = 'tennis';
	SPORT_URL_BY_ID['2'] = '/tennis/';
	SPORT_LIST['basketball'] = 3;
	SPORT_LIST_BY_ID['3'] = 'basketball';
	SPORT_URL_BY_ID['3'] = '/basketball/';
	SPORT_LIST['hockey'] = 4;
	SPORT_LIST_BY_ID['4'] = 'hockey';
	SPORT_URL_BY_ID['4'] = '/hockey/';
	SPORT_LIST['american-football'] = 5;
	SPORT_LIST_BY_ID['5'] = 'american-football';
	SPORT_URL_BY_ID['5'] = '/american-football/';
	SPORT_LIST['baseball'] = 6;
	SPORT_LIST_BY_ID['6'] = 'baseball';
	SPORT_URL_BY_ID['6'] = '/baseball/';
	SPORT_LIST['handball'] = 7;
	SPORT_LIST_BY_ID['7'] = 'handball';
	SPORT_URL_BY_ID['7'] = '/handball/';
	SPORT_LIST['rugby-union'] = 8;
	SPORT_LIST_BY_ID['8'] = 'rugby-union';
	SPORT_URL_BY_ID['8'] = '/rugby-union/';
	SPORT_LIST['floorball'] = 9;
	SPORT_LIST_BY_ID['9'] = 'floorball';
	SPORT_URL_BY_ID['9'] = '/floorball/';
	SPORT_LIST['bandy'] = 10;
	SPORT_LIST_BY_ID['10'] = 'bandy';
	SPORT_URL_BY_ID['10'] = '/bandy/';
	SPORT_LIST['futsal'] = 11;
	SPORT_LIST_BY_ID['11'] = 'futsal';
	SPORT_URL_BY_ID['11'] = '/futsal/';
	SPORT_LIST['volleyball'] = 12;
	SPORT_LIST_BY_ID['12'] = 'volleyball';
	SPORT_URL_BY_ID['12'] = '/volleyball/';
	SPORT_LIST['cricket'] = 13;
	SPORT_LIST_BY_ID['13'] = 'cricket';
	SPORT_URL_BY_ID['13'] = '/cricket/';
	SPORT_LIST['darts'] = 14;
	SPORT_LIST_BY_ID['14'] = 'darts';
	SPORT_URL_BY_ID['14'] = '/darts/';
	SPORT_LIST['snooker'] = 15;
	SPORT_LIST_BY_ID['15'] = 'snooker';
	SPORT_URL_BY_ID['15'] = '/snooker/';
	SPORT_LIST['boxing'] = 16;
	SPORT_LIST_BY_ID['16'] = 'boxing';
	SPORT_URL_BY_ID['16'] = '/boxing/';
	SPORT_LIST['beach-volleyball'] = 17;
	SPORT_LIST_BY_ID['17'] = 'beach-volleyball';
	SPORT_URL_BY_ID['17'] = '/beach-volleyball/';
	SPORT_LIST['aussie-rules'] = 18;
	SPORT_LIST_BY_ID['18'] = 'aussie-rules';
	SPORT_URL_BY_ID['18'] = '/aussie-rules/';
	SPORT_LIST['rugby-league'] = 19;
	SPORT_LIST_BY_ID['19'] = 'rugby-league';
	SPORT_URL_BY_ID['19'] = '/rugby-league/';
	SPORT_LIST['badminton'] = 21;
	SPORT_LIST_BY_ID['21'] = 'badminton';
	SPORT_URL_BY_ID['21'] = '/badminton/';
	SPORT_LIST['water-polo'] = 22;
	SPORT_LIST_BY_ID['22'] = 'water-polo';
	SPORT_URL_BY_ID['22'] = '/water-polo/';
	SPORT_LIST['golf'] = 23;
	SPORT_LIST_BY_ID['23'] = 'golf';
	SPORT_URL_BY_ID['23'] = '/golf/';
	SPORT_LIST['field-hockey'] = 24;
	SPORT_LIST_BY_ID['24'] = 'field-hockey';
	SPORT_URL_BY_ID['24'] = '/field-hockey/';
	SPORT_LIST['table-tennis'] = 25;
	SPORT_LIST_BY_ID['25'] = 'table-tennis';
	SPORT_URL_BY_ID['25'] = '/table-tennis/';
	SPORT_LIST['beach-soccer'] = 26;
	SPORT_LIST_BY_ID['26'] = 'beach-soccer';
	SPORT_URL_BY_ID['26'] = '/beach-soccer/';
	SPORT_LIST['mma'] = 28;
	SPORT_LIST_BY_ID['28'] = 'mma';
	SPORT_URL_BY_ID['28'] = '/mma/';
	SPORT_LIST['netball'] = 29;
	SPORT_LIST_BY_ID['29'] = 'netball';
	SPORT_URL_BY_ID['29'] = '/netball/';
	SPORT_LIST['pesapallo'] = 30;
	SPORT_LIST_BY_ID['30'] = 'pesapallo';
	SPORT_URL_BY_ID['30'] = '/pesapallo/';
	SPORT_LIST['motorsport'] = 31;
	SPORT_LIST_BY_ID['31'] = 'motorsport';
	SPORT_URL_BY_ID['31'] = '/motorsport/';
	SPORT_LIST['motorsport-auto-racing'] = 32;
	SPORT_LIST_BY_ID['32'] = 'motorsport-auto-racing';
	SPORT_URL_BY_ID['32'] = '/auto-racing/';
	SPORT_LIST['motorsport-moto-racing'] = 33;
	SPORT_LIST_BY_ID['33'] = 'motorsport-moto-racing';
	SPORT_URL_BY_ID['33'] = '/moto-racing/';
	SPORT_LIST['cycling'] = 34;
	SPORT_LIST_BY_ID['34'] = 'cycling';
	SPORT_URL_BY_ID['34'] = '/cycling/';
	SPORT_LIST['horse-racing'] = 35;
	SPORT_LIST_BY_ID['35'] = 'horse-racing';
	SPORT_URL_BY_ID['35'] = '/horse-racing/';
	SPORT_LIST['esports'] = 36;
	SPORT_LIST_BY_ID['36'] = 'esports';
	SPORT_URL_BY_ID['36'] = '/esports/';
	SPORT_LIST['winter-sports'] = 37;
	SPORT_LIST_BY_ID['37'] = 'winter-sports';
	SPORT_URL_BY_ID['37'] = '/winter-sports/';
	SPORT_LIST['winter-sports-ski-jumping'] = 38;
	SPORT_LIST_BY_ID['38'] = 'winter-sports-ski-jumping';
	SPORT_URL_BY_ID['38'] = '/ski-jumping/';
	SPORT_LIST['winter-sports-alpine-skiing'] = 39;
	SPORT_LIST_BY_ID['39'] = 'winter-sports-alpine-skiing';
	SPORT_URL_BY_ID['39'] = '/alpine-skiing/';
	SPORT_LIST['winter-sports-cross-country'] = 40;
	SPORT_LIST_BY_ID['40'] = 'winter-sports-cross-country';
	SPORT_URL_BY_ID['40'] = '/cross-country-skiing/';
	SPORT_LIST['winter-sports-biathlon'] = 41;
	SPORT_LIST_BY_ID['41'] = 'winter-sports-biathlon';
	SPORT_URL_BY_ID['41'] = '/biathlon/';
	SPORT_LIST['kabaddi'] = 42;
	SPORT_LIST_BY_ID['42'] = 'kabaddi';
	SPORT_URL_BY_ID['42'] = '/kabaddi/';

    var SPORT_SCORE_PART_LIST                    = new Array();
	SPORT_SCORE_PART_LIST['soccer'] = 1;
	SPORT_SCORE_PART_LIST['tennis'] = 5;
	SPORT_SCORE_PART_LIST['basketball'] = 5;
	SPORT_SCORE_PART_LIST['hockey'] = 5;
	SPORT_SCORE_PART_LIST['american-football'] = 5;
	SPORT_SCORE_PART_LIST['baseball'] = 10;
	SPORT_SCORE_PART_LIST['handball'] = 3;
	SPORT_SCORE_PART_LIST['rugby-union'] = 4;
	SPORT_SCORE_PART_LIST['floorball'] = 5;
	SPORT_SCORE_PART_LIST['bandy'] = 4;
	SPORT_SCORE_PART_LIST['futsal'] = 4;
	SPORT_SCORE_PART_LIST['volleyball'] = 5;
	SPORT_SCORE_PART_LIST['cricket'] = 2;
	SPORT_SCORE_PART_LIST['darts'] = 0;
	SPORT_SCORE_PART_LIST['snooker'] = 0;
	SPORT_SCORE_PART_LIST['boxing'] = 0;
	SPORT_SCORE_PART_LIST['beach-volleyball'] = 3;
	SPORT_SCORE_PART_LIST['aussie-rules'] = 4;
	SPORT_SCORE_PART_LIST['rugby-league'] = 4;
	SPORT_SCORE_PART_LIST['badminton'] = 3;
	SPORT_SCORE_PART_LIST['water-polo'] = 6;
	SPORT_SCORE_PART_LIST['golf'] = 0;
	SPORT_SCORE_PART_LIST['field-hockey'] = 4;
	SPORT_SCORE_PART_LIST['table-tennis'] = 7;
	SPORT_SCORE_PART_LIST['beach-soccer'] = 5;
	SPORT_SCORE_PART_LIST['mma'] = 0;
	SPORT_SCORE_PART_LIST['netball'] = 5;
	SPORT_SCORE_PART_LIST['pesapallo'] = 11;
	SPORT_SCORE_PART_LIST['motorsport'] = 0;
	SPORT_SCORE_PART_LIST['motorsport-auto-racing'] = 0;
	SPORT_SCORE_PART_LIST['motorsport-moto-racing'] = 0;
	SPORT_SCORE_PART_LIST['cycling'] = 0;
	SPORT_SCORE_PART_LIST['horse-racing'] = 0;
	SPORT_SCORE_PART_LIST['esports'] = 0;
	SPORT_SCORE_PART_LIST['winter-sports'] = 0;
	SPORT_SCORE_PART_LIST['winter-sports-ski-jumping'] = 0;
	SPORT_SCORE_PART_LIST['winter-sports-alpine-skiing'] = 0;
	SPORT_SCORE_PART_LIST['winter-sports-cross-country'] = 0;
	SPORT_SCORE_PART_LIST['winter-sports-biathlon'] = 0;
	SPORT_SCORE_PART_LIST['kabaddi'] = 3;

    var ICON_LIST                    = new Array('info','tv','shirt');

    var TXT_SPORT                    = new Array();
	TXT_SPORT['soccer']                = new Array();
	TXT_SPORT['soccer']['name'] = 'Football';
	TXT_SPORT['soccer']['1'] = '&nbsp;';
	TXT_SPORT['soccer']['45'] = 'To finish';
	TXT_SPORT['soccer']['42'] = 'Awaiting<br />updates';
	TXT_SPORT['soccer']['2'] = 'Live';
	TXT_SPORT['soccer']['12'] = '1st Half';
	TXT_SPORT['soccer']['13'] = '2nd Half';
	TXT_SPORT['soccer']['6'] = 'Extra Time';
	TXT_SPORT['soccer']['7'] = 'Penalties';
	TXT_SPORT['soccer']['38'] = 'Half Time';
	TXT_SPORT['soccer']['46'] = 'Break Time';
	TXT_SPORT['soccer']['3'] = 'Finished';
	TXT_SPORT['soccer']['10'] = 'After ET';
	TXT_SPORT['soccer']['11'] = 'After Pen.';
	TXT_SPORT['soccer']['9'] = 'Walkover';
	TXT_SPORT['soccer']['43'] = 'Delayed';
	TXT_SPORT['soccer']['36'] = 'Interrupted';
	TXT_SPORT['soccer']['4'] = 'Postponed';
	TXT_SPORT['soccer']['5'] = 'Cancelled';
	TXT_SPORT['soccer']['37'] = 'Abandoned';
	TXT_SPORT['soccer']['54'] = 'Awarded';
	TXT_SPORT['tennis']                = new Array();
	TXT_SPORT['tennis']['name'] = 'Tennis';
	TXT_SPORT['tennis']['1'] = '&nbsp;';
	TXT_SPORT['tennis']['45'] = 'To finish';
	TXT_SPORT['tennis']['42'] = 'Awaiting<br />updates';
	TXT_SPORT['tennis']['2'] = 'Live';
	TXT_SPORT['tennis']['17'] = 'Set 1';
	TXT_SPORT['tennis']['18'] = 'Set 2';
	TXT_SPORT['tennis']['19'] = 'Set 3';
	TXT_SPORT['tennis']['20'] = 'Set 4';
	TXT_SPORT['tennis']['21'] = 'Set 5';
	TXT_SPORT['tennis']['47'] = 'Set 1<br />Tiebreak';
	TXT_SPORT['tennis']['48'] = 'Set 2<br />Tiebreak';
	TXT_SPORT['tennis']['49'] = 'Set 3<br />Tiebreak';
	TXT_SPORT['tennis']['50'] = 'Set 4<br />Tiebreak';
	TXT_SPORT['tennis']['51'] = 'Set 5<br />Tiebreak';
	TXT_SPORT['tennis']['46'] = 'Break Time';
	TXT_SPORT['tennis']['3'] = 'Finished';
	TXT_SPORT['tennis']['8'] = 'Finished<br />(retired)';
	TXT_SPORT['tennis']['9'] = 'Walkover';
	TXT_SPORT['tennis']['43'] = 'Delayed';
	TXT_SPORT['tennis']['36'] = 'Interrupted';
	TXT_SPORT['tennis']['4'] = 'Postponed';
	TXT_SPORT['tennis']['5'] = 'Cancelled';
	TXT_SPORT['tennis']['37'] = 'Abandoned';
	TXT_SPORT['tennis']['54'] = 'Awarded';
	TXT_SPORT['tennis']['57'] = 'After<br />day 1';
	TXT_SPORT['tennis']['58'] = 'After<br />day 2';
	TXT_SPORT['tennis']['335'] = 'Medic.';
	TXT_SPORT['basketball']                = new Array();
	TXT_SPORT['basketball']['name'] = 'Basketball';
	TXT_SPORT['basketball']['1'] = '&nbsp;';
	TXT_SPORT['basketball']['45'] = 'To finish';
	TXT_SPORT['basketball']['42'] = 'Awaiting<br />updates';
	TXT_SPORT['basketball']['2'] = 'Live';
	TXT_SPORT['basketball']['22'] = '1st Quarter';
	TXT_SPORT['basketball']['23'] = '2nd Quarter';
	TXT_SPORT['basketball']['24'] = '3rd Quarter';
	TXT_SPORT['basketball']['25'] = '4th Quarter';
	TXT_SPORT['basketball']['6'] = 'Overtime';
	TXT_SPORT['basketball']['38'] = 'Half Time';
	TXT_SPORT['basketball']['46'] = 'Break Time';
	TXT_SPORT['basketball']['3'] = 'Finished';
	TXT_SPORT['basketball']['10'] = 'After Overtime';
	TXT_SPORT['basketball']['9'] = 'Walkover';
	TXT_SPORT['basketball']['43'] = 'Delayed';
	TXT_SPORT['basketball']['36'] = 'Interrupted';
	TXT_SPORT['basketball']['4'] = 'Postponed';
	TXT_SPORT['basketball']['5'] = 'Cancelled';
	TXT_SPORT['basketball']['37'] = 'Abandoned';
	TXT_SPORT['basketball']['54'] = 'Awarded';
	TXT_SPORT['hockey']                = new Array();
	TXT_SPORT['hockey']['name'] = 'Hockey';
	TXT_SPORT['hockey']['1'] = '&nbsp;';
	TXT_SPORT['hockey']['45'] = 'To finish';
	TXT_SPORT['hockey']['42'] = 'Awaiting<br />updates';
	TXT_SPORT['hockey']['2'] = 'Live';
	TXT_SPORT['hockey']['14'] = '1st Period';
	TXT_SPORT['hockey']['15'] = '2nd Period';
	TXT_SPORT['hockey']['16'] = '3rd Period';
	TXT_SPORT['hockey']['6'] = 'Overtime';
	TXT_SPORT['hockey']['7'] = 'Penalties';
	TXT_SPORT['hockey']['46'] = 'Break Time';
	TXT_SPORT['hockey']['3'] = 'Finished';
	TXT_SPORT['hockey']['10'] = 'After Overtime';
	TXT_SPORT['hockey']['11'] = 'After Penalties';
	TXT_SPORT['hockey']['9'] = 'Walkover';
	TXT_SPORT['hockey']['43'] = 'Delayed';
	TXT_SPORT['hockey']['36'] = 'Interrupted';
	TXT_SPORT['hockey']['4'] = 'Postponed';
	TXT_SPORT['hockey']['5'] = 'Cancelled';
	TXT_SPORT['hockey']['37'] = 'Abandoned';
	TXT_SPORT['hockey']['54'] = 'Awarded';
	TXT_SPORT['american-football']                = new Array();
	TXT_SPORT['american-football']['name'] = 'American football';
	TXT_SPORT['american-football']['1'] = '&nbsp;';
	TXT_SPORT['american-football']['45'] = 'To finish';
	TXT_SPORT['american-football']['42'] = 'Awaiting<br />updates';
	TXT_SPORT['american-football']['2'] = 'Live';
	TXT_SPORT['american-football']['22'] = '1st Quarter';
	TXT_SPORT['american-football']['23'] = '2nd Quarter';
	TXT_SPORT['american-football']['24'] = '3rd Quarter';
	TXT_SPORT['american-football']['25'] = '4th Quarter';
	TXT_SPORT['american-football']['6'] = 'Overtime';
	TXT_SPORT['american-football']['38'] = 'Half Time';
	TXT_SPORT['american-football']['46'] = 'Break Time';
	TXT_SPORT['american-football']['3'] = 'Finished';
	TXT_SPORT['american-football']['10'] = 'After Overtime';
	TXT_SPORT['american-football']['9'] = 'Walkover';
	TXT_SPORT['american-football']['43'] = 'Delayed';
	TXT_SPORT['american-football']['36'] = 'Interrupted';
	TXT_SPORT['american-football']['4'] = 'Postponed';
	TXT_SPORT['american-football']['5'] = 'Cancelled';
	TXT_SPORT['american-football']['37'] = 'Abandoned';
	TXT_SPORT['american-football']['54'] = 'Awarded';
	TXT_SPORT['baseball']                = new Array();
	TXT_SPORT['baseball']['name'] = 'Baseball';
	TXT_SPORT['baseball']['1'] = '&nbsp;';
	TXT_SPORT['baseball']['45'] = 'To finish';
	TXT_SPORT['baseball']['42'] = 'Awaiting<br />updates';
	TXT_SPORT['baseball']['2'] = 'Live';
	TXT_SPORT['baseball']['26'] = '1st Inning';
	TXT_SPORT['baseball']['27'] = '2nd Inning';
	TXT_SPORT['baseball']['28'] = '3rd Inning';
	TXT_SPORT['baseball']['29'] = '4th Inning';
	TXT_SPORT['baseball']['30'] = '5th Inning';
	TXT_SPORT['baseball']['31'] = '6th Inning';
	TXT_SPORT['baseball']['32'] = '7th Inning';
	TXT_SPORT['baseball']['33'] = '8th Inning';
	TXT_SPORT['baseball']['34'] = '9th Inning';
	TXT_SPORT['baseball']['35'] = 'Extra<br />Inning';
	TXT_SPORT['baseball']['46'] = 'Break Time';
	TXT_SPORT['baseball']['3'] = 'Finished';
	TXT_SPORT['baseball']['9'] = 'Walkover';
	TXT_SPORT['baseball']['43'] = 'Delayed';
	TXT_SPORT['baseball']['36'] = 'Interrupted';
	TXT_SPORT['baseball']['4'] = 'Postponed';
	TXT_SPORT['baseball']['5'] = 'Cancelled';
	TXT_SPORT['baseball']['37'] = 'Abandoned';
	TXT_SPORT['baseball']['54'] = 'Awarded';
	TXT_SPORT['handball']                = new Array();
	TXT_SPORT['handball']['name'] = 'Handball';
	TXT_SPORT['handball']['1'] = '&nbsp;';
	TXT_SPORT['handball']['45'] = 'To finish';
	TXT_SPORT['handball']['42'] = 'Awaiting<br />updates';
	TXT_SPORT['handball']['2'] = 'Live';
	TXT_SPORT['handball']['12'] = '1st Half';
	TXT_SPORT['handball']['38'] = 'Half Time';
	TXT_SPORT['handball']['13'] = '2nd Half';
	TXT_SPORT['handball']['6'] = 'Extra Time';
	TXT_SPORT['handball']['7'] = 'Penalties';
	TXT_SPORT['handball']['46'] = 'Break Time';
	TXT_SPORT['handball']['3'] = 'Finished';
	TXT_SPORT['handball']['10'] = 'After ET';
	TXT_SPORT['handball']['11'] = 'After Penalties';
	TXT_SPORT['handball']['9'] = 'Walkover';
	TXT_SPORT['handball']['43'] = 'Delayed';
	TXT_SPORT['handball']['36'] = 'Interrupted';
	TXT_SPORT['handball']['4'] = 'Postponed';
	TXT_SPORT['handball']['5'] = 'Cancelled';
	TXT_SPORT['handball']['37'] = 'Abandoned';
	TXT_SPORT['handball']['54'] = 'Awarded';
	TXT_SPORT['rugby-union']                = new Array();
	TXT_SPORT['rugby-union']['name'] = 'Rugby Union';
	TXT_SPORT['rugby-union']['1'] = '&nbsp;';
	TXT_SPORT['rugby-union']['45'] = 'To finish';
	TXT_SPORT['rugby-union']['42'] = 'Awaiting<br />updates';
	TXT_SPORT['rugby-union']['2'] = 'Live';
	TXT_SPORT['rugby-union']['12'] = '1st Half';
	TXT_SPORT['rugby-union']['38'] = 'Half Time';
	TXT_SPORT['rugby-union']['13'] = '2nd Half';
	TXT_SPORT['rugby-union']['6'] = 'Extra Time';
	TXT_SPORT['rugby-union']['7'] = 'Penalties';
	TXT_SPORT['rugby-union']['46'] = 'Break Time';
	TXT_SPORT['rugby-union']['3'] = 'Finished';
	TXT_SPORT['rugby-union']['10'] = 'After ET';
	TXT_SPORT['rugby-union']['11'] = 'After Penalties';
	TXT_SPORT['rugby-union']['9'] = 'Walkover';
	TXT_SPORT['rugby-union']['43'] = 'Delayed';
	TXT_SPORT['rugby-union']['36'] = 'Interrupted';
	TXT_SPORT['rugby-union']['4'] = 'Postponed';
	TXT_SPORT['rugby-union']['5'] = 'Cancelled';
	TXT_SPORT['rugby-union']['37'] = 'Abandoned';
	TXT_SPORT['rugby-union']['54'] = 'Awarded';
	TXT_SPORT['floorball']                = new Array();
	TXT_SPORT['floorball']['name'] = 'Floorball';
	TXT_SPORT['floorball']['1'] = '&nbsp;';
	TXT_SPORT['floorball']['45'] = 'To finish';
	TXT_SPORT['floorball']['42'] = 'Awaiting<br />updates';
	TXT_SPORT['floorball']['2'] = 'Live';
	TXT_SPORT['floorball']['14'] = '1st Period';
	TXT_SPORT['floorball']['15'] = '2nd Period';
	TXT_SPORT['floorball']['16'] = '3rd Period';
	TXT_SPORT['floorball']['6'] = 'Overtime';
	TXT_SPORT['floorball']['7'] = 'Penalties';
	TXT_SPORT['floorball']['46'] = 'Break Time';
	TXT_SPORT['floorball']['3'] = 'Finished';
	TXT_SPORT['floorball']['10'] = 'After Overtime';
	TXT_SPORT['floorball']['11'] = 'After Penalties';
	TXT_SPORT['floorball']['9'] = 'Walkover';
	TXT_SPORT['floorball']['43'] = 'Delayed';
	TXT_SPORT['floorball']['36'] = 'Interrupted';
	TXT_SPORT['floorball']['4'] = 'Postponed';
	TXT_SPORT['floorball']['5'] = 'Cancelled';
	TXT_SPORT['floorball']['37'] = 'Abandoned';
	TXT_SPORT['floorball']['54'] = 'Awarded';
	TXT_SPORT['bandy']                = new Array();
	TXT_SPORT['bandy']['name'] = 'Bandy';
	TXT_SPORT['bandy']['1'] = '&nbsp;';
	TXT_SPORT['bandy']['45'] = 'To finish';
	TXT_SPORT['bandy']['42'] = 'Awaiting<br />updates';
	TXT_SPORT['bandy']['2'] = 'Live';
	TXT_SPORT['bandy']['12'] = '1st Half';
	TXT_SPORT['bandy']['38'] = 'Half Time';
	TXT_SPORT['bandy']['13'] = '2nd Half';
	TXT_SPORT['bandy']['6'] = 'Extra Time';
	TXT_SPORT['bandy']['7'] = 'Penalties';
	TXT_SPORT['bandy']['46'] = 'Break Time';
	TXT_SPORT['bandy']['3'] = 'Finished';
	TXT_SPORT['bandy']['10'] = 'After Overtime';
	TXT_SPORT['bandy']['11'] = 'After Penalties';
	TXT_SPORT['bandy']['9'] = 'Walkover';
	TXT_SPORT['bandy']['43'] = 'Delayed';
	TXT_SPORT['bandy']['36'] = 'Interrupted';
	TXT_SPORT['bandy']['4'] = 'Postponed';
	TXT_SPORT['bandy']['5'] = 'Cancelled';
	TXT_SPORT['bandy']['37'] = 'Abandoned';
	TXT_SPORT['bandy']['54'] = 'Awarded';
	TXT_SPORT['futsal']                = new Array();
	TXT_SPORT['futsal']['name'] = 'Futsal';
	TXT_SPORT['futsal']['1'] = '&nbsp;';
	TXT_SPORT['futsal']['45'] = 'To finish';
	TXT_SPORT['futsal']['42'] = 'Awaiting<br />updates';
	TXT_SPORT['futsal']['2'] = 'Live';
	TXT_SPORT['futsal']['12'] = '1st Half';
	TXT_SPORT['futsal']['38'] = 'Half Time';
	TXT_SPORT['futsal']['13'] = '2nd Half';
	TXT_SPORT['futsal']['6'] = 'Extra Time';
	TXT_SPORT['futsal']['7'] = 'Penalties';
	TXT_SPORT['futsal']['46'] = 'Break Time';
	TXT_SPORT['futsal']['3'] = 'Finished';
	TXT_SPORT['futsal']['10'] = 'After ET';
	TXT_SPORT['futsal']['11'] = 'After Pen.';
	TXT_SPORT['futsal']['9'] = 'Walkover';
	TXT_SPORT['futsal']['43'] = 'Delayed';
	TXT_SPORT['futsal']['36'] = 'Interrupted';
	TXT_SPORT['futsal']['4'] = 'Postponed';
	TXT_SPORT['futsal']['5'] = 'Cancelled';
	TXT_SPORT['futsal']['37'] = 'Abandoned';
	TXT_SPORT['futsal']['54'] = 'Awarded';
	TXT_SPORT['volleyball']                = new Array();
	TXT_SPORT['volleyball']['name'] = 'Volleyball';
	TXT_SPORT['volleyball']['1'] = '&nbsp;';
	TXT_SPORT['volleyball']['45'] = 'To finish';
	TXT_SPORT['volleyball']['42'] = 'Awaiting<br />updates';
	TXT_SPORT['volleyball']['2'] = 'Live';
	TXT_SPORT['volleyball']['17'] = 'Set 1';
	TXT_SPORT['volleyball']['18'] = 'Set 2';
	TXT_SPORT['volleyball']['19'] = 'Set 3';
	TXT_SPORT['volleyball']['20'] = 'Set 4';
	TXT_SPORT['volleyball']['21'] = 'Set 5';
	TXT_SPORT['volleyball']['55'] = 'Set 6';
	TXT_SPORT['volleyball']['56'] = 'Set 7';
	TXT_SPORT['volleyball']['46'] = 'Break Time';
	TXT_SPORT['volleyball']['3'] = 'Finished';
	TXT_SPORT['volleyball']['9'] = 'Walkover';
	TXT_SPORT['volleyball']['43'] = 'Delayed';
	TXT_SPORT['volleyball']['36'] = 'Interrupted';
	TXT_SPORT['volleyball']['4'] = 'Postponed';
	TXT_SPORT['volleyball']['5'] = 'Cancelled';
	TXT_SPORT['volleyball']['37'] = 'Abandoned';
	TXT_SPORT['volleyball']['54'] = 'Awarded';
	TXT_SPORT['cricket']                = new Array();
	TXT_SPORT['cricket']['name'] = 'Cricket';
	TXT_SPORT['cricket']['1'] = '&nbsp;';
	TXT_SPORT['cricket']['45'] = 'To finish';
	TXT_SPORT['cricket']['42'] = 'Awaiting<br />updates';
	TXT_SPORT['cricket']['2'] = 'Live';
	TXT_SPORT['cricket']['26'] = '1st Innings';
	TXT_SPORT['cricket']['27'] = '2nd Innings';
	TXT_SPORT['cricket']['57'] = 'After<br />day 1';
	TXT_SPORT['cricket']['58'] = 'After<br />day 2';
	TXT_SPORT['cricket']['59'] = 'After<br />day 3';
	TXT_SPORT['cricket']['60'] = 'After<br />day 4';
	TXT_SPORT['cricket']['61'] = 'After<br />day 5';
	TXT_SPORT['cricket']['46'] = 'Break Time';
	TXT_SPORT['cricket']['3'] = 'Finished';
	TXT_SPORT['cricket']['9'] = 'Walkover';
	TXT_SPORT['cricket']['43'] = 'Delayed';
	TXT_SPORT['cricket']['36'] = 'Interrupted';
	TXT_SPORT['cricket']['4'] = 'Postponed';
	TXT_SPORT['cricket']['5'] = 'Cancelled';
	TXT_SPORT['cricket']['37'] = 'Abandoned';
	TXT_SPORT['cricket']['54'] = 'Awarded';
	TXT_SPORT['cricket']['333'] = 'Lunch';
	TXT_SPORT['cricket']['334'] = 'Tea';
	TXT_SPORT['darts']                = new Array();
	TXT_SPORT['darts']['name'] = 'Darts';
	TXT_SPORT['darts']['1'] = '&nbsp;';
	TXT_SPORT['darts']['45'] = 'To finish';
	TXT_SPORT['darts']['42'] = 'Awaiting<br />updates';
	TXT_SPORT['darts']['2'] = 'Live';
	TXT_SPORT['darts']['17'] = 'Set 1';
	TXT_SPORT['darts']['18'] = 'Set 2';
	TXT_SPORT['darts']['19'] = 'Set 3';
	TXT_SPORT['darts']['20'] = 'Set 4';
	TXT_SPORT['darts']['21'] = 'Set 5';
	TXT_SPORT['darts']['55'] = 'Set 6';
	TXT_SPORT['darts']['56'] = 'Set 7';
	TXT_SPORT['darts']['324'] = 'Set 8';
	TXT_SPORT['darts']['325'] = 'Set 9';
	TXT_SPORT['darts']['326'] = 'Set 10';
	TXT_SPORT['darts']['327'] = 'Set 11';
	TXT_SPORT['darts']['328'] = 'Set 12';
	TXT_SPORT['darts']['329'] = 'Set 13';
	TXT_SPORT['darts']['46'] = 'Break Time';
	TXT_SPORT['darts']['3'] = 'Finished';
	TXT_SPORT['darts']['9'] = 'Walkover';
	TXT_SPORT['darts']['43'] = 'Delayed';
	TXT_SPORT['darts']['36'] = 'Interrupted';
	TXT_SPORT['darts']['4'] = 'Postponed';
	TXT_SPORT['darts']['5'] = 'Cancelled';
	TXT_SPORT['darts']['37'] = 'Abandoned';
	TXT_SPORT['darts']['54'] = 'Awarded';
	TXT_SPORT['snooker']                = new Array();
	TXT_SPORT['snooker']['name'] = 'Snooker';
	TXT_SPORT['snooker']['1'] = '&nbsp;';
	TXT_SPORT['snooker']['45'] = 'To finish';
	TXT_SPORT['snooker']['42'] = 'Awaiting<br />updates';
	TXT_SPORT['snooker']['2'] = 'Live';
	TXT_SPORT['snooker']['46'] = 'Break Time';
	TXT_SPORT['snooker']['3'] = 'Finished';
	TXT_SPORT['snooker']['9'] = 'Walkover';
	TXT_SPORT['snooker']['43'] = 'Delayed';
	TXT_SPORT['snooker']['36'] = 'Interrupted';
	TXT_SPORT['snooker']['4'] = 'Postponed';
	TXT_SPORT['snooker']['5'] = 'Cancelled';
	TXT_SPORT['snooker']['37'] = 'Abandoned';
	TXT_SPORT['snooker']['54'] = 'Awarded';
	TXT_SPORT['boxing']                = new Array();
	TXT_SPORT['boxing']['name'] = 'Boxing';
	TXT_SPORT['boxing']['1'] = '&nbsp;';
	TXT_SPORT['boxing']['45'] = 'To finish';
	TXT_SPORT['boxing']['42'] = 'Awaiting<br />updates';
	TXT_SPORT['boxing']['2'] = 'Live';
	TXT_SPORT['boxing']['46'] = 'Break Time';
	TXT_SPORT['boxing']['3'] = 'Finished';
	TXT_SPORT['boxing']['9'] = 'Walkover';
	TXT_SPORT['boxing']['43'] = 'Delayed';
	TXT_SPORT['boxing']['36'] = 'Interrupted';
	TXT_SPORT['boxing']['4'] = 'Postponed';
	TXT_SPORT['boxing']['5'] = 'Cancelled';
	TXT_SPORT['boxing']['37'] = 'Abandoned';
	TXT_SPORT['boxing']['54'] = 'Awarded';
	TXT_SPORT['beach-volleyball']                = new Array();
	TXT_SPORT['beach-volleyball']['name'] = 'Beach volleyball';
	TXT_SPORT['beach-volleyball']['1'] = '&nbsp;';
	TXT_SPORT['beach-volleyball']['45'] = 'To finish';
	TXT_SPORT['beach-volleyball']['42'] = 'Awaiting<br />updates';
	TXT_SPORT['beach-volleyball']['2'] = 'Live';
	TXT_SPORT['beach-volleyball']['17'] = 'Set 1';
	TXT_SPORT['beach-volleyball']['18'] = 'Set 2';
	TXT_SPORT['beach-volleyball']['19'] = 'Set 3';
	TXT_SPORT['beach-volleyball']['20'] = 'Set 4';
	TXT_SPORT['beach-volleyball']['21'] = 'Set 5';
	TXT_SPORT['beach-volleyball']['46'] = 'Break Time';
	TXT_SPORT['beach-volleyball']['3'] = 'Finished';
	TXT_SPORT['beach-volleyball']['8'] = 'Finished<br />(retired)';
	TXT_SPORT['beach-volleyball']['9'] = 'Walkover';
	TXT_SPORT['beach-volleyball']['43'] = 'Delayed';
	TXT_SPORT['beach-volleyball']['36'] = 'Interrupted';
	TXT_SPORT['beach-volleyball']['4'] = 'Postponed';
	TXT_SPORT['beach-volleyball']['5'] = 'Cancelled';
	TXT_SPORT['beach-volleyball']['37'] = 'Abandoned';
	TXT_SPORT['beach-volleyball']['54'] = 'Awarded';
	TXT_SPORT['aussie-rules']                = new Array();
	TXT_SPORT['aussie-rules']['name'] = 'Aussie rules';
	TXT_SPORT['aussie-rules']['1'] = '&nbsp;';
	TXT_SPORT['aussie-rules']['45'] = 'To finish';
	TXT_SPORT['aussie-rules']['42'] = 'Awaiting<br />updates';
	TXT_SPORT['aussie-rules']['2'] = 'Live';
	TXT_SPORT['aussie-rules']['22'] = '1st Quarter';
	TXT_SPORT['aussie-rules']['23'] = '2nd Quarter';
	TXT_SPORT['aussie-rules']['24'] = '3rd Quarter';
	TXT_SPORT['aussie-rules']['25'] = '4th Quarter';
	TXT_SPORT['aussie-rules']['6'] = 'Overtime';
	TXT_SPORT['aussie-rules']['38'] = 'Half Time';
	TXT_SPORT['aussie-rules']['46'] = 'Break Time';
	TXT_SPORT['aussie-rules']['3'] = 'Finished';
	TXT_SPORT['aussie-rules']['10'] = 'After Overtime';
	TXT_SPORT['aussie-rules']['9'] = 'Walkover';
	TXT_SPORT['aussie-rules']['43'] = 'Delayed';
	TXT_SPORT['aussie-rules']['36'] = 'Interrupted';
	TXT_SPORT['aussie-rules']['4'] = 'Postponed';
	TXT_SPORT['aussie-rules']['5'] = 'Cancelled';
	TXT_SPORT['aussie-rules']['37'] = 'Abandoned';
	TXT_SPORT['aussie-rules']['54'] = 'Awarded';
	TXT_SPORT['rugby-league']                = new Array();
	TXT_SPORT['rugby-league']['name'] = 'Rugby League';
	TXT_SPORT['rugby-league']['1'] = '&nbsp;';
	TXT_SPORT['rugby-league']['45'] = 'To finish';
	TXT_SPORT['rugby-league']['42'] = 'Awaiting<br />updates';
	TXT_SPORT['rugby-league']['2'] = 'Live';
	TXT_SPORT['rugby-league']['12'] = '1st Half';
	TXT_SPORT['rugby-league']['38'] = 'Half Time';
	TXT_SPORT['rugby-league']['13'] = '2nd Half';
	TXT_SPORT['rugby-league']['6'] = 'Extra Time';
	TXT_SPORT['rugby-league']['7'] = 'Penalties';
	TXT_SPORT['rugby-league']['46'] = 'Break Time';
	TXT_SPORT['rugby-league']['3'] = 'Finished';
	TXT_SPORT['rugby-league']['10'] = 'After ET';
	TXT_SPORT['rugby-league']['11'] = 'After Penalties';
	TXT_SPORT['rugby-league']['9'] = 'Walkover';
	TXT_SPORT['rugby-league']['43'] = 'Delayed';
	TXT_SPORT['rugby-league']['36'] = 'Interrupted';
	TXT_SPORT['rugby-league']['4'] = 'Postponed';
	TXT_SPORT['rugby-league']['5'] = 'Cancelled';
	TXT_SPORT['rugby-league']['37'] = 'Abandoned';
	TXT_SPORT['rugby-league']['54'] = 'Awarded';
	TXT_SPORT['badminton']                = new Array();
	TXT_SPORT['badminton']['name'] = 'Badminton';
	TXT_SPORT['badminton']['1'] = '&nbsp;';
	TXT_SPORT['badminton']['45'] = 'To finish';
	TXT_SPORT['badminton']['42'] = 'Awaiting<br />updates';
	TXT_SPORT['badminton']['2'] = 'Live';
	TXT_SPORT['badminton']['17'] = 'Set 1';
	TXT_SPORT['badminton']['18'] = 'Set 2';
	TXT_SPORT['badminton']['19'] = 'Set 3';
	TXT_SPORT['badminton']['46'] = 'Break Time';
	TXT_SPORT['badminton']['3'] = 'Finished';
	TXT_SPORT['badminton']['8'] = 'Finished<br />(retired)';
	TXT_SPORT['badminton']['9'] = 'Walkover';
	TXT_SPORT['badminton']['43'] = 'Delayed';
	TXT_SPORT['badminton']['36'] = 'Interrupted';
	TXT_SPORT['badminton']['4'] = 'Postponed';
	TXT_SPORT['badminton']['5'] = 'Cancelled';
	TXT_SPORT['badminton']['37'] = 'Abandoned';
	TXT_SPORT['badminton']['54'] = 'Awarded';
	TXT_SPORT['water-polo']                = new Array();
	TXT_SPORT['water-polo']['name'] = 'Water polo';
	TXT_SPORT['water-polo']['1'] = '&nbsp;';
	TXT_SPORT['water-polo']['45'] = 'To finish';
	TXT_SPORT['water-polo']['42'] = 'Awaiting<br />updates';
	TXT_SPORT['water-polo']['2'] = 'Live';
	TXT_SPORT['water-polo']['22'] = '1st Quarter';
	TXT_SPORT['water-polo']['23'] = '2nd Quarter';
	TXT_SPORT['water-polo']['24'] = '3rd Quarter';
	TXT_SPORT['water-polo']['25'] = '4th Quarter';
	TXT_SPORT['water-polo']['6'] = 'Extra Time';
	TXT_SPORT['water-polo']['7'] = 'Penalties';
	TXT_SPORT['water-polo']['38'] = 'Half Time';
	TXT_SPORT['water-polo']['46'] = 'Break Time';
	TXT_SPORT['water-polo']['3'] = 'Finished';
	TXT_SPORT['water-polo']['10'] = 'After ET';
	TXT_SPORT['water-polo']['11'] = 'After Penalties';
	TXT_SPORT['water-polo']['9'] = 'Walkover';
	TXT_SPORT['water-polo']['43'] = 'Delayed';
	TXT_SPORT['water-polo']['36'] = 'Interrupted';
	TXT_SPORT['water-polo']['4'] = 'Postponed';
	TXT_SPORT['water-polo']['5'] = 'Cancelled';
	TXT_SPORT['water-polo']['37'] = 'Abandoned';
	TXT_SPORT['water-polo']['54'] = 'Awarded';
	TXT_SPORT['golf']                = new Array();
	TXT_SPORT['golf']['name'] = 'Golf';
	TXT_SPORT['golf']['1'] = '&nbsp;';
	TXT_SPORT['golf']['45'] = 'To finish';
	TXT_SPORT['golf']['42'] = 'Awaiting<br />updates';
	TXT_SPORT['golf']['2'] = 'Live';
	TXT_SPORT['golf']['65'] = 'Round 1';
	TXT_SPORT['golf']['66'] = 'Round 2';
	TXT_SPORT['golf']['67'] = 'Round 3';
	TXT_SPORT['golf']['68'] = 'Round 4';
	TXT_SPORT['golf']['62'] = 'After<br />round 1';
	TXT_SPORT['golf']['63'] = 'After<br />round 2';
	TXT_SPORT['golf']['64'] = 'After<br />round 3';
	TXT_SPORT['golf']['46'] = 'Break Time';
	TXT_SPORT['golf']['3'] = 'Finished';
	TXT_SPORT['golf']['8'] = 'Finished<br />(retired)';
	TXT_SPORT['golf']['9'] = 'Walkover';
	TXT_SPORT['golf']['43'] = 'Delayed';
	TXT_SPORT['golf']['36'] = 'Interrupted';
	TXT_SPORT['golf']['4'] = 'Postponed';
	TXT_SPORT['golf']['5'] = 'Cancelled';
	TXT_SPORT['golf']['37'] = 'Abandoned';
	TXT_SPORT['golf']['54'] = 'Awarded';
	TXT_SPORT['field-hockey']                = new Array();
	TXT_SPORT['field-hockey']['name'] = 'Field hockey';
	TXT_SPORT['field-hockey']['1'] = '&nbsp;';
	TXT_SPORT['field-hockey']['45'] = 'To finish';
	TXT_SPORT['field-hockey']['42'] = 'Awaiting<br />updates';
	TXT_SPORT['field-hockey']['2'] = 'Live';
	TXT_SPORT['field-hockey']['12'] = '1st Half';
	TXT_SPORT['field-hockey']['38'] = 'Half Time';
	TXT_SPORT['field-hockey']['13'] = '2nd Half';
	TXT_SPORT['field-hockey']['6'] = 'Overtime';
	TXT_SPORT['field-hockey']['7'] = 'Penalties';
	TXT_SPORT['field-hockey']['46'] = 'Break Time';
	TXT_SPORT['field-hockey']['3'] = 'Finished';
	TXT_SPORT['field-hockey']['10'] = 'After Overtime';
	TXT_SPORT['field-hockey']['11'] = 'After Penalties';
	TXT_SPORT['field-hockey']['9'] = 'Walkover';
	TXT_SPORT['field-hockey']['43'] = 'Delayed';
	TXT_SPORT['field-hockey']['36'] = 'Interrupted';
	TXT_SPORT['field-hockey']['4'] = 'Postponed';
	TXT_SPORT['field-hockey']['5'] = 'Cancelled';
	TXT_SPORT['field-hockey']['37'] = 'Abandoned';
	TXT_SPORT['field-hockey']['54'] = 'Awarded';
	TXT_SPORT['table-tennis']                = new Array();
	TXT_SPORT['table-tennis']['name'] = 'Table tennis';
	TXT_SPORT['table-tennis']['1'] = '&nbsp;';
	TXT_SPORT['table-tennis']['45'] = 'To finish';
	TXT_SPORT['table-tennis']['42'] = 'Awaiting<br />updates';
	TXT_SPORT['table-tennis']['2'] = 'Live';
	TXT_SPORT['table-tennis']['17'] = 'Set 1';
	TXT_SPORT['table-tennis']['18'] = 'Set 2';
	TXT_SPORT['table-tennis']['19'] = 'Set 3';
	TXT_SPORT['table-tennis']['20'] = 'Set 4';
	TXT_SPORT['table-tennis']['21'] = 'Set 5';
	TXT_SPORT['table-tennis']['55'] = 'Set 6';
	TXT_SPORT['table-tennis']['56'] = 'Set 7';
	TXT_SPORT['table-tennis']['46'] = 'Break Time';
	TXT_SPORT['table-tennis']['3'] = 'Finished';
	TXT_SPORT['table-tennis']['8'] = 'Finished<br />(retired)';
	TXT_SPORT['table-tennis']['9'] = 'Walkover';
	TXT_SPORT['table-tennis']['43'] = 'Delayed';
	TXT_SPORT['table-tennis']['36'] = 'Interrupted';
	TXT_SPORT['table-tennis']['4'] = 'Postponed';
	TXT_SPORT['table-tennis']['5'] = 'Cancelled';
	TXT_SPORT['table-tennis']['37'] = 'Abandoned';
	TXT_SPORT['table-tennis']['54'] = 'Awarded';
	TXT_SPORT['beach-soccer']                = new Array();
	TXT_SPORT['beach-soccer']['name'] = 'Beach soccer';
	TXT_SPORT['beach-soccer']['1'] = '&nbsp;';
	TXT_SPORT['beach-soccer']['45'] = 'To finish';
	TXT_SPORT['beach-soccer']['42'] = 'Awaiting<br />updates';
	TXT_SPORT['beach-soccer']['2'] = 'Live';
	TXT_SPORT['beach-soccer']['14'] = '1st Period';
	TXT_SPORT['beach-soccer']['15'] = '2nd Period';
	TXT_SPORT['beach-soccer']['16'] = '3rd Period';
	TXT_SPORT['beach-soccer']['6'] = 'Extra Time';
	TXT_SPORT['beach-soccer']['7'] = 'Penalties';
	TXT_SPORT['beach-soccer']['46'] = 'Break Time';
	TXT_SPORT['beach-soccer']['3'] = 'Finished';
	TXT_SPORT['beach-soccer']['10'] = 'After ET';
	TXT_SPORT['beach-soccer']['11'] = 'After Pen.';
	TXT_SPORT['beach-soccer']['9'] = 'Walkover';
	TXT_SPORT['beach-soccer']['43'] = 'Delayed';
	TXT_SPORT['beach-soccer']['36'] = 'Interrupted';
	TXT_SPORT['beach-soccer']['4'] = 'Postponed';
	TXT_SPORT['beach-soccer']['5'] = 'Cancelled';
	TXT_SPORT['beach-soccer']['37'] = 'Abandoned';
	TXT_SPORT['beach-soccer']['54'] = 'Awarded';
	TXT_SPORT['mma']                = new Array();
	TXT_SPORT['mma']['name'] = 'MMA';
	TXT_SPORT['mma']['1'] = '&nbsp;';
	TXT_SPORT['mma']['45'] = 'To finish';
	TXT_SPORT['mma']['42'] = 'Awaiting<br />updates';
	TXT_SPORT['mma']['2'] = 'Live';
	TXT_SPORT['mma']['46'] = 'Break Time';
	TXT_SPORT['mma']['3'] = 'Finished';
	TXT_SPORT['mma']['9'] = 'Walkover';
	TXT_SPORT['mma']['43'] = 'Delayed';
	TXT_SPORT['mma']['36'] = 'Interrupted';
	TXT_SPORT['mma']['4'] = 'Postponed';
	TXT_SPORT['mma']['5'] = 'Cancelled';
	TXT_SPORT['mma']['37'] = 'Abandoned';
	TXT_SPORT['mma']['54'] = 'Awarded';
	TXT_SPORT['netball']                = new Array();
	TXT_SPORT['netball']['name'] = 'Netball';
	TXT_SPORT['netball']['1'] = '&nbsp;';
	TXT_SPORT['netball']['45'] = 'To finish';
	TXT_SPORT['netball']['42'] = 'Awaiting<br />updates';
	TXT_SPORT['netball']['2'] = 'Live';
	TXT_SPORT['netball']['22'] = '1st Quarter';
	TXT_SPORT['netball']['23'] = '2nd Quarter';
	TXT_SPORT['netball']['24'] = '3rd Quarter';
	TXT_SPORT['netball']['25'] = '4th Quarter';
	TXT_SPORT['netball']['6'] = 'Overtime';
	TXT_SPORT['netball']['38'] = 'Half Time';
	TXT_SPORT['netball']['46'] = 'Break Time';
	TXT_SPORT['netball']['3'] = 'Finished';
	TXT_SPORT['netball']['10'] = 'After Overtime';
	TXT_SPORT['netball']['9'] = 'Walkover';
	TXT_SPORT['netball']['43'] = 'Delayed';
	TXT_SPORT['netball']['36'] = 'Interrupted';
	TXT_SPORT['netball']['4'] = 'Postponed';
	TXT_SPORT['netball']['5'] = 'Cancelled';
	TXT_SPORT['netball']['37'] = 'Abandoned';
	TXT_SPORT['netball']['54'] = 'Awarded';
	TXT_SPORT['pesapallo']                = new Array();
	TXT_SPORT['pesapallo']['name'] = 'Pesäpallo';
	TXT_SPORT['pesapallo']['1'] = '&nbsp;';
	TXT_SPORT['pesapallo']['45'] = 'To finish';
	TXT_SPORT['pesapallo']['42'] = 'Awaiting<br />updates';
	TXT_SPORT['pesapallo']['2'] = 'Live';
	TXT_SPORT['pesapallo']['26'] = '1st Inning';
	TXT_SPORT['pesapallo']['27'] = '2nd Inning';
	TXT_SPORT['pesapallo']['28'] = '3rd Inning';
	TXT_SPORT['pesapallo']['29'] = '4th Inning';
	TXT_SPORT['pesapallo']['30'] = '5th Inning';
	TXT_SPORT['pesapallo']['31'] = '6th Inning';
	TXT_SPORT['pesapallo']['32'] = '7th Inning';
	TXT_SPORT['pesapallo']['33'] = '8th Inning';
	TXT_SPORT['pesapallo']['35'] = 'Extra Inning';
	TXT_SPORT['pesapallo']['7'] = 'Penalties';
	TXT_SPORT['pesapallo']['46'] = 'Break Time';
	TXT_SPORT['pesapallo']['3'] = 'Finished';
	TXT_SPORT['pesapallo']['69'] = 'After EI';
	TXT_SPORT['pesapallo']['11'] = 'After Penalties';
	TXT_SPORT['pesapallo']['9'] = 'Walkover';
	TXT_SPORT['pesapallo']['43'] = 'Delayed';
	TXT_SPORT['pesapallo']['36'] = 'Interrupted';
	TXT_SPORT['pesapallo']['4'] = 'Postponed';
	TXT_SPORT['pesapallo']['5'] = 'Cancelled';
	TXT_SPORT['pesapallo']['37'] = 'Abandoned';
	TXT_SPORT['pesapallo']['54'] = 'Awarded';
	TXT_SPORT['motorsport']                = new Array();
	TXT_SPORT['motorsport']['name'] = 'Motorsport';
	TXT_SPORT['motorsport-auto-racing']                = new Array();
	TXT_SPORT['motorsport-auto-racing']['name'] = 'Auto Racing';
	TXT_SPORT['motorsport-auto-racing']['1'] = '&nbsp;';
	TXT_SPORT['motorsport-auto-racing']['2'] = 'Live';
	TXT_SPORT['motorsport-auto-racing']['3'] = 'Finished';
	TXT_SPORT['motorsport-auto-racing']['4'] = 'Postponed';
	TXT_SPORT['motorsport-auto-racing']['5'] = 'Cancelled';
	TXT_SPORT['motorsport-auto-racing']['36'] = 'Interrupted';
	TXT_SPORT['motorsport-auto-racing']['37'] = 'Abandoned';
	TXT_SPORT['motorsport-auto-racing']['42'] = 'Awaiting<br />updates';
	TXT_SPORT['motorsport-auto-racing']['43'] = 'Delayed';
	TXT_SPORT['motorsport-moto-racing']                = new Array();
	TXT_SPORT['motorsport-moto-racing']['name'] = 'Moto Racing';
	TXT_SPORT['motorsport-moto-racing']['1'] = '&nbsp;';
	TXT_SPORT['motorsport-moto-racing']['2'] = 'Live';
	TXT_SPORT['motorsport-moto-racing']['3'] = 'Finished';
	TXT_SPORT['motorsport-moto-racing']['4'] = 'Postponed';
	TXT_SPORT['motorsport-moto-racing']['5'] = 'Cancelled';
	TXT_SPORT['motorsport-moto-racing']['36'] = 'Interrupted';
	TXT_SPORT['motorsport-moto-racing']['37'] = 'Abandoned';
	TXT_SPORT['motorsport-moto-racing']['42'] = 'Awaiting<br />updates';
	TXT_SPORT['motorsport-moto-racing']['43'] = 'Delayed';
	TXT_SPORT['motorsport-moto-racing']['54'] = 'Awarded';
	TXT_SPORT['cycling']                = new Array();
	TXT_SPORT['cycling']['name'] = 'Cycling';
	TXT_SPORT['cycling']['1'] = '&nbsp;';
	TXT_SPORT['cycling']['2'] = 'Live';
	TXT_SPORT['cycling']['3'] = 'Finished';
	TXT_SPORT['cycling']['4'] = 'Postponed';
	TXT_SPORT['cycling']['5'] = 'Cancelled';
	TXT_SPORT['cycling']['36'] = 'Interrupted';
	TXT_SPORT['cycling']['37'] = 'Abandoned';
	TXT_SPORT['cycling']['42'] = 'Awaiting<br />updates';
	TXT_SPORT['cycling']['43'] = 'Delayed';
	TXT_SPORT['horse-racing']                = new Array();
	TXT_SPORT['horse-racing']['name'] = 'Horse racing';
	TXT_SPORT['horse-racing']['1'] = '&nbsp;';
	TXT_SPORT['horse-racing']['2'] = 'Live';
	TXT_SPORT['horse-racing']['3'] = 'Finished';
	TXT_SPORT['horse-racing']['4'] = 'Postponed';
	TXT_SPORT['horse-racing']['5'] = 'Cancelled';
	TXT_SPORT['horse-racing']['36'] = 'Interrupted';
	TXT_SPORT['horse-racing']['37'] = 'Abandoned';
	TXT_SPORT['horse-racing']['42'] = 'Awaiting<br />updates';
	TXT_SPORT['horse-racing']['43'] = 'Delayed';
	TXT_SPORT['esports']                = new Array();
	TXT_SPORT['esports']['name'] = 'eSports';
	TXT_SPORT['esports']['1'] = '&nbsp;';
	TXT_SPORT['esports']['2'] = 'Live';
	TXT_SPORT['esports']['3'] = 'Finished';
	TXT_SPORT['esports']['4'] = 'Postponed';
	TXT_SPORT['esports']['5'] = 'Cancelled';
	TXT_SPORT['esports']['36'] = 'Interrupted';
	TXT_SPORT['esports']['37'] = 'Abandoned';
	TXT_SPORT['esports']['42'] = 'Awaiting<br />updates';
	TXT_SPORT['esports']['43'] = 'Delayed';
	TXT_SPORT['esports']['54'] = 'Awarded';
	TXT_SPORT['esports']['9'] = 'Walkover';
	TXT_SPORT['esports']['45'] = 'To finish';
	TXT_SPORT['winter-sports']                = new Array();
	TXT_SPORT['winter-sports']['name'] = 'Winter Sports';
	TXT_SPORT['winter-sports-ski-jumping']                = new Array();
	TXT_SPORT['winter-sports-ski-jumping']['name'] = 'Ski Jumping';
	TXT_SPORT['winter-sports-ski-jumping']['1'] = '&nbsp;';
	TXT_SPORT['winter-sports-ski-jumping']['2'] = 'Live';
	TXT_SPORT['winter-sports-ski-jumping']['3'] = 'Finished';
	TXT_SPORT['winter-sports-ski-jumping']['4'] = 'Postponed';
	TXT_SPORT['winter-sports-ski-jumping']['5'] = 'Cancelled';
	TXT_SPORT['winter-sports-ski-jumping']['36'] = 'Interrupted';
	TXT_SPORT['winter-sports-ski-jumping']['37'] = 'Abandoned';
	TXT_SPORT['winter-sports-ski-jumping']['42'] = 'Awaiting<br />updates';
	TXT_SPORT['winter-sports-ski-jumping']['43'] = 'Delayed';
	TXT_SPORT['winter-sports-alpine-skiing']                = new Array();
	TXT_SPORT['winter-sports-alpine-skiing']['name'] = 'Alpine Skiing';
	TXT_SPORT['winter-sports-alpine-skiing']['1'] = '&nbsp;';
	TXT_SPORT['winter-sports-alpine-skiing']['2'] = 'Live';
	TXT_SPORT['winter-sports-alpine-skiing']['3'] = 'Finished';
	TXT_SPORT['winter-sports-alpine-skiing']['4'] = 'Postponed';
	TXT_SPORT['winter-sports-alpine-skiing']['5'] = 'Cancelled';
	TXT_SPORT['winter-sports-alpine-skiing']['36'] = 'Interrupted';
	TXT_SPORT['winter-sports-alpine-skiing']['37'] = 'Abandoned';
	TXT_SPORT['winter-sports-alpine-skiing']['42'] = 'Awaiting<br />updates';
	TXT_SPORT['winter-sports-alpine-skiing']['43'] = 'Delayed';
	TXT_SPORT['winter-sports-cross-country']                = new Array();
	TXT_SPORT['winter-sports-cross-country']['name'] = 'Cross-Country Skiing';
	TXT_SPORT['winter-sports-cross-country']['1'] = '&nbsp;';
	TXT_SPORT['winter-sports-cross-country']['2'] = 'Live';
	TXT_SPORT['winter-sports-cross-country']['3'] = 'Finished';
	TXT_SPORT['winter-sports-cross-country']['4'] = 'Postponed';
	TXT_SPORT['winter-sports-cross-country']['5'] = 'Cancelled';
	TXT_SPORT['winter-sports-cross-country']['36'] = 'Interrupted';
	TXT_SPORT['winter-sports-cross-country']['37'] = 'Abandoned';
	TXT_SPORT['winter-sports-cross-country']['42'] = 'Awaiting<br />updates';
	TXT_SPORT['winter-sports-cross-country']['43'] = 'Delayed';
	TXT_SPORT['winter-sports-biathlon']                = new Array();
	TXT_SPORT['winter-sports-biathlon']['name'] = 'Biathlon';
	TXT_SPORT['winter-sports-biathlon']['1'] = '&nbsp;';
	TXT_SPORT['winter-sports-biathlon']['2'] = 'Live';
	TXT_SPORT['winter-sports-biathlon']['3'] = 'Finished';
	TXT_SPORT['winter-sports-biathlon']['4'] = 'Postponed';
	TXT_SPORT['winter-sports-biathlon']['5'] = 'Cancelled';
	TXT_SPORT['winter-sports-biathlon']['36'] = 'Interrupted';
	TXT_SPORT['winter-sports-biathlon']['37'] = 'Abandoned';
	TXT_SPORT['winter-sports-biathlon']['42'] = 'Awaiting<br />updates';
	TXT_SPORT['winter-sports-biathlon']['43'] = 'Delayed';
	TXT_SPORT['kabaddi']                = new Array();
	TXT_SPORT['kabaddi']['name'] = 'Kabaddi';
	TXT_SPORT['kabaddi']['1'] = '&nbsp;';
	TXT_SPORT['kabaddi']['45'] = 'To finish';
	TXT_SPORT['kabaddi']['42'] = 'Awaiting<br />updates';
	TXT_SPORT['kabaddi']['2'] = 'Live';
	TXT_SPORT['kabaddi']['12'] = '1st Half';
	TXT_SPORT['kabaddi']['38'] = 'Half Time';
	TXT_SPORT['kabaddi']['13'] = '2nd Half';
	TXT_SPORT['kabaddi']['6'] = 'Extra Time';
	TXT_SPORT['kabaddi']['46'] = 'Break Time';
	TXT_SPORT['kabaddi']['3'] = 'Finished';
	TXT_SPORT['kabaddi']['10'] = 'After ET';
	TXT_SPORT['kabaddi']['9'] = 'Walkover';
	TXT_SPORT['kabaddi']['43'] = 'Delayed';
	TXT_SPORT['kabaddi']['36'] = 'Interrupted';
	TXT_SPORT['kabaddi']['4'] = 'Postponed';
	TXT_SPORT['kabaddi']['5'] = 'Cancelled';
	TXT_SPORT['kabaddi']['37'] = 'Abandoned';
	TXT_SPORT['kabaddi']['54'] = 'Awarded';
    // text strings
    var TXT_SPORT_MOBILE            = new Array();
	TXT_SPORT_MOBILE['soccer']                = new Array();
	TXT_SPORT_MOBILE['soccer']['name'] = 'Football';
	TXT_SPORT_MOBILE['soccer']['1'] = '&nbsp;';
	TXT_SPORT_MOBILE['soccer']['45'] = 'To finish';
	TXT_SPORT_MOBILE['soccer']['42'] = 'TBA';
	TXT_SPORT_MOBILE['soccer']['2'] = 'Live';
	TXT_SPORT_MOBILE['soccer']['12'] = 'H1';
	TXT_SPORT_MOBILE['soccer']['13'] = 'H2';
	TXT_SPORT_MOBILE['soccer']['6'] = 'ET';
	TXT_SPORT_MOBILE['soccer']['7'] = 'Pen';
	TXT_SPORT_MOBILE['soccer']['38'] = 'HT';
	TXT_SPORT_MOBILE['soccer']['46'] = 'Pause';
	TXT_SPORT_MOBILE['soccer']['3'] = 'Fin';
	TXT_SPORT_MOBILE['soccer']['10'] = 'AET';
	TXT_SPORT_MOBILE['soccer']['11'] = 'Pen';
	TXT_SPORT_MOBILE['soccer']['9'] = 'WO';
	TXT_SPORT_MOBILE['soccer']['43'] = 'Del';
	TXT_SPORT_MOBILE['soccer']['36'] = 'Int';
	TXT_SPORT_MOBILE['soccer']['4'] = 'Postp';
	TXT_SPORT_MOBILE['soccer']['5'] = 'Canc';
	TXT_SPORT_MOBILE['soccer']['37'] = 'Abn';
	TXT_SPORT_MOBILE['soccer']['54'] = 'Awrd';
	TXT_SPORT_MOBILE['tennis']                = new Array();
	TXT_SPORT_MOBILE['tennis']['name'] = 'Tennis';
	TXT_SPORT_MOBILE['tennis']['1'] = '&nbsp;';
	TXT_SPORT_MOBILE['tennis']['45'] = 'To finish';
	TXT_SPORT_MOBILE['tennis']['42'] = 'TBA';
	TXT_SPORT_MOBILE['tennis']['2'] = 'Live';
	TXT_SPORT_MOBILE['tennis']['17'] = 'S1';
	TXT_SPORT_MOBILE['tennis']['18'] = 'S2';
	TXT_SPORT_MOBILE['tennis']['19'] = 'S3';
	TXT_SPORT_MOBILE['tennis']['20'] = 'S4';
	TXT_SPORT_MOBILE['tennis']['21'] = 'S5';
	TXT_SPORT_MOBILE['tennis']['47'] = 'S1/TB';
	TXT_SPORT_MOBILE['tennis']['48'] = 'S2/TB';
	TXT_SPORT_MOBILE['tennis']['49'] = 'S3/TB';
	TXT_SPORT_MOBILE['tennis']['50'] = 'S4/TB';
	TXT_SPORT_MOBILE['tennis']['51'] = 'S5/TB';
	TXT_SPORT_MOBILE['tennis']['46'] = 'Pause';
	TXT_SPORT_MOBILE['tennis']['3'] = 'Fin';
	TXT_SPORT_MOBILE['tennis']['8'] = 'Retired';
	TXT_SPORT_MOBILE['tennis']['9'] = 'WO';
	TXT_SPORT_MOBILE['tennis']['43'] = 'Del';
	TXT_SPORT_MOBILE['tennis']['36'] = 'Int';
	TXT_SPORT_MOBILE['tennis']['4'] = 'Postp';
	TXT_SPORT_MOBILE['tennis']['5'] = 'Canc';
	TXT_SPORT_MOBILE['tennis']['37'] = 'Abn';
	TXT_SPORT_MOBILE['tennis']['54'] = 'Awrd';
	TXT_SPORT_MOBILE['tennis']['57'] = 'After<br />D1';
	TXT_SPORT_MOBILE['tennis']['58'] = 'After<br />D2';
	TXT_SPORT_MOBILE['tennis']['335'] = 'Medic.';
	TXT_SPORT_MOBILE['basketball']                = new Array();
	TXT_SPORT_MOBILE['basketball']['name'] = 'Basketball';
	TXT_SPORT_MOBILE['basketball']['1'] = '&nbsp;';
	TXT_SPORT_MOBILE['basketball']['45'] = 'To finish';
	TXT_SPORT_MOBILE['basketball']['42'] = 'TBA';
	TXT_SPORT_MOBILE['basketball']['2'] = 'Live';
	TXT_SPORT_MOBILE['basketball']['22'] = 'Q1';
	TXT_SPORT_MOBILE['basketball']['23'] = 'Q2';
	TXT_SPORT_MOBILE['basketball']['24'] = 'Q3';
	TXT_SPORT_MOBILE['basketball']['25'] = 'Q4';
	TXT_SPORT_MOBILE['basketball']['6'] = 'OT';
	TXT_SPORT_MOBILE['basketball']['38'] = 'HT';
	TXT_SPORT_MOBILE['basketball']['46'] = 'Pause';
	TXT_SPORT_MOBILE['basketball']['3'] = 'Fin';
	TXT_SPORT_MOBILE['basketball']['10'] = 'AOT';
	TXT_SPORT_MOBILE['basketball']['9'] = 'WO';
	TXT_SPORT_MOBILE['basketball']['43'] = 'Del';
	TXT_SPORT_MOBILE['basketball']['36'] = 'Int';
	TXT_SPORT_MOBILE['basketball']['4'] = 'Postp';
	TXT_SPORT_MOBILE['basketball']['5'] = 'Canc';
	TXT_SPORT_MOBILE['basketball']['37'] = 'Abn';
	TXT_SPORT_MOBILE['basketball']['54'] = 'Awrd';
	TXT_SPORT_MOBILE['hockey']                = new Array();
	TXT_SPORT_MOBILE['hockey']['name'] = 'Hockey';
	TXT_SPORT_MOBILE['hockey']['1'] = '&nbsp;';
	TXT_SPORT_MOBILE['hockey']['45'] = 'To finish';
	TXT_SPORT_MOBILE['hockey']['42'] = 'TBA';
	TXT_SPORT_MOBILE['hockey']['2'] = 'Live';
	TXT_SPORT_MOBILE['hockey']['14'] = 'P1';
	TXT_SPORT_MOBILE['hockey']['15'] = 'P2';
	TXT_SPORT_MOBILE['hockey']['16'] = 'P3';
	TXT_SPORT_MOBILE['hockey']['6'] = 'OT';
	TXT_SPORT_MOBILE['hockey']['7'] = 'Pen';
	TXT_SPORT_MOBILE['hockey']['46'] = 'Pause';
	TXT_SPORT_MOBILE['hockey']['3'] = 'Fin';
	TXT_SPORT_MOBILE['hockey']['10'] = 'AOT';
	TXT_SPORT_MOBILE['hockey']['11'] = 'Pen';
	TXT_SPORT_MOBILE['hockey']['9'] = 'WO';
	TXT_SPORT_MOBILE['hockey']['43'] = 'Del';
	TXT_SPORT_MOBILE['hockey']['36'] = 'Int';
	TXT_SPORT_MOBILE['hockey']['4'] = 'Postp';
	TXT_SPORT_MOBILE['hockey']['5'] = 'Canc';
	TXT_SPORT_MOBILE['hockey']['37'] = 'Abn';
	TXT_SPORT_MOBILE['hockey']['54'] = 'Awrd';
	TXT_SPORT_MOBILE['american-football']                = new Array();
	TXT_SPORT_MOBILE['american-football']['name'] = 'American football';
	TXT_SPORT_MOBILE['american-football']['1'] = '&nbsp;';
	TXT_SPORT_MOBILE['american-football']['45'] = 'To finish';
	TXT_SPORT_MOBILE['american-football']['42'] = 'TBA';
	TXT_SPORT_MOBILE['american-football']['2'] = 'Live';
	TXT_SPORT_MOBILE['american-football']['22'] = 'Q1';
	TXT_SPORT_MOBILE['american-football']['23'] = 'Q2';
	TXT_SPORT_MOBILE['american-football']['24'] = 'Q3';
	TXT_SPORT_MOBILE['american-football']['25'] = 'Q4';
	TXT_SPORT_MOBILE['american-football']['6'] = 'OT';
	TXT_SPORT_MOBILE['american-football']['38'] = 'HT';
	TXT_SPORT_MOBILE['american-football']['46'] = 'Pause';
	TXT_SPORT_MOBILE['american-football']['3'] = 'Fin';
	TXT_SPORT_MOBILE['american-football']['10'] = 'AOT';
	TXT_SPORT_MOBILE['american-football']['9'] = 'WO';
	TXT_SPORT_MOBILE['american-football']['43'] = 'Del';
	TXT_SPORT_MOBILE['american-football']['36'] = 'Int';
	TXT_SPORT_MOBILE['american-football']['4'] = 'Postp';
	TXT_SPORT_MOBILE['american-football']['5'] = 'Canc';
	TXT_SPORT_MOBILE['american-football']['37'] = 'Abn';
	TXT_SPORT_MOBILE['american-football']['54'] = 'Awrd';
	TXT_SPORT_MOBILE['baseball']                = new Array();
	TXT_SPORT_MOBILE['baseball']['name'] = 'Baseball';
	TXT_SPORT_MOBILE['baseball']['1'] = '&nbsp;';
	TXT_SPORT_MOBILE['baseball']['45'] = 'To finish';
	TXT_SPORT_MOBILE['baseball']['42'] = 'TBA';
	TXT_SPORT_MOBILE['baseball']['2'] = 'Live';
	TXT_SPORT_MOBILE['baseball']['26'] = 'I1';
	TXT_SPORT_MOBILE['baseball']['27'] = 'I2';
	TXT_SPORT_MOBILE['baseball']['28'] = 'I3';
	TXT_SPORT_MOBILE['baseball']['29'] = 'I4';
	TXT_SPORT_MOBILE['baseball']['30'] = 'I5';
	TXT_SPORT_MOBILE['baseball']['31'] = 'I6';
	TXT_SPORT_MOBILE['baseball']['32'] = 'I7';
	TXT_SPORT_MOBILE['baseball']['33'] = 'I8';
	TXT_SPORT_MOBILE['baseball']['34'] = 'I9';
	TXT_SPORT_MOBILE['baseball']['35'] = 'EI';
	TXT_SPORT_MOBILE['baseball']['46'] = 'Pause';
	TXT_SPORT_MOBILE['baseball']['3'] = 'Fin';
	TXT_SPORT_MOBILE['baseball']['9'] = 'WO';
	TXT_SPORT_MOBILE['baseball']['43'] = 'Del';
	TXT_SPORT_MOBILE['baseball']['36'] = 'Int';
	TXT_SPORT_MOBILE['baseball']['4'] = 'Postp';
	TXT_SPORT_MOBILE['baseball']['5'] = 'Canc';
	TXT_SPORT_MOBILE['baseball']['37'] = 'Abn';
	TXT_SPORT_MOBILE['baseball']['54'] = 'Awrd';
	TXT_SPORT_MOBILE['handball']                = new Array();
	TXT_SPORT_MOBILE['handball']['name'] = 'Handball';
	TXT_SPORT_MOBILE['handball']['1'] = '&nbsp;';
	TXT_SPORT_MOBILE['handball']['45'] = 'To finish';
	TXT_SPORT_MOBILE['handball']['42'] = 'TBA';
	TXT_SPORT_MOBILE['handball']['2'] = 'Live';
	TXT_SPORT_MOBILE['handball']['12'] = 'H1';
	TXT_SPORT_MOBILE['handball']['38'] = 'HT';
	TXT_SPORT_MOBILE['handball']['13'] = 'H2';
	TXT_SPORT_MOBILE['handball']['6'] = 'ET';
	TXT_SPORT_MOBILE['handball']['7'] = 'Pen';
	TXT_SPORT_MOBILE['handball']['46'] = 'Pause';
	TXT_SPORT_MOBILE['handball']['3'] = 'Fin';
	TXT_SPORT_MOBILE['handball']['10'] = 'AET';
	TXT_SPORT_MOBILE['handball']['11'] = 'Pen';
	TXT_SPORT_MOBILE['handball']['9'] = 'WO';
	TXT_SPORT_MOBILE['handball']['43'] = 'Del';
	TXT_SPORT_MOBILE['handball']['36'] = 'Int';
	TXT_SPORT_MOBILE['handball']['4'] = 'Postp';
	TXT_SPORT_MOBILE['handball']['5'] = 'Canc';
	TXT_SPORT_MOBILE['handball']['37'] = 'Abn';
	TXT_SPORT_MOBILE['handball']['54'] = 'Awrd';
	TXT_SPORT_MOBILE['rugby-union']                = new Array();
	TXT_SPORT_MOBILE['rugby-union']['name'] = 'Rugby Union';
	TXT_SPORT_MOBILE['rugby-union']['1'] = '&nbsp;';
	TXT_SPORT_MOBILE['rugby-union']['45'] = 'To finish';
	TXT_SPORT_MOBILE['rugby-union']['42'] = 'TBA';
	TXT_SPORT_MOBILE['rugby-union']['2'] = 'Live';
	TXT_SPORT_MOBILE['rugby-union']['12'] = 'H1';
	TXT_SPORT_MOBILE['rugby-union']['38'] = 'HT';
	TXT_SPORT_MOBILE['rugby-union']['13'] = 'H2';
	TXT_SPORT_MOBILE['rugby-union']['6'] = 'ET';
	TXT_SPORT_MOBILE['rugby-union']['7'] = 'Pen';
	TXT_SPORT_MOBILE['rugby-union']['46'] = 'Pause';
	TXT_SPORT_MOBILE['rugby-union']['3'] = 'Fin';
	TXT_SPORT_MOBILE['rugby-union']['10'] = 'AET';
	TXT_SPORT_MOBILE['rugby-union']['11'] = 'Pen';
	TXT_SPORT_MOBILE['rugby-union']['9'] = 'WO';
	TXT_SPORT_MOBILE['rugby-union']['43'] = 'Del';
	TXT_SPORT_MOBILE['rugby-union']['36'] = 'Int';
	TXT_SPORT_MOBILE['rugby-union']['4'] = 'Postp';
	TXT_SPORT_MOBILE['rugby-union']['5'] = 'Canc';
	TXT_SPORT_MOBILE['rugby-union']['37'] = 'Abn';
	TXT_SPORT_MOBILE['rugby-union']['54'] = 'Awrd';
	TXT_SPORT_MOBILE['floorball']                = new Array();
	TXT_SPORT_MOBILE['floorball']['name'] = 'Floorball';
	TXT_SPORT_MOBILE['floorball']['1'] = '&nbsp;';
	TXT_SPORT_MOBILE['floorball']['45'] = 'To finish';
	TXT_SPORT_MOBILE['floorball']['42'] = 'TBA';
	TXT_SPORT_MOBILE['floorball']['2'] = 'Live';
	TXT_SPORT_MOBILE['floorball']['14'] = 'P1';
	TXT_SPORT_MOBILE['floorball']['15'] = 'P2';
	TXT_SPORT_MOBILE['floorball']['16'] = 'P3';
	TXT_SPORT_MOBILE['floorball']['6'] = 'OT';
	TXT_SPORT_MOBILE['floorball']['7'] = 'Pen';
	TXT_SPORT_MOBILE['floorball']['46'] = 'Pause';
	TXT_SPORT_MOBILE['floorball']['3'] = 'Fin';
	TXT_SPORT_MOBILE['floorball']['10'] = 'AOT';
	TXT_SPORT_MOBILE['floorball']['11'] = 'Pen';
	TXT_SPORT_MOBILE['floorball']['9'] = 'WO';
	TXT_SPORT_MOBILE['floorball']['43'] = 'Del';
	TXT_SPORT_MOBILE['floorball']['36'] = 'Int';
	TXT_SPORT_MOBILE['floorball']['4'] = 'Postp';
	TXT_SPORT_MOBILE['floorball']['5'] = 'Canc';
	TXT_SPORT_MOBILE['floorball']['37'] = 'Abn';
	TXT_SPORT_MOBILE['floorball']['54'] = 'Awrd';
	TXT_SPORT_MOBILE['bandy']                = new Array();
	TXT_SPORT_MOBILE['bandy']['name'] = 'Bandy';
	TXT_SPORT_MOBILE['bandy']['1'] = '&nbsp;';
	TXT_SPORT_MOBILE['bandy']['45'] = 'To finish';
	TXT_SPORT_MOBILE['bandy']['42'] = 'TBA';
	TXT_SPORT_MOBILE['bandy']['2'] = 'Live';
	TXT_SPORT_MOBILE['bandy']['12'] = 'H1';
	TXT_SPORT_MOBILE['bandy']['38'] = 'HT';
	TXT_SPORT_MOBILE['bandy']['13'] = 'H2';
	TXT_SPORT_MOBILE['bandy']['6'] = 'OT';
	TXT_SPORT_MOBILE['bandy']['7'] = 'Pen';
	TXT_SPORT_MOBILE['bandy']['46'] = 'Pause';
	TXT_SPORT_MOBILE['bandy']['3'] = 'Fin';
	TXT_SPORT_MOBILE['bandy']['10'] = 'AOT';
	TXT_SPORT_MOBILE['bandy']['11'] = 'Pen';
	TXT_SPORT_MOBILE['bandy']['9'] = 'WO';
	TXT_SPORT_MOBILE['bandy']['43'] = 'Del';
	TXT_SPORT_MOBILE['bandy']['36'] = 'Int';
	TXT_SPORT_MOBILE['bandy']['4'] = 'Postp';
	TXT_SPORT_MOBILE['bandy']['5'] = 'Canc';
	TXT_SPORT_MOBILE['bandy']['37'] = 'Abn';
	TXT_SPORT_MOBILE['bandy']['54'] = 'Awrd';
	TXT_SPORT_MOBILE['futsal']                = new Array();
	TXT_SPORT_MOBILE['futsal']['name'] = 'Futsal';
	TXT_SPORT_MOBILE['futsal']['1'] = '&nbsp;';
	TXT_SPORT_MOBILE['futsal']['45'] = 'To finish';
	TXT_SPORT_MOBILE['futsal']['42'] = 'TBA';
	TXT_SPORT_MOBILE['futsal']['2'] = 'Live';
	TXT_SPORT_MOBILE['futsal']['12'] = 'H1';
	TXT_SPORT_MOBILE['futsal']['38'] = 'HT';
	TXT_SPORT_MOBILE['futsal']['13'] = 'H2';
	TXT_SPORT_MOBILE['futsal']['6'] = 'ET';
	TXT_SPORT_MOBILE['futsal']['7'] = 'Pen';
	TXT_SPORT_MOBILE['futsal']['46'] = 'Pause';
	TXT_SPORT_MOBILE['futsal']['3'] = 'Fin';
	TXT_SPORT_MOBILE['futsal']['10'] = 'AET';
	TXT_SPORT_MOBILE['futsal']['11'] = 'Pen';
	TXT_SPORT_MOBILE['futsal']['9'] = 'WO';
	TXT_SPORT_MOBILE['futsal']['43'] = 'Del';
	TXT_SPORT_MOBILE['futsal']['36'] = 'Int';
	TXT_SPORT_MOBILE['futsal']['4'] = 'Postp';
	TXT_SPORT_MOBILE['futsal']['5'] = 'Canc';
	TXT_SPORT_MOBILE['futsal']['37'] = 'Abn';
	TXT_SPORT_MOBILE['futsal']['54'] = 'Awrd';
	TXT_SPORT_MOBILE['volleyball']                = new Array();
	TXT_SPORT_MOBILE['volleyball']['name'] = 'Volleyball';
	TXT_SPORT_MOBILE['volleyball']['1'] = '&nbsp;';
	TXT_SPORT_MOBILE['volleyball']['45'] = 'To finish';
	TXT_SPORT_MOBILE['volleyball']['42'] = 'TBA';
	TXT_SPORT_MOBILE['volleyball']['2'] = 'Live';
	TXT_SPORT_MOBILE['volleyball']['17'] = 'S1';
	TXT_SPORT_MOBILE['volleyball']['18'] = 'S2';
	TXT_SPORT_MOBILE['volleyball']['19'] = 'S3';
	TXT_SPORT_MOBILE['volleyball']['20'] = 'S4';
	TXT_SPORT_MOBILE['volleyball']['21'] = 'S5';
	TXT_SPORT_MOBILE['volleyball']['55'] = 'S6';
	TXT_SPORT_MOBILE['volleyball']['56'] = 'S7';
	TXT_SPORT_MOBILE['volleyball']['46'] = 'Pause';
	TXT_SPORT_MOBILE['volleyball']['3'] = 'Fin';
	TXT_SPORT_MOBILE['volleyball']['9'] = 'WO';
	TXT_SPORT_MOBILE['volleyball']['43'] = 'Del';
	TXT_SPORT_MOBILE['volleyball']['36'] = 'Int';
	TXT_SPORT_MOBILE['volleyball']['4'] = 'Postp';
	TXT_SPORT_MOBILE['volleyball']['5'] = 'Canc';
	TXT_SPORT_MOBILE['volleyball']['37'] = 'Abn';
	TXT_SPORT_MOBILE['volleyball']['54'] = 'Awrd';
	TXT_SPORT_MOBILE['cricket']                = new Array();
	TXT_SPORT_MOBILE['cricket']['name'] = 'Cricket';
	TXT_SPORT_MOBILE['cricket']['1'] = '&nbsp;';
	TXT_SPORT_MOBILE['cricket']['45'] = 'To finish';
	TXT_SPORT_MOBILE['cricket']['42'] = 'TBA';
	TXT_SPORT_MOBILE['cricket']['2'] = 'Live';
	TXT_SPORT_MOBILE['cricket']['26'] = 'I1';
	TXT_SPORT_MOBILE['cricket']['27'] = 'I2';
	TXT_SPORT_MOBILE['cricket']['57'] = 'After<br />D1';
	TXT_SPORT_MOBILE['cricket']['58'] = 'After<br />D2';
	TXT_SPORT_MOBILE['cricket']['59'] = 'After<br />D3';
	TXT_SPORT_MOBILE['cricket']['60'] = 'After<br />D4';
	TXT_SPORT_MOBILE['cricket']['61'] = 'After<br />D5';
	TXT_SPORT_MOBILE['cricket']['46'] = 'Pause';
	TXT_SPORT_MOBILE['cricket']['3'] = 'Fin';
	TXT_SPORT_MOBILE['cricket']['9'] = 'WO';
	TXT_SPORT_MOBILE['cricket']['43'] = 'Del';
	TXT_SPORT_MOBILE['cricket']['36'] = 'Int';
	TXT_SPORT_MOBILE['cricket']['4'] = 'Postp';
	TXT_SPORT_MOBILE['cricket']['5'] = 'Canc';
	TXT_SPORT_MOBILE['cricket']['37'] = 'Abn';
	TXT_SPORT_MOBILE['cricket']['54'] = 'Awrd';
	TXT_SPORT_MOBILE['cricket']['333'] = 'Lunch';
	TXT_SPORT_MOBILE['cricket']['334'] = 'Tea';
	TXT_SPORT_MOBILE['darts']                = new Array();
	TXT_SPORT_MOBILE['darts']['name'] = 'Darts';
	TXT_SPORT_MOBILE['darts']['1'] = '&nbsp;';
	TXT_SPORT_MOBILE['darts']['45'] = 'To finish';
	TXT_SPORT_MOBILE['darts']['42'] = 'TBA';
	TXT_SPORT_MOBILE['darts']['2'] = 'Live';
	TXT_SPORT_MOBILE['darts']['17'] = 'S1';
	TXT_SPORT_MOBILE['darts']['18'] = 'S2';
	TXT_SPORT_MOBILE['darts']['19'] = 'S3';
	TXT_SPORT_MOBILE['darts']['20'] = 'S4';
	TXT_SPORT_MOBILE['darts']['21'] = 'S5';
	TXT_SPORT_MOBILE['darts']['55'] = 'S6';
	TXT_SPORT_MOBILE['darts']['56'] = 'S7';
	TXT_SPORT_MOBILE['darts']['324'] = 'S8';
	TXT_SPORT_MOBILE['darts']['325'] = 'S9';
	TXT_SPORT_MOBILE['darts']['326'] = 'S10';
	TXT_SPORT_MOBILE['darts']['327'] = 'S11';
	TXT_SPORT_MOBILE['darts']['328'] = 'S12';
	TXT_SPORT_MOBILE['darts']['329'] = 'S13';
	TXT_SPORT_MOBILE['darts']['46'] = 'Pause';
	TXT_SPORT_MOBILE['darts']['3'] = 'Fin';
	TXT_SPORT_MOBILE['darts']['9'] = 'WO';
	TXT_SPORT_MOBILE['darts']['43'] = 'Del';
	TXT_SPORT_MOBILE['darts']['36'] = 'Int';
	TXT_SPORT_MOBILE['darts']['4'] = 'Postp';
	TXT_SPORT_MOBILE['darts']['5'] = 'Canc';
	TXT_SPORT_MOBILE['darts']['37'] = 'Abn';
	TXT_SPORT_MOBILE['darts']['54'] = 'Awrd';
	TXT_SPORT_MOBILE['snooker']                = new Array();
	TXT_SPORT_MOBILE['snooker']['name'] = 'Snooker';
	TXT_SPORT_MOBILE['snooker']['1'] = '&nbsp;';
	TXT_SPORT_MOBILE['snooker']['45'] = 'To finish';
	TXT_SPORT_MOBILE['snooker']['42'] = 'TBA';
	TXT_SPORT_MOBILE['snooker']['2'] = 'Live';
	TXT_SPORT_MOBILE['snooker']['46'] = 'Pause';
	TXT_SPORT_MOBILE['snooker']['3'] = 'Fin';
	TXT_SPORT_MOBILE['snooker']['9'] = 'WO';
	TXT_SPORT_MOBILE['snooker']['43'] = 'Del';
	TXT_SPORT_MOBILE['snooker']['36'] = 'Int';
	TXT_SPORT_MOBILE['snooker']['4'] = 'Postp';
	TXT_SPORT_MOBILE['snooker']['5'] = 'Canc';
	TXT_SPORT_MOBILE['snooker']['37'] = 'Abn';
	TXT_SPORT_MOBILE['snooker']['54'] = 'Awrd';
	TXT_SPORT_MOBILE['boxing']                = new Array();
	TXT_SPORT_MOBILE['boxing']['name'] = 'Boxing';
	TXT_SPORT_MOBILE['boxing']['1'] = '&nbsp;';
	TXT_SPORT_MOBILE['boxing']['45'] = 'To finish';
	TXT_SPORT_MOBILE['boxing']['42'] = 'TBA';
	TXT_SPORT_MOBILE['boxing']['2'] = 'Live';
	TXT_SPORT_MOBILE['boxing']['46'] = 'Pause';
	TXT_SPORT_MOBILE['boxing']['3'] = 'Fin';
	TXT_SPORT_MOBILE['boxing']['9'] = 'WO';
	TXT_SPORT_MOBILE['boxing']['43'] = 'Del';
	TXT_SPORT_MOBILE['boxing']['36'] = 'Int';
	TXT_SPORT_MOBILE['boxing']['4'] = 'Postp';
	TXT_SPORT_MOBILE['boxing']['5'] = 'Canc';
	TXT_SPORT_MOBILE['boxing']['37'] = 'Abn';
	TXT_SPORT_MOBILE['boxing']['54'] = 'Awrd';
	TXT_SPORT_MOBILE['beach-volleyball']                = new Array();
	TXT_SPORT_MOBILE['beach-volleyball']['name'] = 'Beach volleyball';
	TXT_SPORT_MOBILE['beach-volleyball']['1'] = '&nbsp;';
	TXT_SPORT_MOBILE['beach-volleyball']['45'] = 'To finish';
	TXT_SPORT_MOBILE['beach-volleyball']['42'] = 'TBA';
	TXT_SPORT_MOBILE['beach-volleyball']['2'] = 'Live';
	TXT_SPORT_MOBILE['beach-volleyball']['17'] = 'S1';
	TXT_SPORT_MOBILE['beach-volleyball']['18'] = 'S2';
	TXT_SPORT_MOBILE['beach-volleyball']['19'] = 'S3';
	TXT_SPORT_MOBILE['beach-volleyball']['20'] = 'S4';
	TXT_SPORT_MOBILE['beach-volleyball']['21'] = 'S5';
	TXT_SPORT_MOBILE['beach-volleyball']['46'] = 'Pause';
	TXT_SPORT_MOBILE['beach-volleyball']['3'] = 'Fin';
	TXT_SPORT_MOBILE['beach-volleyball']['8'] = 'Retired';
	TXT_SPORT_MOBILE['beach-volleyball']['9'] = 'WO';
	TXT_SPORT_MOBILE['beach-volleyball']['43'] = 'Del';
	TXT_SPORT_MOBILE['beach-volleyball']['36'] = 'Int';
	TXT_SPORT_MOBILE['beach-volleyball']['4'] = 'Postp';
	TXT_SPORT_MOBILE['beach-volleyball']['5'] = 'Canc';
	TXT_SPORT_MOBILE['beach-volleyball']['37'] = 'Abn';
	TXT_SPORT_MOBILE['beach-volleyball']['54'] = 'Awrd';
	TXT_SPORT_MOBILE['aussie-rules']                = new Array();
	TXT_SPORT_MOBILE['aussie-rules']['name'] = 'Aussie rules';
	TXT_SPORT_MOBILE['aussie-rules']['1'] = '&nbsp;';
	TXT_SPORT_MOBILE['aussie-rules']['45'] = 'To finish';
	TXT_SPORT_MOBILE['aussie-rules']['42'] = 'TBA';
	TXT_SPORT_MOBILE['aussie-rules']['2'] = 'Live';
	TXT_SPORT_MOBILE['aussie-rules']['22'] = 'Q1';
	TXT_SPORT_MOBILE['aussie-rules']['23'] = 'Q2';
	TXT_SPORT_MOBILE['aussie-rules']['24'] = 'Q3';
	TXT_SPORT_MOBILE['aussie-rules']['25'] = 'Q4';
	TXT_SPORT_MOBILE['aussie-rules']['6'] = 'OT';
	TXT_SPORT_MOBILE['aussie-rules']['38'] = 'HT';
	TXT_SPORT_MOBILE['aussie-rules']['46'] = 'Pause';
	TXT_SPORT_MOBILE['aussie-rules']['3'] = 'Fin';
	TXT_SPORT_MOBILE['aussie-rules']['10'] = 'AOT';
	TXT_SPORT_MOBILE['aussie-rules']['9'] = 'WO';
	TXT_SPORT_MOBILE['aussie-rules']['43'] = 'Del';
	TXT_SPORT_MOBILE['aussie-rules']['36'] = 'Int';
	TXT_SPORT_MOBILE['aussie-rules']['4'] = 'Postp';
	TXT_SPORT_MOBILE['aussie-rules']['5'] = 'Canc';
	TXT_SPORT_MOBILE['aussie-rules']['37'] = 'Abn';
	TXT_SPORT_MOBILE['aussie-rules']['54'] = 'Awrd';
	TXT_SPORT_MOBILE['rugby-league']                = new Array();
	TXT_SPORT_MOBILE['rugby-league']['name'] = 'Rugby League';
	TXT_SPORT_MOBILE['rugby-league']['1'] = '&nbsp;';
	TXT_SPORT_MOBILE['rugby-league']['45'] = 'To finish';
	TXT_SPORT_MOBILE['rugby-league']['42'] = 'TBA';
	TXT_SPORT_MOBILE['rugby-league']['2'] = 'Live';
	TXT_SPORT_MOBILE['rugby-league']['12'] = 'H1';
	TXT_SPORT_MOBILE['rugby-league']['38'] = 'HT';
	TXT_SPORT_MOBILE['rugby-league']['13'] = 'H2';
	TXT_SPORT_MOBILE['rugby-league']['6'] = 'ET';
	TXT_SPORT_MOBILE['rugby-league']['7'] = 'Pen';
	TXT_SPORT_MOBILE['rugby-league']['46'] = 'Pause';
	TXT_SPORT_MOBILE['rugby-league']['3'] = 'Fin';
	TXT_SPORT_MOBILE['rugby-league']['10'] = 'AET';
	TXT_SPORT_MOBILE['rugby-league']['11'] = 'Pen';
	TXT_SPORT_MOBILE['rugby-league']['9'] = 'WO';
	TXT_SPORT_MOBILE['rugby-league']['43'] = 'Del';
	TXT_SPORT_MOBILE['rugby-league']['36'] = 'Int';
	TXT_SPORT_MOBILE['rugby-league']['4'] = 'Postp';
	TXT_SPORT_MOBILE['rugby-league']['5'] = 'Canc';
	TXT_SPORT_MOBILE['rugby-league']['37'] = 'Abn';
	TXT_SPORT_MOBILE['rugby-league']['54'] = 'Awrd';
	TXT_SPORT_MOBILE['badminton']                = new Array();
	TXT_SPORT_MOBILE['badminton']['name'] = 'Badminton';
	TXT_SPORT_MOBILE['badminton']['1'] = '&nbsp;';
	TXT_SPORT_MOBILE['badminton']['45'] = 'To finish';
	TXT_SPORT_MOBILE['badminton']['42'] = 'TBA';
	TXT_SPORT_MOBILE['badminton']['2'] = 'Live';
	TXT_SPORT_MOBILE['badminton']['17'] = 'S1';
	TXT_SPORT_MOBILE['badminton']['18'] = 'S2';
	TXT_SPORT_MOBILE['badminton']['19'] = 'S3';
	TXT_SPORT_MOBILE['badminton']['46'] = 'Pause';
	TXT_SPORT_MOBILE['badminton']['3'] = 'Fin';
	TXT_SPORT_MOBILE['badminton']['8'] = 'Retired';
	TXT_SPORT_MOBILE['badminton']['9'] = 'WO';
	TXT_SPORT_MOBILE['badminton']['43'] = 'Del';
	TXT_SPORT_MOBILE['badminton']['36'] = 'Int';
	TXT_SPORT_MOBILE['badminton']['4'] = 'Postp';
	TXT_SPORT_MOBILE['badminton']['5'] = 'Canc';
	TXT_SPORT_MOBILE['badminton']['37'] = 'Abn';
	TXT_SPORT_MOBILE['badminton']['54'] = 'Awrd';
	TXT_SPORT_MOBILE['water-polo']                = new Array();
	TXT_SPORT_MOBILE['water-polo']['name'] = 'Water polo';
	TXT_SPORT_MOBILE['water-polo']['1'] = '&nbsp;';
	TXT_SPORT_MOBILE['water-polo']['45'] = 'To finish';
	TXT_SPORT_MOBILE['water-polo']['42'] = 'TBA';
	TXT_SPORT_MOBILE['water-polo']['2'] = 'Live';
	TXT_SPORT_MOBILE['water-polo']['22'] = 'Q1';
	TXT_SPORT_MOBILE['water-polo']['23'] = 'Q2';
	TXT_SPORT_MOBILE['water-polo']['24'] = 'Q3';
	TXT_SPORT_MOBILE['water-polo']['25'] = 'Q4';
	TXT_SPORT_MOBILE['water-polo']['6'] = 'ET';
	TXT_SPORT_MOBILE['water-polo']['7'] = 'Pen';
	TXT_SPORT_MOBILE['water-polo']['38'] = 'HT';
	TXT_SPORT_MOBILE['water-polo']['46'] = 'Pause';
	TXT_SPORT_MOBILE['water-polo']['3'] = 'Fin';
	TXT_SPORT_MOBILE['water-polo']['10'] = 'AET';
	TXT_SPORT_MOBILE['water-polo']['11'] = 'Pen';
	TXT_SPORT_MOBILE['water-polo']['9'] = 'WO';
	TXT_SPORT_MOBILE['water-polo']['43'] = 'Del';
	TXT_SPORT_MOBILE['water-polo']['36'] = 'Int';
	TXT_SPORT_MOBILE['water-polo']['4'] = 'Postp';
	TXT_SPORT_MOBILE['water-polo']['5'] = 'Canc';
	TXT_SPORT_MOBILE['water-polo']['37'] = 'Abn';
	TXT_SPORT_MOBILE['water-polo']['54'] = 'Awrd';
	TXT_SPORT_MOBILE['golf']                = new Array();
	TXT_SPORT_MOBILE['golf']['name'] = 'Golf';
	TXT_SPORT_MOBILE['golf']['1'] = '&nbsp;';
	TXT_SPORT_MOBILE['golf']['45'] = 'To finish';
	TXT_SPORT_MOBILE['golf']['42'] = 'TBA';
	TXT_SPORT_MOBILE['golf']['2'] = 'Live';
	TXT_SPORT_MOBILE['golf']['65'] = 'R1';
	TXT_SPORT_MOBILE['golf']['66'] = 'R2';
	TXT_SPORT_MOBILE['golf']['67'] = 'R3';
	TXT_SPORT_MOBILE['golf']['68'] = 'R4';
	TXT_SPORT_MOBILE['golf']['62'] = 'After<br />R1';
	TXT_SPORT_MOBILE['golf']['63'] = 'After<br />R2';
	TXT_SPORT_MOBILE['golf']['64'] = 'After<br />R3';
	TXT_SPORT_MOBILE['golf']['46'] = 'Pause';
	TXT_SPORT_MOBILE['golf']['3'] = 'Fin';
	TXT_SPORT_MOBILE['golf']['8'] = 'Retired';
	TXT_SPORT_MOBILE['golf']['9'] = 'WO';
	TXT_SPORT_MOBILE['golf']['43'] = 'Del';
	TXT_SPORT_MOBILE['golf']['36'] = 'Int';
	TXT_SPORT_MOBILE['golf']['4'] = 'Postp';
	TXT_SPORT_MOBILE['golf']['5'] = 'Canc';
	TXT_SPORT_MOBILE['golf']['37'] = 'Abn';
	TXT_SPORT_MOBILE['golf']['54'] = 'Awrd';
	TXT_SPORT_MOBILE['field-hockey']                = new Array();
	TXT_SPORT_MOBILE['field-hockey']['name'] = 'Field hockey';
	TXT_SPORT_MOBILE['field-hockey']['1'] = '&nbsp;';
	TXT_SPORT_MOBILE['field-hockey']['45'] = 'To finish';
	TXT_SPORT_MOBILE['field-hockey']['42'] = 'TBA';
	TXT_SPORT_MOBILE['field-hockey']['2'] = 'Live';
	TXT_SPORT_MOBILE['field-hockey']['12'] = 'H1';
	TXT_SPORT_MOBILE['field-hockey']['38'] = 'HT';
	TXT_SPORT_MOBILE['field-hockey']['13'] = 'H2';
	TXT_SPORT_MOBILE['field-hockey']['6'] = 'OT';
	TXT_SPORT_MOBILE['field-hockey']['7'] = 'Pen';
	TXT_SPORT_MOBILE['field-hockey']['46'] = 'Pause';
	TXT_SPORT_MOBILE['field-hockey']['3'] = 'Fin';
	TXT_SPORT_MOBILE['field-hockey']['10'] = 'AOT';
	TXT_SPORT_MOBILE['field-hockey']['11'] = 'Pen';
	TXT_SPORT_MOBILE['field-hockey']['9'] = 'WO';
	TXT_SPORT_MOBILE['field-hockey']['43'] = 'Del';
	TXT_SPORT_MOBILE['field-hockey']['36'] = 'Int';
	TXT_SPORT_MOBILE['field-hockey']['4'] = 'Postp';
	TXT_SPORT_MOBILE['field-hockey']['5'] = 'Canc';
	TXT_SPORT_MOBILE['field-hockey']['37'] = 'Abn';
	TXT_SPORT_MOBILE['field-hockey']['54'] = 'Awrd';
	TXT_SPORT_MOBILE['table-tennis']                = new Array();
	TXT_SPORT_MOBILE['table-tennis']['name'] = 'Table tennis';
	TXT_SPORT_MOBILE['table-tennis']['1'] = '&nbsp;';
	TXT_SPORT_MOBILE['table-tennis']['45'] = 'To finish';
	TXT_SPORT_MOBILE['table-tennis']['42'] = 'TBA';
	TXT_SPORT_MOBILE['table-tennis']['2'] = 'Live';
	TXT_SPORT_MOBILE['table-tennis']['17'] = 'S1';
	TXT_SPORT_MOBILE['table-tennis']['18'] = 'S2';
	TXT_SPORT_MOBILE['table-tennis']['19'] = 'S3';
	TXT_SPORT_MOBILE['table-tennis']['20'] = 'S4';
	TXT_SPORT_MOBILE['table-tennis']['21'] = 'S5';
	TXT_SPORT_MOBILE['table-tennis']['55'] = 'S6';
	TXT_SPORT_MOBILE['table-tennis']['56'] = 'S7';
	TXT_SPORT_MOBILE['table-tennis']['46'] = 'Pause';
	TXT_SPORT_MOBILE['table-tennis']['3'] = 'Fin';
	TXT_SPORT_MOBILE['table-tennis']['8'] = 'Retired';
	TXT_SPORT_MOBILE['table-tennis']['9'] = 'WO';
	TXT_SPORT_MOBILE['table-tennis']['43'] = 'Del';
	TXT_SPORT_MOBILE['table-tennis']['36'] = 'Int';
	TXT_SPORT_MOBILE['table-tennis']['4'] = 'Postp';
	TXT_SPORT_MOBILE['table-tennis']['5'] = 'Canc';
	TXT_SPORT_MOBILE['table-tennis']['37'] = 'Abn';
	TXT_SPORT_MOBILE['table-tennis']['54'] = 'Awrd';
	TXT_SPORT_MOBILE['beach-soccer']                = new Array();
	TXT_SPORT_MOBILE['beach-soccer']['name'] = 'Beach soccer';
	TXT_SPORT_MOBILE['beach-soccer']['1'] = '&nbsp;';
	TXT_SPORT_MOBILE['beach-soccer']['45'] = 'To finish';
	TXT_SPORT_MOBILE['beach-soccer']['42'] = 'TBA';
	TXT_SPORT_MOBILE['beach-soccer']['2'] = 'Live';
	TXT_SPORT_MOBILE['beach-soccer']['14'] = 'P1';
	TXT_SPORT_MOBILE['beach-soccer']['15'] = 'P2';
	TXT_SPORT_MOBILE['beach-soccer']['16'] = 'P3';
	TXT_SPORT_MOBILE['beach-soccer']['6'] = 'ET';
	TXT_SPORT_MOBILE['beach-soccer']['7'] = 'Pen';
	TXT_SPORT_MOBILE['beach-soccer']['46'] = 'Pause';
	TXT_SPORT_MOBILE['beach-soccer']['3'] = 'Fin';
	TXT_SPORT_MOBILE['beach-soccer']['10'] = 'AET';
	TXT_SPORT_MOBILE['beach-soccer']['11'] = 'Pen';
	TXT_SPORT_MOBILE['beach-soccer']['9'] = 'WO';
	TXT_SPORT_MOBILE['beach-soccer']['43'] = 'Del';
	TXT_SPORT_MOBILE['beach-soccer']['36'] = 'Int';
	TXT_SPORT_MOBILE['beach-soccer']['4'] = 'Postp';
	TXT_SPORT_MOBILE['beach-soccer']['5'] = 'Canc';
	TXT_SPORT_MOBILE['beach-soccer']['37'] = 'Abn';
	TXT_SPORT_MOBILE['beach-soccer']['54'] = 'Awrd';
	TXT_SPORT_MOBILE['mma']                = new Array();
	TXT_SPORT_MOBILE['mma']['name'] = 'MMA';
	TXT_SPORT_MOBILE['mma']['1'] = '&nbsp;';
	TXT_SPORT_MOBILE['mma']['45'] = 'To finish';
	TXT_SPORT_MOBILE['mma']['42'] = 'TBA';
	TXT_SPORT_MOBILE['mma']['2'] = 'Live';
	TXT_SPORT_MOBILE['mma']['46'] = 'Pause';
	TXT_SPORT_MOBILE['mma']['3'] = 'Fin';
	TXT_SPORT_MOBILE['mma']['9'] = 'WO';
	TXT_SPORT_MOBILE['mma']['43'] = 'Del';
	TXT_SPORT_MOBILE['mma']['36'] = 'Int';
	TXT_SPORT_MOBILE['mma']['4'] = 'Postp';
	TXT_SPORT_MOBILE['mma']['5'] = 'Canc';
	TXT_SPORT_MOBILE['mma']['37'] = 'Abn';
	TXT_SPORT_MOBILE['mma']['54'] = 'Awrd';
	TXT_SPORT_MOBILE['netball']                = new Array();
	TXT_SPORT_MOBILE['netball']['name'] = 'Netball';
	TXT_SPORT_MOBILE['netball']['1'] = '&nbsp;';
	TXT_SPORT_MOBILE['netball']['45'] = 'To finish';
	TXT_SPORT_MOBILE['netball']['42'] = 'TBA';
	TXT_SPORT_MOBILE['netball']['2'] = 'Live';
	TXT_SPORT_MOBILE['netball']['22'] = 'Q1';
	TXT_SPORT_MOBILE['netball']['23'] = 'Q2';
	TXT_SPORT_MOBILE['netball']['24'] = 'Q3';
	TXT_SPORT_MOBILE['netball']['25'] = 'Q4';
	TXT_SPORT_MOBILE['netball']['6'] = 'OT';
	TXT_SPORT_MOBILE['netball']['38'] = 'HT';
	TXT_SPORT_MOBILE['netball']['46'] = 'Pause';
	TXT_SPORT_MOBILE['netball']['3'] = 'Fin';
	TXT_SPORT_MOBILE['netball']['10'] = 'AOT';
	TXT_SPORT_MOBILE['netball']['9'] = 'WO';
	TXT_SPORT_MOBILE['netball']['43'] = 'Del';
	TXT_SPORT_MOBILE['netball']['36'] = 'Int';
	TXT_SPORT_MOBILE['netball']['4'] = 'Postp';
	TXT_SPORT_MOBILE['netball']['5'] = 'Canc';
	TXT_SPORT_MOBILE['netball']['37'] = 'Abn';
	TXT_SPORT_MOBILE['netball']['54'] = 'Awrd';
	TXT_SPORT_MOBILE['pesapallo']                = new Array();
	TXT_SPORT_MOBILE['pesapallo']['name'] = 'Pesäpallo';
	TXT_SPORT_MOBILE['pesapallo']['1'] = '&nbsp;';
	TXT_SPORT_MOBILE['pesapallo']['45'] = 'To finish';
	TXT_SPORT_MOBILE['pesapallo']['42'] = 'TBA';
	TXT_SPORT_MOBILE['pesapallo']['2'] = 'Live';
	TXT_SPORT_MOBILE['pesapallo']['26'] = 'I1';
	TXT_SPORT_MOBILE['pesapallo']['27'] = 'I2';
	TXT_SPORT_MOBILE['pesapallo']['28'] = 'I3';
	TXT_SPORT_MOBILE['pesapallo']['29'] = 'I4';
	TXT_SPORT_MOBILE['pesapallo']['30'] = 'I5';
	TXT_SPORT_MOBILE['pesapallo']['31'] = 'I6';
	TXT_SPORT_MOBILE['pesapallo']['32'] = 'I7';
	TXT_SPORT_MOBILE['pesapallo']['33'] = 'I8';
	TXT_SPORT_MOBILE['pesapallo']['35'] = 'EI';
	TXT_SPORT_MOBILE['pesapallo']['7'] = 'Pen';
	TXT_SPORT_MOBILE['pesapallo']['46'] = 'Pause';
	TXT_SPORT_MOBILE['pesapallo']['3'] = 'Fin';
	TXT_SPORT_MOBILE['pesapallo']['69'] = 'EI';
	TXT_SPORT_MOBILE['pesapallo']['11'] = 'Pen';
	TXT_SPORT_MOBILE['pesapallo']['9'] = 'WO';
	TXT_SPORT_MOBILE['pesapallo']['43'] = 'Del';
	TXT_SPORT_MOBILE['pesapallo']['36'] = 'Int';
	TXT_SPORT_MOBILE['pesapallo']['4'] = 'Postp';
	TXT_SPORT_MOBILE['pesapallo']['5'] = 'Canc';
	TXT_SPORT_MOBILE['pesapallo']['37'] = 'Abn';
	TXT_SPORT_MOBILE['pesapallo']['54'] = 'Awrd';
	TXT_SPORT_MOBILE['motorsport']                = new Array();
	TXT_SPORT_MOBILE['motorsport']['name'] = 'Motorsport';
	TXT_SPORT_MOBILE['motorsport-auto-racing']                = new Array();
	TXT_SPORT_MOBILE['motorsport-auto-racing']['name'] = 'Auto Racing';
	TXT_SPORT_MOBILE['motorsport-auto-racing']['1'] = '&nbsp;';
	TXT_SPORT_MOBILE['motorsport-auto-racing']['2'] = 'Live';
	TXT_SPORT_MOBILE['motorsport-auto-racing']['3'] = 'Fin';
	TXT_SPORT_MOBILE['motorsport-auto-racing']['4'] = 'Postp';
	TXT_SPORT_MOBILE['motorsport-auto-racing']['5'] = 'Canc';
	TXT_SPORT_MOBILE['motorsport-auto-racing']['36'] = 'Int';
	TXT_SPORT_MOBILE['motorsport-auto-racing']['37'] = 'Abn';
	TXT_SPORT_MOBILE['motorsport-auto-racing']['42'] = 'TBA';
	TXT_SPORT_MOBILE['motorsport-auto-racing']['43'] = 'Del';
	TXT_SPORT_MOBILE['motorsport-moto-racing']                = new Array();
	TXT_SPORT_MOBILE['motorsport-moto-racing']['name'] = 'Moto Racing';
	TXT_SPORT_MOBILE['motorsport-moto-racing']['1'] = '&nbsp;';
	TXT_SPORT_MOBILE['motorsport-moto-racing']['2'] = 'Live';
	TXT_SPORT_MOBILE['motorsport-moto-racing']['3'] = 'Fin';
	TXT_SPORT_MOBILE['motorsport-moto-racing']['4'] = 'Postp';
	TXT_SPORT_MOBILE['motorsport-moto-racing']['5'] = 'Canc';
	TXT_SPORT_MOBILE['motorsport-moto-racing']['36'] = 'Int';
	TXT_SPORT_MOBILE['motorsport-moto-racing']['37'] = 'Abn';
	TXT_SPORT_MOBILE['motorsport-moto-racing']['42'] = 'TBA';
	TXT_SPORT_MOBILE['motorsport-moto-racing']['43'] = 'Del';
	TXT_SPORT_MOBILE['motorsport-moto-racing']['54'] = 'Awrd';
	TXT_SPORT_MOBILE['cycling']                = new Array();
	TXT_SPORT_MOBILE['cycling']['name'] = 'Cycling';
	TXT_SPORT_MOBILE['cycling']['1'] = '&nbsp;';
	TXT_SPORT_MOBILE['cycling']['2'] = 'Live';
	TXT_SPORT_MOBILE['cycling']['3'] = 'Fin';
	TXT_SPORT_MOBILE['cycling']['4'] = 'Postp';
	TXT_SPORT_MOBILE['cycling']['5'] = 'Canc';
	TXT_SPORT_MOBILE['cycling']['36'] = 'Int';
	TXT_SPORT_MOBILE['cycling']['37'] = 'Abn';
	TXT_SPORT_MOBILE['cycling']['42'] = 'TBA';
	TXT_SPORT_MOBILE['cycling']['43'] = 'Del';
	TXT_SPORT_MOBILE['horse-racing']                = new Array();
	TXT_SPORT_MOBILE['horse-racing']['name'] = 'Horse racing';
	TXT_SPORT_MOBILE['horse-racing']['1'] = '&nbsp;';
	TXT_SPORT_MOBILE['horse-racing']['2'] = 'Live';
	TXT_SPORT_MOBILE['horse-racing']['3'] = 'Fin';
	TXT_SPORT_MOBILE['horse-racing']['4'] = 'Postp';
	TXT_SPORT_MOBILE['horse-racing']['5'] = 'Canc';
	TXT_SPORT_MOBILE['horse-racing']['36'] = 'Int';
	TXT_SPORT_MOBILE['horse-racing']['37'] = 'Abn';
	TXT_SPORT_MOBILE['horse-racing']['42'] = 'TBA';
	TXT_SPORT_MOBILE['horse-racing']['43'] = 'Del';
	TXT_SPORT_MOBILE['esports']                = new Array();
	TXT_SPORT_MOBILE['esports']['name'] = 'eSports';
	TXT_SPORT_MOBILE['esports']['1'] = '&nbsp;';
	TXT_SPORT_MOBILE['esports']['2'] = 'Live';
	TXT_SPORT_MOBILE['esports']['3'] = 'Fin';
	TXT_SPORT_MOBILE['esports']['4'] = 'Postp';
	TXT_SPORT_MOBILE['esports']['5'] = 'Canc';
	TXT_SPORT_MOBILE['esports']['36'] = 'Int';
	TXT_SPORT_MOBILE['esports']['37'] = 'Abn';
	TXT_SPORT_MOBILE['esports']['42'] = 'TBA';
	TXT_SPORT_MOBILE['esports']['43'] = 'Del';
	TXT_SPORT_MOBILE['esports']['54'] = 'Awrd';
	TXT_SPORT_MOBILE['esports']['9'] = 'WO';
	TXT_SPORT_MOBILE['esports']['45'] = 'To finish';
	TXT_SPORT_MOBILE['winter-sports']                = new Array();
	TXT_SPORT_MOBILE['winter-sports']['name'] = 'Winter Sports';
	TXT_SPORT_MOBILE['winter-sports-ski-jumping']                = new Array();
	TXT_SPORT_MOBILE['winter-sports-ski-jumping']['name'] = 'Ski Jumping';
	TXT_SPORT_MOBILE['winter-sports-ski-jumping']['1'] = '&nbsp;';
	TXT_SPORT_MOBILE['winter-sports-ski-jumping']['2'] = 'Live';
	TXT_SPORT_MOBILE['winter-sports-ski-jumping']['3'] = 'Fin';
	TXT_SPORT_MOBILE['winter-sports-ski-jumping']['4'] = 'Postp';
	TXT_SPORT_MOBILE['winter-sports-ski-jumping']['5'] = 'Canc';
	TXT_SPORT_MOBILE['winter-sports-ski-jumping']['36'] = 'Int';
	TXT_SPORT_MOBILE['winter-sports-ski-jumping']['37'] = 'Abn';
	TXT_SPORT_MOBILE['winter-sports-ski-jumping']['42'] = 'TBA';
	TXT_SPORT_MOBILE['winter-sports-ski-jumping']['43'] = 'Del';
	TXT_SPORT_MOBILE['winter-sports-alpine-skiing']                = new Array();
	TXT_SPORT_MOBILE['winter-sports-alpine-skiing']['name'] = 'Alpine Skiing';
	TXT_SPORT_MOBILE['winter-sports-alpine-skiing']['1'] = '&nbsp;';
	TXT_SPORT_MOBILE['winter-sports-alpine-skiing']['2'] = 'Live';
	TXT_SPORT_MOBILE['winter-sports-alpine-skiing']['3'] = 'Fin';
	TXT_SPORT_MOBILE['winter-sports-alpine-skiing']['4'] = 'Postp';
	TXT_SPORT_MOBILE['winter-sports-alpine-skiing']['5'] = 'Canc';
	TXT_SPORT_MOBILE['winter-sports-alpine-skiing']['36'] = 'Int';
	TXT_SPORT_MOBILE['winter-sports-alpine-skiing']['37'] = 'Abn';
	TXT_SPORT_MOBILE['winter-sports-alpine-skiing']['42'] = 'TBA';
	TXT_SPORT_MOBILE['winter-sports-alpine-skiing']['43'] = 'Del';
	TXT_SPORT_MOBILE['winter-sports-cross-country']                = new Array();
	TXT_SPORT_MOBILE['winter-sports-cross-country']['name'] = 'Cross-Country Skiing';
	TXT_SPORT_MOBILE['winter-sports-cross-country']['1'] = '&nbsp;';
	TXT_SPORT_MOBILE['winter-sports-cross-country']['2'] = 'Live';
	TXT_SPORT_MOBILE['winter-sports-cross-country']['3'] = 'Fin';
	TXT_SPORT_MOBILE['winter-sports-cross-country']['4'] = 'Postp';
	TXT_SPORT_MOBILE['winter-sports-cross-country']['5'] = 'Canc';
	TXT_SPORT_MOBILE['winter-sports-cross-country']['36'] = 'Int';
	TXT_SPORT_MOBILE['winter-sports-cross-country']['37'] = 'Abn';
	TXT_SPORT_MOBILE['winter-sports-cross-country']['42'] = 'TBA';
	TXT_SPORT_MOBILE['winter-sports-cross-country']['43'] = 'Del';
	TXT_SPORT_MOBILE['winter-sports-biathlon']                = new Array();
	TXT_SPORT_MOBILE['winter-sports-biathlon']['name'] = 'Biathlon';
	TXT_SPORT_MOBILE['winter-sports-biathlon']['1'] = '&nbsp;';
	TXT_SPORT_MOBILE['winter-sports-biathlon']['2'] = 'Live';
	TXT_SPORT_MOBILE['winter-sports-biathlon']['3'] = 'Fin';
	TXT_SPORT_MOBILE['winter-sports-biathlon']['4'] = 'Postp';
	TXT_SPORT_MOBILE['winter-sports-biathlon']['5'] = 'Canc';
	TXT_SPORT_MOBILE['winter-sports-biathlon']['36'] = 'Int';
	TXT_SPORT_MOBILE['winter-sports-biathlon']['37'] = 'Abn';
	TXT_SPORT_MOBILE['winter-sports-biathlon']['42'] = 'TBA';
	TXT_SPORT_MOBILE['winter-sports-biathlon']['43'] = 'Del';
	TXT_SPORT_MOBILE['kabaddi']                = new Array();
	TXT_SPORT_MOBILE['kabaddi']['name'] = 'Kabaddi';
	TXT_SPORT_MOBILE['kabaddi']['1'] = '&nbsp;';
	TXT_SPORT_MOBILE['kabaddi']['45'] = 'To finish';
	TXT_SPORT_MOBILE['kabaddi']['42'] = 'TBA';
	TXT_SPORT_MOBILE['kabaddi']['2'] = 'Live';
	TXT_SPORT_MOBILE['kabaddi']['12'] = 'H1';
	TXT_SPORT_MOBILE['kabaddi']['38'] = 'HT';
	TXT_SPORT_MOBILE['kabaddi']['13'] = 'H2';
	TXT_SPORT_MOBILE['kabaddi']['6'] = 'ET';
	TXT_SPORT_MOBILE['kabaddi']['46'] = 'Pause';
	TXT_SPORT_MOBILE['kabaddi']['3'] = 'Fin';
	TXT_SPORT_MOBILE['kabaddi']['10'] = 'AET';
	TXT_SPORT_MOBILE['kabaddi']['9'] = 'WO';
	TXT_SPORT_MOBILE['kabaddi']['43'] = 'Del';
	TXT_SPORT_MOBILE['kabaddi']['36'] = 'Int';
	TXT_SPORT_MOBILE['kabaddi']['4'] = 'Postp';
	TXT_SPORT_MOBILE['kabaddi']['5'] = 'Canc';
	TXT_SPORT_MOBILE['kabaddi']['37'] = 'Abn';
	TXT_SPORT_MOBILE['kabaddi']['54'] = 'Awrd';

    var TXT_ODDS_EVEN_SHORT    = cjs.dic.get('utilTrans').translate('TRANS_ODDS_EVEN_SHORT');
    var gamePlanSettings = ["", ""];
    var tournamentPage = false;
    var tournamentPageDataPart = 0;
    var feedIndexes = cjs.constants.FEED;

        //login client init
    function lsid_init()
    {
        cjs.Api.settingsStorage.init(cjs.dic.get('lsidClientFactory').getInstance());
    }
    cjs.fromGlobalScope.lsid_init = lsid_init;

    //My leagues init
    function my_leagues_init(sportId)
    {
        var utilTrans = cjs.dic.get('utilTrans');
        if(typeof cjs.myLeagues == 'undefined')
        {
            lsid_init();

            var mlTranslations = {
                add: !cjs.Api.config.get("app", "pinned", "enabled") ? utilTrans.translate('TRANS_MY_LEAGUES_ADD') || "" : utilTrans.translate('TRANS_MY_LEAGUES_PIN')
                    || "",
                remove: !cjs.Api.config.get("app", "pinned", "enabled") ? utilTrans.translate('TRANS_MY_LEAGUES_REMOVE') || "" : utilTrans.translate
                    ('TRANS_MY_LEAGUES_UNPIN')
                    || "",
                loginNeeded: utilTrans.translate('TRANS_ERROR_AVAILABLE_ONLY_FOR_LOGGED_USER') || "",
            };
            cjs.myLeagues = cjs.dic.get("MyLeaguesFactory").create(
                cjs.dic.get('MyLeaguesClientFactory').create(),
                cjs.defaultTopLeagues,
                sportId,
                mlTranslations,
                cjs.dic.get("util_sport"),
                cjs.dic.get("util_page"),
                cjs.dic.get("util_enviroment"),
                window.fetch.bind(window),
                cjs.Api.config,
            );
            cjs.myLeagues.registerCallback('add', sort_fs_data);
            cjs.myLeagues.registerCallback('remove', sort_fs_data);

            var reloadTabContent = function() {
                cjs.Api.loader.get('reactCalls').call(function(reactCalls) {
                    reactCalls.reloadTabContent(category);
                    reactCalls.reloadStaticContent();
                });
            };
            cjs.myLeagues.registerCallback('add', reloadTabContent);
            cjs.myLeagues.registerCallback('remove', reloadTabContent);
            cjs.Api.loader.get('myLeagues').fulfill(function(callback) {
                callback(cjs.myLeagues);
            });
        }
    }

    cjs.fromGlobalScope.my_leagues_init = my_leagues_init;

    function myTeamsInit(sportId)
    {
        if (typeof cjs.myTeams == 'undefined' && cjs.Api.config.get('app', 'myteams', 'enable') && !cjs.xmtpending)
        {
            cjs.xmtpending = true;
            lsid_init();
            cjs.Api.loader.get('xMyTeams').call({}, function(_mt) {
                cjs.xmt = _mt;
                cjs.myTeams = _mt;
                var myGamesChecker = cjs.dic.get('Helper_MyGamesChecker');

                var drawMenu = function(participantKey)
                {
                    var participantKeySportId = sportId;

                    if (participantKey)
                    {
                        participantKeySportId = parseInt(participantKey.replace(/^([0-9]+)_.* /, '$1'));
                    }

                    if (sportId == participantKeySportId)
                    {
                        cjs.myTeams.animateLeftMenu();
                    }

                    cjs.myTeams.reloadToggleIcons();
                };

                cjs.myTeams.registerCallback('dataLoaded', drawMenu);
                cjs.myTeams.registerCallback('dataLoaded', function() {
                    sort_fs_data();

                    var myTeamsCount = cjs.myTeams.getCount();
                    if (myGamesChecker.isMyGames() && myTeamsCount)
                    {
                        loadAndShowMygamesContent();
                    }
                });
                cjs.Api.loader.get("loggedInObservable").call((observable) => {
                    observable.subscribe(() => {
                        cjs.myTeams.animateLeftMenu();
                        cjs.myTeams.reloadToggleIcons();
                    });
                    observable.subscribe((loggedIn) => {
                        if (loggedIn) {
                            cjs.myTeams.animateLeftMenu(true);
                            cjs.myTeams.synchronize(0).then((data) => {
                                cjs.myTeams.animateLeftMenu();
                            });
                            cjs.myTeams.restartAutoSync();
                        } else {
                            cjs.myTeams.stopAutoSync();
                        }
                    });
                });
                const lsidClient = cjs.dic.get('lsidClientFactory').getInstance();
                lsidClient.storage.getInnerDataObservable(["myTeams"]).subscribe(
                    (function(drawMenu) {
                        return function()
                        {
                            cjs.myTeams.reload();
                            drawMenu();
                            if (myGamesChecker.isMyGames())
                            {
                                redrawLivescore();
                            }
                        }
                    })(drawMenu)
                );

                cjs.myTeams.registerCallback('remove', drawMenu);
                drawMenu = null;

                cjs.Api.loader.get('myTeams').fulfill(function(callback) {
                    callback(cjs.myTeams);
                });
            });
        }
    }

    cjs.fromGlobalScope.myTeamsInit = myTeamsInit;

    
// Core functions {{{

    /**
 * Parse data from input string to data array
    */
    function parse(fs_input, update, odds, action)
    {
        var dataEventHolder = cjs.dic.get('dataEventHolderProxy').getHolder();
        var dataLeagueHolder = cjs.dic.get('dataLeagueHolderProxy').getHolder();
        var dataParticipantHolder = cjs.dic.get('dataParticipantHolder');
        var myGamesChecker = cjs.dic.get('Helper_MyGamesChecker');
        var sportList = cjs.Api.constantsManager.getSports();
        var translate = cjs.dic.get('util_trans');
        var changesHistoryContainer = cjs.dic.get('ChangesHistoryContainer');
        // test if there is input string
        if (fs_input == null || fs_input.length < 4 || fs_input == '0')
        {
            u_304 = 'd41d8cd98f00b204e9800998ecf8427e';
            return true;
        }
        update = (typeof update == 'undefined' || update == false) ? false : true;
        odds = (typeof odds == 'undefined' || odds == false) ? false : true;
        var eventItem, leagueItem, upcomingDrawItem;
        var rows = fs_input.split(JS_ROW_END);
        var rows_length = rows.length;
        var labl_id;
        var parse_sport_id = sport_id;
        var parse_sport = sport;
        var return_val = true;
        var eventId, tmp;
        var special = false;
        var isMyTeamsAction = (typeof cjs.myTeams !== 'undefined' && action === "my-teams-events-data-merged");
        var isRepairAction = (action == 'repair' || action == 'frepair');
        var reloadEvents = [];
        var reloadLeagues = [];
        var reloadTabContent = false;
        var sortTabContent = false;
        var isMyTeamsFeed = action === 'my-teams-events-data-merged';
        var isMyGamesScope = cjs.dic.get('dataLeagueHolderProxy').getScope() === 'mygames';

        if (!update && !odds && !isRepairAction)
        {
            if (rows_length == 1)
            {
                rows_length = 0;
            }
        }

        // parse data
        for (var i = 0; i < rows_length; i++)
        {
            var row = rows[i].split(JS_CELL_END);
            var row_length = row.length - 1;
            var index = row[0].split(JS_INDEX);
            var indexName, indexValue;
            if (typeof index[0] !== 'undefined')
            {
                indexName = index[0];
            }
            if (typeof index[1] !== 'undefined')
            {
                indexValue = index[1];
            }

            // sport
            if (indexName === feedIndexes.SHAREDINDEXES_SPORT_ID)
            {
                parse_sport_id = indexValue;
                parse_sport = SPORT_LIST_BY_ID[parse_sport_id];
                continue;
            }
            else if (indexName === feedIndexes.DCAPIPARTICIPANTINDEXES_TEAM_INFO || indexName == feedIndexes.DCAPIPARTICIPANTINDEXES_TEAM_INFO_DELETED)
            {
                for (var j = 0; j < row_length; j++)
                {
                    var tmpIndex = row[j].split(JS_INDEX);
                    var key = tmpIndex[0];
                    var value = tmpIndex[1];
                    if (key == feedIndexes.DCAPIPARTICIPANTINDEXES_TEAM_INFO || key == feedIndexes.DCAPIPARTICIPANTINDEXES_TEAM_INFO_DELETED)
                    {
                        var participantData = value.split('|');
                        var participantId = participantData[0];
                        var participantItem = dataParticipantHolder.getOrCreateNewParticipant(participantId);
                        participantItem.reinit(participantData);
                        participantItem.setDeleted(key == feedIndexes.DCAPIPARTICIPANTINDEXES_TEAM_INFO_DELETED);
                    }
                    else if (key == feedIndexes.LOCALIZEKEYINDEXES_PARTICIPANT_EVENTS_CLASS_LOCALIZED_VAR)
                    {
                        cjs.Api.dataItemTranslator.updateDictionary(value);
                    }
                }

                continue;
            }
            else if (!isMyTeamsFeed || isMyGamesScope) {
                // caption
                if (indexName === feedIndexes.SHAREDINDEXES_TOURNAMENT_NAME)
                {
                    var tmp_labl = {};
                    var backupedLeagueItem = cjs.dic.getNewInstance('Data_LeagueItem');

                    if (parse_sport_id == cjs.Api.constantsManager.getSports().GOLF || cjs.noDuelSports.includes(parse_sport_id))
                    {
                        tmp_labl[feedIndexes.SHAREDINDEXES_EVENT_STAGE_TYPE_ID] = '';
                        tmp_labl[feedIndexes.SHAREDINDEXES_EVENT_STAGE_ID] = '';
                        tmp_labl[feedIndexes.SHAREDINDEXES_MATCH_START_UTIME] = '';
                    }

                    for (var j = 0; j < row_length; j++)
                    {
                        var rowParts = row[j].split(JS_INDEX);
                        if (rowParts.length == 2)
                        {
                            tmp_labl[rowParts[0]] = rowParts[1];
                        }
                    }

                    //    display status of tournament's games [open/close icon]
                    tmp_labl['display'] = tmp_labl[feedIndexes.LEAGUEINDEXES_TOURNAMENT_TYPE] != 'c';
                    tmp_labl['g_count'] = 0;
                    tmp_labl['sport_id'] = parse_sport_id;
                    tmp_labl['sport'] = parse_sport;
                    labl_id = parse_sport_id + '_' + tmp_labl[feedIndexes.SHAREDINDEXES_TOURNAMENT_STAGE_ID];

                    if (isMyTeamsAction)
                    {
                        var mgLeagueData = cjs.mygames.getLabels();
                        if (mgLeagueData[labl_id] != null)
                        {
                            tmp_labl['g_count'] = mgLeagueData[labl_id]['g_count'];
                        }
                    }

                    if (dataLeagueHolder.hasLeague(labl_id))
                    {
                        var backupedLeagueItemData = dataLeagueHolder.getLeague(labl_id).getData();
                        backupedLeagueItem.reinit(backupedLeagueItemData);
                        tmp_labl['g_count'] = backupedLeagueItem.getEventCount();
                    }

                    if (isRepairAction)
                    {
                        if (dataLeagueHolder.hasLeague(labl_id))
                        {
                            leagueItem = dataLeagueHolder.getLeague(labl_id);
                            for (var key in tmp_labl)
                            {
                                if (key.length > 2 || (key == feedIndexes.SHAREDINDEXES_TOURNAMENT_NAME && tmp_labl[key] == ''))
                                {
                                    continue;
                                }
                                leagueItem.setValue(key, tmp_labl[key]);
                            }
                        }
                    }
                    else if (!update)
                    {
                        leagueItem = dataLeagueHolder.getOrCreateNewLeague(labl_id);
                        leagueItem.reinit(tmp_labl);
                    }
                    else if (update && labl_id)
                    {
                        if (dataLeagueHolder.hasLeague(labl_id))
                        {
                            leagueItem = dataLeagueHolder.getLeague(labl_id);
                            for (var key in tmp_labl)
                            {
                                if (key.length > 2 || (key == feedIndexes.SHAREDINDEXES_TOURNAMENT_NAME && tmp_labl[key] == '') || tmp_labl[key] == leagueItem.getValue(key))
                                {
                                    continue;
                                }
                                leagueItem.setValue(key, tmp_labl[key]);
                            }
                        }
                    }

                    if (leagueItem)
                    {
                        leagueItem = cjs.Api.dataItemTranslator.translate(leagueItem, backupedLeagueItem);
                        reloadLeagues.push(leagueItem.getId());
                    }
                }
                // upcoming draw row in league
                else if (indexName === feedIndexes.SHAREDINDEXES_UPCOMING_DRAW_ID)
                {
                    upcomingDrawItem = cjs.dic.getNewInstance('Data_UpcomingDrawItem');
                    for (var j = 1; j < row_length; j++)
                    {
                        var rowParts = row[j].split(JS_INDEX);
                        if (rowParts.length != 2)
                        {
                            continue;
                        }

                        var cellKey = rowParts[0];
                        var cellValue = rowParts[1];
                        if (cellKey == feedIndexes.DRAWINDEXES_UPCOMING_DRAW_START_TIME)
                        {
                            upcomingDrawItem.addEventStartTime(parseInt(cellValue));
                        }
                        else
                        {
                            if (cellKey == feedIndexes.SHAREDINDEXES_TOURNAMENT_STAGE_ID)
                            {
                                labl_id = parse_sport_id + '_' + tmp_labl[feedIndexes.SHAREDINDEXES_TOURNAMENT_STAGE_ID];
                            }
                            upcomingDrawItem.setValue(cellKey, cellValue);
                        }
                    }

                    if (dataLeagueHolder.hasLeague(labl_id))
                    {
                        dataLeagueHolder.getLeague(labl_id).addUpcomingDraw(upcomingDrawItem);
                    }
                }
                else if (indexName === feedIndexes.FULLFEEDINDEXES_MOVED_EVENTS_ID)
                {
                    for(var j = 0; j < row_length; j++)
                    {
                        switch(row[j].substr(0,2))
                        {
                            case feedIndexes.FULLFEEDINDEXES_EVENT_WITH_UPDATED_START:
                                eventId = 'g_' + parse_sport_id + '_' + row[j].substr(3);
                            break;
                            case feedIndexes.FULLFEEDINDEXES_EVENT_WITH_UPDATED_START_AND_END_TIME:
                                if (eventId)
                                {
                                    tmp = (row[j].substr(3) + "").split('|');
                                    fsEventsUpdatedStartTime[eventId] =
                                        {
                                            start_time: parseInt(tmp[0]),
                                            end_time: tmp[1] ? parseInt(tmp[1]) : null
                                        };
                                    eventId = null;
                                }
                            break;
                        }
                    }
                    continue;
                }

                else if (indexName === feedIndexes.STANDINGSSIGNSINDEXES_TABLE_HASH && indexValue === 'repair')
                {
                    special = true;
                    var repairRows = [];
                    for (var j = i + 1; j < rows_length; j++)
                    {
                        repairRows.push(rows[j]);
                        i++;
                        if (rows[j].split(JS_CELL_END)[0].split(JS_INDEX)[0] === feedIndexes.SHAREDINDEXES_FEED_SIGNATURE)
                        {
                            break;
                        }
                    }
                    continue;
                }
                // u_304 code
                else if (indexName === feedIndexes.SHAREDINDEXES_FEED_SIGNATURE)
                {
                    if (typeof action != 'undefined' && action == 'update')
                    {
                        u_304 = indexValue;
                    }

                    rows_length--;
                    continue;
                }
                // refresh utime
                else if(indexName === feedIndexes.SHAREDINDEXES_REFRESH_UTIME)
                {
                    var tmp_refresh_utime = indexValue - 0;

                    if (tmp_refresh_utime > refresh_utime)
                    {
                        refresh_utime = tmp_refresh_utime;
                        return_val = false;
                    }
                }
                // download local update feed
                else if (indexName === feedIndexes.SHAREDINDEXES_UPDATE_LOCAL_FEED_UPDATED_TIME)
                {
                    tmp = indexValue - 0;
                    if (tmp)
                    {
                        cjs.dic.get('Feed_Service_LocalUpdate').setSyncTime(tmp);
                    }
                }
                // no game today, past/upcoming game
                else if (indexName === feedIndexes.FULLFEEDINDEXES_PAST_FUTURE_GAMES)
                {
                    gamePlanSettings = indexValue.split(";");
                }
                // game row
                else if (indexName === feedIndexes.SHAREDINDEXES_EVENT_ID)
                {
                    var original_id = indexValue;
                    var id = 'g_' + parse_sport_id + '_' + original_id;
                    var backupedEventItem = cjs.dic.getNewInstance('Data_EventItem');
                    var eventItemExists = dataEventHolder.hasEvent(id);

                    // unknown game on update/repair or odds feed

                    if ((update || isRepairAction || odds) && !eventItemExists)
                    {
                        continue;
                    }

                    reloadEvents.push(id);

                    if (eventItemExists)
                    {
                        var backupedEventItemData = dataEventHolder.getItem(id).getData();
                        backupedEventItem.reinit(backupedEventItemData);
                    }
                    // create new event entry
                    eventItem = dataEventHolder.getOrCreateNewEvent(id);
                    if (!eventItemExists && !update && !odds && !isRepairAction)
                    {
                        if (!myGamesChecker.isMyGames() || !isMyTeamsAction)
                        {
                            leagueItem.setValue('g_count', leagueItem.getEventCount() + 1);
                        }
                        eventItem.reinit(eventItem.createDefaultMatchItem(parseInt(parse_sport_id), parse_sport, SPORT_SCORE_PART_LIST));
                        eventItem.setValue('original_id', original_id);
                        eventItem.setValue('labl_id', labl_id);
                        eventItem.setValue('sport_id', parse_sport_id);
                        eventItem.setValue('sport', parse_sport);
                    }

                    var statsResultsHelper = cjs.dic.getNewInstance('Helper_StatsResultsParser');
                    for (var j = 1; j < row_length; j++)
                    {
                        var rowParts = row[j].split(JS_INDEX);
                        if (rowParts.length != 2)
                        {
                            continue;
                        }

                        var key = rowParts[0];
                        var new_value_string = rowParts[1];

                        if (update && [
                            feedIndexes.ODDSINDEXES_ODDS_1_PREVIOUS,
                            feedIndexes.ODDSINDEXES_ODDS_0_PREVIOUS,
                            feedIndexes.ODDSINDEXES_ODDS_2_PREVIOUS,
                            feedIndexes.ODDSINDEXES_ODDS_10_PREVIOUS,
                            feedIndexes.ODDSINDEXES_ODDS_02_PREVIOUS,
                            feedIndexes.ODDSINDEXES_ODDS_AH1_PREVIOUS,
                            feedIndexes.ODDSINDEXES_ODDS_AH2_PREVIOUS,
                            feedIndexes.ODDSINDEXES_ODDS_OU1_PREVIOUS,
                            feedIndexes.ODDSINDEXES_ODDS_OU2_PREVIOUS,
                            feedIndexes.ODDSINDEXES_ODDS_ML1_PREVIOUS,
                            feedIndexes.ODDSINDEXES_ODDS_ML2_PREVIOUS].includes(key))
                        {
                            continue;
                        }

                        if ([
                            feedIndexes.UPDATEINDEXES_HOME_PENALTY_SHOT,
                            feedIndexes.UPDATEINDEXES_AWAY_PENALTY_SHOT,
                            feedIndexes.UPDATEINDEXES_HOME_PENALTY_MISSED,
                            feedIndexes.UPDATEINDEXES_AWAY_PENALTY_MISSED].includes(key))
                        {
                            continue;
                        }

                        var new_value = new_value_string;
                        if (![
                            feedIndexes.SHAREDINDEXES_TIME,
                            feedIndexes.SHAREDINDEXES_GAP,
                            feedIndexes.SHAREDINDEXES_HOME_CRICKET_RUN_RATE,
                            feedIndexes.SHAREDINDEXES_AWAY_CRICKET_RUN_RATE,
                            feedIndexes.RESULTSINDEXES_ROW_VALUE].includes(key))
                        {
                            new_value -= 0; // try convert string to number
                        }

                        if (isNaN(new_value) || new_value_string == '')
                        {
                            new_value = new_value_string;
                        }

                        if ((update || odds) && cjs.dic.get('dataEvent').getEventValue(id, feedIndexes.FULLFEEDINDEXES_SWAPPED_PARTICIPANTS))
                        {
                            var swappedParticipantsHandler = cjs.Api.swappedParticipantsHandlerFactory.make(key, new_value, false);
                            key = swappedParticipantsHandler.getKey();
                            new_value = swappedParticipantsHandler.getValue();
                        }

                        if (key === feedIndexes.ODDSINDEXES_EACH_WAY_HANDICAP && reloadLeagues.indexOf(eventItem.getLeagueId()) === -1)
                        {
                            reloadLeagues.push(eventItem.getLeagueId());
                        }

                        if (key === feedIndexes.FULLFEEDINDEXES_TEAM_NAME && (!update && !odds && !special) && typeof participantItem != 'undefined' && eventItem.isValid() && participantItem.getTeamName())
                        {
                            new_value = participantItem.getTeamName();
                        }

                        if (!statsResultsHelper.isStatsResultsIndex(key))
                        {
                            if (update && eventItem.getValue(key) !== new_value)
                            {
                                changesHistoryContainer.setValueChange(id, key, new_value, eventItem.getValue(key));
                            }

                            eventItem.setValue(key, new_value);
                        }

                        // get statsResults
                        statsResultsHelper.setHomeAndAwayParticipantIdsFromEventItem(eventItem);
                        statsResultsHelper.processKeyAndValue(key, new_value);
                    }

                    // update and save statsResults
                    var statsResults = statsResultsHelper.getStatsResults();
                    for (var statsResultsKey in statsResults)
                    {
                        new_value = statsResults[statsResultsKey];
                        if (update && eventItem.getValue(statsResultsKey) !== new_value)
                        {
                            changesHistoryContainer.setValueChange(id, statsResultsKey, new_value, eventItem.getValue(statsResultsKey));
                        }

                        eventItem.setValue(statsResultsKey, new_value);
                    }

                    // penalty
                    if (action == 'update')
                    {
                        for (var j = 1; j < row_length; j++)
                        {
                            var key = row[j].substr(0, 2);
                            if ([
                                    feedIndexes.UPDATEINDEXES_HOME_PENALTY_SHOT,
                                    feedIndexes.UPDATEINDEXES_AWAY_PENALTY_SHOT,
                                    feedIndexes.UPDATEINDEXES_HOME_PENALTY_MISSED,
                                    feedIndexes.UPDATEINDEXES_AWAY_PENALTY_MISSED].includes(key))
                            {
                                var new_value_arr = row[j].substr(3).split(',');
                                var incidentTime = new_value_arr[1] / 60;
                                var updatedTime = new_value_arr[2];
                                var incidentId = new_value_arr[3];

                                if (new_value_arr[0] == eventItem.getStage())
                                {
                                    var counterTimeGetter = cjs.Api.loader.get('counterTime');
                                    counterTimeGetter.call(eventItem, function(counterTime) {
                                        var interval = 5;
                                        if (incidentTime >= counterTime - interval && incidentTime <= counterTime + interval)
                                        {
                                            new_value = [updatedTime, incidentId];
                                            if (eventItem.getValue(key) !== new_value)
                                            {
                                                changesHistoryContainer.setValueChange(id, key, new_value, eventItem.getValue(key));
                                                eventItem.setValue(key, new_value);
                                            }
                                        }
                                    });
                                }
                            }
                            else if (eventItem.getSportId() == cjs.Api.constantsManager.getSports().GOLF || cjs.noDuelSports.includes(eventItem.getSportId()))
                            {
                                if ([
                                    feedIndexes.SHAREDINDEXES_EVENT_STAGE_TYPE_ID,
                                    feedIndexes.SHAREDINDEXES_EVENT_STAGE_ID,
                                    feedIndexes.SHAREDINDEXES_MATCH_START_UTIME].includes(key))
                                {
                                    reloadTabContent = true;
                                }
                            }
                            else if (key === feedIndexes.SHAREDINDEXES_EVENT_STAGE_TYPE_ID
                                && category !== 0
                                && changesHistoryContainer.didValueChanged(id, feedIndexes.SHAREDINDEXES_EVENT_STAGE_TYPE_ID))
                            {
                                reloadTabContent = true;
                            }
                            else if (key === feedIndexes.SHAREDINDEXES_MATCH_START_UTIME
                                && changesHistoryContainer.didValueChanged(id, feedIndexes.SHAREDINDEXES_MATCH_START_UTIME))
                            {
                                reloadTabContent = true;
                                sortTabContent = true;
                            }
                        }
                    }

                    eventItem = cjs.Api.dataItemTranslator.translate(eventItem, backupedEventItem);

                    var page = cjs.dic.get('util_page');
                    var check_start_times = category != 5 && typeof action == 'undefined' && !odds && !update && !page.isCountryPage() && !page.isSeasonPage();
                    var removeEventByTime = check_start_times &&
                        !cjs.dic.get('utilDate').getMatchDay(eventItem.getStartTime(), eventItem.getEndTime()).includes(parseInt(sudate)) &&
                        !eventItem.isLive();
                    var removeEventByInvalidLeague = !eventItem.getLeague().isValid();
                    if (removeEventByTime || !eventItem.isValid() || removeEventByInvalidLeague)
                    {
                        if ((!myGamesChecker.isMyGames() || !isMyTeamsAction) && leagueItem)
                        {
                            leagueItem.setValue('g_count', leagueItem.getEventCount() - 1);
                        }
                        dataEventHolder.removeEvent(id);
                        changesHistoryContainer.removeNewData(id);
                    }

                    if (!update && !odds && !special)
                    {
                        if (typeof participantItem != 'undefined' && eventItem.isValid())
                        {
                            participantItem.addEventId(eventItem.getId());
                        }
                    }
                }
            }
        }

        fs_input = null;

        if (special && repairRows.length > 0)
        {
            parse(repairRows.join(JS_ROW_END), false, false, "frepair");
        }

        var leaguesInHolder = dataLeagueHolder.getReferences();
        for (var leagueId in leaguesInHolder)
        {
            if (!leaguesInHolder[leagueId].isValid())
            {
                dataLeagueHolder.removeLeague(leagueId);
                reloadLeagues.push(leagueId);
            }
        }

        var isUpdateAction = update || isRepairAction || odds;

        if (isUpdateAction && cjs.dic.get("util_page").getPageType() != 'player_page')
        {
            if (reloadTabContent)
            {
                if (sortTabContent)
                {
                    sort_fs_data();
                }

                cjs.Api.loader.get('reactCalls').call(function(reactCalls) {
                    reactCalls.reloadTabContent(category);
                });
            }
            else
            {
                cjs.Api.loader.get('reactCalls').call(function(reactCalls) {
                    for (var reloadEventId in reloadEvents)
                    {
                        reactCalls.reloadEvent(reloadEvents[reloadEventId]);
                    }
                    for (var reloadLeagueId in reloadLeagues)
                    {
                        reactCalls.reloadLeague(reloadLeagues[reloadLeagueId]);
                    }
                });
            }
        }

        return return_val;
    };

    function sort_fs_data()
    {
        cjs.dic.get('dataLeagueHolderProxy').getHandler().resetIds();
        var dataHandler = cjs.dic.get('dataEventHolderProxy').getHandler();
        var utilPage = cjs.dic.get("util_page");
        dataHandler.resetIds();

        if (!cjs.dic.get("util_sport").hasCategoryPage(sport_id) && utilPage.isCountryPage())
        {
            return;
        }
        dataHandler.sort();
    };

    /**
 * Reset data variables
    */
    function reset_env()
    {
        if (typeof cjs !== 'undefined' && cjs.dic != null)
        {
            cjs.dic.get('dataEventHolderProxy').eachHolder(function(scope, holder)
            {
                if (!['mygames', 'default', 'temporary'].includes(scope))
                {
                    return;
                }
                holder.reinit();
            });
            cjs.dic.get('dataLeagueHolderProxy').eachHolder(function(scope, holder)
            {
                if (!['mygames', 'default', 'temporary'].includes(scope))
                {
                    return;
                }
                holder.reinit();
            });
            cjs.dic.get('dataEventHolderProxy').eachHandler(function(scope, handler)
            {
                if (!['mygames', 'default', 'temporary'].includes(scope))
                {
                    return;
                }
                handler.resetIds();
            });
            cjs.dic.get('dataLeagueHolderProxy').eachHandler(function(scope, handler)
            {
                if (!['mygames', 'default', 'temporary'].includes(scope))
                {
                    return;
                }
                handler.resetIds();
            });
        }
        fs_counter = {};
        fsEventsUpdatedStartTime = {};
    };
// }}}

    /**
 * init environment
    * @param    string    sport_name                    name of desired sport
    * @param    string    [country_id = null]            id of desired country (from left menu)
    * @param    string    [tournament_id = null]            id of desired tournament (from left menu)
    * @param    bool    [country_order_fin = true]    order set to finished games
    */
    function init({
                      sportId,
                      sport_name,
                      country_id,
                      tournament_id,
                      country_tournament_order_fin,
                      prev_category,
                      prev_date,
                      startUpdater,
                      participant_id,
                      seriesId,
                      pushEnabled = true,
                  }) {
        if(typeof startUpdater == 'undefined')
        {
            startUpdater = true;
        }

        var utilPage = cjs.dic.get("util_page");

        // XXX Hack to partial work
        if (utilPage.isMixed())
        {
            sport_name = 'soccer';
        }

        if (dof = clientStorage.get('fs_of_' + cjs.Api.config.get('app', 'lang', 'web'))) {
            default_odds_format = dof;
        }

        ajax_updater = 'update';

        if (pushEnabled) {
            initPush();
        }

        var currentTimestamp = cjs.dic.get("util_date").getTimestamp();
        refresh_utime = currentTimestamp;

        if (typeof SPORT_LIST[sport_name] == 'undefined')
        {
            return false;
        }

        if (typeof country_id == 'undefined' || country_id == 0)
        {
            country_id = null;
        }

        if (typeof tournament_id == 'undefined' || tournament_id == 0)
        {
            tournament_id = null;
        }

        if (typeof participant_id == 'undefined' || participant_id == 0)
        {
            participant_id = null;
        }

        if (typeof seriesId == 'undefined' || seriesId == 0)
        {
            seriesId = null;
        }

        if (typeof country_tournament_order_fin == 'undefined')
        {
            country_tournament_order_fin = true;
        }

        sport_id = sportId;
        sport = sport_name;
        country = country_id;
        utilPage.setCountryId(country_id || 0);
        tournament = tournament_id;
        participant = participant_id;
        utilPage.setParticipantEncodedId(participant_id || '');
        series = seriesId;
        utilPage.setSeriesEncodedId(seriesId || '');
        utilPage.setFullPage(true);
        tournamentPage = tournament != null;
        utilPage.setTournamentPage(tournamentPage);

        initCategory(prev_category);

        // set date
        initDate(prev_date);

        initFeedRequest();
        initLsLoginClient();
        initMyGames();

        // ajax sync
        updater = new CommCore(country, tournament, country_tournament_order_fin, participant, series);
        cjs.fromGlobalScope.updater = updater;

        initUpdatingMatches(country, startUpdater);
        initTooltip();
        debugWindowByClicks();

        cjs.Api.loader.get('tv/transactions').call();
    };

    cjs.fromGlobalScope.init = init;

    function initTooltip()
    {
        if (tt == null) {
            tt = new tooltip();
        }

        var tooltipElement = document.getElementById("tooltip-1");
        if (tooltipElement) {
            tooltipElement.addEventListener("mouseleave", function (e) {
                cjs.dic.get("util_enviroment").getTooltipObject().hide(e.target);
            });
        }
    }

    cjs.fromGlobalScope.initTooltip = initTooltip;

    function debugWindowByClicks()
    {
        const debugWindowEl = document.getElementById("project-debug");
        if (debugWindowEl && cjs.dic.get('util_browser').isMobile())
        {
            debugWindowEl.style.display = "flex";
            var debugWindowCountdown = 0;
            var debugWindowTimer = null;
            debugWindowEl.addEventListener("click", function(e)
            {
                clearTimeout(debugWindowTimer);
                debugWindowTimer = setTimeout(function() { debugWindowCountdown = 0; }, 2000);
                debugWindowCountdown++;
                if (debugWindowCountdown === 10)
                {
                    cjs.dev.init(function(){ cjs.dev.debugWindow.show(); });
                    clearTimeout(debugWindowTimer);
                }
            });
        }
    };

    function initPush(fallback)
    {
        if (typeof cjs.push === 'undefined')
        {
            var pushParameters = {
                "domain": 'fsdatacentre.com',
                "aliases": 'p1:100, p2:100, p3:100, p4:100, p5:100, p6:100, p7:100, p8:100, p9:100, p10:100',
                "port": 443,
                "sslEnabled": true,
                "migPush": new PushClient,
                "namespace": '/fs/fs3_',
                "projectId": 2,
                "jsxCompressor": JXG,
                "fallbackMethod": fallback || push_fallback,
                "fallbackDelay": cjs.Api.ajaxSyncTime.getTime('update'),
                "enabled": mpe_delivery == 'p',
            };

            cjs.Api.loader.get('synchronizationPush').call(pushParameters, function(module) {
                cjs.push = module;
            });
        }
    };

    cjs.fromGlobalScope.initPush = initPush;

    function initStaticPagesGamesNotification()
    {
                initLsLoginClient();
        cjs.disableRedrawUserSettings = true;
        
        if (cjs.Api.config.get('app', 'game_notification_push' ,'enable'))
        {
            cjs.gamesNotificationOnly = true;
            initPush(function() {});
            cjs.Api.loader.get('synchronizationPushInstance').call(function(_push) {
                _push.enable(true);
                push_connect();
                initMyGames();
                push_update_subscription();
            });
        }
        else
        {
            cjs.isStaticPage = true;
        }
    }

    cjs.fromGlobalScope.initStaticPagesGamesNotification = initStaticPagesGamesNotification;

    function initUpdatingMatches(country, startUpdater)
    {
        if (startUpdater)
        {
            updater.is_updater_started = true;

            var param = 'full';

            if (country === null)
            {
                param = 'full';
            }
            else if (participant !== null)
            {
                param = 'participant';
                // TODO back compatibility for sports not included in FSWEB-12635 (Team page with new data structure)
                if ((cjs.Api.config.get('app', 'team_page' ,'duefdfl') || []).includes(sport_id)) {
                    return; // TODO not downloading initial feed for team page
                }
            }
            else if (series !== null)
            {
                param = 'series';
            }
            else if (tournament !== null)
            {
                param = 'tournament';
            }
            else if (country !== null)
            {
                param = 'country';
            }

            setupInitialLoading(param);

            if (param === 'full')
            {
                updater.doc_update('full');
            }
            else
            {
                setTimeout(function() {
                    updater.doc_update(param);
                }, 10);
            }
        }
        else
        {
            try
            {
                document.displayTrustedAdvert();
            }
            catch(e) { }
        }
    };

    function initDate(previousDate)
    {
        var prev_date = parseInt(previousDate);
        if (!isNaN(prev_date))
            sudate = prev_date;
        else
        {
            prev_date = clientStorage.get('fs_date', 'parent');
            if (null !== prev_date) {
                prev_date = parseInt(prev_date);
                if (!isNaN(prev_date)) {
                    sudate = prev_date;
                }
                clientStorage.drop('fs_date');
            }
        }
    };

    function initCategory(previousCategory)
    {

        var prev_category = parseInt(previousCategory);
        if (!isNaN(prev_category))
        {
            category = prev_category;
        }
        else
        {
            var window_location = new String(window.location);
            if(window_location.match(/cat=/))
            {
                var pos = window_location.indexOf('cat=');
                prev_category = window_location.substr(pos + 4, 1);

                prev_category = cjs.dic.get('util_number').toNumber(prev_category);
                category = prev_category;
            }
        }
    };

    function initMyGames()
    {
        if (typeof cjs.mygames === 'undefined')
        {
            cjs.mygames = cjs.dic.get("MyGamesFactory").create({
                storage: clientStorage,
                lsid: cjs.dic.get('MyGamesClientFactory').create(),
                sportList: SPORT_LIST_BY_ID,
                dayGetter: function(){ return sudate; },
                getMatchDayFunc: function(startTime, endTime) { return cjs.dic.get('utilDate').getMatchDay(startTime, endTime); },
                projectId: project_id,
                getGmtOffsetFunc: cjs.Api.timezone.getGmtOffset.bind(cjs.Api.timezone),
                eventsUpdatedStartTimeGetter: function(){ return fsEventsUpdatedStartTime; },
                dic: cjs.dic,
                categoryGetter: function(){ return category; },
                sortFsData: function() { sort_fs_data(); },
                pushUpdateSubscription: function() { push_update_subscription(); }
            });

            cjs.Api.loader.get('myGames').fulfill(function(callback) {
                callback(cjs.mygames);
            });
        }
    };

    cjs.fromGlobalScope.initMyGames = initMyGames;

    function initLsLoginClient()
    {
                lsid_init();
        cjs.liveTableSettings = cjs.dic.get("LiveTable_Settings");
        cjs.liveTableSettings.init(
            function(){ return cjs.disableRedrawUserSettings },
            function(){ return category },
            sort_fs_data
        );
        if (sport_id !== null) {
            my_leagues_init(sport_id);
        }

        var reloadMyGamesTab = function() {
            if (cjs.dic.get('Helper_MyGamesChecker').isMyGames() && !cjs.Api.config.get("app", "myfs", "enabled")) {
                cjs.Api.loader.get("myTeams").call(function(_mt) {
                    if (_mt.getCount()) {
                        _mt.reloadAllParticipants();
                    } else {
                        loadAndShowMygamesContent();
                        _mt.callReactUpdates();
                    }
                });
            } else {
                cjs.Api.loader.get('reactCalls').call(function(reactCalls) {
                    reactCalls.reloadMyGamesTabCounter();
                });
            }
        };

        cjs.Api.loader.get("loggedInObservable").call((observable) => {
            observable.subscribe((loggedIn) => {
                if(loggedIn) {
                    cjs.mygames.load();
                    cjs.liveTableSettings.loadUserSettings();
                    redrawLivescore();
                    reloadMyGamesTab();
                    push_update_subscription();
                    const seoTop = document.querySelectorAll(".seoTop");
                    seoTop.forEach((elem) => {
                        elem.style.display = "none";
                        elem.classList.add("seoTopHidden");
                    });
                    document.body.classList.add('isLoggedIn');
                    document.body.classList.remove('seoTopWrapperHidden');
                } else {
                    cjs.mygames.drop();
                    cjs.liveTableSettings.restoreDefaults();
                    redrawLivescore();
                    reloadMyGamesTab();
                    push_update_subscription();
                }
            });
        });
        const lsidClient = cjs.dic.get('lsidClientFactory').getInstance();
        lsidClient.storage.getInnerDataObservable(["myLeagues"]).subscribe(redrawLivescore);
        lsidClient.storage.getInnerDataObservable(["mygames"]).subscribe(function()
        {
            cjs.mygames.load();
            redrawLivescore();
            reloadMyGamesTab();
        });
        lsidClient.storage.getInnerDataObservable(["lsSettins"]).subscribe(function()
        {
            cjs.liveTableSettings.loadUserSettings();
            redrawLivescore();
        });
            };

    function initFeedRequest()
    {
        if (typeof(cjs.feedRequest) !== 'undefined')
        {
            return;
        }

        cjs.feedRequest = cjs.dic.getNewInstance("Feed_Request");
        cjs.feedLoader = cjs.dic.getNewInstance("Feed_Loader");
    };

    cjs.fromGlobalScope.initFeedRequest = initFeedRequest;

    function redrawLivescore()
    {
        var isTournamentPage = cjs.dic.get('util_page').isTournamentPage();
        if (cjs.redrawLivescoreCalled || (!cjs.full_loaded && !isTournamentPage))
        {
            return;
        }
        cjs.redrawLivescoreCalled = true;
        setTimeout(function()
        {
            delete(cjs.redrawLivescoreCalled);
            cjs.liveTableSettings.redrawLivescore(true);
            cjs.Api.loader.get('reactCalls').call(function(reactCalls) {
                reactCalls.reloadStaticContent();
            });
        }, 100);
    };

    function init_after_feeds()
    {
        if(!cjs.full_loaded || !cjs.repair_loaded)
            return;

        // update counter
        if (counter_update_interval === null)
        {
            counter_update_interval = setInterval('counter_update()', 5 * 1000);
        }

        set_service_status();
    };

    function start_updating_odds()
    {
        if(typeof updater.updating_odds_interval != 'undefined')
            stop_updating_odds();
        updater.updating_odds_interval = setInterval('updater.doc_update(\'updated-odds\')', cjs.Api.config.get('ajax', 'prematch_odds_sync_time') * 1000);
    };

    function stop_updating_odds()
    {
        clearInterval(updater.updating_odds_interval);
        delete updater.updating_odds_interval;
    };

    function setHolderProxyScope(category, defaultScope, myGamesScope)
    {
        var scope;
        var holderEventProxy = cjs.dic.get('dataEventHolderProxy');
        var holderLeagueProxy = cjs.dic.get('dataLeagueHolderProxy');
        var previousScopeEvent = holderEventProxy.getScope();
        var previousScopeLeague = holderLeagueProxy.getScope();
        var dataEventHolderOld, dataEventHolderNew, dataLeagueHolderOld, dataLeagueHolderNew;

        switch(category)
        {
            case 5:
                scope = myGamesScope;
                break;
            default:
                scope = defaultScope;
        }

        if (previousScopeEvent !== scope)
        {
            if (sudate == 0 && previousScopeEvent === previousScopeLeague && previousScopeEvent === defaultScope && scope === myGamesScope)
            {
                dataEventHolderOld = cjs.dic.get('dataEventHolder');
                dataEventHolderNew = cjs.dic.get('dataEventHolderMygames');
                dataLeagueHolderOld = cjs.dic.get('dataLeagueHolder');
                dataLeagueHolderNew = cjs.dic.get('dataLeagueHolderMygames');
                dataEventHolderNew.reinit(dataEventHolderOld.getReferences());
                dataLeagueHolderNew.reinit(dataLeagueHolderOld.getReferences());
                holderEventProxy.setScope(scope);
                holderLeagueProxy.setScope(scope);
                holderEventProxy.getHandler().resetIds();
                holderLeagueProxy.getHandler().resetIds();
            }
            else if (sudate == 0 && previousScopeEvent === previousScopeLeague && previousScopeEvent === myGamesScope && scope === defaultScope)
            {
                holderEventProxy.getHolder().reinit();
                holderLeagueProxy.getHolder().reinit();
                holderEventProxy.getHandler().resetIds();
                holderLeagueProxy.getHandler().resetIds();
                holderEventProxy.setScope(scope);
                holderLeagueProxy.setScope(scope);
            }
            else
            {
                holderEventProxy.getHolder().reinit();
                holderLeagueProxy.getHolder().reinit();
                holderEventProxy.getHandler().resetIds();
                holderLeagueProxy.getHandler().resetIds();
                holderEventProxy.setScope(scope);
                holderLeagueProxy.setScope(scope);
                holderEventProxy.getHolder().reinit();
                holderLeagueProxy.getHolder().reinit();
                holderEventProxy.getHandler().resetIds();
                holderLeagueProxy.getHandler().resetIds();
            }
        }
    };

    function updateNonMyGamesTabs()
    {
        if (updater.last_doc_update_category == 5)
        {
            if (cjs.dic.get('dataEventHolderProxy').getHolder().hasData())
            {
                sort_fs_data();
                updater.last_doc_update_category = category;
            }
            else
            {
                updater.last_doc_update_category = category;
                cjs.Api.loader.get('reactCalls').call(function(reactCalls) {
                    reactCalls.reloadDay(0);
                });
            }
        }

        return true;
    };

    function display_banners()
    {
        cjs.Api.loader.get("geoIpResolver").call(function(){
            cjs.Api.loader.get("onetrust").call(() => {
                cjs.Api.loader.get('boxContentManager').call(function(boxContentManager) {
                    boxContentManager.show(cjs.geoIP, cjs.geoIPIsoSubdivisionCode0, ["over", "over_split", "over_self_promo", "under"], cjs.Api.config.get('app', 'legal_age_confirmation', 'enabled'), cjs.Api.config.get('app', 'legal_age_confirmation', 'geoip'));
                });
            });
        });

        // display banners
        try
        {
            parent.document.displayTrustedAdvert();
            banners.setAdBlockedCallback(function(blocked, browser)
            {
                cjs.Api.loader.get('util/adblocked').call(function (adBlocked) {
                    adBlocked.save(blocked, browser);
                });
            });

            var bannersDisplayedCallbacks = [];

            if (cjs.Api.config.get('app', 'google_analytics', 'enable'))
            {
                bannersDisplayedCallbacks.push(function(){EventTracker.bindAdsCallbackClick(window.sport)});
            }
            bannersDisplayedCallbacks.push(function() {cjs.Api.loader.get('util/advert/cleaner').call()});
            banners.setDisplayedCallback(function(){
                for (var callbackIndex = 0; callbackIndex < bannersDisplayedCallbacks.length; callbackIndex++)
                {
                    if (Object.prototype.toString.call(bannersDisplayedCallbacks[callbackIndex]) == '[object Function]')
                    {
                        bannersDisplayedCallbacks[callbackIndex]();
                    }
                }
            });
        }
        catch(e)
        {
            try
            {
                document.displayTrustedAdvert();
            }
            catch(e) {}
        }
    };

    function oddsActionsAfterContentGenerated(isOdds)
    {
        if (isOdds)
        {
            push_update_subscription(); // hack - tohle neni udelane jeste ciste
            cjs.Api.loader.get('reactCalls').call(function(reactCalls) {
                reactCalls.loadingState("odds", false);
                reactCalls.fullOddsFeedLoaded();
            });

            // regenerate live sync
            if(interval_live != null)
            {
                clearInterval(interval_live);
                interval_live = null;
            }
        }
    }

    function pgenerate_odds()
    {
        setTimeout('updater.doc_update(\'odds\', true)', 100);
    };

    cjs.fromGlobalScope.detail_open = function (_id, _tab, _checkHolder) {
        cjs.Api.loader.get('detail/opener').call({ eventId: _id, tabName: _tab, checkHolder: _checkHolder, parentId: "" })
    };

    function bookmaker_open(link, bookmakerId, betslip)
    {
        if (link.indexOf("gicc=") === -1 || link.indexOf("gisc=") === -1) {
            var urlPostfix = link.indexOf("?") === -1 ? "?" : "&";
            urlPostfix += `gicc=${cjs.geoIP}&gisc=${cjs.geoIPIsoSubdivisionCode0}`;
            link = link + urlPostfix;
        }

        if (betslip)
        {
            var width = 0;
            var height = 0;
            cjs.Api.loader.get('bookmakerSettings').call(function(module) {
                var betslipWindow = module.getBetslipWindow(bookmakerId);
                width = betslipWindow.getWidth();
                height = betslipWindow.getHeight();
            });

            var params = '';
            if (width && height)
            {
                params = 'hotkeys=no, resizable=no, toolbar=no, status=no, dependent=yes, scrollbars=1, width=' + width + ', height=' + height;
            }
            var detail_window = window.open(link, "betslip", params);
            if (!detail_window.closed)
            {
                detail_window.focus();
            }
        }
        else
        {
            window.open(link);
        }
    };

    function reload(force_reload)
    {
        if (force_reload || true)
        {
            var url, message = "reload:" + sudate + "-" + category;
            var matches = /^([^#]+)#(.*)\breload:([0-9]+\-[0-9])(.*)$/.exec(parent.location.href);
            if (matches)
                url = matches[1] + "#" + matches[2] + message + (matches[4].length ? ";" + matches[4] : "");
            else
            {
                matches = /^([^#]+)#(.*)$/.exec(parent.location.href);
                if (matches)
                    url = matches[1] + "#" + (matches[2].length ? matches[2] + ";" : "") + message;
                else
                    url = parent.location.href + "#" + message;
            }
            parent.location.href = url;
            parent.location.reload();
        }
        else
            updater.doc_resume();
    };

    /**
 * Correct play time of matches
    */
    function counter_update()
    {
        var eventHandler = cjs.dic.get('dataEventHolderProxy').getHandler();
        var eventHolder = cjs.dic.get('dataEventHolderProxy').getHolder();
        var currentTimestamp = cjs.dic.get("util_date").getTimestamp();
        var reloadEvents = {};

        eventHandler.each(function(index, id)
        {
            var eventItem = this.getItem(id);
            var periodUpdateUTime = eventItem.getValue(feedIndexes.UPDATEINDEXES_PERIOD_UPDATE_UTIME);

            cjs.Api.loader.get('reactCalls').call(function(reactCalls) {
                reactCalls.reloadEvent(id);
            });

            if (typeof fs_counter[id] === "undefined"
                && periodUpdateUTime > 0
                && periodUpdateUTime > (currentTimestamp - counter_duration_time)
                && !eventItem.isScheduled())
            {
                fs_counter[id] = periodUpdateUTime;
                reloadEvents[id] = 1;
            }
        });

        for (var fsDataIndex in fs_counter)
        {
            if (fs_counter[fsDataIndex] < currentTimestamp - counter_duration_time)
            {
                if (eventHolder.hasItem(fsDataIndex))
                {
                    eventHolder.getItem(fsDataIndex).setValue(feedIndexes.UPDATEINDEXES_PERIOD_UPDATE_UTIME, 0);
                    reloadEvents[fsDataIndex] = 1;
                }
                delete fs_counter[fsDataIndex];
            }
        }

        cjs.Api.loader.get('reactCalls').call(function(reactCalls) {
            for (var reloadEventId in reloadEvents)
            {
                reactCalls.reloadEvent(reloadEventId);
            }
        });
    };

    function set_calendar_date(value, forceReload)
    {
        if (!forceReload && value == sudate) return;
        sudate = cjs.dic.get('util_number').toNumber(value);

        if (hasRepairFeed(value))
        {
            delete cjs.gamesNotificationOnly;
        }
        else
        {
            cjs.gamesNotificationOnly = true;
        }

        push_update_subscription();
        push_connect(sudate);

        setTimeout(function () {
            updater.doc_update();
        }, 10);
    };

    /**
 * Call this after changing timezone
    */
    function change_tz_callback()
    {
        cjs.Api.loader.get("sportMenuRefresh").call();

                    cjs.Api.loader.get('reactCalls').call(function(reactCalls) {
                reactCalls.reloadStaticContent();
            });
        
        var page = cjs.dic.get('util_page');
        if (updater && !page.isTournamentPagePassiveTable()) {
            updater.doc_update();
        }

        cjs.Api.loader.get('reactCalls').call(function(reactCalls) {
            reactCalls.reloadOnDayChange();

            if (cjs.dic.get('Helper_MyGamesChecker').isMyGames()) {
                cjs.Api.loader.get("myTeams").call(function(_mt) {
                    if (_mt.getCount()) {
                        _mt.reloadAllParticipants();
                    } else {
                        loadAndShowMygamesContent();
                        _mt.callReactUpdates();
                    }
                });
            } else {
                reactCalls.reloadMyGamesTabCounter();
            }
        });
    };

    /**
     * Opens window showing standings or draw for tournament stage.
     */
    function stats_open(tournament_id, tournament_stage_id, sport_id, stats_type_ident)
    {
        cjs.Api.loader.get('util/stats/opener').call({tournamentId: tournament_id, tournamentStageId: tournament_stage_id, sportId: sport_id, statsTypeIdent: parseInt(stats_type_ident) || 0});
    };

    function setAjaxSyncMultiplier(multiplier)
    {
        if (cjs.Api.ajaxSyncTime.getMultiplier() !== multiplier) {
            updater.ajax_time_update = true;
        }

        cjs.Api.ajaxSyncTime.setMultiplier(multiplier);
    };

    function set_service_status(value)
    {
        if(typeof value == 'undefined')
            value = service_status;

        value = parseInt(value, 10);
        cjs.Api.loader.get('Helper_ServiceStatusBox').call(value)
        service_status = value;
    };


// CommCore server communication routines {{{

    // CommCore init {{{

    /**
     * Constructor of the CommCore object.
     *
     * @param integer time    Interval for check updates
     * @param string func    Function to call
     * @return object
     */
    function CommCore(country_id, tournament_id, country_tournament_order_fin, participant_id, seriesId)
    {
        var currentTimestamp = cjs.dic.get("util_date").getTimestamp();
        this.interval_sync    = null;
        this.interval_blink = null;
        this.interval_counter = null;
        this.interval_live = null;
        this.last_sync_utime = currentTimestamp;
        this.refresh_utime = currentTimestamp;
        this.last_doc_update_category = null;
        this.last_doc_update_action = null;
        this.parse_only = false;
        this.ajax_time_update = false;

        this.country_id = country_id;
        this.tournament_id = tournament_id;
        this.country_tournament_order_fin = (country_tournament_order_fin ? true : false);

        if (tournament_id != null)
        {
            this.init_action = 'tournament';
        }
        else if (typeof participant_id != 'undefined' && participant_id != null)
        {
            this.init_action = 'participant';
        }
        else if (typeof seriesId != 'undefined' && seriesId != null)
        {
            this.init_action = 'series';
        }
        else if (country_id != null)
        {
            this.init_action = 'country';
        }
        else
        {
            this.init_action = 'full';
        }

        this.game  = null;
        this.content_utime = null;
    };
    // }}}

    /**
     * Resume AJAX update after long failure - this is a workaround for frepair feed which is called but no update feed is started afterwards
     */
    CommCore.prototype.doc_resume = function(forceUpdate)
    {
        if (forceUpdate || !cjs.dic.get('Helper_MyGamesChecker').isMyGames())
        {
            updater.doc_update();
            updater.set_interval('update');
        }
        else
        {
            loadAndShowMygamesContent();
        }
    };

    CommCore.prototype.lastSyncUtimeIsTooOld = function(currentTimestamp, useOddsCacheTime)
    {
        currentTimestamp = currentTimestamp || cjs.dic.get("util_date").getTimestamp();
        var cacheTime = useOddsCacheTime ? cjs.Api.config.get('ajax', 'prematch_odds_cache_time') : cjs.Api.config.get('ajax', 'sql_cache_time');
        return !this.ajax_time_update && (this.last_sync_utime + (0.8 * cacheTime) < currentTimestamp);
    };

    CommCore.prototype.lastSyncUtimeCanBeHandledByRepairFeed = function(currentTimestamp)
    {
        currentTimestamp = currentTimestamp || cjs.dic.get("util_date").getTimestamp();
        return this.last_sync_utime + (0.8 * 300) > currentTimestamp;
    };

    function referenceSameIdsInHolders(holder1, holder2)
    {
        var id, ids = holder1.getAllContainerIds();
        for (var i = 0, _len = ids.length; i < _len; i++ )
        {
            id = ids[i];
            if (holder2.hasItem(id))
            {
                holder2.setItem(id, holder1.getItem(id));
            }
        }
    };

    // CommCore request functions {{{
    CommCore.prototype.doc_update = function(action, get_odds, prefered_sport_id, pageNumber, type, responseCallback)
    {
        if (category == 5 && (action == 'update' || action == 'repair' || action == 'frepair'))
        {
            var neededFeeds = [];
            neededFeeds = neededFeeds.concat(cjs.mygames.getNeededFeeds(1));

            if (neededFeeds.length > 0)
            {
                for (var i in neededFeeds)
                {
                    if (sport_id == neededFeeds[i].sport_id)
                    {
                        continue;
                    }

                    prefered_sport_id = 0;
                    break;
                }
            }

            if (typeof cjs.myTeams != 'undefined')
            {
                var sports = cjs.myTeams.getSportIds();
                if (sports.length > 1 || (sports.length == 1 && sports[0] != prefered_sport_id))
                {
                    prefered_sport_id = 0;
                }
            }
        }

        action = (typeof action == 'undefined' ? updater.init_action : action);

        prefered_sport_id = (typeof prefered_sport_id == 'undefined') ? sport_id : prefered_sport_id;

        // sys - out of sync update
        if(action == 'sys' && ((sudate != 0 && sudate != -1)))
            return;

        // update - out of sync
        if(action == 'update' && (sudate != 0 && sudate != -1))
            return;

        this.last_doc_update_category = category;
        this.last_doc_update_action = action;

        switch (action)
        {
            case 'full':
            case 'country':
            case 'tournament':
                if (tournamentPage === false && ['country', 'tournament'].includes(action))
                {
                    var eventHolder = cjs.dic.get('dataEventHolder');
                    var leagueHolder = cjs.dic.get('dataLeagueHolder');
                    var completeEventsHolder = cjs.dic.get('dataEventHolderTemporary');
                    var completeLeaguesHolder = cjs.dic.get('dataLeagueHolderTemporary');
                    var filteredEventsHolder = cjs.dic.get('dataEventHolderFiltered');
                    var filteredLeaguesHolder = cjs.dic.get('dataLeagueHolderFiltered');
                    var isCountryTabDefault = category === 0;
                    var isCountryTabFinished = category === 6;
                    var isCountryTabScheduled = category === 7;
                    var afterCallback = function(){
                        cjs.Api.loader.get('reactCalls').call(function(reactCalls) {
                            reactCalls.loadingState("country", false);
                        });
                    };
                    var myGamesCallback = function(){};

                    function filterExistingEventsData(eventHolder, leagueHolder, filteredEventHolder, filteredLeaguesHolder)
                    {
                        eventHolder.reinit(filteredEventHolder.getReferences());
                        leagueHolder.reinit(filteredLeaguesHolder.getReferences());
                        cjs.dic.get('dataEventHandler').resetIds();
                        cjs.dic.get('dataLeagueHandler').resetIds();
                    }

                    if (isCountryTabDefault || (isCountryTabFinished && !completeEventsHolder.hasData()))
                    {
                        afterCallback = function()
                        {
                            completeEventsHolder.reinit(eventHolder.getReferences());
                            completeLeaguesHolder.reinit(leagueHolder.getReferences());
                            myGamesCallback();
                            cjs.Api.loader.get('reactCalls').call(function(reactCalls) {
                                reactCalls.loadingState("country", false);
                            });
                        };
                    }
                    else if (eventHolder.hasData())
                    {
                        if (isCountryTabFinished && completeEventsHolder.hasData())
                        {
                            filterExistingEventsData(eventHolder, leagueHolder, completeEventsHolder, completeLeaguesHolder);
                            updater.generate_data();
                            break;
                        }
                        else if (isCountryTabScheduled && !filteredEventsHolder.hasData())
                        {
                            afterCallback = function()
                            {
                                filteredEventsHolder.reinit(eventHolder.getReferences());
                                filteredLeaguesHolder.reinit(leagueHolder.getReferences());
                                myGamesCallback();
                                cjs.Api.loader.get('reactCalls').call(function(reactCalls) {
                                    reactCalls.loadingState("country", false);
                                });
                            };
                        }
                        else if (isCountryTabScheduled && filteredEventsHolder.hasData())
                        {
                            filterExistingEventsData(eventHolder, leagueHolder, filteredEventsHolder, filteredLeaguesHolder);
                            updater.generate_data();
                            break;
                        }
                    }
                }

                resetAndExecuteFeedRequests(prefered_sport_id, action, afterCallback);
                break;

            case 'tournament-fixtures':
            case 'tournament-results':
                var seasonId = 0;
                var initialFeedData = cjs.initialFeeds[action === 'tournament-fixtures' ? 'fixtures' : 'results'];
                if (initialFeedData) {
                    seasonId = initialFeedData.seasonId || 0;
                }

                tournamentPageDataPart++;
                cjs.feedRequest.execute(action, prefered_sport_id, responseCallback, {
                    seasonId: seasonId,
                    dataPart: tournamentPageDataPart
                });
                break;

            case 'participant':
                // TODO back compatibility for sports not included in FSWEB-12635 (Team page with new data structure)
                if (!(cjs.Api.config.get('app', 'team_page' ,'duel') || []).includes(sport_id)) {
                    cjs.feedRequest.execute(action, prefered_sport_id, responseCallback, {participantId: participant});
                }
                break;

            case 'series':
                cjs.feedRequest.execute(action, prefered_sport_id, responseCallback, {seriesId: series});
                break;

            case 'participant-odds':
                cjs.feedRequest.execute(action, prefered_sport_id, responseCallback, {participantId: participant});
                break;

            case 'participant-fixtures':
            case 'participant-fixtures_s':
            case 'participant-fixtures_d':
            case 'participant-fixtures_m':
            case 'participant-results':
            case 'participant-results_s':
            case 'participant-results_d':
            case 'participant-results_m':
                cjs.participantPageNumber = cjs.participantPageNumber || 0;
                var tennisTypeArr = action.match(/_[sdm]$/);
                var tennisType = tennisTypeArr && tennisTypeArr[0] ? tennisTypeArr[0] : '';
                cjs.feedRequest.execute(action.split('_')[0], prefered_sport_id, responseCallback, {
                        participantId: participant,
                        dataPart: ++cjs.participantPageNumber,
                        tennisType: tennisType || ''
                });
                break;

            case 'participant-newsfeed':
                var ret = cjs.feedRequest.execute(action, prefered_sport_id, responseCallback, {
                    participantId: participant,
                    pageNumber: pageNumber,
                    type: type,
                    callback: responseCallback
                });
                if (ret === false)
                {
                    return;
                }
                break;

            default:
                if (action == 'odds')
                {
                    cjs.Api.loader.get('reactCalls').call(function(reactCalls) {
                        reactCalls.loadingState("odds-calendar", false);
                        reactCalls.loadingState("odds", true);
                    });
                }
                var ret = cjs.feedRequest.execute(action, prefered_sport_id, responseCallback);
                if (ret === false)
                {
                    return;
                }
        }
    };

    function get_odds_format()
    {
        if(typeof odds_format_url != 'undefined' && typeof ODDS_FORMAT_LIST[odds_format_url] != 'undefined')
        {
            prefered_format = odds_format_url;
            default_odds_format = prefered_format;
        }
        else
        {
            if (['_ass', '_ff'].includes(project_type_name))
            {
                var prefered_format = clientStorage.get('fs_of');
            }
            else
            {
                var prefered_format = clientStorage.get('fs_of_' + cjs.Api.config.get('app', 'lang', 'web'));
            }

            if(typeof ODDS_FORMAT_LIST[prefered_format] == 'undefined')
                prefered_format = default_odds_format;
            else
                default_odds_format = prefered_format;
        }

        return prefered_format;
    };
    // }}}

    // CommCore response functions {{{
    CommCore.prototype.response_full = function(r_status, r_headers, r_content, r_trigger, r_custom_headers)
    {
        CommCore.parse_custom_headers(r_custom_headers);

        if(r_trigger == 'headers_hit')
            return;

        cjs.full_loaded = true;

        var mainBookmakerIds = [];
        cjs.Api.loader.get('bookmakerSettings').call(function (module) {
            mainBookmakerIds = module.getMainBookmakerIds(cjs.geoIP, cjs.geoIPIsoSubdivisionCode0);
            cjs.dic.get('Application').setMainBookmakerIds(mainBookmakerIds);
        });

        updater.setLastSyncUtime(cjs.dic.get("util_date").getTimestamp());
        if(updater.is_actual(r_status, r_headers)) { return; }

        if(!updater.parse_only)
        {
            if (tournamentPage === false && ['country', 'tournament'].includes(r_trigger) && cjs.dic.get('dataEventHolderTemporary').hasData())
            {
                cjs.dic.get('dataEventHolder').reinit();
                cjs.dic.get('dataEventHandler').resetIds();
                cjs.dic.get('dataLeagueHolder').reinit();
                cjs.dic.get('dataLeagueHandler').resetIds();
            }
            else
            {
                reset_env();
            }
        }

        ff_data = r_content;

        parse(r_content);

        if (!updater.parse_only) {
            var page = cjs.dic.get('util_page');
            if (hasRepairFeed(sudate)) {
                var has_data = cjs.dic.get('dataEventHolderProxy').getHolder().hasData();

                if (has_data) {
                    if (r_trigger === 'full' || r_trigger === 'country' || r_trigger === 'tournament') {
                        var feedData = cjs.feedRequest.getFeedData('frepair', sport_id);
                        cjs.feedLoader.executeCompleteCallback(feedData.context);
                    } else {
                        updater.doc_update('frepair');
                    }
                } else {
                    if (cjs.Api.config.get('app', 'odds', 'sport_page') && (['_ass', '_ff'].includes(project_type_name) || Number(window.localStorage.getItem("odds_sport_page"))) && !page.isParticipantPage() && !page.isSeriesPage()) {
                        updater.generate_data_odds();
                        updater.clear_interval('set_interval: odds');
                    } else {
                        updater.generate_data();
                        updater.clear_interval('set_interval: update');
                    }
                }

                if (has_data && r_trigger === 'full') {
                    cjs.dic.get('dataEventHolderProxy').getHandler().each(function(index, id) {
                        cjs.dic.get('UpdateManager').removeEventLiveStatus(id);
                    });
                }
            } else {
                sort_fs_data();
                if (cjs.Api.config.get('app', 'odds', 'sport_page') && (['_ass', '_ff'].includes(project_type_name) || Number(window.localStorage.getItem("odds_sport_page"))) && !page.isParticipantPage() && !page.isSeriesPage()) {
                    updater.generate_data_odds();
                } else {
                    updater.generate_data();
                }
            }
        }
        init_after_feeds();
        if (tournamentPage === false && ['country', 'tournament'].includes(r_trigger) && cjs.dic.get('dataEventHolderTemporary').hasData())
        {
            var eventHolder = cjs.dic.get('dataEventHolder');
            var leagueHolder = cjs.dic.get('dataLeagueHolder');
            var temporaryEventHolder = cjs.dic.get('dataEventHolderTemporary');
            var temporaryLeagueHolder = cjs.dic.get('dataLeagueHolderTemporary');
            referenceSameIdsInHolders(eventHolder, temporaryEventHolder);
            referenceSameIdsInHolders(leagueHolder, temporaryLeagueHolder);
        }

        cjs.Api.loader.get('reactCalls').call(function(reactCalls) {
            if (cjs.dic.get('Helper_MyGamesChecker').isMyGames()) {
                reactCalls.loadingState("fullFeed", false);
            } else {
                reactCalls.fullFeedLoaded();
            }
        });
    };

    CommCore.prototype.response_update = function(r_status, r_headers, r_content, r_trigger, r_custom_headers)
    {
        if (typeof r_custom_headers != 'undefined' && typeof r_custom_headers['Date'] != 'undefined' && r_custom_headers['Date']) {
            var serverTime = new Date(r_custom_headers['Date']).getTime();
            if (!isNaN(serverTime)) {
                cjs.dic.get("util_date").setServerTimestamp(Math.floor(serverTime / 1000));
            }
        }
        var currentTimestamp = cjs.dic.get("util_date").getTimestamp();

        var isRepair = r_trigger == 'repair' || r_trigger == 'frepair';
        if (isRepair)
        {
            cjs.repair_loaded = true;
        }

        var resync = false;

        // check if time from the last sync is not too old. If so, repair data with the update feed
        if (updater.lastSyncUtimeIsTooOld(currentTimestamp))
        {
            // time from the last change can be handled by repair feed
            if (updater.lastSyncUtimeCanBeHandledByRepairFeed(currentTimestamp))
            {
                if (!isRepair)
                {
                    updater.set_interval('repair', true);
                    resync = true;
                }
            }
            // time from the last change is too old. Call initial (e.g. full) feed
            else
            {
                updater.doc_resume(true);
                resync = true;
            }
        }

        updater.setLastSyncUtime(currentTimestamp);

        cjs.Api.loader.get('util/midnightLiveTableRefresh').call(function(midnight) {
            midnight.disableReload();
        });

        if(resync)
            return;

        // resync, feed synchronization time changed
        if(updater.ajax_time_update && r_trigger != 'frepair')
        {
            updater.ajax_time_update = false;
            updater.set_interval('update');
        }

        // there is no data
        if(updater.is_actual(r_status, r_headers))
        {
            parse_status = true;
        }
        // there is new data
        else
        {
            // parse input data
            var parse_status = parse(r_content, true, false, r_trigger);
        }

        // regenerate the whole page with new data
        if(r_trigger == 'frepair')
        {
            sort_fs_data();
            if (cjs.Api.config.get('app', 'odds', 'sport_page') && (['_ass', '_ff'].includes(project_type_name) || Number(window.localStorage.getItem("odds_sport_page")))) {
                updater.generate_data_odds();
            } else {
                updater.generate_data();
            }
            var sport_id = 1 * r_content.substring(3, r_content.indexOf(JS_CELL_END, 4));
            updater.sync_score_data_with_update(sport_id);
            if (cjs.dic.get("util_page").getPageType() === "series_page")
            {
                cjs.Api.loader.get('reactCalls').call(function(reactCalls) {
                    reactCalls.reloadTabContent(category);
                });
            }
        // just update existing content
        }
        else
            cjs.dic.get('UpdateManager').update(r_trigger);

        if(r_trigger == 'repair' || mpe_delivery == 'a' && r_trigger == 'frepair')
            updater.set_interval('update');

        if(!parse_status)
            refresh_iframe();

        if (r_trigger == 'frepair')
        {
            init_after_feeds();
        }
    };

    CommCore.prototype.response_odds = function(r_status, r_headers, r_content, r_trigger)
    {
        updater.setLastSyncUtime(cjs.dic.get("util_date").getTimestamp());
        if(updater.is_actual(r_status, r_headers)) { return; }
        var parse_status = parse(r_content, false, true);
        oddsActionsAfterContentGenerated(true);

        if (!parse_status)
            updater.set_interval(updater.init_action, true);
    };

    CommCore.prototype.response_updated_odds = function(r_status, r_headers, r_content, r_trigger)
    {
        var resync = false;
        var currentTimestamp = cjs.dic.get("util_date").getTimestamp();

        // check if time from the last sync is not too old. If so, repair odds with the update feed
        if(updater.lastSyncUtimeIsTooOld(currentTimestamp, true))
        {
            // time from the last change can be handled by repair feed
            if(updater.lastSyncUtimeCanBeHandledByRepairFeed(currentTimestamp))
            {
                if(r_trigger != 'repair' && r_trigger != 'frepair')
                {
                    updater.set_interval('repair', true);
                    resync = true;
                }
            }
            // time from the last change is too old. Call initial (e.g. full) feed
            else
            {
                updater.doc_resume(true);
                resync = true;
            }
        }

        updater.setLastSyncUtime(currentTimestamp);

        if(resync)
            return;

        // resync, feed synchronization time changed
        if(updater.ajax_time_update && r_trigger != 'frepair')
        {
            updater.ajax_time_update = false;
            updater.set_interval('update');
        }

        // there is no data
        if (updater.is_actual(r_status, r_headers)) {
            parse_status = true;
        }
        // there is new data
        else {
            // parse input data
            var parse_status = parse(r_content, true, false, r_trigger);
        }

        // regenerate the whole page with new data
        if (r_trigger == 'frepair') {
            var sport_id = parseInt(r_content.substring(3, r_content.indexOf(JS_CELL_END, 4)));

            if (['_ass', '_ff'].includes(project_type_name)) {
                updater.generate_data();
            } else {
                oddsActionsAfterContentGenerated(true);
            }

            updater.sync_score_data_with_update(sport_id);
            // just update existing content
        } else
            cjs.dic.get('UpdateManager').update();

        if (!parse_status)
            refresh_iframe();
    };

    CommCore.prototype.response_load_odds = function(r_status, r_headers, r_content, r_trigger)
    {
        updater.setLastSyncUtime(cjs.dic.get("util_date").getTimestamp());
        if(updater.is_actual(r_status, r_headers)) { return; }

        var parse_status = parse(r_content, false, true);

        updater.generate_data();

        if (!parse_status)
            updater.set_interval(updater.init_action, true);
    };

    CommCore.prototype.setLastSyncUtime = function(timestamp)
    {
        this.last_sync_utime = timestamp;
    };

    CommCore.expectedCacheKeys = {};

    CommCore.getExpectedNewCacheKey = function(key)
    {

        if (typeof CommCore.expectedCacheKeys[key] != 'undefined')
        {
            return CommCore.expectedCacheKeys[key];
        }

        return null;
    };

    CommCore.updateInProgress = {};

    CommCore.setUpdateInProgress = function(key,value)
    {
        CommCore.updateInProgress[key] = value;
    };

    CommCore.getUpdateInProgress = function(key)
    {
        if (typeof CommCore.updateInProgress[key] != 'undefined')
        {
            return CommCore.updateInProgress[key];
        }

        return null;
    };

    CommCore.parse_custom_headers = function(r_custom_headers)
    {
        if (typeof r_custom_headers == 'undefined')
        {
            return;
        }

        if (typeof r_custom_headers['X-Geoip2-Country-Code'] != 'undefined' && r_custom_headers['X-Geoip2-Country-Code'])
        {
            cjs.geoIP = r_custom_headers['X-Geoip2-Country-Code'];
        }

        if (typeof r_custom_headers['X-Geoip2-City-Name'] != 'undefined' && r_custom_headers['X-Geoip2-City-Name'])
        {
            cjs.geoIPCityName = r_custom_headers['X-Geoip2-City-Name'];
        }

        if (typeof r_custom_headers['X-Geoip2-Subdivision-Name-0'] != 'undefined' && r_custom_headers['X-Geoip2-Subdivision-Name-0'])
        {
            cjs.geoIPSubdivisionName0 = r_custom_headers['X-Geoip2-Subdivision-Name-0'];
        }

        if (typeof r_custom_headers['X-Geoip2-Subdivision-Code-0'] != 'undefined' && r_custom_headers['X-Geoip2-Subdivision-Code-0'])
        {
            cjs.geoIPSubdivisionCode0 = r_custom_headers['X-Geoip2-Subdivision-Code-0'];
        }

        if (typeof r_custom_headers['X-Geoip2-ISO-Subdivision-Code-0'] != 'undefined' && r_custom_headers['X-Geoip2-ISO-Subdivision-Code-0'])
        {
            cjs.geoIPIsoSubdivisionCode0 = r_custom_headers['X-Geoip2-ISO-Subdivision-Code-0'].replace('-', '');
        }

        if (typeof r_custom_headers['X-Geoip2-Subdivision-Name-1'] != 'undefined' && r_custom_headers['X-Geoip2-Subdivision-Name-1'])
        {
            cjs.geoIPSubdivisionName1 = r_custom_headers['X-Geoip2-Subdivision-Name-1'];
        }

        if (typeof r_custom_headers['Date'] != 'undefined' && r_custom_headers['Date'])
        {
            var serverTime = new Date(r_custom_headers['Date']).getTime();
            if (!isNaN(serverTime)) {
                cjs.dic.get("util_date").setServerTimestamp(Math.floor(serverTime / 1000));
            }

            if (!page_is_initialized)
            {
                page_utime_init_value(cjs.dic.get("util_date").getTimestamp());
            }
        }
    };

    CommCore.prototype.response_sys = function(r_status, r_headers, r_content, r_trigger, r_custom_headers)
    {
        (r_content.split(JS_CELL_END)).forEach((row) => {
            var keyAndValue = row.split(JS_INDEX);
            var key = keyAndValue[0] || "";
            var value = keyAndValue[1] || "";

            switch(key) {
                case 'mlp':
                    setAjaxSyncMultiplier(parseFloat(value));
                    break;
                case 'sst':
                    set_service_status(parseInt(value));
                    break;
                case 'stu': {
                    cjs.Api.ajaxSyncTime.setUpdateTime(parseInt(value));
                    updater.ajax_time_update = true;
                    break;
                }
                case 'utime':
                    cjs.dic.get("util_date").setServerTimestamp(parseInt(value));
                    break;
            }
        });
    };

    // CommCore service functions {{{
    CommCore.prototype.is_actual = function(r_status, r_headers_empty)
    {
        // no content, already have content
        if(r_status == 304 || r_status == 204 || r_status == 1223 || r_headers_empty === true)
            return true;
        return false;
    };

    CommCore.prototype.set_interval = function(action, useTimeout)
    {
        if (typeof useTimeout === 'undefined')
        {
            useTimeout = false;
        }

        var timerFunction = useTimeout ? setTimeout : setInterval;

        // clear previous interval
        updater.clear_interval('set_interval: ' + action);

        if(action == 'odds')
        {
            updater.interval_sync = timerFunction('updater.doc_update(\'odds\')', 100);
        }
        else
        {
            var ajaxTime = cjs.Api.ajaxSyncTime.getTime(action);
            updater.interval_sync = timerFunction('updater.doc_update(\'' + action + '\')', ajaxTime * 1000);
        }
    };

    CommCore.prototype.clear_interval = function(pom)
    {
        if(updater.interval_sync != null)
        {
            clearTimeout(updater.interval_sync);
            clearInterval(updater.interval_sync);
            updater.interval_sync = null;

            return true;
        }

        return false;
    };

    CommCore.prototype.generate_data_odds = function()
    {
        cjs.mygames.startStorageSyncTimer();

        if (category == 5)
        {
            start_updating_odds();
            return;
        }

        var page = cjs.dic.get('util_page');
        if (!page.isCountryPage() && !page.isSeasonPage())
        {
            if (cjs.Api.config.get('app', 'odds', 'sport_page') && (['_ass', '_ff'].includes(project_type_name) || Number(window.localStorage.getItem("odds_sport_page")))) {
                start_updating_odds();
            }

            var param  = 'full-odds';
        }
        else
        {
            if (!page.isSeasonPage())
            {
                var param  = 'country-odds';
            }
            else
            {
                if (!page.isParticipantPage())
                {
                    var param = 'tournament-odds';
                }
                else
                {
                    var param = 'participant-odds';
                }
            }
        }
        updater.doc_update(param);
    };

    CommCore.prototype.generate_data = function()
    {
        cjs.mygames.startStorageSyncTimer();

        if (sub_category == 2 || sub_category == 3)
        {
            cjs.Api.loader.get('reactCalls').call(function(reactCalls) {
                reactCalls.loadingState("odds-calendar", true);
            });
            pgenerate_odds();
        }
    };

    /**
     * Synchronizes scores in global fs_data with core update.
     *
     * This method should be called after repair update and is
     * necessary for proper score highlighting when user browses
     * between several sports.
     *
     * @param {Number} sport_id sport indetifier to filter only
     * matches associated with that sport
     */
    CommCore.prototype.sync_score_data_with_update = function(sportId)
    {
        // list of known score field indentifiers
        var scores = [
            feedIndexes.SHAREDINDEXES_HOME_CURRENT_RESULT,
            feedIndexes.SHAREDINDEXES_AWAY_CURRENT_RESULT,
            feedIndexes.SHAREDINDEXES_HOME_RESULT_PERIOD_1,
            feedIndexes.SHAREDINDEXES_HOME_RESULT_PERIOD_2,
            feedIndexes.SHAREDINDEXES_HOME_RESULT_PERIOD_3,
            feedIndexes.SHAREDINDEXES_HOME_RESULT_PERIOD_4,
            feedIndexes.SHAREDINDEXES_HOME_RESULT_PERIOD_5,
            feedIndexes.SHAREDINDEXES_HOME_RESULT_PERIOD_6,
            feedIndexes.SHAREDINDEXES_HOME_RESULT_PERIOD_7,
            feedIndexes.SHAREDINDEXES_HOME_RESULT_PERIOD_8,
            feedIndexes.SHAREDINDEXES_HOME_RESULT_PERIOD_9,
            feedIndexes.FULLFEEDINDEXES_HOME_SCORE_PART_PESAPALLO_FIRST_HALF,
            feedIndexes.FULLFEEDINDEXES_HOME_SCORE_PART_PESAPALLO_SECOND_HALF,
            feedIndexes.FULLFEEDINDEXES_HOME_SCORE_PART_PESAPALLO_PENALTIES,
            feedIndexes.SHAREDINDEXES_HOME_MARTIAL_ARTS_FINISHED,
            feedIndexes.SHAREDINDEXES_HOME_MARTIAL_ARTS_FINISHED_ROUND,
            feedIndexes.SHAREDINDEXES_HOME_MARTIAL_ARTS_FINISHED_SUB,
            feedIndexes.SHAREDINDEXES_AWAY_RESULT_PERIOD_1,
            feedIndexes.SHAREDINDEXES_AWAY_RESULT_PERIOD_2,
            feedIndexes.SHAREDINDEXES_AWAY_RESULT_PERIOD_3,
            feedIndexes.SHAREDINDEXES_AWAY_RESULT_PERIOD_4,
            feedIndexes.SHAREDINDEXES_AWAY_RESULT_PERIOD_5,
            feedIndexes.SHAREDINDEXES_AWAY_RESULT_PERIOD_6,
            feedIndexes.SHAREDINDEXES_AWAY_RESULT_PERIOD_7,
            feedIndexes.SHAREDINDEXES_AWAY_RESULT_PERIOD_8,
            feedIndexes.SHAREDINDEXES_AWAY_RESULT_PERIOD_9,
            feedIndexes.FULLFEEDINDEXES_AWAY_SCORE_PART_PESAPALLO_FIRST_HALF,
            feedIndexes.FULLFEEDINDEXES_AWAY_SCORE_PART_PESAPALLO_SECOND_HALF,
            feedIndexes.FULLFEEDINDEXES_AWAY_SCORE_PART_PESAPALLO_PENALTIES,
            feedIndexes.SHAREDINDEXES_AWAY_MARTIAL_ARTS_FINISHED,
            feedIndexes.SHAREDINDEXES_AWAY_MARTIAL_ARTS_FINISHED_ROUND,
            feedIndexes.SHAREDINDEXES_AWAY_MARTIAL_ARTS_FINISHED_SUB
        ];

        var changesHistoryContainer = cjs.dic.get('ChangesHistoryContainer');
        cjs.dic.get('dataEventHolderProxy').getHandler().each(function(index, id)
        {
            var eventItem = this.getItem(id);
            var scorePos, scoreIndex, historyScore;
            if (eventItem.getSportId() != sportId)
            {
                return;
            }
            scorePos = scores.length;
            while(scorePos--)
            {
                scoreIndex = scores[scorePos];
                if (eventItem.getValue(scoreIndex) === null)
                {
                    continue;
                }

                historyScore = undefined;
                if (changesHistoryContainer.hasNewValue(id, scoreIndex))
                {
                    historyScore = changesHistoryContainer.getNewValue(id, scoreIndex);
                }

                changesHistoryContainer.setValueChange(id, scoreIndex, eventItem.getValue(scoreIndex), historyScore);
            }
        });

        changesHistoryContainer.removeNewData();
    };

    // }}}

// }}}

// pushserver {{{

    /**
     * Method for switching PUSH <-> AJAX (for debugging, we are now without small green square below liveTable)
     */
    function sync_change()
    {
        if (cjs.push)
        {
            if(cjs.push.isConnected())
            {
                push_disconnect();
                cjs.push.startFallback()
            }
            else
                push_connect();
        }
    };

    function push_init()
    {
        cjs.Api.loader.get("synchronizationPushInstance").call((sp) => {
            // hack - tohle neni udelane dobre a ceka az se predela cely updaterovaci mechanizmus nad ajaxem a pushem {{{
            if (cjs.dic.get('dataEventHolderProxy').getHolder().hasData() === false)
            {
                if (cjs.Api.config.get('app', 'game_notification_push' ,'enable'))
                {
                    cjs.gamesNotificationOnly = true;
                    push_connect();
                }
                else
                {
                    push_disconnect();
                }
            }
			if (!sp.isConnected()) {
                push_connect();
            }
            if (cjs.gamesNotificationOnly) {
                sp.stopScheduledFallback();
            }
		});
    };

    /**
 * Switch to a standard ajax syncing
     */
    function push_fallback(action, fail_msg)
    {
        if(typeof action == 'undefined' || (action != 'start' && action != 'stop'))
            action = 'start';

        if(action == 'start')
        {
            // TODO back compatibility for sports not included in FSWEB-12635 (Team page with new data structure)
            if (participant && (cjs.Api.config.get('app', 'team_page' ,'duel') || []).includes(sport_id)) {
                return; // TODO not periodically updating via update feed for team page
            }

            if (updater.interval_sync == null)
            {
                updater.set_interval('update');
            }

            updater.doc_update('sys'); // intentionally
            sys_interval_checker = setInterval('updater.doc_update(\'sys\')', 60 * 1000);
        }
        else
        {
            updater.clear_interval('push working, dissabling ajax');
            clearInterval(sys_interval_checker);
            push_connect();
        }
    };

    function push_connect()
    {
        if (cjs.dic.get('dataEventHolderProxy').getHolder().hasData() || typeof cjs.gamesNotificationOnly !== 'undefined')
        {
            if (cjs.push)
            {
                cjs.push.connect(sudate);
                push_update_subscription();
            }
        }
    };

    async function push_update_subscription()
    {
        if (cjs.push)
        {
            var subscription = [];

            if (typeof cjs.gamesNotificationOnly === 'undefined')
            {
                subscription.push('sys_' + project_type_id ); // always required
                subscription.push('service'); // always required

                var sportIds = [sport_id];
                if (cjs.dic.get('Helper_MyGamesChecker').isMyGames())
                {
                    sportIds = sportIds.concat(cjs.mygames.getSportIds());
                    if (cjs.myTeams)
                    {
                        sportIds = sportIds.concat(cjs.myTeams.getSportIds());
                    }
                }

                var uniqueSportIds = sportIds.filter(function(value, index, self) { return self.indexOf(value) == index; });
                for (var i in uniqueSportIds)
                {
                    var sportId = uniqueSportIds[i];
                    subscription.push("u_" + sportId + "_" + project_type_id);
                    subscription.push('ul_' + sportId + '_' + project_id);
                }
            }

            const accountManagement = await new Promise((resolve) => cjs.Api.loader.get("accountManagement").call(resolve))
            if (await accountManagement.isUserLoggedIn())
            {
                const profile = await accountManagement.getUser().getProfile();
                if (profile.id) {
                    subscription.push("lsid_" + profile.id + "_" + cjs.Api.config.get('app', 'user_functions', 'namespace'));
                }
            }

            var utilPage = cjs.dic.get("util_page");
            if (cjs.Api.config.get('app', 'game_notification_push' ,'enable'))
            {
                var subscriptionInfo = {};
                if (typeof cjs.mygames !== 'undefined')
                {
                    for (var index in cjs.mygames.getContainer())
                    {
                        subscription.push('games_' + cjs.Api.config.get('app', 'lang', 'web') + '_' + index.split('_')[2]);
                        subscriptionInfo[index.split('_')[2]] = {
                            sportId: index.split('_')[1],
                            timestamp: new Date().getTime()
                        };
                    }
                }
                cjs.push.setSubscriptionInfo(subscriptionInfo);
            }
            cjs.push.updateSubscription(subscription);
        }
    };

    cjs.fromGlobalScope.push_update_subscription = push_update_subscription;

    function push_disconnect()
    {
        if (cjs.push)
        {
            cjs.push.disconnect();
        }
    };

    function push_refresh()
    {
        if (hasRepairFeed(sudate))
        {
            delete cjs.gamesNotificationOnly;
        }

        push_connect();
        push_update_subscription();
    };

    function refresh_iframe()
    {
        setTimeout("updater.set_interval('" + updater.init_action + "', true)", (Math.random() * 60 + 20) * 1000);
    };

// }}}

function page_utime_init_value(currentTimestamp)
{
    refresh_utime = currentTimestamp;
    page_is_initialized = true;
    counter_update();

    if (updater)
    {
        updater.refresh_utime = currentTimestamp;
    }
};

function switch_odd_format(format)
{
    clientStorage.store('fs_of_' + cjs.Api.config.get('app', 'lang', 'web'), format, 365*86400, 'self', '/');
    default_odds_format = format;
}

//needed for jsonp callback (don`t remove)
function jsonp_cb()
{
};

function getSpreadTrans()
{
    var spreadTransArr = [];
    var utilTrans = cjs.dic.get('utilTrans');

    spreadTransArr['full'] = utilTrans.translate('TRANS_ODDS_COMPARISON_ASIAN_HANDICAP');
    spreadTransArr['short'] = utilTrans.translate('TRANS_ODDS_COMPARISON_ASIAN_HANDICAP_IFRAME_SHORT');

    
    return spreadTransArr;
};

function loadAndShowMygamesContent(downloadFeedsForMovedGames, downloadedFeedsInPrevCall, prevNeedRepair)
{
    var loadTodayFeed = false;
    var feedRequest;
    prevNeedRepair = !!prevNeedRepair;
    downloadFeedsForMovedGames = !!downloadFeedsForMovedGames;
    if (typeof downloadedFeedsInPrevCall === 'undefined')
    {
        downloadedFeedsInPrevCall = {};
    }
    updater.last_doc_update_category = 5;

    var utilPage = cjs.dic.get("util_page");
    var myGamesCount = cjs.mygames.getCount();
    var myTeamsCount = 0;
    if (cjs.myTeams)
    {
        myTeamsCount = cjs.myTeams.getCount();
    }

    if (myGamesCount || myTeamsCount)
    {
        if (sudate != 0)
        {
            sudate = 0;

            if (myGamesCount)
            {
                loadTodayFeed = true;
            }

            push_refresh();
        }
    }
    cjs.Api.loader.get('reactCalls').call(function(reactCalls) {
        reactCalls.loadingState('mygames', false);
        reactCalls.loadingState('fullFeed', false);
    });
    if (myGamesCount)
    {
        cjs.Api.loader.get('reactCalls').call(function(reactCalls) {
            reactCalls.loadingStateReset();
        });
        cjs.feedLoader.reset();
        cjs.feedLoader.setBeforeCallback(function(){
            updater.parse_only = true;
        });

        cjs.feedLoader.executeFilterCallback(function(context){
            return /^full|^odds/.test(context);
        });

        var eventHolderProxy = cjs.dic.get('dataEventHolderProxy');
        var leagueHolderProxy = cjs.dic.get('dataLeagueHolderProxy');
        eventHolderProxy.getHolder().addItemsFromRawObject(cjs.mygames.getData());
        leagueHolderProxy.getHolder().addItemsFromRawObject(cjs.mygames.getLabels());
        eventHolderProxy.getHandler().resetIds();
        leagueHolderProxy.getHandler().resetIds();

        var frepair = prevNeedRepair;
        var neededFeeds = []; //today feeds
        neededFeeds = neededFeeds.concat(cjs.mygames.getNeededFeeds(1));

        var tmpSudate = sudate;

        for (var i in neededFeeds)
        {
            if (neededFeeds[i].sport_id == sport_id && !utilPage.isMixed() && !utilPage.isParent() && !loadTodayFeed)
            {
                continue;
            }
            feedRequest = cjs.feedRequest.getFeedData('full', neededFeeds[i].sport_id);
            if (downloadedFeedsInPrevCall[feedRequest.context] === true)
            {
                continue;
            }
            downloadedFeedsInPrevCall[feedRequest.context] = true;
            cjs.feedLoader.addIntoQueue(feedRequest);

            
            frepair = true;
        }

        var neededFeeds = []; //other feeds
        neededFeeds = neededFeeds.concat(cjs.mygames.getNeededFeeds());

        for (var i in neededFeeds)
        {
            feedRequest = cjs.feedRequest.getFeedData('full', neededFeeds[i].sport_id, neededFeeds[i].day);
            if (downloadedFeedsInPrevCall[feedRequest.context] === true)
            {
                continue;
            }
            downloadedFeedsInPrevCall[feedRequest.context] = true;
            cjs.feedLoader.addIntoQueue(feedRequest);
            frepair = true;
        }

        cjs.feedLoader.setAfterCallback(function(){
            cjs.Api.loader.get('reactCalls').call(function(reactCalls) {
                reactCalls.loadingState('mygames', false);
            });
            if (downloadFeedsForMovedGames != true)
            {
                loadAndShowMygamesContent(true, downloadedFeedsInPrevCall, frepair);
                return;
            }
            var feedData = cjs.feedRequest.getFeedData('frepair', 0);
            cjs.feedLoader.executeCompleteCallback(feedData.context);
            updater.parse_only = false;
            expand_collapse_league_load();
            if (!frepair)
            {
                sort_fs_data();
            }
            if (cjs.mygames.getCount())
            {
                cjs.mygames.load(true);
            }

            if (cjs.dic.get('Helper_MyGamesChecker').isMyGames())
            {
                generateMygames();
            }
        });

        sudate = tmpSudate;
        if(frepair && downloadFeedsForMovedGames === true)
        {
            cjs.feedLoader.addIntoQueue(cjs.feedRequest.getFeedData('frepair', 0));
        }
        cjs.Api.loader.get('reactCalls').call(function(reactCalls) {
            reactCalls.loadingState('mygames', true);
        });
        cjs.feedLoader.downloadAndExecuteFeeds();
    }
    else
    {
        generateMygames();
    }
};

function generateMygames()
{
    cjs.Api.loader.get('reactCalls').call(function(reactCalls) {
        reactCalls.reloadMyGamesTabCounter();
        reactCalls.reloadTabContent(5);
        reactCalls.loadingState('mygames', false);
    });
};

function show_more_templates()
{
    const node = document.getElementById("mt");
    node.querySelectorAll(".leftMenu__item--hidden").forEach((elem) => elem.classList.remove("leftMenu__item--hidden"))
    const showMore = node.querySelector(".show-more");
    if (showMore) {
        showMore.classList.add("leftMenu__item--hidden");
    }
};

function hasRepairFeed(sd)
{
    return sd == 0 || sd == -1;
};

/**
 * NEMAZAT!!! VOLA SE V ADMINU GTM
 */
function runAfterGtmLoaded()
{
    if (typeof ga !== 'undefined')
    {
        var tracker = ga.getAll()[0];
        var linkerParamValue = tracker.get('linkerParam').replace('_ga=', '');
        var twoYears = 3600 * 24 * 365 * 2;
        cjs.Api.clientStorage.storeCookie('_lsga', linkerParamValue, twoYears);
    }
};

function setupInitialLoading(action)
{
    cjs.Api.loader.get('reactCalls').call(function(reactCalls) {
        reactCalls.loadingStateReset();
        if (action == 'country')
        {
            reactCalls.loadingState("country", true);
        }
        else
        {
            reactCalls.loadingState("fullFeed", true);
        }
    });
}

function resetAndExecuteFeedRequests(sportId, feedName, afterCallback)
{
    cjs.feedLoader.reset();
    setupInitialLoading(feedName);
    if (feedName !== 'full' || hasRepairFeed(sudate))
    {
        cjs.feedLoader.addIntoQueue(cjs.feedRequest.getFeedData('frepair', sportId));
    }

    cjs.feedLoader.addIntoQueue(cjs.feedRequest.getFeedData(feedName, sportId));
    cjs.feedLoader.executeFilterCallback(function(contextName){
        var pattern = "^" + feedName;
        var re = new RegExp(pattern);
        return re.test(contextName);
    });
    cjs.feedLoader.setAfterCallback(afterCallback);
    cjs.feedLoader.downloadAndExecuteFeeds();
};

function clog() {
    try
    {
        if (window.console)
        {
            for (var i in arguments)
            {
                // @debug
                console.log(arguments[i]);
            }
        }
    }
    catch (err) {}
};

function cerr() {
    try
    {
        for (var i in arguments)
        {
            // @debug
            console.error(arguments[i]);
        }
    }
    catch (err) {

    }
};

function cdir() {
    try
    {
        for (var i in arguments)
        {
            // @debug
            console.dir(arguments[i]);
        }
    } catch (err) {}
};

cjs.Api.loader.get('localizationRedirector').call(function(localizationRedirector) {
    localizationRedirector.redirect();
});

cjs.Api.loader.get('tv/channelsStorage').call();

cjs.Api.loader.get('modules/eventTracking/search').call();

cjs.Api.loader.get('cjs').fulfill(function (cjsCallback) {
    cjsCallback(cjs);
});

