/*to do ，留言完refresh page)*/


var DEF_DEBUG = true;
var DEF_NO_HTML_DISP = true;
var DEF_field_battle = false;
var DEF_use_https = false;
var DEF_ts = true;//be true
var DEF_fuckthephotos = true;
var DEF_domain_name = "luffy.ee.ncku.edu.tw";
var DEF_port = "30087";
var DEF_path = "/app/poop";
var DEF_comment_path = "/comment";

var DEF_TEXT_UI_comment_btn = "發佈";
var DEF_GUI_TXT_addcomment = "新增留言";
var AMENDuser_idTOuser_name = false;//need false
var SET_ajex_full_json = false;//need false when pub.!
var SET_FillTest = false;//need false
var DEFAULT_RES_dummies_test = "[{\"id\":\"6092b210779ced6502375e01\",\"time\":\"1999-12-31T02:01:01.000Z\",\"title\":\"poop3\",\"text\":\"test\",\"img\":\"img03\",\"comment\":[\"{\\\"user_id\\\":\\\"akaishuichi\\\",\\\"time\\\":\\\"1999-12-31T23:01:01.000Z\\\",\\\"text\\\":\\\"test\\\"}\"]},{\"id\":\"6092b209779ced6502375e00\",\"time\":\"1999-12-31T01:01:01.000Z\",\"title\":\"poop2\",\"text\":\"test\",\"img\":\"img03\",\"comment\":[\"{\\\"user_id\\\":\\\"akaishuichi\\\",\\\"time\\\":\\\"1999-12-31T23:01:01.000Z\\\",\\\"text\\\":\\\"test\\\"}\",\"{\\\"user_id\\\":\\\"hatoriheiji\\\",\\\"time\\\":\\\"1999-12-31T23:01:01.000Z\\\",\\\"text\\\":\\\"test\\\"}\",\"{\\\"user_id\\\":\\\"amurotoru\\\",\\\"time\\\":\\\"1999-12-31T23:01:01.000Z\\\",\\\"text\\\":\\\"test\\\"}\"]},{\"id\":\"6092b1fe779ced6502375dff\",\"time\":\"1999-12-31T00:01:01.000Z\",\"title\":\"poop1\",\"text\":\"test\",\"img\":\"img03\",\"comment\":[]}]";
var dummy_commit = "[\"{\\\"user_id\\\":\\\"akaishuichi\\\",\\\"time\\\":\\\"1999-12-31T23:01:01.000Z\\\",\\\"text\\\":\\\"dummy_commit\\\"}\"]";

GLOBAL_full_url = "";
GLOBAL_browse_post_on_scroll = true;
GLOBAL_browse_post_on_scroll_delay_ms = 500;

function usr_inp_comment_fcn(e) {
    if (SET_ajex_full_json) {
        $.post(GLOBAL_full_url + DEF_comment_path, {
            comment: dummy_commit
        }, (objects_returned_by_the_server) => {
            if (DEF_DEBUG) {
                console.log(String(objects_returned_by_the_server));
            }
            document.getElementById(String(e.target.id).replace(/_btn/g, '') + "_input_txt").value = "";
        })
    } else {

        if (DEF_DEBUG) {
            console.log(document.getElementById(String(e.target.id).replace(/_btn/g, '') + "_input_txt").value);
        }

        $.post(GLOBAL_full_url + DEF_comment_path, {
            id: String(e.target.id).replace(/_btn/g, ''),
            time: Date(),
            text: document.getElementById(String(e.target.id).replace(/_btn/g, '') + "_input_txt").value
        }, (objects_returned_by_the_server) => {
            if (DEF_DEBUG) {
                console.log(String(objects_returned_by_the_server));
            }
            document.getElementById(String(e.target.id).replace(/_btn/g, '') + "_input_txt").value = "";
        })
    }
}

