import AsyncValidator from 'async-validator';

export default{
	validate(form){
		return new Promise((resolve, reject) => {
            let valid = true;
            this.fields.forEach(field => {
                field.validate('', errors => {
                    if (errors) {
                        valid = false;
                    }
                    if (++count === this.fields.length) {
                        // all finish
                        resolve(valid);
                        if (typeof callback === 'function') {
                            callback(valid);
                        }
                    }
                });
            });
        });
	},
	doValidate(trigger, callback = function () {}) {
        const rules = this.getFilteredRule(trigger);
        if (!rules || rules.length === 0) {
            callback();
            return true;
        }

        this.validateState = 'validating';

        let descriptor = {};
        descriptor[this.prop] = rules;

        const validator = new AsyncValidator(descriptor);
        let model = {};

        model[this.prop] = this.fieldValue;

        validator.validate(model, { firstFields: true }, errors => {
            this.validateState = !errors ? 'success' : 'error';
            this.validateMessage = errors ? errors[0].message : '';

            callback(this.validateMessage);
        });
        this.validateDisabled = false;
    },
}