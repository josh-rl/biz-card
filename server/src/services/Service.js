import mongoose from "mongoose";
import * as httpRes from "../helpers/httpResponses.js";

class Service {
	constructor(model) {
		this.model = model;
		this.getAll = this.getAll.bind(this);
		this.getID = this.getID.bind(this);
		this.insert = this.insert.bind(this);
		this.update = this.update.bind(this);
		this.delete = this.delete.bind(this);
	}

	async getAll(query) {
		let { skip, limit } = query;
		skip = skip ? Number(skip) : 0;
		limit = limit ? Number(limit) : 10;
		delete query.skip;
		delete query.limit;

		if (query._id) {
			try {
				query._id = new mongoose.mongo.ObjectId(query._id);
			} catch (error) {
				return httpRes.serverError(error);
			}
		}

		try {
			const items = await this.model
				.find(query)
				.skip(skip)
				.limit(limit);
			const total = await this.model.count();
			return httpRes.findManySuccess(items, total)
		} catch (error) {
			return httpRes.serverError(error);
		}
	}

	async getID(id) {
		try {
			const item = await this.model.findById(id);
			if (!item) {
				return httpRes.idNotFound();
			}
			return httpRes.findSuccess(item);
		} catch (error) {
			return httpRes.serverError(error);
		}
	}

	async insert(data) {
		try {
			const item = await this.model.create(data);
			if (!item) {
				return httpRes.createFailure(data);
			}
			return httpRes.createSuccess(item);
		} catch (error) {
			if (error.errors.email.path && error.errors.email.path === "email") {
				return httpRes.emailNotUnique(); 
			}
			return httpRes.serverError(error);
		}
	}

	async update(id, data) {
		try {
			const item = await this.model.findByIdAndUpdate(id, data, { new: true });
			if (!item) {
				return httpRes.updateFailure(id, data);
			}
			return httpRes.updateSuccess(item);
		} catch (error) {
			return httpRes.serverError(error);
		}
	}

	async delete(id) {
		try {
			const item = await this.model.findByIdAndDelete(id);
			if (!item) {
				return httpRes.idNotFound();
			}
			return httpRes.deleteSuccess("None.");
		} catch (error) {
			return httpRes.serverError(error);
		}
	}
}

export default Service;
