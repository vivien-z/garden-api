const rangeSlider = () => {
  const slider = $('.range-slider'),
        range = $('.range-slider__range'),
        value = $('.range-slider__value');

    // range.on('input', function(){
    //   console.log($(this));
    //   console.log($(this).parent().next().html(this.value));
    //   console.log(this.value);
    //   // $(this).next(value).html(this.value);
    //   $(this).parent().next().html(this.value)
    // });

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
