import React from 'react';
import { IProfile } from '../../app/models/profile';
import { combineValidators, isRequired } from 'revalidate';
import { Form as FinalForm, Field } from 'react-final-form';
import TextAreaInput from '../../app/common/form/TextAreaInput';
import TextInput from '../../app/common/form/TextInput';
import { Button, Form } from 'semantic-ui-react';

const validate = combineValidators({
  displayName: isRequired('displayName'),
});

interface IProps {
  updateProfile: (profile: IProfile) => void;
  profile: IProfile;
}

const ProfileEditForm: React.FC<IProps> = ({ updateProfile, profile }) => {
  return (
    <FinalForm
        onSubmit={updateProfile}
        validate={validate}
        initialValues={profile!}
        render={({ handleSubmit, invalid, pristine, submitting }) => (
            <Form onSubmit={handleSubmit} error>
                <Field
                    name='displayName'
                    component={TextInput}
                    placeholder='Display Name'
                    value={profile!.displayName}
                />
                <Field
                    name='bio'
                    component={TextAreaInput}
                    rows={3}
                    placeholder='Bio'
                    value={profile!.bio}
                />
                <Button
                    loading={submitting}
                    floated='right'
                    disabled={invalid || pristine}
                    positive
                    content='Update profile'
                />
            </Form>
        )}
    />
    )
};

export default ProfileEditForm;
