import * as prettyDebugElement from './pretty-debugElement';
import { prettyPrintDebugElement } from './pretty-debugElement';
import { DebugElement } from '@angular/core';
import * as prettyHTMLLog from 'pretty-html-log';
import { THEMES } from 'pretty-html-log';

describe('pretty debug element', () => {
  it('should call prettyDebugelement with the debugElement and pass it to console.log', () => {
    console.log = jest.fn();
    const debugElement = {} as DebugElement;
    spyOn(prettyDebugElement, 'prettyDebugelement');
    prettyDebugElement.prettyPrintDebugElement(debugElement, THEMES.DRACULA);

    expect(console.log).toHaveBeenCalledWith(
      prettyPrintDebugElement(debugElement, THEMES.DRACULA)
    );
  });

  it(`should call prettyDebugelement with the debugElement for each debugElement. It should then
    pass the returned value to console.log
    for each `, () => {
    console.log = jest.fn();

    const debugElementOne = { name: 'DebugElementOne' } as DebugElement;
    const debugElementTwo = { name: 'DebugElementTwo' } as DebugElement;
    const debugElementThree = { name: 'DebugElementThree' } as DebugElement;

    const debugElements = [
      debugElementOne,
      debugElementTwo,
      debugElementThree
    ] as DebugElement[];
    spyOn(prettyDebugElement, 'prettyDebugelement');
    prettyDebugElement.prettyPrintDebugElements(debugElements, THEMES.DRACULA);

    expect(console.log).toHaveBeenCalledWith(
      prettyPrintDebugElement(debugElementOne, THEMES.DRACULA)
    );
    expect(console.log).toHaveBeenCalledWith(
      prettyPrintDebugElement(debugElementTwo, THEMES.DRACULA)
    );
    expect(console.log).toHaveBeenCalledWith(
      prettyPrintDebugElement(debugElementThree, THEMES.DRACULA)
    );
  });

  it('should call the highlight method with the innerHTML', () => {
    const innerHTML = '<h1>Foo</h1>';
    const debugElement = {
      nativeElement: {
        innerHTML
      }
    } as DebugElement;
    spyOn(prettyHTMLLog, 'highlight');

    prettyDebugElement.prettyDebugelement(debugElement, THEMES.DRACULA);
    expect(prettyHTMLLog.highlight).toHaveBeenCalledWith(
      innerHTML,
      THEMES.DRACULA
    );
  });
});
