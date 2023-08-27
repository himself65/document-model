import { jest } from '@jest/globals';
import type { TextNode } from '../entities/TextNode';
import { createInlineToolName, FormattingNode } from '../entities/FormattingNode';
import { createChildNodeMock } from './ChildNode.mock';

export const createTextNodeMock = (value: string): TextNode => {
  const childMock = createChildNodeMock();

  return Object.assign(childMock, {
    getText: jest.fn(() => value),
    insertText: jest.fn(),
    removeText: jest.fn(),
    split: jest.fn((index: number) => {
      if (index === 0 || index === value.length) {
        return null;
      }

      const newNode = createTextNodeMock(value.slice(index));

      childMock.parent?.append(newNode);

      value = value.slice(0, index);

      return newNode;
    }),
    format: jest.fn(() => [ new FormattingNode({ tool: createInlineToolName('tool') }) ]),
    length: value.length,
  } as unknown as TextNode);
};