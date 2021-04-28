/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

function getComponent(): Promise<HTMLDivElement> {
  // Lodash, now imported by this script
  return import('lodash').then(({ default: _ }) => {
    const element = document.createElement('div');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
  });
}

getComponent()
  .then((component) => {
    document.body.append(component);
  })
  .catch((error) => {
    throw error;
  });
