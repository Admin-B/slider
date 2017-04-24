(function () {
    window.addEventListener('DOMContentLoaded', function () {
        sliders = document.getElementsByClassName('slider');
        setSliders(sliders);
    });
    function setSliders(sliders) {
        for (var i = 0; i < sliders.length; i++) {
            var slider = sliders[i];

            (function (slider) {
                var sliderHTML = slider.innerHTML;
                slider.innerHTML = "";

                var sliderImages = document.createElement('div');
                sliderImages.classList.add('slider-images');

                var div = document.createElement('div');
                
                var span = document.createElement('span');
                span.innerHTML = sliderHTML;

                div.appendChild(span);
                sliderImages.appendChild(div);

                /* left & right button */
                var left = document.createElement('div');
                var right = document.createElement('div');

                left.classList.add('slider-left');
                left.classList.add('slider-btn');

                right.classList.add('slider-right');
                right.classList.add('slider-btn');

                function slide(d) {
                    return function () {
                        var dSymbol = slider.getAttribute('up-down') !== null ? 'Y' : 'X';

                        var walkSize = slider.getAttribute('walk-size');
                        walkSize = Number(walkSize !== null ? walkSize : 100);

                        var width = span.offsetWidth - div.offsetWidth;
                        var height = span.offsetHeight - div.offsetHeight;

                        width = dSymbol === 'Y' ? height : width;

                        var e = d === 1 ? 0 : -width;
                        var s = d === 1 ? -width : 0;

                        var tv = Number(div.getAttribute('data-translate' + dSymbol));
                        if (tv === null) {
                            tv = 0;
                        }
                        
                        if (tv === e && slider.getAttribute('end-to-end') !== null) {
                            tv = s;
                        } else {
                            tv += walkSize * d;
                        }

                        if ((d === 1 && tv > e) || (d === -1 && tv < e)) {
                            tv = e;
                        }

                        div.setCss3('transform', 'translate' + dSymbol + '(' + tv + 'px)');
                        div.setAttribute('data-translate' + dSymbol, tv);
                    }
                }
                left.addEventListener('click', slide(1));
                right.addEventListener('click', slide(-1));

                /* auto slide */
                var aDir = slider.getAttribute('auto-slide');
                var aInterval = slider.getAttribute('auto-slide-interval');

                if(aDir !== null || aInterval !== null){
                    aDir = Number(aDir);
                    aDir = (isNaN(aDir) || aDir === 0) ? -1 : aDir;
                    
                    aInterval = Number(aInterval);
                    aInterval = (isNaN(aInterval) || aInterval === 0) ? 5000 : aInterval;
                    
                    setInterval(slide(aDir), aInterval);
                }

                slider.appendChild(sliderImages);
                slider.appendChild(left);
                slider.appendChild(right);

                slider.setCss3('display', 'block');
            })(slider);
        }
    }
    HTMLElement.prototype.setCss3 = function (attr, val) {
        e = this;
        e.style['-webkit-' + attr] = val;
        e.style['-moz-' + attr] = val;
        e.style['-ms-' + attr] = val;
        e.style['-o-' + attr] = val;
        e.style[attr] = val;
        return this;
    }
    HTMLElement.prototype.getCss3 = function getCss3(attr, val) {
        e = this;
        return e.style['-webkit-' + attr] || e.style['-moz-' + attr] || e.style['-ms-' + attr] || e.style['-o-' + attr] || e.style[attr];
    }
})();

