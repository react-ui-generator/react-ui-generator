import {
  RawMetaDescription,
  enhanceFormMeta
} from '@react-ui-generator/core';

import Metaphor from '../src';
import { FieldBooleanProps } from '../src/lib/Metaphor';

import metaMinimal from './mocks/minimal';

describe('Metaphor', () => {
  describe('.value()', () => {
    test('should return completed version of original metadata.', () => {
      const form = new Metaphor(metaMinimal);
      const meta = form.value();

      expect(meta).toEqual(enhanceFormMeta(metaMinimal));
    });

    test('should not use original metadata.', () => {
      const completeMeta = enhanceFormMeta(metaMinimal);
      const form = new Metaphor(completeMeta);
      const generatedMeta = form.value();

      expect(generatedMeta).toEqual(completeMeta);
      expect(generatedMeta).not.toBe(completeMeta);
    });
  });

  describe('.disable()', () => {
    test('should set `disabled: true` for all specified fields', () => {
      const sourceMeta = prepareMetaForBooleanProps(metaMinimal, 'disabled', false);
      const form = new Metaphor(sourceMeta).disable(['foo', 'bar']);
      const disabled = form.value().fields.filter(x => x.disabled);

      expect(disabled.length).toEqual(2);
    });

    test('should set `disabled: true` for single specified field', () => {
      const sourceMeta = prepareMetaForBooleanProps(metaMinimal, 'disabled', false);
      const form = new Metaphor(sourceMeta).disable('bar');
      const disabled = form.value().fields.filter(x => x.disabled);

      expect(disabled.length).toEqual(1);
      expect(disabled[0].id).toEqual('bar');
    });

    test('should set `disabled: false` for all not-specified fields, if `enableNotMatched` is set to `true`', () => {
      const sourceMeta = prepareMetaForBooleanProps(metaMinimal, 'disabled', false);
      const form = new Metaphor(sourceMeta).disable(['foo', 'baz'], true);
      const disabled = form.value().fields.filter(x => x.disabled);

      expect(disabled.length).toEqual(2);
    });
  });

  describe('.disableAll()', () => {
    test('should set `disabled: true` for all fields', () => {
      const sourceMeta = prepareMetaForBooleanProps(metaMinimal, 'disabled', false);
      const form = new Metaphor(sourceMeta).disableAll();
      const disabled = form.value().fields.filter(x => x.disabled);

      expect(disabled.length).toEqual(3);
    });
  });

  describe('.enable()', () => {
    test('should set `disabled: false` for all specified fields', () => {
      const sourceMeta = prepareMetaForBooleanProps(metaMinimal, 'disabled', true);
      const form = new Metaphor(sourceMeta).enable(['foo', 'bar']);
      const enabled = form.value().fields.filter(x => !x.disabled);

      expect(enabled.length).toEqual(2);
    });

    test('should set `disabled: false` for single specified field', () => {
      const sourceMeta = prepareMetaForBooleanProps(metaMinimal, 'disabled', true);
      const form = new Metaphor(sourceMeta).enable('bar');
      const enabled = form.value().fields.filter(x => !x.disabled);

      expect(enabled.length).toEqual(1);
      expect(enabled[0].id).toEqual('bar');
    });

    test('should set `disabled: true` for all not-specified fields, if `disableNotMatched` is set to `true`', () => {
      const sourceMeta = prepareMetaForBooleanProps(metaMinimal, 'disabled', true);
      const form = new Metaphor(sourceMeta).enable(['foo', 'baz'], true);
      const disabled = form.value().fields.filter(x => x.disabled);

      expect(disabled.length).toEqual(1);
    });
  });

  describe('.enableAll()', () => {
    test('should set `disabled: false` for all fields', () => {
      const sourceMeta = prepareMetaForBooleanProps(metaMinimal, 'disabled', true);
      const form = new Metaphor(sourceMeta).enableAll();
      const disabled = form.value().fields.filter(x => x.disabled);

      expect(disabled.length).toEqual(0);
    });
  });

  describe('.hide()', () => {
    test('should set `hidden: true` for all specified fields', () => {
      const sourceMeta = prepareMetaForBooleanProps(metaMinimal, 'hidden', false);
      const form = new Metaphor(sourceMeta).hide(['foo', 'bar']);
      const hidden = form.value().fields.filter(x => x.hidden);

      expect(hidden.length).toEqual(2);
    });

    test('should set `hidden: true` for single specified field', () => {
      const sourceMeta = prepareMetaForBooleanProps(metaMinimal, 'hidden', false);
      const form = new Metaphor(sourceMeta).hide('bar');
      const hidden = form.value().fields.filter(x => x.hidden);

      expect(hidden.length).toEqual(1);
      expect(hidden[0].id).toEqual('bar');
    });

    test('should set `hidden: false` for all not-specified fields, if `showNotMatched` is set to `true`', () => {
      const sourceMeta = prepareMetaForBooleanProps(metaMinimal, 'hidden', false);
      const form = new Metaphor(sourceMeta).hide(['foo', 'baz'], true);
      const hidden = form.value().fields.filter(x => x.hidden);

      expect(hidden.length).toEqual(2);
    });
  });

  describe('.hideAll()', () => {
    test('should set `hidden: true` for all fields', () => {
      const sourceMeta = prepareMetaForBooleanProps(metaMinimal, 'hidden', false);
      const form = new Metaphor(sourceMeta).hideAll();
      const hidden = form.value().fields.filter(x => x.hidden);

      expect(hidden.length).toEqual(3);
    });
  });

  describe('.show()', () => {
    test('should set `hidden: false` for all specified fields', () => {
      const sourceMeta = prepareMetaForBooleanProps(metaMinimal, 'hidden', true);
      const form = new Metaphor(sourceMeta).show(['foo', 'bar']);
      const visible = form.value().fields.filter(x => !x.hidden);

      expect(visible.length).toEqual(2);
    });

    test('should set `hidden: false` for single specified field', () => {
      const sourceMeta = prepareMetaForBooleanProps(metaMinimal, 'hidden', true);
      const form = new Metaphor(sourceMeta).show('bar');
      const visible = form.value().fields.filter(x => !x.hidden);

      expect(visible.length).toEqual(1);
      expect(visible[0].id).toEqual('bar');
    });

    test('should set `hidden: true` for all not-specified fields, if `showNotMatched` is set to `true`', () => {
      const sourceMeta = prepareMetaForBooleanProps(metaMinimal, 'hidden', true);
      const form = new Metaphor(sourceMeta).show(['foo', 'baz'], true);
      const visible = form.value().fields.filter(x => !x.hidden);

      expect(visible.length).toEqual(2);
    });
  });

  describe('.showAll()', () => {
    test('should set `hidden: false` for all fields', () => {
      const sourceMeta = prepareMetaForBooleanProps(metaMinimal, 'hidden', true);
      const form = new Metaphor(sourceMeta).showAll();
      const visible = form.value().fields.filter(x => !x.hidden);

      expect(visible.length).toEqual(3);
    });
  });

  describe('.clone()', () => {
    test('should append cloned field after the source field, by default', () => {
      const form = new Metaphor(metaMinimal);
      const meta = form.clone('foo', 'xxx').value()
      const xxxIdx = meta.fields.findIndex(item => item.id === 'xxx')

      expect(xxxIdx).toBe(1)
      expect(metaMinimal.fields.length).toBe(3)
      expect(meta.fields.length).toBe(4)
    })

    test('should append cloned field at the end of "fields" array, if `appendToSrc` is `false`', () => {
      const form = new Metaphor(metaMinimal);
      const meta = form.clone('foo', 'xxx', false).value()
      const xxxIdx = meta.fields.findIndex(item => item.id === 'xxx')

      expect(xxxIdx).toBe(metaMinimal.fields.length)
      expect(metaMinimal.fields.length).toBe(3)
      expect(meta.fields.length).toBe(4)
    })

    test('should throw error, if `idSrc` does not exists in "fields"', () => {
      const t = () => {
        const form = new Metaphor(metaMinimal);
        form.clone('xxx', 'yyy', false).value()
      }

      expect(t).toThrowError('Source field with id "xxx" is not found.')
    })

    test('should throw error, if `idTarget` already exists in "fields"', () => {
      const t = () => {
        const form = new Metaphor(metaMinimal);
        form.clone('foo', 'bar', false).value()
      }

      expect(t).toThrowError('Id "bar" is already in use.')
    })
  })


  describe('.remove()', () => {
    test('should remove field with matched id', () => {
      const form1 = new Metaphor(metaMinimal);
      const meta1 = form1.remove('foo').value()

      expect(meta1.fields.length).toBe(2)
      expect(meta1.fields.map(item => item.id).includes('foo')).toBe(false)

      const form2 = new Metaphor(metaMinimal);
      const meta2 = form2.remove('bar').value()

      expect(meta2.fields.length).toBe(2)
      expect(meta2.fields.map(item => item.id).includes('bar')).toBe(false)
      expect(meta2.fields.map(item => item.id).includes('foo')).toBe(true)
    })

    test('should throw error, if `id` does not exists in "fields"', () => {
      const t = () => {
        const form = new Metaphor(metaMinimal);
        form.remove('foo').remove('foo').value()
      }

      expect(t).toThrowError('Source field with id "foo" is not found.')
    })
  })

  describe('.config', () => {
    describe('.set()', () => {
      test('should merge argument into field renderer\'s config', () => {
        const completeMeta = enhanceFormMeta(metaMinimal);

        const form = new Metaphor(completeMeta);
        const generatedMeta = form
          .config
            .set('foo', { testProperty: 42 })
            .up()
          .value();
        
        expect(generatedMeta.fields[0].renderer.config.testProperty).toEqual(42);
      });

      test('should not change original field metadata', () => {
        const completeMeta = enhanceFormMeta(metaMinimal);

        const form = new Metaphor(completeMeta);
        const generatedMeta = form
          .config
            .set('foo', { testProperty: 42 })
            .up()
          .value();
        
        expect(generatedMeta.fields[0].renderer.config.testProperty).toBeDefined();
        expect(completeMeta.fields[0].renderer.config.testProperty).toBeUndefined();
      });

      test('should set new config properties to all chosen fields', () => {
        const completeMeta = enhanceFormMeta(metaMinimal);

        const form = new Metaphor(completeMeta);
        const generatedMeta = form
          .config
            .set(['foo', 'baz'], { prop1: 42 })
            .set(['bar'], { prop2: 43 })
            .up()
          .value();

        const prop1Fields = generatedMeta.fields.filter(x => x.renderer.config.prop1);
        const prop2Fields = generatedMeta.fields.filter(x => x.renderer.config.prop2);
        
        expect(prop1Fields.length).toEqual(2);
        expect(prop2Fields.length).toEqual(1);
      });
    });

    describe('.up()', () => {
      test('should return parent Metaphor object', () => {
        const completeMeta = enhanceFormMeta(metaMinimal);

        const originalForm = new Metaphor(completeMeta);
        const uppedForm = originalForm
          .config
            .set(['foo', 'baz'], { prop1: 42 })
            .set(['bar'], { prop2: 43 })
            .up()

        expect(uppedForm).toBe(originalForm);
      });
    });
  });

  describe('.actions', () => {
    describe('.set()', () => {
      test('should merge argument into field\'s actions', () => {
        const completeMeta = enhanceFormMeta(metaMinimal);

        const form = new Metaphor(completeMeta);
        const generatedMeta = form
          .actions
            .set('foo', { onClick: 'sendForm' })
            .up()
          .value();
        
        expect(generatedMeta.fields[0].actions.onClick).toEqual('sendForm');
      });

      test('should not change original field metadata', () => {
        const completeMeta = enhanceFormMeta(metaMinimal);

        const form = new Metaphor(completeMeta);
        const generatedMeta = form
          .actions
            .set('foo', { onClick: 'sendForm' })
            .up()
          .value();
        
        expect(completeMeta.fields[0].actions.onClick).toBeUndefined();
      });

      test('should set new actions to all chosen fields', () => {
        const completeMeta = enhanceFormMeta(metaMinimal);

        const form = new Metaphor(completeMeta);
        const generatedMeta = form
          .actions
            .set(['foo', 'baz'], { onKeyUp: 'updateField' })
            .set(['bar'], { onClick: 'toggleField' })
            .up()
          .value();

        const action1Fields = generatedMeta.fields.filter(x => x.actions.onKeyUp);
        const action2Fields = generatedMeta.fields.filter(x => x.actions.onClick);
        
        expect(action1Fields.length).toEqual(2);
        expect(action2Fields.length).toEqual(1);
      });
    });

    describe('.up()', () => {
      test('should return parent Metaphor object', () => {
        const completeMeta = enhanceFormMeta(metaMinimal);

        const originalForm = new Metaphor(completeMeta);
        const uppedForm = originalForm
          .actions
            .set(['foo', 'baz'], { onClick: 'sendForm' })
            .up()

        expect(uppedForm).toBe(originalForm);
      });
    });
  });
});

// ---------------------------------------- //

function prepareMetaForBooleanProps(
  meta: RawMetaDescription,
  prop: FieldBooleanProps,
  value: boolean
) {
  const completeMeta = enhanceFormMeta(meta);
  completeMeta.fields.forEach(x => { x[prop] = value; });
  return completeMeta;
}
