const rangeSlider = () => {
  const slider = $('.range-slider'),
      form = $('.form-group'),
      range = $('.range-slider__range'),
      value = $('.range-slider__value');
  // console.log(slider)
  // console.log(range)
    slider.on('input', function(){
      console.log($(this).children('input'));
      console.log(this.value);
      $(this).next(value).html(this.value);
    });



  // slider.each(function(){
  //   const currentSlider = $(this)
  //   console.log(currentSlider.prev(value));
  //   console.log(currentSlider.children[0])






  //   value.each(function(){
  //     const value = $(this).prev().attr('value');
  //     // console.log($(this));

  //     $(this).html(value);
  //   });
  //   range.on('input', function(){
  //     console.log($(this).parent());
  //     console.log(this.value);
  //     $(this).next(value).html(this.value);
  //   });

  // });
};

export { rangeSlider };
