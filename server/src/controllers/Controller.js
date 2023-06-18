class Controller {

	constructor(service) {
		this.service = service;
		this.getAll = this.getAll.bind(this);
		this.getID = this.getID.bind(this);
		this.insert = this.insert.bind(this);
		this.update = this.update.bind(this);
		this.delete = this.delete.bind(this);
	}

	async getAll(req, res, next) {
		try {
			const response = await this.service.getAll(req.query);
			await res.status(response.statusCode).json(response);
			// next();
		} catch (error) {
			next(error);
		}
	}

	async getID(req, res, next) {
		try {
			const {id} = req.params;
			const response = await this.service.getID(id);
			await res.status(response.statusCode).json(response);
			// next();
		} catch (error) {
			next(error);
		}
	}

	async insert(req, res, next) {
		try {
			const response = await this.service.insert(req.body);
			await res.status(response.statusCode).json(response);
			// next();
		} catch (error) {
			next(error);
		}
	}

	async update(req, res, next) {
		try {
			const {id} = req.params;
			const response = await this.service.update(id, req.body);
			await res.status(response.statusCode).json(response);
			// next();
		} catch (error) {
			next(error);
		}
	}

	async delete(req, res, next) {
		try {
			const {id} = req.params;
			const response = await this.service.delete(id);
			await res.status(response.statusCode).json(response);
			// next();
		} catch (error) {
			next(error);
		}
	}

}

module.exports = { Controller };
