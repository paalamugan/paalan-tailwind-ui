import type React from 'react';
import type { ExternalToast, PromiseData, PromiseT, ToastT, ToastToDismiss, ToastTypes } from './types';

import { HeadlessToast } from './components/HeadlessToast';

let toastsCounter = 1;

class Observer {
  subscribers: Array<(toast: ToastT | ToastToDismiss) => void>;
  toasts: Array<ToastT | ToastToDismiss>;

  constructor() {
    this.subscribers = [];
    this.toasts = [];
  }

  // We use arrow functions to maintain the correct `this` reference
  subscribe = (subscriber: (toast: ToastT | ToastToDismiss) => void) => {
    this.subscribers.push(subscriber);

    return () => {
      const index = this.subscribers.indexOf(subscriber);
      this.subscribers.splice(index, 1);
    };
  };

  publish = (data: ToastT) => {
    this.subscribers.forEach((subscriber) => subscriber(data));
  };

  addToast = (data: ToastT) => {
    this.publish(data);
    this.toasts = [...this.toasts, data];
  };

  create = (
    data: ExternalToast & {
      message?: string | React.ReactNode;
      type?: ToastTypes;
      promise?: PromiseT;
    },
  ) => {
    const { message, ...rest } = data;
    const id =
      typeof data?.id === 'number' || (data?.id && data.id.length && data.id.length > 0) ? data.id : toastsCounter++;
    const alreadyExists = this.toasts.find((toast) => {
      return toast.id === id;
    });
    const dismissible = data.dismissible === undefined ? true : data.dismissible;

    if (alreadyExists) {
      this.toasts = this.toasts.map((toast) => {
        if (toast.id === id) {
          this.publish({ ...toast, ...data, id, title: message });
          return {
            ...toast,
            ...data,
            id,
            dismissible,
            title: message,
          };
        }

        return toast;
      });
    } else {
      this.addToast({ title: message, ...rest, dismissible, id });
    }

    return id;
  };

  dismiss = (id?: number | string) => {
    if (!id) {
      this.toasts.forEach((toast) => {
        this.subscribers.forEach((subscriber) => subscriber({ id: toast.id, dismiss: true }));
      });
    } else {
      this.subscribers.forEach((subscriber) => subscriber({ id, dismiss: true }));
    }

    return id;
  };

  message = (message: string | React.ReactNode, data?: ExternalToast) => {
    return this.create({ ...data, message });
  };

  error = (message: string | React.ReactNode, data?: ExternalToast) => {
    return this.create({ ...data, message, type: 'error' });
  };

  success = (message: string | React.ReactNode, data?: ExternalToast) => {
    return this.create({ ...data, type: 'success', message });
  };

  warning = (message: string | React.ReactNode, data?: ExternalToast) => {
    return this.create({ ...data, type: 'warning', message });
  };

  info = (message: string | React.ReactNode, data?: ExternalToast) => {
    return this.create({ ...data, type: 'info', message });
  };

  show = (message: string | React.ReactNode, { description, ...data }: ExternalToast = {}) => {
    return this.custom((id) => <HeadlessToast id={id} title={message} description={description} toast={toast} />, data);
  };

  loading = (message: string | React.ReactNode, data?: ExternalToast) => {
    return this.create({ ...data, type: 'loading', message });
  };

  promise = <ToastData,>(promise: PromiseT<ToastData>, data?: PromiseData<ToastData>) => {
    if (!data) {
      // Nothing to show
      return;
    }

    let id: string | number | undefined = undefined;
    if (data.loading !== undefined) {
      id = this.create({
        ...data,
        promise,
        type: 'loading',
        message: data.loading,
      });
    }

    const p = promise instanceof Promise ? promise : promise();

    let shouldDismiss = id !== undefined;

    p.then((promiseData) => {
      if (data.success !== undefined) {
        shouldDismiss = false;
        const message = typeof data.success === 'function' ? data.success(promiseData) : data.success;
        this.create({ id, type: 'success', message });
      }
    })
      .catch((error) => {
        if (data.error !== undefined) {
          shouldDismiss = false;
          const message = typeof data.error === 'function' ? data.error(error) : data.error;
          this.create({ id, type: 'error', message });
        }
      })
      .finally(() => {
        if (shouldDismiss) {
          // Toast is still in load state (and will be indefinitely — dismiss it)
          this.dismiss(id);
          id = undefined;
        }

        data.finally?.();
      });

    return id;
  };

  // We can't provide the toast we just created as a prop as we didn't create it yet, so we can create a default toast object, I just don't know how to use function in argument when calling()?
  custom = (jsx: (id: number | string) => React.ReactElement, data?: ExternalToast) => {
    const id = data?.id || toastsCounter++;
    this.publish({ jsx: jsx(id), id, ...data });
  };
}

export const ToastState = new Observer();

// bind this to the toast function
const toastFunction = (message: string | React.ReactNode, data?: ExternalToast) => {
  const id = data?.id || toastsCounter++;

  ToastState.addToast({
    title: message,
    ...data,
    id,
  });
  return id;
};

const basicToast = toastFunction;

// We use `Object.assign` to maintain the correct types as we would lose them otherwise
export const toast = Object.assign(basicToast, {
  success: ToastState.success,
  error: ToastState.error,
  warning: ToastState.warning,
  info: ToastState.info,
  show: ToastState.show,
  custom: ToastState.custom,
  message: ToastState.message,
  promise: ToastState.promise,
  dismiss: ToastState.dismiss,
  loading: ToastState.loading,
});

export type ToastType = typeof toast;
