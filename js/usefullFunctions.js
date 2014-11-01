// Config PNotify
if (typeof PNotify !== "undefined") {
    function fnNotify(sTitle, sText, sType, sIcon) {
        new PNotify({
            icon: sIcon,
            text: sText,
            title: sTitle,
            type: sType,
        });
    }
    function fnDesktopNotify(sTitle, sText) {
        PNotify.desktop.permission();
        (new PNotify({
            text: sText,
            title: sTitle,
            desktop: {
                desktop: true,
            }
        }));
    }
}
/*
 * Validation functions
 */
function addValidatePresence(oValidation, oKeyValues) {
    oValidation.add(Validate.Presence, oKeyValues);
}
function addValidateEmail(oValidation, oKeyValues) {
    oValidation.add(Validate.Email, oKeyValues);
}
function addValidateNumber(oValidation, oKeyValues) {
    oValidation.add(Validate.Numericality, oKeyValues);
}
function addValidateFormat(oValidation, oKeyValues) {
    oValidation.add(Validate.Format, oKeyValues);
}
/*
 * functions to get rows and manipulate datatable layout DOM
 */
function fnGetNewRowByCustomAttr(oDataTable, customAttr) {
    var aReturn = new Array();
    var aTrs = oDataTable.fnGetNodes();
    for (var i = 0; i < aTrs.length; i++) {
        var newRow = $(aTrs[i]).attr(customAttr);
        if (typeof newRow == "undefined") {
            aReturn.push(aTrs[i]);
        }
    }
    return aReturn;
}
function fnGetNewRowByCustomAttr(oDataTable, customAttr) {
    var aReturn = new Array();
    var aTrs = oDataTable.fnGetNodes();
    for (var i = 0; i < aTrs.length; i++) {
        var newRow = $(aTrs[i]).attr(customAttr);
        if (typeof newRow == "undefined") {
            aReturn.push(aTrs[i]);
        }
    }
    return aReturn;
}
function fnGetRowByCustomAttr(oDataTable, value, customAttr) {
    var aReturn = new Array();
    var aTrs = oDataTable.fnGetNodes();
    for (var i = 0; i < aTrs.length; i++) {
        if ($(aTrs[i]).attr(customAttr) == value) {
            aReturn.push(aTrs[i]);
        }
    }
    return aReturn;
}
function fnGetRowByCustomAttr(oDataTable, value, customAttr) {
    var aReturn = new Array();
    var aTrs = oDataTable.fnGetNodes();
    for (var i = 0; i < aTrs.length; i++) {
        if ($(aTrs[i]).attr(customAttr) == value) {
            aReturn.push(aTrs[i]);
        }
    }
    return aReturn;
}

/*
 * Datatable initiation without reporting layout
 */
function fnInitiateDatatable(cssSelector) {
    var dataTable = $(cssSelector).dataTable();
    return dataTable;
}
function fnInitiateDatatableReport(cssSelector, swfPath, sExportUrl, sAjaxUrl) {
    var oTable = $(cssSelector).dataTable({
        "sPaginationType": "full_numbers",
        "sScrollX": "100%",
        bRetrieve: true,
        bDestroy: true,
        //"sScrollXInner": "200%",
        "bProcessing": true,
        "bServerSide": true,
        //'bFilter': false,
        "sAjaxSource": sAjaxUrl,
        "sDom": 'T<"clear">rltip',
        "oTableTools": {
            "sSwfPath": swfPath,
            "aButtons": [
                {
                    "sExtends": "download",
                    "sButtonText": "Export",
                    "sUrl": sExportUrl,
                    "fnClick": function (nButton, oConfig) {
                        var oParams = this.s.dt.oApi._fnAjaxParameters(this.s.dt);
                        oParams.push({"name": "export_excel", "value": "1"});
                        var iframe = document.createElement('iframe');
                        iframe.style.height = "0px";
                        iframe.style.width = "0px";
                        iframe.src = oConfig.sUrl + "?" + $.param(oParams);
                        document.body.appendChild(iframe);
                    }
                },
                
            ]
        },
        "aoColumnDefs": [{
                "aTargets": [2, 7],
                "mRender": function (data, type, full) {
                    if (data == '0')
                        return 'No';
                    else
                        return 'Yes';
                }
            }]
    });
    return oTable;
}

