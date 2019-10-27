import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';

import useLocalStorage from './useLocalStorage';

function TestHook({ callback }) {
  callback();
  return null;
}

function testHook(callback) {
  mount(<TestHook callback={callback} />);
}

describe('useLocalStorage hook', () => {
  let setLocalStorageItemSpy;
  let getLocalStorageItemSpy;

  beforeEach(() => {
    window.localStorage.clear();
    getLocalStorageItemSpy = jest.spyOn(
      Object.getPrototypeOf(window.localStorage),
      'getItem',
    );
    setLocalStorageItemSpy = jest.spyOn(
      Object.getPrototypeOf(window.localStorage),
      'setItem',
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('gets value from localStorage', () => {
    let settings = null;
    const key = 'custom key';
    const storedValue = 'stored test value';

    window.localStorage.setItem(key, JSON.stringify(storedValue));

    testHook(() => {
      [settings] = useLocalStorage(key);
    });

    expect(settings).toEqual(storedValue);
    expect(getLocalStorageItemSpy).toBeCalledWith(key);
    expect(getLocalStorageItemSpy).toBeCalledTimes(1);
    expect(setLocalStorageItemSpy).not.toBeCalledWith();
  });

  it('updates value in localStorage', () => {
    let settings = null;
    let setSettings;
    const key = 'custom key';
    const updateValue = {
      key: 'updated test value',
    };

    testHook(() => {
      [settings, setSettings] = useLocalStorage(key, {});
    });

    act(() => setSettings(updateValue));

    expect(settings).toEqual(updateValue);
    expect(setLocalStorageItemSpy).toBeCalledWith(
      key,
      JSON.stringify(updateValue),
    );
    expect(setLocalStorageItemSpy).toBeCalledTimes(1);
    expect(getLocalStorageItemSpy).toBeCalledWith(key);
    expect(getLocalStorageItemSpy).toBeCalledTimes(1);
  });

  it('returns initial value without saving to localStorage', () => {
    let settings = null;
    const key = 'custom key';
    const initialValue = {
      key: 'test value',
    };

    testHook(() => {
      [settings] = useLocalStorage(key, initialValue);
    });

    expect(settings).toEqual(initialValue);
    expect(setLocalStorageItemSpy).not.toBeCalledWith();
    expect(getLocalStorageItemSpy).not.toBeCalledWith();
  });
});