function get3post() {
    if (DEF_DEBUG) {
        console.log("get3post !");
    }

    $.get(GLOBAL_full_url, {
        //empty!
    }, (objects_returned_by_the_server) => {
        if (DEF_DEBUG) {
            console.log(objects_returned_by_the_server);
        }
        if (!objects_returned_by_the_server) {
            // is emtpy
            document.getElementById(browse_post).classList.add("no_articles_here_or_stolen_by_aliens");
            if (document.getElementById("STAT_no_articles_here_or_stolen_by_aliens").innerText === "no_articles_here_or_stolen_by_aliens?undefine") {
                document.getElementById("STAT_no_articles_here_or_stolen_by_aliens").innerText = "no_articles_here_or_stolen_by_aliens?yes";
            } else {
                //no move!
            }
        } else {
            document.getElementById("STAT_no_articles_here_or_stolen_by_aliens").innerText = "no_articles_here_or_stolen_by_aliens?no";
            for (let forloopindexofOBJRETURNBYSV = 0; forloopindexofOBJRETURNBYSV < JSON.parse(objects_returned_by_the_server).length; forloopindexofOBJRETURNBYSV++) {
                const element_returned_by_the_server = JSON.parse(objects_returned_by_the_server)[forloopindexofOBJRETURNBYSV];

                if (DEF_DEBUG) { console.log(element_returned_by_the_server); }
                var post_poop = document.createElement("div");
                post_poop.classList.add("post_poop");
                var original = document.createElement("div");
                original.classList.add("original");
                var comment_group = document.createElement("div");
                comment_group.classList.add("comment_group");
                var poster_block = document.createElement("div");
                poster_block.classList.add("poster_block");
                var ppt_frame = document.createElement("div");
                ppt_frame.classList.add("ppt_frame");
                var poster_photo = document.createElement("div");
                poster_photo.classList.add("poster_photo");
                var poster_name = document.createElement("div");
                poster_name.classList.add("poster_name");
                if (AMENDuser_idTOuser_name) {
                    poster_name.innerText = element_returned_by_the_server.user_id;
                } else {
                    poster_name.innerText = element_returned_by_the_server.user_name;
                }
                var post_time = document.createElement("div");
                post_time.classList.add("post_time");
                //convert given date into readable format
                var tmp_date = new Date(element_returned_by_the_server.time);
                post_time.innerText = tmp_date.toDateString();
                var post_text = document.createElement("div");
                post_text.classList.add("post_text");
                post_text.innerText = element_returned_by_the_server.text;
                var post_photo = document.createElement("div");
                post_photo.classList.add("post_photo");

                for (let forloopcommentindex = 0; forloopcommentindex < element_returned_by_the_server.comment.length; forloopcommentindex++) {
                    const comment_element = JSON.parse(element_returned_by_the_server.comment[forloopcommentindex]);
                    if (DEF_DEBUG) { console.log(comment_element); }


                    var comments = document.createElement("div");
                    comments.classList.add("comments");
                    var commenter_block = document.createElement("div");
                    commenter_block.classList.add("commenter_block");
                    var comment_text = document.createElement("div");
                    comment_text.classList.add("comment_text");
                    comment_text.innerText = comment_element.text;
                    var commenter_photo = document.createElement("div");
                    commenter_photo.classList.add("commenter_photo");

                    var commenter_name = document.createElement("div");
                    commenter_name.classList.add("commenter_name");
                    if (AMENDuser_idTOuser_name) {
                        commenter_name.innerText = comment_element.user_id;
                    } else {
                        commenter_name.innerText = comment_element.user_name;
                    }
                    var comment_time = document.createElement("div");
                    comment_time.classList.add("comment_time");
                    //convert given date into readable format
                    var tmp_date = new Date(comment_element.time);
                    comment_time.innerText = tmp_date.toDateString();

                    var commenter_detail = document.createElement("div");
                    commenter_detail.classList.add("commenter_detail");

                    commenter_block.appendChild(commenter_photo);
                    commenter_detail.appendChild(commenter_name);
                    commenter_detail.appendChild(comment_time);
                    commenter_block.appendChild(commenter_detail);
                    comments.appendChild(commenter_block);
                    comments.appendChild(comment_text);
                    comment_group.appendChild(comments);
                }

                ppt_frame.appendChild(post_text);
                ppt_frame.appendChild(post_photo);
                poster_block.appendChild(poster_photo);

                var poster_detail = document.createElement("div");
                poster_detail.classList.add("poster_detail");

                poster_detail.appendChild(poster_name);
                poster_detail.appendChild(post_time);
                poster_block.appendChild(poster_detail);
                original.appendChild(poster_block);
                original.appendChild(ppt_frame);
                post_poop.appendChild(original);
                //--------------------bton
                var new_comment = document.createElement("div");
                new_comment.classList.add("new_comment");
                var usr_inp_comment_txt = document.createElement("input");
                usr_inp_comment_txt.classList.add("usr_inp_comment_txt");
                usr_inp_comment_txt.name = "new_comment_text";
                usr_inp_comment_txt.type = "text"; usr_inp_comment_txt.placeholder = "打字打在這";
                usr_inp_comment_txt.id = String(element_returned_by_the_server.id) + "_input_txt";
                var post_comment_button = document.createElement("div");
                post_comment_button.classList.add("post_comment_button");
                post_comment_button.innerText = DEF_TEXT_UI_comment_btn;
                post_comment_button.id = String(element_returned_by_the_server.id) + "_btn";

                var new_comment_button = document.createElement("div");
                new_comment_button.classList.add("new_comment_button");
                new_comment_button.innerText = DEF_GUI_TXT_addcomment;

                new_comment.appendChild(new_comment_button);
                new_comment.appendChild(usr_inp_comment_txt);
                new_comment.appendChild(post_comment_button);
                post_poop.appendChild(new_comment);
                //--------------------
                post_poop.appendChild(comment_group);
                document.getElementById("browse_post").appendChild(post_poop);

                document.getElementById(post_comment_button.id).addEventListener("click", usr_inp_comment_fcn);
            }
            if (DEF_fuckthephotos) {
                for (let index_fuckthephotos = 0; index_fuckthephotos < document.getElementsByClassName("poster_photo").length; index_fuckthephotos++) {
                    const element = document.getElementsByClassName("poster_photo")[index_fuckthephotos];
                    element.innerHTML = "<img src=\"image/test.svg\">";
                } for (let index_fuckthephotos = 0; index_fuckthephotos < document.getElementsByClassName("post_photo").length; index_fuckthephotos++) {
                    const element = document.getElementsByClassName("post_photo")[index_fuckthephotos];
                    element.innerHTML = "<img src=\"image/test2.svg\">";
                } for (let index_fuckthephotos = 0; index_fuckthephotos < document.getElementsByClassName("commenter_photo").length; index_fuckthephotos++) {
                    const element = document.getElementsByClassName("commenter_photo")[index_fuckthephotos];
                    element.innerHTML = "<img src=\"image/test.svg\">";
                }

            }
        }
    })


}