function fnLoading(cssSelector) {
    if (cssSelector !== undefined) {
        $(cssSelector).block({css: {
                border: 'none',
                padding: '15px',
                backgroundColor: '#000',
                '-webkit-border-radius': '10px',
                '-moz-border-radius': '10px',
                opacity: .5,
                color: '#fff'
            }});
    } else {
        $.blockUI({css: {
                border: 'none',
                padding: '15px',
                backgroundColor: '#000',
                '-webkit-border-radius': '10px',
                '-moz-border-radius': '10px',
                opacity: .5,
                color: '#fff'
            }});

    }
}
function fnUnload(cssSelector) {
    if (cssSelector !== undefined) {
        $(cssSelector).unblock();
    } else {
        fnAddWarningNotify("Unable to unload, please reload.");
    }
}
function fnUploadFileTo(cssSelector, sUrl, sImgUrl) {
    'use strict';

    var url = sUrl,
            uploadButton = $('<button/>')
            .addClass('btn btn-primary')
            .prop('disabled', true)
            .text('Processing...')
            .on('click', function () {
                var $this = $(this),
                        data = $this.data();
                $this
                        .off('click')
                        .text('Abort')
                        .on('click', function () {
                            $this.remove();
                            data.abort();
                        });
                data.submit().always(function () {
                    $this.remove();
                });
            });


    $(cssSelector).fileupload({
        url: url,
        dataType: 'json',
        autoUpload: false,
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
        maxFileSize: 5000000, // 5 MB
        maxNumberOfFiles: 2,
        // getNumberOfFiles:function () {return 2;},
        // Enable image resizing, except for Android and Opera,
        // which actually support image resizing, but fail to
        // send Blob objects via XHR requests:
        disableImageResize: /Android(?!.*Chrome)|Opera/
                .test(window.navigator.userAgent),
        previewMaxWidth: 100,
        previewMaxHeight: 100,
        previewCrop: false
    }).on('fileuploadadd', function (e, data) {
        $('#files').removeClass('alert alert-success');// Modified REVC 
        $('#files').empty();//we clean the div before adding new image  Modified REVC 
        data.context = $('<div/>').appendTo('#files');

        $.each(data.files, function (index, file) {
            var node = $('<p/>')
                    .append($('<span/>').text(file.name));
            if (!index) {
                node
                        .append('<br>')
                        .append(uploadButton.clone(true).data(data));
            }
            node.appendTo(data.context);
        });
    }).on('fileuploadprocessalways', function (e, data) {

        var index = data.index,
                file = data.files[index],
                node = $(data.context.children()[index]);
        if (file.preview) {
            node
                    .prepend('<br>')
                    .prepend(file.preview);
        }
        if (file.error) {
            node
                    .append('<br>')
                    .append($('<span class="label label-important"/>').text(file.error));
        }
        if (index + 1 === data.files.length) {
            data.context.find('button')
                    .text('Upload')
                    .prop('disabled', !!data.files.error);
        }
    }).on('fileuploadprogressall', function (e, data) {
        var progress = parseInt(data.loaded / data.total * 100, 10);
        $('#progress>.bar').css(
                'width',
                progress + '%'
                );
    }).on('fileuploaddone', function (e, data) {
        if (typeof data.result.message_list === "undefined") {
            $.each(data.result.files, function (index, file) {
                if (file.url) {
                    var link = $('<a>')
                            .attr('target', '_blank')
                            .prop('href', file.url);
                    data.context.text('Upload finished.');// Modified REVC 
                    $('#files').addClass('alert alert-success');// Modified REVC 
                    $(data.context.children()[index])
                            .wrap(link);
                    $('#table_id img').attr('src', sImgUrl + file.name);// Modified REVC 

                } else if (file.error) {
                    var error = $('<span class="label label-important"/>').text(file.error);
                    $(data.context.children()[index])
                            .append('<br>')
                            .append(error);
                }
            });
        } else {
            for (var c = 0; c < data.result.message_list.length; c++) {
                fnAddErrorNotify(data.result.message_list[c]);
            }
        }

        var progress = parseInt(data.loaded / data.total * 0, 0);
        $('#progress>.bar').delay(2000).queue(function () {
            $(this).css('width', progress + '%');
            $(this).dequeue();

        })



    }).on('fileuploadfail', function (e, data) {
        $.each(data.files, function (index, file) {
            var error = $('<span class="label label-important"/>').text('File upload failed.');
            $(data.context.children()[index])
                    .append(error);
        });
    }).prop('disabled', !$.support.fileInput)
            .parent().addClass($.support.fileInput ? undefined : 'disabled');
}
//function fnShowTooltip(placement) {
//    $(".showTooltip").tooltip({
//        placement: placement
//    });
//}
//function fnShowTooltipWSelector(selector, placement) {
//    $(selector).tooltip({
//        placement: placement
//    }); 
//}
// seleccionar filas
function removeSelectedRow() {
    $('.dataTable > tbody  > tr').each(function () {
        $(this).removeClass('row_selected');
    });
}
//$("img.delete_record").bind('hover', function() {
//    this.src = this.src.replace("_off", "_on");
//});
//$("img.delete_record").bind('mouseleave', function() {
//    this.src = this.src.replace("_on", "_off");
//});
// handle status codes from ajax
function fnStatusCodes() {
    return {
        204: function () {
            fnAddErrorNotify("No information send back from server.");
        },
        400: function () {
            fnAddErrorNotify("Bad request from the client.");
        },
        401: function () {
            fnAddInfoNotify("You're unathorized or the session has expired, please login again.");
        },
        403: function () {
            fnAddWarningNotify("The session has expired, please refer to the login");
        },
        404: function () {
            fnAddErrorNotify("Page not found.");
        },
        500: function () {
            fnAddErrorNotify("Fatal errors has occurred, please advice the administrator.");
        }
    };
}
// seleccionar filas tabla de historico
//$(".dataTable tbody").delegate('tr','click',function(){
//    var tr = $(this);
//    var oTr = $(tr).get(0);            
//    removeSelectedRow();
//    tr.addClass("row_selected");
//});


//REVC remove row by current position
/*function deleteRowByObj(obj,sSelector){
 var oTable = $(sSelector).dataTable();
 var row = obj.closest("tr").get(0);
 var geTpos = oTable.fnGetPosition(row);
 oTable.fnDeleteRow(geTpos);	
 }*/
//REVC Bootstrap datepicker function modified 25-05-2014

function datePickerBottstrap(sSelector, sFormat) {
    var checkout = $(sSelector).datepicker({
        format: sFormat,
        todayBtn: "linked",
        calendarWeeks: true,
    }).on('changeDate', function (ev) {
        checkout.hide();
    }).data('datepicker');
}


// On Ready
$(document).on("ready", onReady());
// chosen configuration

function onReady() {
    // Disable certain links in app
    $("[href^=#]").on("click", document, function (e) {
        e.preventDefault();
    });
    // tooltip activation
    $("[data-toggle=tooltip]").tooltip();
    // Configurating chosen
    if (typeof $().chosen !== "undefined") {
        $("select").chosen();
    }
}

