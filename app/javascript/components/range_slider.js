const rangeSlider = () => {
  const slider = $('.range-slider'),
        range = $('.range-slider__range'),
        value = $('.range-slider__value');

  slider.each(function(){

    value.each(function(){
      const value = $(this).prev().children('input').attr('value');
      $(this).html(value);
    });
    range.on('input', function(){
      $(this).parent().next(value).html(this.value);
    });

  });
};

export { rangeSlider };
