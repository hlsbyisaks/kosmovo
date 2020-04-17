//HEADER

$("<div>", {
    html: 'KOSMOVO',
    appendTo:'.logoContainer > div'
}).css({'color': 'var(--main-yellow-color)', 'font-family': 'Molot', 'font-size': '20px', 'text-align': 'center'})

$("<div>", {
    html: '2020',
    appendTo:'.logoContainer > div'
}).css({'color': 'var(--main-yellow-color)', 'font-family': 'Molot', 'font-size': '39px',
         'margin-top': '-13.5px', 'text-align': 'center'})

$("<div>", {
    'id': 'logo',
    appendTo:'.logoContainer'
}).css({'background-image': 'url(img/logo.png)', 'height': '47px', "width": "45px",
        'background-size': 'cover', 'background-repeat': 'no-repeat'})