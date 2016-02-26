# img-flip
plugin for animated display of alternate product images on category pages

<a name="manual-installation"></a>
### Manual Installation

To install, paste the following code into the template.html file: 

<link href="/v/vspfiles/assets/imgflip/css/imgFlip.css" rel="stylesheet" type="text/css" />
<script  src="/v/vspfiles/assets/imgflip/js/imgFlip.js"></script>
<script>
        (function($){
          $(document).ready(function() {
            $('body').imgFlip({
              "mobile": false,
              "effect": "slide-v" 
            });
          });
        })($jQueryModern);
</script>

**Note** this script utilizes jqueryModern, if not in the template already, ensure the following code is in the template above the above script call:

<script src="v/vspfiles/templates/TEMPLATENAME/js/jquery-1.11.1.min.js"></script>
<script>
var $jQueryModern = jQuery.noConflict(true);
</script>

<a name="Effects"></a>
## Effects

The following effects are currently supported:
<table>
<tr><td>Slide-horizontal:</td> <td>slide</td></tr>
<tr><td>Slide-Vertical:</td> <td>slide-v</td></tr>
<tr><td>Flip-horizontal:</td> <td>flip</td></tr>
<tr><td>Flip-vertical:</td> <td>flip-v</td></tr>
<tr><td>Fade:</td> <td>imgfade</td></tr>
<tr><td>Flip & Fade - horizontal:</td> <td>flipfade</td></tr>
<tr><td>Flip & Fade vertical:</td> <td>flipfade-v</td></tr>
<tr><td>Rotating Cube-horizontal:</td> <td>cube</td></tr>
<tr><td>Rotating Cube-vertical:</td> <td>cube-v</td></tr>
</table>

<a name="troubleshooting"></a>
## Troubleshooting

Visit the [issue tracking system](https://github.com/sam-wilson/img-flip/issues) <br>
Report new bugs [here](https://github.com/sam-wilson/img-flip/issues/new).
