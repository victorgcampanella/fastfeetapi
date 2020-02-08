import * as Yup from 'yup';
import Recipient from '../models/Recipient';
import User from '../models/User';

class RecipientController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string().required(),
      complement: Yup.string(),
      state: Yup.string()
        .required()
        .min(2),
      city: Yup.string().required(),
      cep: Yup.string()
        .required()
        .min(9),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const infoUser = await User.findByPk(request.userId);

    const [infoAdmin, infoFastFeet] = infoUser.email.split('@');

    if (infoAdmin.includes('admin') && infoFastFeet.includes('fastfeet.com')) {
      const { id, name, state, city, cep } = await Recipient.create(
        request.body
      );

      return response.json({
        id,
        name,
        state,
        city,
        cep,
      });
    }
    return response.json({
      message: 'You are not an admin',
    });
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string().required(),
      complement: Yup.string(),
      state: Yup.string()
        .required()
        .min(2),
      city: Yup.string().required(),
      cep: Yup.string()
        .required()
        .min(9),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const infoRecipient = request.body;

    await infoRecipient.update(request.body);

    return response.json(infoRecipient);
  }
}

export default new RecipientController();