function init() {
    if (DEF_DEBUG) {
        console.log("dummiesTest success");
    } else {
        DEF_NO_HTML_DISP = true;
        DEF_field_battle = false;
        AMENDuser_idTOuser_name = false;
        SET_ajex_full_json = false;
    }
    if (DEF_NO_HTML_DISP) {
        for (let dont_show_this_in_published_client_index = 0; dont_show_this_in_published_client_index < document.getElementsByClassName("dont_show_this_in_published_client").length; dont_show_this_in_published_client_index++) {
            const element = document.getElementsByClassName("dont_show_this_in_published_client")[dont_show_this_in_published_client_index];
            element.style.display = "none";
        }
    }
    if (DEF_field_battle) {
        document.getElementById("browse_post").style.height = "400px";
    }
    GLOBAL_full_url = ((DEF_use_https) ? "https" : "http") + "://" + DEF_domain_name + ":" + DEF_port + DEF_path;
    if (DEF_DEBUG) {
        console.log(GLOBAL_full_url);
    }
    if (DEF_ts) {
        document.getElementById("browse_post").innerHTML = "";
    }
    get3post();

    if (SET_FillTest) {
        document.getElementById("browse_post").innerText = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n"
    }
}

function scrolledToBottom() {
    jQuery(function ($) {
        $('#browse_post').on('scroll', function () {
            console.log(GLOBAL_browse_post_on_scroll);
            console.log($(this).scrollTop()+$(this).innerHeight());
            console.log($(this)[0].scrollHeight);console.log(Math.abs((($(this).scrollTop() + $(this).innerHeight()))) / $(this)[0].scrollHeight );
            if (GLOBAL_browse_post_on_scroll) {
                if (Math.abs((($(this).scrollTop() + $(this).innerHeight()))) / $(this)[0].scrollHeight >= 0.7) {
                    GLOBAL_browse_post_on_scroll = false;
                    console.log('end reached');
                    get3post();
                    setTimeout(function () {
                        GLOBAL_browse_post_on_scroll = true;
                    }, GLOBAL_browse_post_on_scroll_delay_ms);
                }
            }

        })
    });
}

jQuery(function dom_ready(dom_ready_params) {

    init();
    scrolledToBottom();
});