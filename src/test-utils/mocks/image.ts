type Status = 'loaded' | 'error';

const originalImage = window.Image;

export const mockImage = () => {
  let status: Status;

  window.Image = class Image extends originalImage {
    onload: VoidFunction = () => {
      console.log('called');
    };
    onerror: VoidFunction = () => {};
    src = '';
    alt = '';
    hasAttribute(name: string) {
      return name in this;
    }
    getAttribute(name: string) {
      return name in this ? this[name as keyof typeof originalImage] : null;
    }
    constructor() {
      super();
      setTimeout(() => {
        if (status === 'error') {
          this.onerror();
        } else {
          this.onload();
        }
      }, mockImage.DELAY);
      return this;
    }
  };

  return {
    simulate(value: Status) {
      status = value;
    },
    restore() {
      window.Image = originalImage;
    },
  };
};

mockImage.restore = () => {
  window.Image = originalImage;
};

mockImage.DELAY = 100;
