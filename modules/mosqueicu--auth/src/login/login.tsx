import React from 'react';
import { Checkbox, Field, Input, Label } from '@headlessui/react';
import { clsx } from 'clsx';

const Login = () => {
  return (
    <main className="overflow-hidden bg-gray-50">
      <div className="isolate flex min-h-dvh items-center justify-center p-6 lg:p-8">
        <div className="w-full max-w-md rounded-xl bg-white shadow-md ring-1 ring-black/5">
          <form action="#" method="POST" className="p-7 sm:p-11">
            <div className="flex items-start">
              <h1 className="mt-8 text-base/6 font-medium">Welcome back!</h1>
              <p className="mt-1 text-sm/5 text-gray-600">
                Sign in to your account to continue.
              </p>
            </div>
            <Field className="mt-8 space-y-3">
              <Label className="text-sm/5 font-medium">Email</Label>
              <Input
                required
                autoFocus
                type="email"
                name="email"
                className={clsx(
                  'block w-full rounded-lg border border-transparent shadow ring-1 ring-black/10',
                  'px-[calc(theme(spacing.2)-1px)] py-[calc(theme(spacing[1.5])-1px)] text-base/6 sm:text-sm/6',
                  'data-[focus]:outline data-[focus]:outline-2 data-[focus]:-outline-offset-1 data-[focus]:outline-black',
                )}
              />
            </Field>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
