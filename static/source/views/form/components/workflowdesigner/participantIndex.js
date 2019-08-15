import Participant from './participant.vue';
import Vue from 'vue';

// import store from '../../store/'
import store from '@/store/';
let participantInstance;

Participant.newInstance = properties => {
    const _props = properties || {};
    var parms = {};
    for (var key in _props) {
        parms[key] = _props[key];
    }
    parms["eventHub"] = new Vue();
    const Instance = new Vue({
        data: parms,
        store,
        render(h) {
            return h(Participant, {
                props: _props
            });
        }
    });

    const component = Instance.$mount();
    document.body.appendChild(component.$el);
    const participant = Instance.$children[0];
    console.log(participant);
    participant.$on('setValue', participant.setValue);
    participant.$on('ok', function (val, text) {
        participant.show = false;
        var callback = parms["callback"];
        if (callback && typeof callback == "function") {
            callback(val, text);
        }
    });
    participant.$on('cancel', function () {
        participant.show = false;
    });

    return {
        show() {
            participant.showModal();
        },
        component: participant,
        destroy(element) {
            participant.cancel();
            setTimeout(function () {
                document.body.removeChild(document.getElementsByClassName(element)[0]);
            }, 500);
        }
    };
};

function getParticipantInstance(options) {

    options = options || {};
    participantInstance = Participant.newInstance(options);
    //participantInstance = participantInstance || Participant.newInstance(options);
    //participantInstance.component.updateFormula(options["formula"] || "");
    return participantInstance;
}

function rule(options) {
    let instance = getParticipantInstance(options);
    instance.show();
}

export default {
    show(options) {
        return rule(options);
    }
};



// WEBPACK FOOTER //
// ./src/components/workflowdesigner/participantIndex.js