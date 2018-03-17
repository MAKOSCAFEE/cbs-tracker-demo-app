import { getInstance } from 'd2/lib/d2';

export const apiFetchPrograms = () => {
    return getInstance()
        .then(d2 =>
            d2.models.programs.list({
                fields: 'id,displayName~rename(name)',
                paging: false
            })
        )
        .then(programs => programs.toArray())
        .catch(error => console.log(error));
};
